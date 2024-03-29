import { NextFunction, Request, Response } from "express";
import { verify }                          from "jsonwebtoken";
import {JWT_SECRET}                        from "../services/user/AuthUserService";

interface PayLoad{
    sub: string;
}

 export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
 ) {
    
    //Reeceber o token
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")
    
    try {
        //Validar esse token.
        const { sub } = verify(
            token,
            JWT_SECRET
           
        ) as PayLoad;
       //recuperar o id do tokem e colocar dentro de uma variável user.id dentro do req.
       
        req.user_id = sub;

        return next();

    } catch(err) {
        return res.status(401).end();
    }
 }
