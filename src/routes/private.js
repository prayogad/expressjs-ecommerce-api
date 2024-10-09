import express from "express";
import adminController from "../controller/admin-controller.js";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRoute = new express.Router();

privateRoute.use(authMiddleware);

// Admin
privateRoute.post("/admin/logout", adminController.logout);
privateRoute.post("/admin/addProduct", adminController.addProduct);
privateRoute.put("/admin/updateProduct/:id", adminController.updateProduct);
privateRoute.delete("/admin/deleteProduct/:id", adminController.deleteProduct);
privateRoute.put("/admin/confirmPayment/:id", adminController.confirmPayment);

// User
privateRoute.post("/logout", userController.logout);
privateRoute.put("/update", userController.update);
privateRoute.post("/addCart/:productId", userController.addToCart);
privateRoute.get("/fetchCart", userController.fetchCart);
privateRoute.put("/updateCart", userController.updateCart);
privateRoute.delete("/deleteCart/:id", userController.deleteCart);
privateRoute.post("/addPayment", userController.addPayemnt);
privateRoute.get("/showPayment/:userId", userController.showPayment);

export {
    privateRoute
}