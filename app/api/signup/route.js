import { NextResponse } from "next/server";
import "@/lib/DB";
import User from "@/schema/user.schema";

export const POST = async (req) => {
    try {
        const body = await req.json();

        // Check if email already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json({ status: "error", message: "Email already in use" }, { status: 400 });
        }

        // Manual validation
        if (!body.fullname || typeof body.fullname !== 'string' || body.fullname.length < 3 || body.fullname.length > 30) {
            return NextResponse.json({ status: "error", message: "Fullname must be a string between 3 and 30 characters" }, { status: 400 });
        }
        if (!body.email || typeof body.email !== 'string' || !/^\S+@\S+\.\S+$/.test(body.email)) {
            return NextResponse.json({ status: "error", message: "Invalid email format" }, { status: 400 });
        }
        if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
            return NextResponse.json({ status: "error", message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        const user = new User(body);
        await user.save();

        return NextResponse.json({ status: "success", data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
};
