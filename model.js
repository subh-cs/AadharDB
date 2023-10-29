const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AadharSchema = new Schema({
    aadharNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Aadhar', AadharSchema);
