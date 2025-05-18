import Order from '../Models/orderModel.js';

export const addOrder = async (req, res) => {
    const { userId, items } = req.body; // Now 'items' is an array

    try {
        // Find if an order already exists for the user
        let userOrder = await Order.findOne({ userId });

        if (userOrder) {
            // If the order exists, push the new items to the items array
            userOrder.items.push(...items); // Spread the items array to push multiple items
        } else {
            // If no order exists, create a new order with the items array
            userOrder = new Order({
                userId,
                items // No need to wrap in an array, it's already an array
            });
        }

        // Save the updated or new order
        const savedOrder = await userOrder.save();
        res.status(201).json({ message: 'Order updated/added successfully', order: savedOrder });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ message: 'Error adding order' });
    }
};




export const getOrdersByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.findOne({ userId }).populate('items.productId');
        if (orders) {
            res.status(200).json(orders.items);
        } else {
            res.status(200).json({ message: 'No orders found for this user', items: [] });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};