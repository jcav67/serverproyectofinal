const {Router} = require('express');
const {check} = require('express-validator')
const { crearUsuario, logIn, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const router=Router();

//Crear un nuevo usuario
router.post('/new',
[
    check('nombre','Nombre obligatorio').notEmpty(),
    check('email','Email obligatorio').isEmail().normalizeEmail(),
    check('password','Contraseña obligatorio').isLength({min:6 , max:16}),
    validarCampos
]
,crearUsuario)

//log in
router.post('/login',
    [
        check('email','Email obligatorio').isEmail(),
        check('password','Email obligatorio').isLength({min:6 , max:16}),
        validarCampos
    ]
,logIn);

//validar y revalidar jwt
router.get('/renew',validarJWT,revalidarToken);


module.exports=router