import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const handleOpen = () => console.log("✅ MongoDB connected successfully");
const handleError = (error) => console.log("❌ MongoDB connection error:", error);

mongoose.connection.once("open", handleOpen);
mongoose.connection.on("error", handleError);

// const connectDB = async () => {
//     const MONGO_URI = process.env.MONGO_URI;
//     try {
//         await mongoose.connect(MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('✅ MongoDB connected successfully');
//     } catch (err) {
//         console.error('❌ MongoDB connection error:', err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;