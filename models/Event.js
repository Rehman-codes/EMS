const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["Meeting", "Birthday", "Appointment", "Other"],
        required: true,
    },
    reminder: {
        type: Boolean,
        default: false,
    },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
