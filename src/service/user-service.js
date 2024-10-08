import { editUserValidation, loginUserValidation, paymentValidation, registerUserValidation, updateCartValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';

// Registering New User Account
const register = async (request) => {
    const registerRequest = validate(registerUserValidation, request);

    const totalUserInDatabase = await prismaClient.users.count({
        where: {
            OR: [
                {
                    username: registerRequest.username
                },
                {
                    email: registerRequest.email
                },
                {
                    phone: registerRequest.phone
                }
            ]
        }
    });

    if (totalUserInDatabase) {
        throw new ResponseError(400, "User already exist")
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    return prismaClient.users.create({
        data: registerRequest,
        select: {
            username: true,
            email: true
        }
    });
};

// Login User
const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const userInDatabase = await prismaClient.users.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!userInDatabase) {
        throw new ResponseError(401, "Username or password incorrect")
    };

    const passwordValidation = await bcrypt.compare(loginRequest.password, userInDatabase.password);

    if (!passwordValidation) {
        throw new ResponseError(401, "Username or password incorrect")
    };

    const token = uuid();
    return prismaClient.users.update({
        data: {
            token: token
        },
        where: {
            username: userInDatabase.username
        },
        select: {
            token: true,
            username: true
        }
    });

};

const logout = async (username) => {
    const user = await prismaClient.users.count({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "User not found")
    };

    return prismaClient.users.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    });
}

// Update User Account Information
const update = async (username, request) => {
    const updateRequest = validate(editUserValidation, request);

    const userInDatabase = await prismaClient.users.findUnique({
        where: {
            username: username
        }
    });

    if (!userInDatabase) {
        throw new ResponseError(404, "User not found thou")
    }


    return prismaClient.users.update({
        where: {
            username: username
        },
        data: {
            username: updateRequest.username,
            email: updateRequest.email,
            phone: updateRequest.phone,
            address: updateRequest.address
        },
        select: {
            username: true,
            email: true,
            phone: true,
            address: true
        }
    });
};

const addToCart = async (username, productId) => {
    const product = await prismaClient.products.count({
        where: {
            id: productId
        }
    });

    if (!product) {
        throw new ResponseError(404, "Product not found")
    };

    const productInCart = await prismaClient.carts.findFirst({
        where: {
            product_id: productId
        },
        select: {
            quantity: true
        }
    });

    if (productInCart) {
        return prismaClient.carts.update({
            where: {
                user_username_product_id: {
                    user_username: username,
                    product_id: productId
                }
            },
            data: {
                quantity: productInCart.quantity + 1
            },
            include: {
                products: true
            }
        })
    };

    return prismaClient.carts.create({
        data: {
            quantity: 1,
            user_username: username,
            product_id: productId
        },
        include: {
            users: true,
            products: true
        }
    });
};

const fetchCart = async (username) => {
    const cart = await prismaClient.carts.count({
        where: {
            user_username: username
        }
    });

    if (!cart) {
        throw new ResponseError(404, "Cart is empty")
    };

    return prismaClient.carts.findMany({
        where: {
            user_username: username
        },
        include: {
            products: true
        }
    });
};

const updateCart = async (username, request) => {
    const updateRequest = validate(updateCartValidation, request);

    const cart = await prismaClient.carts.findFirst({
        where: {
            AND: [
                {
                    user_username: username
                },
                {
                    product_id: updateRequest.product_id
                }
            ]
        }
    });

    if (!cart) {
        throw new ResponseError(404, "Product not found in cart")
    };

    return prismaClient.carts.update({
        where: {
            user_username_product_id: {
                user_username: username,
                product_id: updateRequest.product_id
            }
        },
        data: {
            quantity: updateRequest.quantity
        },
        include: {
            products: true
        }
    })
};

const deleteCart = async (username, productId) => {
    return prismaClient.carts.delete({
        where: {
            user_username_product_id: {
                user_username: username,
                product_id: productId
            }
        }
    });
}

const addPayemnt = async (username, request) => {
    const paymentRequest = validate(paymentValidation, request);

    const cart = await prismaClient.carts.findMany({
        where: {
            user_username: username
        },
        include: {
            products: true
        }
    });

    if (!cart) {
        throw new ResponseError(404, "Cart not found")
    };

    console.info(cart)

    let total = 0;
    const newCart = cart.map(product => {
        const obj = {
            product_id: product.products.id,
            quantity: product.quantity
        }
        const totalPerProduct = product.quantity * product.products.price
        total += totalPerProduct
        return obj;
    })

    return prismaClient.payment.create({
        data: {
            user_username: username,
            total_price: total,
            payment_status: "Menunggu Pembayaran",
            shipment_status: "Proses Verifikasi",
            expedition: paymentRequest.expedition,
            detailPayment: {
                createMany: {
                    data: newCart
                }
            }
        }
    })
};

const showPayment = async (username) => {
    return prismaClient.payment.findMany({
        where: {
            user_username: username
        },
        include: {
            detailPayment: true
        }
    })
}

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