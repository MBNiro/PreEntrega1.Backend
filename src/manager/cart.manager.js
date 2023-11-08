import fs from "fs";
const pathFile = "/carts.json";

export const getMaxId = async () => {
  let maxId = 0;
  const carts = await getAllCarts();
  carts.map((crt) => {
    if (crt.id > maxId) maxId = crt.id;
  });
  return maxId;
};

export const createCart = async (obj) => {
  try {
    const cart = {
      id: (await getMaxId()) + 1,
      products: [],
    };
    const cartsFile = await getAllCarts();
    cartsFile.push(cart);
    await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCarts = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, "utf-8");
      const cartsJSON = JSON.parse(carts);
      return cartsJSON;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (id) => {
  try {
    const carts = await getAllCarts();
    const cart = carts.find((crt) => crt.id === id);
    if (cart) {
      return cart;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const saveProductToCart = async (idCart, idProd) => {
  try {
    const cart = await getCartById(idCart);
    if (cart) {
      const prodExistant = cart.products.find((p) => p.id === idProd);
      if (prodExistant) {
        prodExistant.quantity++;
        await fs.promises.writeFile(
          this.pathFile,
          JSON.stringify(await getAllCarts())
        );
        return cart;
      } else {
        cart.products.push({ id: idProd, quantity: 1 });
      }
    } else {
      console.log("No se encontró un carrito con Id");
    }
  } catch (error) {
    console.log(error);
  }
};