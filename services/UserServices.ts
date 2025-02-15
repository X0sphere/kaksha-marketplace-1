import client from "../config/redis";
import { Cart } from "../models/Cart";
const getRedisKey = (userId) => {
    return `cart:${userId}`;
}
// TODO: Store the cart in MongoDB
export const AddToCart = async (userId="111", productId, quantity, price, productName, productImage) => {
    try {
        await client.connect();
        const key = getRedisKey(userId);

        // Create a cart item
        const cartItem = {
            productId,
            quantity,
            price,
            productName,
            productImage
        };

        // Convert the cart item to a string
        const cartItemString = JSON.stringify(cartItem);

        // Store the cart item in Redis
        await client.lPush(key, cartItemString);
        console.log("Added to cart successfully");
        await client.quit();
       // console.log(key,cartItemString);
    } catch (e) {
        console.log(e);
    }
}