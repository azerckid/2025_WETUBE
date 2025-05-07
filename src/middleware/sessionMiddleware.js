import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionMiddleware = (req, res, next) => {
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })(req, res, next);
};