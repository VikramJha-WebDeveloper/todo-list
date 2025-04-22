const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    isRemembered: Boolean,
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;