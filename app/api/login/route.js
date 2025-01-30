import User from "@/schema/user.schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectdb from "@/lib/DB";
import { cookies } from "next/headers"; // Correct way to set cookies in Next.js 13+

const getToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
};

export const POST = async (req) => {
    try {
        const { email, password } = await req.json();
        await connectdb();

        const user = await User.findOne({ email });
        if (!user)
            return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });

        const isLogin = await bcrypt.compare(password, user.password);
        if (!isLogin)
            return NextResponse.json({ status: "error", message: "Invalid password" }, { status: 401 });

        const token = getToken({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        });

        // **Correct way to set cookies in Next.js 13+**
        const cookieStore = await cookies(); // Await the cookies() function

        cookieStore.set("accessToken", token.accessToken, {
            httpOnly: true,
            secure: process.env.PROD === "true",
            sameSite: "Strict",
            maxAge: 15 * 60, // 15 minutes
        });

        cookieStore.set("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: process.env.PROD === "true",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return NextResponse.json({
            status: "success",
            message: "Login successful",
            data: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                accessToken: token.accessToken, // Also return accessToken
            },
        });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
};
