import { prismaClient } from "../app/database.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.signedCookies['auth'];
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    } else {
        const user = await prismaClient.users.findFirst({
            where: {
                token: token
            }
        });

        if (!user) {
            const admin = await prismaClient.admin.findFirst({
                where: {
                    token: token
                }
            });

            if (!admin) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            } else {
                req.admin = admin.username
                next();
            }
        } else {
            req.user = user.username;
            next();
        }
    }
}