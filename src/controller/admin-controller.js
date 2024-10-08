import adminService from "../service/admin-service.js";

const login = async (req, res, next) => {
    try {
        const result = await adminService.login(req.body);
        res.cookie('auth', result.token, { path: '/', signed: true, expires: new Date(Date.now() + 90000) });
        res.status(200).json({
            success: true,
            message: `Successfully login as admin`,
            data: result
        });
    } catch (e) {
        next(e)
    };
};

const logout = async (req, res, next) => {
    try {
        const result = await adminService.logout(req.admin)
        res.clearCookie('auth', { path: '/' });
        res.status(200).json({
            success: true,
            message: `Success logout admin, bye ${result.username}`
        })
    } catch (e) {
        next(e)
    }
};

const addProduct = async (req, res, next) => {
    try {
        const picture = req.files.files;

        const result = await adminService.addProduct(req.body, picture);
        res.status(200).json({
            success: true,
            message: "Add Product Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id

        const result = await adminService.updateProduct(Number(productId), req.body);
        res.status(200).json({
            success: true,
            message: "Update Product Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id

        const result = await adminService.deleteProduct(Number(productId), req.body);
        res.status(200).json({
            success: true,
            message: "Deleted Product Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const confirmPayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        const result = await adminService.confirmPayemnt(Number(paymentId), req.body);

        res.status(200).json({
            success: true,
            message: "Success update payment",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    login,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    confirmPayment
}