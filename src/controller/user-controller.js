import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            success: true,
            message: `Successfully registered as user, you can now login, wellcum ${result.username}`,
            data: result
        });
    } catch (e) {
        next(e)
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.cookie('auth', result.token, { path: '/', signed: true, expires: new Date(Date.now() + 90000) });
        res.status(200).json({
            success: true,
            message: `Login Successfully, welcum ${result.username}`,
            data: result
        });
    } catch (e) {
        next(e)
    }
};

const logout = async (req, res, next) => {
    try {
        const username = req.user;
        const result = await userService.logout(username);
        res.clearCookie('auth', { path: '/' });
        res.status(200).json({
            success: true,
            message: `Logout successfully, bye ${result.username}`
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user;
        const result = await userService.update(username, req.body);
        res.status(200).json({
            success: true,
            message: `Successfully updated account ingfo`,
            data: result
        });
    } catch (e) {
        next(e)
    }
};

const addToCart = async (req, res, next) => {
    try {
        const username = req.user;
        const product = req.params.productId;
        const result = await userService.addToCart(username, parseInt(product));

        res.status(200).json({
            success: true,
            message: 'Success',
            data: result
        });
    } catch (e) {
        next(e)
    }
};

const fetchCart = async (req, res, next) => {
    try {
        const username = req.user;
        const result = await userService.fetchCart(username);

        res.status(200).json({
            success: true,
            message: 'Success fetch cart data',
            data: result
        });
    } catch (e) {
        next(e)
    }
};

const updateCart = async (req, res, next) => {
    try {
        const username = req.user;
        const result = await userService.updateCart(username, req.body);

        res.status(200).json({
            success: true,
            message: 'Successfuly update cart data',
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const username = req.user;
        const productId = req.params.id;
        const result = await userService.deleteCart(username, Number(productId));

        res.status(200).json({
            success: true,
            message: 'Successfuly delete cart',
            data: result
        })
    } catch (e) {
        console.info(e)
        next(e)
    }
};

const addPayemnt = async (req, res, next) => {
    try {
        const username = req.user;
        const result = await userService.addPayemnt(username, req.body);

        res.status(200).json({
            success: true,
            message: "Sucess add payment",
            data: result
        })
    } catch (e) {
        next(e)
    }
};

const showPayment = async (req, res, next) => {
    try {
        const username = req.params.userId;
        const result = await userService.showPayment(username);

        res.status(200).json({
            success: true,
            message: "Succes fetch payment data",
            data: result
        })
    } catch (e) {
    next(e)        
    }
};

export default {
    register,
    update,
    login,
    logout,
    addToCart,
    fetchCart,
    updateCart,
    deleteCart,
    addPayemnt,
    showPayment
}