const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Store = mongoose.model("store", StoreSchema);
module.exports = Store;
