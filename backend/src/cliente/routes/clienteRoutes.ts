import express from 'express';
import * as clienteController from '../controllers/clienteController';


const router = express.Router();

router.post('/cliente', clienteController.Salvar);
router.get('/cliente', clienteController.Listar);
router.get('/cliente/rotas', clienteController.Rotas);
router.get('/cliente/:id', clienteController.Consultar);
router.put('/cliente/:id', clienteController.Atualizar);
router.delete('/cliente/:id', clienteController.Excluir);
export default router;