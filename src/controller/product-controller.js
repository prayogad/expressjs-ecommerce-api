import productService from "../service/product-service.js";

const getAllProducts = async (req, res, next) => {
    try {
        const result = await productService.getAllProducts();
        res.status(200).json({
            success: true,
            message: "Success fetching all products in database",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const getDetailProduct = async (req, res, next) => {
    try {
        const product_id = req.params.id
        const result = await productService.getDetailProduct(Number(product_id));
        res.status(200).json({
            success: true,
            message: "Success fetching detail products in database",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const searchProduct = async (req, res, next) => {
    try {
        const result = await productService.searchProduct(req.body);
        res.status(200).json({
            success: true,
            message: "Success fetching products you are looking for!",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

export default {
    getAllProducts,
    getDetailProduct,
    searchProduct
}