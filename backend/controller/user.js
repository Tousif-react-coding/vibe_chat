const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const allUsers = asyncHandler(async (req, res) => {
    // Ensure user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    // Build the search keyword if provided
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: `^${req.query.search}`, $options: "i" } }, // Starts with
                { email: { $regex: `^${req.query.search}`, $options: "i" } }, // Starts with
            ],
        }
        : {};

    // Fetch users, excluding the current user
    const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });
    console.log("Search Keyword:", keyword);

    // Send the filtered users
    res.send(users);
});

module.exports = { allUsers };
