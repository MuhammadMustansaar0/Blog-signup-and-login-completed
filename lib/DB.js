import mongoose from "mongoose";

const connectdb = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(`${process.env.DB_URI}${process.env.DB_NAME}`);
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ Database Connection Failed:", error);
        throw new Error("Database Connection Failed");
    }
};

export default connectdb; // ✅ Ensure default export
