const User = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {
    signup: async (request, response) => {
        try {
            const { username, name, password } = request.body;

            const user = await User.findOne({ username });

            if (user) {
                return response.status(400).json({ error: 'username already exists' });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                name,
                passwordHash
            });

            const savedUser = await newUser.save();

            response.json({ message: 'user created', user: savedUser });
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    },

    signin: async (request, response) => {
        try {

            const { username, password } = request.body;

            const user = await User.findOne({ username });

            if (!user) {
                return response.json({ error: 'user not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.passwordHash);

            if (!passwordMatch) {
                return response.json({ error: 'incorrect password' });
            }
            
        } catch (error) {
            response.status(500).json({ message: "error fetching the data" })
        }
    },
}
module.exports = userController;