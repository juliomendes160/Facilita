import express from 'express';
import * as clienteController from '../controllers/clienteController';


const router = express.Router();
router.post('/cliente/salvar', clienteController.Salvar);
router.get('/cliente/listar', clienteController.Listar);
router.get('/cliente/filtrar', clienteController.Filtrar);
router.get('/cliente/rotas', clienteController.Rotas);
router.get('/cliente/consultar/:id', clienteController.Consultar);
router.put('/cliente/atualizar', clienteController.Atualizar);
router.delete('/cliente/excluir/:id', clienteController.Excluir);
export default router;