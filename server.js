const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const Aadhar = require('./model');

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("error connecting to MongoDB:", err));

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hi! This is an aadhar database server by team CloakR' });
});

// Get single user by Aadhar No
app.get(`/get-info`, async (req, res) => {
    const { aadharNo } = req.query;
    if (!aadharNo) return res.status(400).json({ message: 'Please provide a valid Aadhar No' });
    try {
        const userData = await Aadhar.find({ aadharNo: aadharNo });
        if (userData.length === 0) return res.status(404).json({ message: 'No user found with the given Aadhar No' });
        return res.status(200).json({
            message: `You requested info for Aadhar No: ${aadharNo}`,
            data: userData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching user data' });
    }

});

// Get all users
app.get(`/get-all`, async (req, res) => {
    try {
        const allData = await Aadhar.find();
        if (allData.length === 0) return res.status(404).json({ message: 'No user found' });
        return res.status(200).json({
            message: `All data fetched successfully`,
            data: allData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching user data' });
    }

});

// Add new user to aadhar database
app.post('/add-info', async (req, res) => {
    const { aadharNo, name, phoneNo, state, lang } = req.body;
    try {
        const userData = await Aadhar.create({
            aadharNo: aadharNo,
            name: name,
            phoneNo: phoneNo,
            state: state,
            lang: lang
        });
        return res.status(200).json({ message: 'User added successfully', data: userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error adding user' });
    }
});

app.delete('/delete-all', async(req, res) => {
    await Aadhar.deleteMany();
    res.status(200).json({ message: 'All users deleted successfully' });
}

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
