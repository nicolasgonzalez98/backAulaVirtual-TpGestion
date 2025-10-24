const express = require('express');
const router = express.Router();
const claseController = require('../controllers/claseController');

router.get('/curso/:idCurso', claseController.listarPorCurso);
router.get('/rango-fechas', claseController.listarPorRangoFechas);
router.get('/:id', claseController.obtenerPorId);
router.put('/:id', claseController.actualizar);
router.delete('/:id', claseController.eliminar);
router.post('/', claseController.crear);
router.get('/', claseController.listar);

module.exports = router;
