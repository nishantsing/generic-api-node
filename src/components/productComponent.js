import ProductModel from "../models/productModel.js";
import mongoose from "mongoose";
import productConfig from "../configs/productConfig.json" assert { type: "json" };

const productSchemaObject = productConfig.schema;

export const createProduct = async (req, res) => {
    console.log(req.body);
    //   let productObject;
    //   for (const key in productSchemaObject) {
    //     productObject[key] = req.body[key];
    //   }
    //   const product = new ProductModel(productObject);

    //If productObject was not passed we would had done something like
    //   new ProductModel({
    //     name: req.body.name,
    //     industry: req.body.industry
    //   });

    // but we can directly pass req.body

    const product = new ProductModel(req.body); // extra or incorrect keys will be ignored.
    try {
        await product.save();
        res.status(201).json({ product }); // product property is there
        // res.status(201).json( product )
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProducts = async (req, res) => {
    //   console.info(await mongoose.connection.db.listCollections().toArray());
    try {
        const products = await ProductModel.find();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProduct = async (req, res) => {
    console.info({ requestParams: req.params, requestQuery: req.query });
    const { id: productId } = req.params; // destructuring and renaming
    console.info(productId);
    try {
        const product = await ProductModel.findById(productId);
        console.info(product);
        if (!product) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await ProductModel.replaceOne(
            { _id: productId },
            req.body
        );
        console.info(result);
        res.json({ updatedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await ProductModel.deleteOne({ _id: productId });
        console.info(result);
        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
