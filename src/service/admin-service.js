import { addProductValidation, confirmPaymentValidation, loginAdminValidation, logoutAdminValidation, updateProductValidation } from "../validation/admin-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const login = async (request) => {
    const loginRequest = validate(loginAdminValidation, request);

    const admin = await prismaClient.admin.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!admin) {
        throw new ResponseError(401, "Username or Password Does Not Match!")
    };

    const isPasswordValid = loginRequest.password = admin.password;
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or Password Does Not Match!")
    };

    const token = uuid();
    return prismaClient.admin.update({
        data: {
            token: token
        },
        where: {
            username: admin.username
        },
        select: {
            token: true,
            username: true
        }
    });

};

const logout = async (username) => {
    username = validate(logoutAdminValidation, username)

    const admin = await prismaClient.admin.findUnique({
        where: {
            username: username
        }
    });

    if (!admin) {
        throw new ResponseError(404, "Admin not found in databases")
    };

    return prismaClient.admin.update({
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
};

const addProduct = async (request, files) => {
    const productRequest = validate(addProductValidation, request);

    const imagePaths = [];

    if (!Array.isArray(files)) {
        files = [files];
    };

    // Image destination
    for (const file of files) {
        const tanggal = Date.now();
        const imageName = `${tanggal}_${file.name}`
        const imagePath = __dirname + "/../assets/" + imageName

        await file.mv(imagePath);
        imagePaths.push({ picture_url: imagePath });
    }

    const product = await prismaClient.products.create({
        data: {
            name: productRequest.name,
            description: productRequest.description,
            price: productRequest.price,
            pictures: {
                createMany: {
                    data: imagePaths
                }
            }
        },
        include: {
            pictures: true
        }
    });

    if (!product) {
        throw new ResponseError(400, "Product Failed to Add, try again later plsss!!")
    }

    return product
};

const updateProduct = async (product_id, request) => {
    const productRequest = validate(updateProductValidation, request);

    const totalProductInDatabase = await prismaClient.products.count({
        where: {
            id: product_id
        }
    });

    if (!totalProductInDatabase) {
        throw new ResponseError(404, "Product not found in database")
    };

    return prismaClient.products.update({
        where: {
            id: product_id
        },
        data: {
            name: productRequest.name,
            description: productRequest.description,
            price: productRequest.price
        }
    })
};

const deleteProduct = async (product_id) => {
    const totalProductInDatabase = await prismaClient.products.count({
        where: {
            id: product_id
        }
    });

    if (!totalProductInDatabase) {
        throw new ResponseError(404, "Product not found in database")
    };

    const [pictures, product] = await prismaClient.$transaction([
        prismaClient.products.update({
            where: {
                id: product_id
            },
            data: {
                pictures: {
                    deleteMany: {}
                }
            },
            include: {
                pictures: true
            }
        }),
        prismaClient.products.delete({
            where: {
                id: product_id
            }
        })
    ]);

    return product;
};

const confirmPayemnt = async (idPayment, request) => {
    const confirmRequest = validate(confirmPaymentValidation, request)

    return prismaClient.payment.update({
        data: {
            payment_status: confirmRequest.paymentStatus,
            shipment_status: confirmRequest.shipment_status
        },
        where: {
            id: idPayment
        }
    })
} 

export default {
    login,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    confirmPayemnt
}