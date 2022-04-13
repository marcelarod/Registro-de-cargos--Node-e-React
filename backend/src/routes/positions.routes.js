const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const PositionsCreate = require('../controllers/Positions/Create.Positions');
const PositionsSelect = require('../controllers/Positions/Select.Positions');
const PositionsDelete = require('../controllers/Positions/Delete.Positions');
const PositionsUpdate = require('../controllers/Positions/Update.Positions');

app.route('/positions')
    .post([
            body('name').trim().notEmpty().withMessage('Nome é obrigatório.'),
          
        ], PositionsCreate)
      .get(PositionsSelect.getAllPositions)// todos os cargos
      
app.route('/positions/:id')
    .get(PositionsSelect.getPositionsById)// busco pelo id do cargo
    .put([
        body('name').trim().notEmpty().withMessage('Nome é obrigatório.'),   
    ], PositionsUpdate)
    .delete(PositionsDelete)// deleta o cargo


module.exports = app;