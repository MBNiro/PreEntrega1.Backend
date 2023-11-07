import { Router } from "express";
const router = Router();
import {
  createProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
  getAllProducts,
  getProductById,
} from "../manager/products.manager.js";

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const product = req.body;
    const newProduct = await createProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    let limitValue = products.length;

    if (req.query.limit) {
    
      limitValue = parseInt(req.query.limit);
    }

    const limitedProducts = products.slice(0, limitValue);
    res.status(200).json(limitedProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).send("product not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = req.body;
    const { id } = req.params;
    const productFile = await getProductById(Number(id));
    if (productFile) {
      await updateProduct(product, Number(id));
      res.send(`product updated successfully!`);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getAllProducts();
    if (products.length > 0) {
      await deleteProductById(Number(id));
      res.send(`product id: ${id} deleted successfully`);
    } else {
      res.send(`product id: ${id} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


export default router;