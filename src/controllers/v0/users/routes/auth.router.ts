import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../../../config/config";

const router:Router = Router();

const generateJWT = (token: string): string => {
    return jwt.sign(token, config.jwt.secret);
}

const getKey = (key: string): boolean => {
    const keys = [config.keys];
    return keys.indexOf(`${key}`) < 0 ? false : true;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ auth: 'false', message: 'invalid authorization header.' });
    }
    
    const authorization = req.headers.authorization.split(' ');
    if(authorization.length != 2){
        return res.status(401).send({ auth: 'false', message: 'invalid token.' });
    }
    
    const token = authorization[1];

    return jwt.verify(token, config.jwt.secret, (err) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'failed to authenticate.' });
      }
      return next();
    });
}

router.post('/', (req: Request, res: Response) => {
    const { api_key } = req.body;
    if (!api_key) return res.status(400).send("invalid api key");

    const key = getKey(api_key);
    if (!key) return res.status(400).send("api key not found");

    const jwt = generateJWT(`${api_key}`);

    res.status(201).send({token: jwt});
});

export const AuthRouter:Router = router;