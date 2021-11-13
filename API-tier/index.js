const express = require("express");

const app = express();
const cors = require("cors");

require("./DbConnection/db.connection")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const StoreRoute = require("./Routes/store.route");
app.use("/store", StoreRoute);

app.listen(process.env.PORT, () => {
  console.log("🚀 Server started on port " + process.env.PORT);
});
