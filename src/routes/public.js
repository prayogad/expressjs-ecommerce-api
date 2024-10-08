import express from "express";
import adminController from "../controller/admin-controller.js";
import productController from "../controller/product-controller.js";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

// Admin
publicRouter.post("/admin/login", adminController.login);

// Products
publicRouter.get("/products", productController.getAllProducts);
publicRouter.get("/products/:id", productController.getDetailProduct);
publicRouter.get("/searchProduct", productController.searchProduct);

// Users
publicRouter.post("/register", userController.register);
publicRouter.post("/login", userController.login)

export {
    publicRouter
}