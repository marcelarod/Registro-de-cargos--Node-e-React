const { Positions } = require('../../models');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        // Descontroi body e atualiza tabela
        let { name } = req.body;

        // Verifica se houve algum erro de validação
        let error = validationResult(req);
        let errors = error.array();

        // Verifico se já existe algum com o mesmo nome
        const find = await Positions.findAll({ where: {name} });

        if (find.length > 0) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'Cargo já cadastrado.', param: 'id', location: 'body' }] })
       }

        await Positions.update({name}, { where: { id: req.params.id } });

        // Busca item atualizado para envio
        const dbPositions = await Positions.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return res.status(200).send(dbPositions);
    }
    catch (err) {
        console.log('Erro update Positions:', err)
        return res.status(500).send();
    }
}