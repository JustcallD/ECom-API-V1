const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: Array, required: true },
});

module.exports = mongoose.model("Categories", categorySchema);
