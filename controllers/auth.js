const { response } = require("express")
const { validationResult } = require("express-validator")
const { generarJwt } = require("../helpers/jwt")
const pool = require('../database')

//Para encriptar contraseña
const bcrypt = require("bcryptjs");

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre, apellido } = req.body;
    const passHash = await bcrypt.hash(password,10);
    try {
        const select = await pool.query('SELECT intIdUsuario FROM tblusuario where strEmail=?', [email])
        if (select.length != 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya está en uso.'
            });
        }
        await pool.query('INSERT INTO tblusuario SET strEmail=?,strContrasena=?,strNombre=?,strApellido=?',
        [email, passHash ,nombre,apellido], function(err,results,fields)  {
            if(err) {
                return res.status(500).json({
                    msg: "Fallo en la operacion",
                    ok: false,
                    err: err
                });
            }
            // Crear registro en la talba mienro, consultar el id y devolverlo, 
            pool.query('INSERT INTO tblminero SET intIdMunicipio=null,strTipoIdentificacion=null,strIdentificacion=null,strTipoPersona=null,strGenero=null,strNombre=?,strApellido=?,strEmail=?,strTelefono=null',
            [nombre,apellido,email],async(err,results,fields) => {
                const idMinero = results.insertId;
                const jwt = await generarJwt(email);
                return res.status(200).json({
                    ok: true,
                    email,
                    nombre: nombre+" "+apellido,
                    idMinero,
                    jwt: jwt,
                    msg: "Minero Registrado exitosamente"
                });
            });
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(
            {
                ok: false,
                msg: 'Error, contacte con el administrador'
            }
        )

    }
}

const logIn = async(req, res = response) => {

    const { email, password } = req.body
    try {
        let user = []
        user = await pool.query('SELECT strEmail, strContrasena, strTipoUsuario, strNombre, strApellido FROM tblusuario WHERE strEmail=?',[email]) 
        if(user[0] == undefined) {
            res.status(404).json({
                ok: false,
                msg: "Usuario o contraseña incorrecta"
            });
        }else{
            const dehash = bcrypt.compareSync(password, user[0].strContrasena)
            if(user.length == 0 || dehash == false){
                return res.status(400).json(
                    {
                        ok: false,
                        msg: 'Usuario o contraseña incorrecta',                             
                    }
                )
            }
        }
        //Consultar tabla minero
        const minero = await pool.query('SELECT * FROM tblminero WHERE strEmail=?',[email]);
        const jwt = await generarJwt(email);
        const {strEmail, strNombre, strApellido}=user[0];
        return res.json({
            ok: true,
            email: strEmail,
            nombre: strNombre+" "+strApellido,
            idMinero: minero[0].intIdMinero,
            Msg: "Autenticación exitosa",
            jwt
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json(
            {
                ok: false,
                msg: 'Error por favor contacte con el administrador',                             
            }
        )
    }    
}

const revalidarToken = async (req, res) => {
    const email= req.email
    const minero = await pool.query('SELECT * FROM tblusuario WHERE strEmail=?',[email]);
    const jwt = await generarJwt(email)
    return res.json({
        ok: true,
        email,
        nombre:minero[0].strNombre+ " "+ minero[0].strApellido,
        idMinero: minero[0].intIdMinero,
        jwt
    })
}
module.exports = {
    crearUsuario,
    logIn,
    revalidarToken
}