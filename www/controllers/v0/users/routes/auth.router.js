"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.authenticate = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../../config/config");
const router = (0, express_1.Router)();
const generateJWT = (token) => {
    return jsonwebtoken_1.default.sign(token, config_1.config.jwt.secret);
};
const getKey = (key) => {
    const keys = [config_1.config.keys];
    return keys.indexOf(`${key}`) < 0 ? false : true;
};
const authenticate = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ auth: 'false', message: 'invalid authorization header.' });
    }
    const authorization = req.headers.authorization.split(' ');
    if (authorization.length != 2) {
        return res.status(401).send({ auth: 'false', message: 'invalid token.' });
    }
    const token = authorization[1];
    return jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret, (err) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'failed to authenticate.' });
        }
        return next();
    });
};
exports.authenticate = authenticate;
router.post('/', (req, res) => {
    const { api_key } = req.body;
    if (!api_key)
        return res.status(400).send("invalid api key");
    const key = getKey(api_key);
    if (!key)
        return res.status(400).send("api key not found");
    const jwt = generateJWT(`${api_key}`);
    res.status(201).send({ token: jwt });
});
exports.AuthRouter = router;
//# sourceMappingURL=auth.router.js.map