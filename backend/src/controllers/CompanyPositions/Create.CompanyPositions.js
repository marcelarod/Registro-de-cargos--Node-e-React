const { CompanyPositions } = require('../../models')
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        let { positionId, employeeId } = req.body;

        // Verifico se existe algum erro no corpo da requisição
        let error = validationResult(req);
        const errors = error.array()

        // Verifico se já existe um funcionario com o cargo cadastrado
        const find = await CompanyPositions.findAll({ where: {positionId, employeeId} });
        if (find.length > 0) {
            return res.status(400).json({ errors: [{ value: employeeId, msg: 'Funcionário já tem esse cargo cadastrado.', param: 'employeeId', location: 'body' }] })
        }
        const findEmployee = await CompanyPositions.findAll({ where: { employeeId} });
        if (findEmployee.length > 0) {
            return res.status(400).json({ errors: [{ value: employeeId, msg: 'Funcionário já tem cargo.', param: 'employeeId', location: 'body' }] })
        }

        // Caso erro envio mensagem
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }

        // Executa a criação da relação
        const resultCreation = await CompanyPositions.create({positionId, employeeId});

        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create CompanyPositions:', err)
        return res.status(500).send();
    }
}
