const { Employees } = require('../../models')
const { validationResult } = require('express-validator');

const getAllEmployees = async (req, res) => {
    try {
        const query = await Employees.findAll({
             attributes: { exclude: ['createdAt', 'updatedAt'] },   
             order: [['name', 'ASC']],
             });
        

        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro getAllEmployees: ', err)
        return res.status(500).send();
    }
}

const getEmployeesById = async (req, res) => {
    try {
        const query = await Employees.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (query === null) {
            return res.status(200).json({ errors: [{  msg: 'Não existe funcionário cadastrado com esse id.', location: 'body' }] })
        }
        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro getEmployeesById:', err)
        return res.status(500).send();
    }
}


module.exports = { getAllEmployees, getEmployeesById }
