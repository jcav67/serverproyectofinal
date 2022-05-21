const { response, json } = require("express");
const pool = require('../database');
var idMineroGlobal = null;

const eliminarRegistrosMinero = async (req, res = response) => {
    const { idregistro } = req.body;
    const result = await pool.query('CALL EliminarRegistrosMinero(?)', [idregistro], function (err, results, fields){
        if (err) {
            return res.status(404).json({
                ok: false,
                RegistroMinero: 'Error en la operacion solicitada'
            });
        } else {
            return res.status(200).json({
                ok: true,
                msg: 'Registro eliminado con exito'
            });
        }
    });    
}

module.exports = {
    eliminarRegistrosMinero
}