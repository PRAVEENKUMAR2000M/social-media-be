const User = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {
    signup: async (request, response) => {
        try {
            // get the username, name, and password from the request body
            const { username, name, password } = request.body;

            // check if the username already exists in the database
            const user = await User.findOne({ username });

            // if the username already exists, return an error
            if (user) {
                return response.status(400).json({ error: 'username already exists' });
            }

            // if the username is unique, create a new user

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // create a new user with the username, name, and hashed password
            const newUser = new User({
                username,
                name,
                passwordHash
            });

            // save the user to the database
            const savedUser = await newUser.save();

            // return the saved user
            response.json({ message: 'user created', user: savedUser });
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }
}

module.exports = userController;