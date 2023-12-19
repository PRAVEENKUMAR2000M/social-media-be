const User = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {
    signup: async (request, response) => {
        try {
            const { username, name, password } = request.body;
            const existingUser = await user.findOne({ username });
            if (existingUser) {
                response.status(200).json({ message: 'Username already exists' });
            } else {
                const passwordHash = await bcrypt.hash(password, 10);
                const newUser = new user({
                    username,
                    name,
                    passwordHash
                });
                const savedUser = await newUser.save();
                response.status(200).json({ message: 'User created successfully', user: savedUser });
            }
        } catch (error) {
            response.status(500).json({ message: 'Error creating user' });
        }
    },

    signin: async (request, response) => {
        try {
            const { username, password } = request.body
            const user = await user.findOne({ username })
            if (!user) {
                response.status(404).json({ message: "user not found" })
            }
            const passwordMatch = await bcrypt.compare(password, user.passwordHash)

            if (!passwordMatch) {
                response.status(404).json({message: "incorrect password"})
            }

        } catch (error) {
            response.status(404).json({ error: error.message })
        }
    }
}

module.exports = userController;