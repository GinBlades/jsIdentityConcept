const mongoose = require("mongoose");

let LoginSchema = mongoose.Schema({
    email: String,
    loginTime: Date
});

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;
