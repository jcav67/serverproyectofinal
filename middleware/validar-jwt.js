const { response } = require("express");
const jwt= require("jsonwebtoken")

const validarJWT=(req,resp=response,next)=>{
    const token= req.header('x-token');
    if(!token){
        return resp.status(401).json({
            ok:false,
            msg:'error en el token de llegada'
        })
    }
    try {        
        const {payload}=jwt.verify(token,process.env.SECRET_JWT_SEED)
        req.email=payload['usuario']
        
    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg:'error en la verificación del token'
        })
    }

    next()
}

module.exports={
    validarJWT
}