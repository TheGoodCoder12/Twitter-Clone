const userModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, login please!',
                success: false
            });
        }

        const newUser = new userModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json({
            message: "Signup successful!",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Some server error occurred",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const err = "Authentication failed...Invalid credentials";
        if (!user) {
            return res.status(403).json({
                message: err,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: err,
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.SECRETKEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login success",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({
            message: "Some server error occurred",
            success: false
        });
    }
};

module.exports = {
    login,
    signup
};
