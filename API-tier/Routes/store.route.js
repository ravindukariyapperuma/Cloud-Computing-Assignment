const express = require("express");
const router = express.Router();

const StoreController = require("../Controllers/store.controller");

router.get("/", StoreController.getAllStores);

router.post("/", StoreController.createNewStore);

router.get("/:id", StoreController.findStoreById);

router.patch("/:id", StoreController.updateAStore);

router.delete("/:id", StoreController.deleteAStore);

module.exports = router;
