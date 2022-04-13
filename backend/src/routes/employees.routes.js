const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const EmployeesCreate = require('../controllers/Employees/Create.Employees');
const EmployeesSelect = require('../controllers/Employees/Select.Employees');
const EmployeesDelete = require('../controllers/Employees/Delete.Employees');
const EmployeesUpdate = require('../controllers/Employees/Update.Employees');



app.route('/employees')
    .post([
            body('name').trim().notEmpty().withMessage('Nome é obrigatório.'),
            body('birth').trim().notEmpty().withMessage('Nascimento é obrigatório.'),
            body('address').trim().notEmpty().withMessage('Endereço é obrigatório.'),
            body('email').trim().notEmpty().withMessage('Email é obrigatório.'),
        ], EmployeesCreate)
      .get(EmployeesSelect.getAllEmployees)// todos os funcionario
      
app.route('/employees/:id')
    .get(EmployeesSelect.getEmployeesById)// busco pelo id do funcionario
    .put([
        body('name').trim().notEmpty().withMessage('Nome é obrigatório.'),
        body('birth').trim().notEmpty().withMessage('Nascimento é obrigatório.'),
        body('address').trim().notEmpty().withMessage('Endereço é obrigatório.'),
        body('email').trim().notEmpty().withMessage('Email é obrigatório.'),
    ], EmployeesUpdate.UpdateEmployees)
    .delete(EmployeesDelete)// deleta o funcionario

app.route('/employees/isActive/:id')
    .put(EmployeesUpdate.statusEmployees)// desabilita ou habilita o funcionario


module.exports = app;