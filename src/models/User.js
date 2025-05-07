import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return !this.githubId && !this.socialOnly; // GitHub 유저는 비번 필요 없음
        },
    },
    name: { type: String, required: true },
    location: String,
    avatarUrl: String,
    githubId: String,
    kakaoId: String,
    socialOnly: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
    if (this.isModified("password") && this.password) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 5);
};

const User = mongoose.model("User", userSchema);
export default User;