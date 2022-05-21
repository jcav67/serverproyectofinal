const { response, json } = require("express")
const pool = require('../database')

const leerFormEconomico = async (req, res = response) => {
    const { minero } = req.query;
    const result = await pool.query('CALL leerFormEconomico(?)', [minero]);

    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            Economico: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            Economico: 'Datos no encontrados'
        });
    }
}

const leerFormSocial = async (req, res = response) => {
    const { minero } = req.query
    const result = await pool.query('CALL leerFormSocial(?)', [minero]);
    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            Social: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            Social: 'Datos no encontrados'
        });
    }
}

const leerFormMineroAmbiental = async (req, res = response) => {
    const { minero } = req.query
    const result = await pool.query('CALL leerFormMineroAmbiental(?)', [minero]);
    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            MineroAmbiental: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            MineroAmbiental: 'Datos no encontrados'
        });
    }
}

const leerFormTecnico = async (req, res = response) => {
    const { minero } = req.query
    console.log(minero)
    const result = await pool.query('CALL leerFormTecnico(?)', [minero]);
    
    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            Tecnico: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            Tecnico: 'Datos no encontrados'
        });
    }
}

const leerFormJuridico = async (req, res = response) => {
    const { minero } = req.query
    
    const result = await pool.query('CALL leerFormJuridico(?)', [minero]);
    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            Juridico: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            Juridico: 'Datos no encontrados'
        });
    }
}

const leerDatosMinero = async (req, res = response) => {
    const { minero } = req.query
    const result = await pool.query('CALL leerDatosMinero(?)', [minero]);
    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            DatosMinero: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            DatosMinero: 'Datos no encontrados'
        });
    }
}

const leerDatosfrmDocumentacion = async (req, res = response) => {
    const { minero } = req.query;
    const result = await pool.query('CALL leerDatosDocumentacion(?)', [minero]);
    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            Documentacion: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            Documentacion: 'Datos no encontrados'
        });
    }

}
const leerDatosRegistroMinero = async (req, res = response) => {
    const { id } = req.query

    const result = await pool.query('CALL leerRegistrosMineroId(?)', [id]);

    if (result[0].length != 0) {
        return res.status(200).json({
            ok: true,
            RegistroMinero: result[0]
        });
    } else {
        return res.status(404).json({
            ok: false,
            RegistroMinero: 'Datos no encontrados'
        });
    }
}

module.exports = {
    leerFormEconomico,
    leerFormSocial,
    leerFormMineroAmbiental,
    leerFormTecnico,
    leerFormJuridico,
    leerDatosMinero,
    leerDatosfrmDocumentacion,
    leerDatosRegistroMinero
}