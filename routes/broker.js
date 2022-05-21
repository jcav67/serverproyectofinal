const { Router } = require('express');

const Insert = require('../controllers/broker.controllersInsert')
const Select = require('../controllers/broker.controllers')
const Delete = require('../controllers/broker.controllersDelete')
const pass = require('../controllers/password')

const router = Router()

router.get('/minero/economico', Select.leerFormEconomico)
router.get('/minero/social', Select.leerFormSocial)
router.get('/minero/ambiental', Select.leerFormMineroAmbiental)
router.get('/minero/tecnico', Select.leerFormTecnico)
router.get('/minero/juridico', Select.leerFormJuridico)
router.get('/minero/datosminero', Select.leerDatosMinero)
router.get('/minero/documentacion', Select.leerDatosfrmDocumentacion)
router.get('/minero/registrosMinero', Select.leerDatosRegistroMinero)

router.post('/minero/frmMinero', Insert.InsertarTblMinero)
router.post('/minero/frmSocial', Insert.InsertarTblSocial)
router.post('/minero/frmEconomico', Insert.InsertarTblEconomico)
router.post('/minero/frmMineroAmbiental', Insert.InsertarTblMineroAmbiental)
router.post('/minero/frmTecnico', Insert.InsertarTblTecnico)
router.post('/minero/frmJuridico', Insert.InsertarTblJuridico)
router.post('/minero/frmDocumentacion', Insert.InsertarTblDocumentacion)
router.post('/minero/frmRegistroMaterial', Insert.InsertarTblRegistros)

router.put('/minero/registros/eliminarRegistro', Delete.eliminarRegistrosMinero)


router.post('/reset-password', pass.reset)
router.post('/update-password', pass.update)

module.exports = router