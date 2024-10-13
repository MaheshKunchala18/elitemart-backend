import Product from '../Models/productModel.js';

// Create a new product
export const createProduct = async (req, res) => {
    const { name, imageUrl, originalPrice, discountPrice, rating, category, description } = req.body;

    try {
        const newProduct = new Product({
            name,
            imageUrl,
            originalPrice,
            discountPrice,
            rating,
            category,
            description
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).send('Error creating product');
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product');
    }
};

// Update product details
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, imageUrl, originalPrice, discountPrice, rating, category, description } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, imageUrl, originalPrice, discountPrice, rating, category, description },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Error updating product');
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
    }
};
