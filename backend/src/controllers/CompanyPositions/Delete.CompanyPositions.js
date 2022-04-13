const { CompanyPositions } = require('../../models')
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        let queryCompanyPositions = await CompanyPositions.findOne({ where: { id: req.params.id } })

         // Verifico se existe algum erro no corpo da requisição
         let error = validationResult(req);
         const errors = error.array()

         
        if (queryCompanyPositions == null) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'O id não existe na base de dados', param: 'id', location: 'params' }] })
        }
         // Caso erro envio mensagem
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }

        await CompanyPositions.destroy({ where: { id: req.params.id }, returning: true});
        return res.status(200).json({ message: 'Sucesso na operação' });

    } catch (err) {
        console.log('Erro Delete CompanyPositions: ', err);
        return res.status(500).send(err);
    }
}
