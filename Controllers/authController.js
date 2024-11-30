import bcrypt from 'bcrypt';
import User from '../Models/userModel.js';


export const signup = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user with hashed password
        const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Send the userId as a response
        res.status(201).json({ message: 'User created successfully', userId: savedUser._id });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating user');
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email');
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid password');
        }

        // If the password matches, send a success response
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
};


export const getUserName = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userName = user.first_name + ' ' + user.last_name;
        return res.status(200).json({ userName });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};