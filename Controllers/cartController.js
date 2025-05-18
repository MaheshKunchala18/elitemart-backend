import Cart from '../Models/cartModel.js';

// Add items to cart
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create a new cart if not found
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            // Check if product already exists in the cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // Update quantity if product is already in cart
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.items.push({ productId, quantity });
            }
        }

        const updatedCart = await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating cart' });
    }
};

// Get cart by userId
export const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(200).json({ message: 'Cart is empty', items: [] });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving cart' });
    }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        const updatedCart = await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart: updatedCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
};

// Clear the cart
export const clearCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Delete the cart document for the user
        await Cart.deleteOne({ userId });

        res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error clearing cart' });
    }
};

