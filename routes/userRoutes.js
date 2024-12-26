const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path as needed

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Validate the input (you can use libraries like Joi or express-validator)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Registration failed', error });
    }
});

module.exports = router;
