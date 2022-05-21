const jwt= require('jsonwebtoken')

const generarJwt=(usuario)=>{

    const payload={
        msg:"usuario autorizado",
        usuario}

    return new Promise( (resolve,reject) =>{
        jwt.sign({payload},process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                resolve(token) 
            }
        })
    })    
}

const generarJwtEmail=(usuario)=>{

    const payload="usuario autorizado"+usuario

    return new Promise( (resolve,reject) =>{
        jwt.sign({payload},process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                resolve(token) 
            }
        })
    })    
}




module.exports={
    generarJwt,
    generarJwtEmail
}