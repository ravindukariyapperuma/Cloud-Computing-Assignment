const mongoose = require("mongoose");

const Store = require("../Models/store.model");

module.exports = {
  getAllStores: async (req, res, next) => {
    try {
      const results = await Store.find();
      res.send(results);
    } catch (error) {
      res.send(error);
    }
  },

  createNewStore: async (req, res, next) => {
    try {
      const store = new Store(req.body);
      const result = await store.save();
      res.status(201).send(result);
    } catch (error) {
      res.send(error);
    }
  },

  findStoreById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const store = await Store.findById(id);
      if (!store) {
        res.status(204).send("Empty store");
      } else {
        res.status(200).send(store);
      }
    } catch (error) {
      res.send(error);
    }
  },

  updateAStore: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const result = await Store.findByIdAndUpdate(id, updates, options);
      if (!result) {
        res.status(204).send("Store does not exist");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      res.send(error);
    }
  },

  deleteAStore: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Store.findByIdAndDelete(id);
      if (!result) {
        res.status(204).send("Store does not exist");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      res.send(error);
    }
  },
};
