import Wishlist from '../Models/wishlistModel.js';

// Add product to wishlist
export const addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [productId] });
        } else {
            // Avoid duplicates
            if (!wishlist.items.some(id => id.toString() === productId)) {
                wishlist.items.push(productId);
            }
        }
        const savedWishlist = await wishlist.save();
        res.status(200).json({ message: 'Wishlist updated successfully', wishlist: savedWishlist });
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        res.status(500).json({ message: 'Error updating wishlist' });
    }
};

// Get wishlist by userId
export const getWishlistByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const wishlist = await Wishlist.findOne({ userId }).populate('items');
        if (!wishlist) {
            // Return an empty wishlist object so the client can handle gracefully
            return res.status(200).json({ message: 'Wishlist is empty', items: [] });
        }
        res.status(200).json(wishlist);
    } catch (err) {
        console.error('Error fetching wishlist:', err);
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        wishlist.items = wishlist.items.filter(id => id.toString() !== productId);
        const updatedWishlist = await wishlist.save();
        res.status(200).json({ message: 'Item removed from wishlist', wishlist: updatedWishlist });
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        res.status(500).json({ message: 'Error removing item' });
    }
};

// Clear wishlist
export const clearWishlist = async (req, res) => {
    const { userId } = req.body;
    try {
        await Wishlist.deleteOne({ userId });
        res.status(200).json({ message: 'Wishlist cleared' });
    } catch (err) {
        console.error('Error clearing wishlist:', err);
        res.status(500).json({ message: 'Error clearing wishlist' });
    }
}; 