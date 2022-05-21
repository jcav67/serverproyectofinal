const { response, json } = require("express");
const pool = require("../database");

//InsertarTblMinero
const InsertarTblMinero = async (req, resp = response) => {
  //Que mande el id en el request.body
  const {
    intIdminero,
    strNombre,
    strApellido,
    strEmail,
    strTelefono,
    strTipoIdentificacion,
    strIdentificacion,
    strGenero,
    strTipoPersona,
  } = req.body;
  try {
    await pool.query(
      "UPDATE tblminero SET strNombre=?,strApellido=?,strEmail=?,strTipoIdentificacion=?,strIdentificacion=?,strTipoPersona=?,strGenero=?,strTelefono=? WHERE intIdMinero=?",
      [
        strNombre,
        strApellido,
        strEmail,
        strTipoIdentificacion,
        strIdentificacion,
        strTipoPersona,
        strGenero,
        strTelefono,
        intIdminero,
      ],
      function (err, results, fields) {
        if (err) {
          resp.status(400).json({ msg: "Fallo en la operación", ok: false });
        }
        resp
          .status(200)
          .json({ msg: "Formulario Minero agregado con exito", ok: true });
        //idMineroGlobal = intIdminero;
      }
    );
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblEconomico
const InsertarTblEconomico = async (req, resp = response) => {
  const {
    intIdminero,
    intAnosMinero,
    intLaborames,
    fltIngresoMensual,
    intGrupoFamiliar,
    intCompraVenta,
    strLugarVenta,
  } = req.body;
  try {
    const select = await pool.query(
      "SELECT intIdForEconomico FROM tblEconomico WHERE intIdMinero=?",
      [intIdminero]
    );
    if (select.length > 0) {
      pool.query(
        "UPDATE tbleconomico SET intAnosMinero=?,intLaborames=?,fltIngresoMensual=?,intGrupoFamiliar=?,intCompraVenta=?,strLugarVenta=? WHERE intIdminero=?",
        [
          intAnosMinero,
          intLaborames,
          fltIngresoMensual,
          intGrupoFamiliar,
          intCompraVenta,
          strLugarVenta,
          intIdminero,
        ],
        async function (err, results, fields) {
          if (err) {
            console.log(err);
            resp.status(400).json({
              msg: "Fallo en la operación Actualizar",
              ok: false,
            });
          } else {
            resp.status(200).json({
              msg: "Formulario Económico Modificado con exito",
              ok: true,
            });
          }
        }
      );
    } else {
      if (select.length <= 0) {
        await pool.query(
          "INSERT INTO tblEconomico SET intAnosMinero=?,intLaborames=?,fltIngresoMensual=?,intGrupoFamiliar=?,intCompraVenta=?,strLugarVenta=?",
          [
            intAnosMinero,
            intLaborames,
            fltIngresoMensual,
            intGrupoFamiliar,
            intCompraVenta,
            strLugarVenta,
          ],
          async (err, results, fields) => {
            if (err) {
              console.log(err);
              resp.status(400).json({
                msg: "Fallo en la operación de inserción",
                ok: false,
              });
            } else {
              const idEconomico = results.insertId;
              const idMinero = intIdminero;
              await pool.query(
                "CALL AsignarFormularioEconomico(?,?)",
                [idEconomico, idMinero],
                function (err, results, fields) {
                  if (err) {
                    resp
                      .status(400)
                      .json({ msg: "Fallo en la operación", ok: false });
                  } else {
                    return resp.status(200).json({
                      msg: "Formulario Economico agregado con exito",
                      ok: true,
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        return resp.status(400).json({
          msg: "No se pudo modificar el registro",
          ok: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblSocial
const InsertarTblSocial = async (req, resp = response) => {
  const {
    intIdminero,
    strGradoEscolaridad,
    strEstadoCivil,
    strTipoVivienda,
    intLeescribir,
    strAfiliacion,
    strNombreAsociacion,
  } = req.body;
  try {
    const select = await pool.query(
      "SELECT intIdSocial FROM tblsocial WHERE intIdMinero=?",
      [intIdminero]
      );
      if (select.length > 0) {
      pool.query(
        "UPDATE tblsocial SET strGradoEscolaridad=?,strEstadoCivil=?,strTipoVivienda=?,intLeescribir=?,strAfiliacion=?,strNombreAsociacion=? WHERE intIdminero=?",
        [
          strGradoEscolaridad,
          strEstadoCivil,
          strTipoVivienda,
          intLeescribir,
          strAfiliacion,
          strNombreAsociacion,
          intIdminero,
        ],
        async function (err, results, fields) {
          if (err) {
            resp.status(400).json({
              msg: "Fallo en la operación de modificación",
              ok: false,
            });
          } else {
            resp.status(200).json({
              msg: "Formulario Social Modificado con exito",
              ok: true,
            });
          }
        }
      );
    } else {
      if (select.length <= 0) {
        await pool.query(
          "INSERT INTO tblSocial SET strGradoEscolaridad=?,strEstadoCivil=?,strTipoVivienda=?,intLeescribir=?,strAfiliacion=?,strNombreAsociacion=?",
          [
            strGradoEscolaridad,
            strEstadoCivil,
            strTipoVivienda,
            intLeescribir,
            strAfiliacion,
            strNombreAsociacion,
          ],
          function (err, results, fields) {
            if (err) {
              resp.status(400).json({
                msg: "Fallo en la operacion",
                ok: false,
              });
            }
            const idSocial = results.insertId;
            const idMinero = intIdminero;
            pool.query(
              "CALL AsignarFormularioSocial(?,?)",
              [idSocial, idMinero],
              function (err, results, fields) {
                if (err) {
                  resp.status(400).json({
                    msg: "Fallo en la operacion de asignación",
                    ok: false,
                  });
                } else {
                  return resp.status(200).json({
                    msg: "Formulario Social agregado con exito",
                    ok: true,
                  });
                }
              }
            );
          }
        );
      } else {
        return resp.status(400).json({
          msg: "No se pudo modificar el registro",
          ok: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblMineroAmbiental
const InsertarTblMineroAmbiental = async function (req, resp = response) {
  const {
    intIdminero,
    strCapSeguridadSalud,
    intCapssRespuesta,
    strCaptecnologia,
    intCaptecRespuesta,
    strCapOng,
  } = req.body;

  try {
    const select = await pool.query(
      "SELECT intIdForMineroAmbiental FROM tblmineroambiental WHERE intIdMinero = ?",
      [intIdminero]
    );
    if (select.length > 0) {
      pool.query(
        "UPDATE tblmineroambiental SET strCapSeguridadSalud=?,strCapssRespuesta=?,strCaptecnologia=?,intCaptecRespuesta=?,strCapOng=? WHERE intIdMinero=?",
        [
          strCapSeguridadSalud,
          intCapssRespuesta,
          strCaptecnologia,
          intCaptecRespuesta,
          strCapOng,
          intIdminero,
        ],
        async function (err, results, fields) {
          if (err) {
            console.log(err);
            resp.status(400).json({
              msg: "Fallo en la operación",
              ok: false,
            });
          } else {
            resp.status(200).json({
              msg: "Formulario Mineroambiental Modificado con exito",
              ok: true,
            });
          }
        }
      );
    } else {
      if (select.length <= 0) {
        await pool.query(
          "INSERT INTO tblMineroAmbiental SET strCapSeguridadSalud=?,strCapssRespuesta=?,strCaptecnologia=?,intCaptecRespuesta=?,strCapOng=?",
          [
            strCapSeguridadSalud,
            intCapssRespuesta,
            strCaptecnologia,
            intCaptecRespuesta,
            strCapOng,
          ],
          function (err, results, fields) {
            if (err) {
              resp
                .status(400)
                .json({ msg: "Fallo en la operacion", ok: false, error: err });
            }
            const idminAmb = results.insertId;
            const idMinero = intIdminero;
            pool.query(
              "CALL AsignarFormularioMineroAmbiental(?,?)",
              [idminAmb, idMinero],
              function (err, results, fields) {
                if (err) {
                  return resp.status(400).json({
                    msg: "Fallo en la operacion de asignación",
                    ok: false,
                  });
                } else {
                  return resp.status(200).json({
                    msg: "Formulario Mineroambiental agregado con exito",
                    ok: true,
                  });
                }
              }
            );
          }
        );
      } else {
        return resp.status(400).json({
          msg: "No se pudo modificar el registro",
          ok: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblTecnico
const InsertarTblTecnico = async function (req, resp = response) {
  const {
    intIdminero,
    intTipoMineroBarequero,
    intTipoMineroChatarrero,
    intTipoMineroOtro,
    intTipoMetalOro,
    intTipoMetalPlata,
    intTipoMetalPlatino,
    intTipoMaterialArenaGrava,
    intTipoMaterialArcilla,
    intTipoPiedraPreciosaEsmeralda,
    intTipoPiedraPreciosaMorallas,
    intTipoOtro,
    intProdMensual,
  } = req.body;
  try {
    const select = await pool.query(
      "SELECT intIdForTecnico FROM tbltecnico WHERE intIdMinero = ?",
      [intIdminero]
    );
    if (select.length > 0) {
      await pool.query(
        "UPDATE tbltecnico SET intTipoMineroBarequero=?,intTipoMineroChatarrero=?,intTipoMineroOtro=?,intTipoMetalOro=?,intTipoMetalPlata=?,intTipoMetalPlatino=?,intTipoMaterialArenaGrava=?,intTipoMaterialArcilla=?,intTipoPiedraPreciosaEsmeralda=?,intTipoPiedraPreciosaMorallas=?,intTipoOtro=?,intProdMensual=? WHERE intIdMinero=?",
        [
          intTipoMineroBarequero,
          intTipoMineroChatarrero,
          intTipoMineroOtro,
          intTipoMetalOro,
          intTipoMetalPlata,
          intTipoMetalPlatino,
          intTipoMaterialArenaGrava,
          intTipoMaterialArcilla,
          intTipoPiedraPreciosaEsmeralda,
          intTipoPiedraPreciosaMorallas,
          intTipoOtro,
          intProdMensual,
          intIdminero,
        ],
        async function (err, results, fields) {
          if (err) {
            console.log(err)
            resp.status(400).json({
              msg: "Fallo en la operación",
              ok: false,
            });
          } else {
            resp.status(200).json({
              msg: "Formulario Tecnico Modificado con exito",
              ok: true,
            });
          }
        }
      );
    } else {
      if (select.length <= 0) {
        await pool.query(
          "INSERT INTO tbltecnico SET intTipoMineroBarequero=?,intTipoMineroChatarrero=?,intTipoMineroOtro=?,intTipoMetalOro=?,intTipoMetalPlata=?,intTipoMetalPlatino=?,intTipoMaterialArenaGrava=?,intTipoMaterialArcilla=?,intTipoPiedraPreciosaEsmeralda=?,intTipoPiedraPreciosaMorallas=?,intTipoOtro=?,intProdMensual=?",
          [
            intTipoMineroBarequero,
            intTipoMineroChatarrero,
            intTipoMineroOtro,
            intTipoMetalOro,
            intTipoMetalPlata,
            intTipoMetalPlatino,
            intTipoMaterialArenaGrava,
            intTipoMaterialArcilla,
            intTipoPiedraPreciosaEsmeralda,
            intTipoPiedraPreciosaMorallas,
            intTipoOtro,
            intProdMensual,
          ],
          function (err, results, fields) {
            if (err) {
              console.log(err)
              resp
                .status(400)
                .json({ msg: "Fallo en la operación", ok: false });
            }
            const idTecnico = results.insertId;
            const idMinero = intIdminero;
            pool.query(
              "CALL AsignarFormularioTecnico(?,?)",
              [idTecnico, idMinero],
              function (err, results, fields) {
                if (err) {
                  return resp.status(400).json({
                    msg: "Fallo en la operación de asignación",
                    ok: false,
                  });
                } else {
                  return resp.status(200).json({
                    msg: "Formulario Tecnico agregado con exito",
                    ok: true,
                  });
                }
              }
            );
          }
        );
      } else {
        return resp.status(400).json({
          msg: "No se pudo modificar el registro",
          ok: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblJuridico
const InsertarTblJuridico = async function (req, resp = response) {
  const {
    intIdminero,
    strTrabajoPropPub,
    strTrabajoPropPubSi,
    strPropEst,
    strPropEstSi,
    strComNegra,
    strComNegraSi,
    strAreaProhibida,
    strAreaProhibidaSi,
    strVecino,
    strNoVecino,
    strGrupoSocial,
    strGrupoSocialSi,
  } = req.body;
  try {
    const select = await pool.query(
      "SELECT intIdForJuridico FROM tbljuridico WHERE intIdMinero=?",
      [intIdminero]
    );
    if (select.length > 0) {
      pool.query(
        "UPDATE tbljuridico SET strTrabajoPropPub=?,strTrabajoPropPubSi=?,strPropEst=?,strPropEstSi=?,strComNegra=?,strComNegraSi=?,strAreaProhibida=?,strAreaProhibidaSi=?,strVecino=?,strNoVecino=?,strGrupoSocial=?,strGrupoSocialSi=? WHERE intIdMinero=?",
        [
          strTrabajoPropPub,
          strTrabajoPropPubSi,
          strPropEst,
          strPropEstSi,
          strComNegra,
          strComNegraSi,
          strAreaProhibida,
          strAreaProhibidaSi,
          strVecino,
          strNoVecino,
          strGrupoSocial,
          strGrupoSocialSi,
          intIdminero,
        ],
        async function (err, results, fields) {
          if (err) {
            console.log(err);
            resp.status(400).json({
              msg: "Fallo en la operación",
              ok: false,
            });
          } else {
            resp.status(200).json({
              msg: "Formulario Jurídico Modificado con exito",
              ok: true,
            });
          }
        }
      );
    } else {
      if (select.length <= 0) {
        pool.query(
          "INSERT INTO tbljuridico SET strTrabajoPropPub=?,strTrabajoPropPubSi=?,strPropEst=?,strPropEstSi=?,strComNegra=?,strComNegraSi=?,strAreaProhibida=?,strAreaProhibidaSi=?,strVecino=?,strNoVecino=?,strGrupoSocial=?,strGrupoSocialSi=?",
          [
            strTrabajoPropPub,
            strTrabajoPropPubSi,
            strPropEst,
            strPropEstSi,
            strComNegra,
            strComNegraSi,
            strAreaProhibida,
            strAreaProhibidaSi,
            strVecino,
            strNoVecino,
            strGrupoSocial,
            strGrupoSocialSi,
          ],
          function (err, results, fields) {
            if (err) {
              console.log(err);
              resp
                .status(400)
                .json({ msg: "Fallo en la operación", ok: false });
            }
            const idJuridico = results.insertId;
            const idMinero = intIdminero;

            pool.query(
              "CALL AsignarFormularioJuridico(?,?)",
              [idJuridico, idMinero],
              function (err, results, fields) {
                if (err) {
                  return resp.status(400).json({
                    ok: false,
                    msg: "Fallo en la operación de asignación",
                  });
                } else {
                  return resp.status(200).json({
                    ok: true,
                    msg: "Formulario Jurídico agregado con exito",
                  });
                }
              }
            );
          }
        );
      } else {
        return resp.status(400).json({
          msg: "No se pudo modificar el registro",
          ok: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblDocumentacion
const InsertarTblDocumentacion = async function (req, resp = response) {
  const {
    intIdminero,
    intRut,
    intSisben,
    intRucom,
    intOrigenMineral,
    intCapacitaciones,
    intOtro,
    intNinguna,
  } = req.body;
  try {
    const select = await pool.query(
      "SELECT intIdDocumentacion FROM tbldocumentacion WHERE intIdMinero=?",
      [intIdminero]
    );
    if (select.length > 0) {
      pool.query(
        "UPDATE tbldocumentacion SET intRut=?,intSisben=?,intRucom=?,intOrigenMineral=?,intCapacitaciones=?,intOtro=?,intNinguna=? WHERE intIdMinero=?",
        [
          intRut,
          intSisben,
          intRucom,
          intOrigenMineral,
          intCapacitaciones,
          intOtro,
          intNinguna,
          intIdminero,
        ],
        async function (err, results, fields) {
          if (err) {
            resp.status(400).json({
              err: err,
              msg: "Fallo en la operación",
              ok: false,
            });
          } else {
            resp.status(200).json({
              msg: "Formulario Documentación Modificado con exito",
              ok: true,
            });
          }
        }
      );
    } else {
      if (select.length <= 0) {
        await pool.query(
          "INSERT INTO tbldocumentacion SET intRut=?,intSisben=?,intRucom=?,intOrigenMineral=?,intCapacitaciones=?,intOtro=?,intNinguna=?",
          [
            intRut,
            intSisben,
            intRucom,
            intOrigenMineral,
            intCapacitaciones,
            intOtro,
            intNinguna,
          ],
          function (err, results, fields) {
            if (err) {
              resp
                .status(400)
                .json({ msg: "Fallo en la operación", ok: false });
            }
            const idDocumentos = results.insertId;
            const idMinero = intIdminero;

            pool.query(
              "CALL AsignarFormularioDocumentacion(?,?)",
              [idDocumentos, idMinero],
              function (err, results, fields) {
                if (err) {
                  return resp.status(400).json({
                    ok: false,
                    msg: "Fallo en la operación de asignación",
                  });
                } else {
                  return resp.status(200).json({
                    ok: true,
                    msg: "Formulario Documentacion agregado con exito",
                  });
                }
              }
            );
          }
        );
      } else {
        return resp.status(400).json({
          msg: "No se pudo modificar el registro",
          ok: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

//InsertarTblRegistros
const InsertarTblRegistros = async function (req, resp = response) {
  const {
    strUnidadMedida,
    strMaterialRecolectado,
    fltCantidadRecolectada,
    fechaRecoleccion,
    IdMinero,
  } = req.body;
  try {
    await pool.query(
      "INSERT INTO tblregistrominero SET strUnidadMedida=?,strMaterialRecolectado=?,fltCantidadRecolectada=?,strFechaRecoleccion=?,intIdMinero=?",
      [
        strUnidadMedida,
        strMaterialRecolectado,
        fltCantidadRecolectada,
        fechaRecoleccion,
        IdMinero,
      ],
      function (err, results, fields) {
        if (err) {
          console.error(err);
          return resp
            .status(400)
            .json({ msg: "Fallo en la operación", ok: false });
        } else {
          resp
            .status(200)
            .json({ msg: "Información registrada con exito", ok: true });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return resp
      .status(500)
      .json({ ok: false, msg: "Error, contacte con el administrador" });
  }
};

module.exports = {
  InsertarTblMinero,
  InsertarTblEconomico,
  InsertarTblSocial,
  InsertarTblMineroAmbiental,
  InsertarTblTecnico,
  InsertarTblJuridico,
  InsertarTblDocumentacion,
  InsertarTblRegistros,
};
