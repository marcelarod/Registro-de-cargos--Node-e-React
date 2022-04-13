const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const CompanyPositionsCreate = require('../controllers/CompanyPositions/Create.CompanyPositions');
const CompanyPositionsSelect = require('../controllers/CompanyPositions/Select.CompanyPositions');
const CompanyPositionsDelete = require('../controllers/CompanyPositions/Delete.CompanyPositions');
const CompanyPositionsUpdate = require('../controllers/CompanyPositions/Update.CompanyPositions');

app.route('/companyPositions')
    .post([
            body('positionId').trim().notEmpty().withMessage('Id do cargo é obrigatório.'),
            body('employeeId').trim().notEmpty().withMessage('Id do funcionário é obrigatório.'),
        ], CompanyPositionsCreate)
      .get(CompanyPositionsSelect.getAllCompanyPositions)// todos os funcionario e seus cargos
      
app.route('/companyPositions/:id')
    .get(CompanyPositionsSelect.getCompanyPositionsById)// busco pelo id do funcionario e seu cargo
    .put([
        body('positionId').trim().notEmpty().withMessage('Id do cargo é obrigatório.'),
        body('employeeId').trim().notEmpty().withMessage('Id do funcionário é obrigatório.'),
    ], CompanyPositionsUpdate.UpdateCompanyPositions)
    .delete(CompanyPositionsDelete)// deleta o cargo do funcionario


module.exports = app;