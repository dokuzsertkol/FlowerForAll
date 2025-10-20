import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI environment variable is not defined");

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Done");
    }
    catch (error) {
        if (error instanceof Error) console.error("MongoDB Error: ", error.message);
        else console.error("Unexpected MongoDB Error: ", error);
        
        process.exit(1);
    }
};
export default connectDB;