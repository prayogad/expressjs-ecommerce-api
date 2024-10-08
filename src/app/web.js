import express from "express";
import { publicRouter } from "../routes/public.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cookieParser from "cookie-parser";
import { privateRoute } from "../routes/private.js";
import expressFileUpload from "express-fileupload";
import dotenv from 'dotenv';

dotenv.config();

export const web = new express();
web.use(express.json());
web.use(cookieParser(process.env.COOKIE_PARSER_KEY))
web.use(expressFileUpload())

web.use(publicRouter);
web.use(privateRoute);

web.use(errorMiddleware)