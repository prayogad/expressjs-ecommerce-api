import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { searchProductValidation } from "../validation/product-validation.js";

const getAllProducts = () => {
    return prismaClient.products.findMany({
        include: {
            pictures: true
        }
    });
};

const getDetailProduct = async (product_id) => {
    
    const product = await prismaClient.products.findFirst({
        where: {
            id: product_id
        },
        include: {
            pictures: true
        }
    });

    if(!product) {
        throw new ResponseError(404, "Product not found!")
    }

    return product;
}

const searchProduct = async (request) => {
    const productRequest = validate(searchProductValidation, request);

    // const serching = [];
    // serching.push({
    //     name: {
    //         contains: productRequest.name
    //     }
    // });

    const product = await prismaClient.products.findMany({
        where: {
            name: {
                contains: productRequest.name,
                mode: "insensitive"
            }
        },
        include: {
            pictures: true
        }
    });

    if (product.length < 1) {
        throw new ResponseError(404, "Product not found!")
    };

    return product

};

export default {
    getAllProducts,
    getDetailProduct,
    searchProduct
}