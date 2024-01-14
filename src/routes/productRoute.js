import express from "express";
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../components/productComponent.js";
import productConfig from "../configs/productConfig.json" assert { type: "json" };

const router = express.Router();
const routeName = productConfig.routeName;
const routeStructure = productConfig.routeStructure;

router.get("/", async (req, res) => {
    res.send(`Welcome to ${routeStructure}`);
});

router.get(`${routeStructure}`, getProducts);
router.get(`${routeStructure}/:id`, getProduct); // using a different path(query parameter) instead of query string as for query string it has to be handled in the same getProducts fn.
router.post(`${routeStructure}`, createProduct);
router.put(`${routeStructure}/:id`, updateProduct);
router.delete(`${routeStructure}/:id`, deleteProduct);

// Export the router
export default router;
