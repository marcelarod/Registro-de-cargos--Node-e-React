const { Positions } = require('../../models')
const { validationResult } = require('express-validator');
var moment = require('moment'); 

module.exports = async (req, res) => {
    try {
        let { name } = req.body;

        // Verifico se existe algum erro no corpo da requisição
        let error = validationResult(req);
        const errors = error.array()

        // Verifico se já existe um Cargo cadastrado
        const find = await Positions.findAll({ where: {name} });
        if (find.length > 0) {
            return res.status(400).json({ errors: [{ value: name, msg: 'Cargo já cadastrado.', param: 'name', location: 'body' }] })
        }

        // Caso erro envio mensagem
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }
        // Executa a criação da relação
        const resultCreation = await Positions.create({ name});

        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create Positions:', err)
        return res.status(500).send();
    }
}
