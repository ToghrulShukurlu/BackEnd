const router = require("express").Router();
const Product = require('../models/product')
const Joi = require("@hapi/joi")
const jwt = require('jsonwebtoken')

const ProductSchema = Joi.object({
  vendor: Joi.string().min(2).max(15).required(),
  model: Joi.string().min(2).max(20).required(),
  color: Joi.string().min(3).max(20).required(),
  price: Joi.number().min(1).max(20000).required()
})

router.post("/", async (req, res) => {

  try {
    const newProduct = await new Product({
      vendor: req.body.vendor,
      model: req.body.model,
      color: req.body.color,
      price: req.body.price,
    });
    const saved = await newProduct.save()
    res.status(200).json({ message: "Product added Successfully" });
  }
  catch (err) {
    res.status(400).json({ message: "No product added" })
  }
});

router.get('/', async (req, res) => {
  const allProducts = await Product.find()
  res.status(200).json(allProducts);
})

router.get("/:id", async (req, res) => {
  const productById = await Product.find({ _id: req.params.id });
  res.status(200).json(productById);
});

router.delete("/:id", async (req, res) => {
  const productById = await Product.findOneAndDelete({ _id: req.params.id });
  const token = jwt.sign(productById, 123)
  res.status(200).json(token);
});



module.exports = router;
