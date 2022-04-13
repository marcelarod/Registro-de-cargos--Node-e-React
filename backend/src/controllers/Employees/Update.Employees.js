const { Employees } = require('../../models');
const { validationResult } = require('express-validator');

const UpdateEmployees = async (req, res) => {
    try {
        // Descontroi body e atualiza tabela
        let { name, birth, address, email } = req.body;

        // Verifica se houve algum erro de validação
        let error = validationResult(req);
        let errors = error.array();

        // Verifico se já existe algum com o mesmo nome
        const find = await Employees.findAll({ where: {name, birth, address, email } });
        const findEmail = await Employees.findAll({ where: { email } });

        if (find.length > 0) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'Funcionário já cadastrado.', param: 'id', location: 'body' }] })
        }
        if (findEmail.length > 0) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'Email já cadastrado.', param: 'id', location: 'body' }] })
        }

        await Employees.update({name, birth, address, email , isActive:true}, { where: { id: req.params.id } });

        // Busca item atualizado para envio
        const dbEmployees = await Employees.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return res.status(200).send(dbEmployees);
    }
    catch (err) {
        console.log('Erro update Employees:', err)
        return res.status(500).send();
    }
}

const statusEmployees = async (req, res) => {
    try {
        let { isActive } = req.body;

        let queryEmployees = await Employees.findOne({ where: { id: req.params.id } })


        if (queryEmployees == null) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'O id não existe na base de dados', param: 'id', location: 'params' }] })
        }

        await Employees.update({ isActive: isActive }, { where: { id: req.params.id } });

        return res.status(200).json({ message: 'Sucesso na operação' });
    } catch (err) {
        console.log('Erro Disable Employees: ', err);
        return res.status(500).send(err);
    }
}

module.exports = { UpdateEmployees, statusEmployees }
