export const productValidator = (req, res, next) => {
    const product = req.body;
    
    if (
      product.price === "" ||
      product.price === undefined ||
      typeof product.price !== "number"
    ) {
      res.status(404).send("error");
    } else {
      next();
    }
  };