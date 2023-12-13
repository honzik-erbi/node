const mongoose = require("mongoose");

const bootSchema = new mongoose.Schema({
bootsName : {type: String, required: true},
color : {type: String, required: true},
size : {type: Number, required: true},
style : {type: String, required: true},
bootsDescription : {type: String, required: true},
brand : {type: String, required: true},
});

module.exports = mongoose.model("Boot", bootSchema);