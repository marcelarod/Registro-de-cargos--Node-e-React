const { CompanyPositions } = require('../../models');
const { validationResult } = require('express-validator');

const UpdateCompanyPositions = async (req, res) => {
    try {
        // Descontroi body e atualiza tabela
        let { positionId, employeeId } = req.body;

        // Verifica se houve algum erro de validação
        let error = validationResult(req);
        let errors = error.array();

        // Verifico se já existe algum com o mesmo nome
        const find = await CompanyPositions.findAll({ where: {positionId, employeeId } });

        if (find.length > 0) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'Funcionário tem esse cargo já cadastrado.', param: 'id', location: 'body' }] })
        }
   
        await CompanyPositions.update({positionId, employeeId }, { where: { id: req.params.id } });

        // Busca item atualizado para envio
        const dbCompanyPositions = await CompanyPositions.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return res.status(200).send(dbCompanyPositions);
    }
    catch (err) {
        console.log('Erro update CompanyPositions:', err)
        return res.status(500).send();
    }
}

module.exports = { UpdateCompanyPositions }
