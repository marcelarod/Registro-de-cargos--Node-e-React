const { Employees } = require('../../models')
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        let { name, birth, address, email, positionId } = req.body;

        // Verifico se existe algum erro no corpo da requisição
        let error = validationResult(req);
        const errors = error.array()

        // Verifico se já existe um funcionario cadastrado
        const find = await Employees.findAll({ where: {email} });
        if (find.length > 0) {
            if(find[0].isActive == false){
                await Employees.update({ isActive: true }, { where: { id: find[0].id}});
                const findEmployees = await Employees.findAll({ where: {email} });
                return res.status(200).json(findEmployees);
            }else{
                return res.status(400).json({ errors: [{ value: name, msg: 'Funcionário já cadastrado.', param: 'name', location: 'body' }] })
            }
        }

        // Caso erro envio mensagem
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }

        // Executa a criação da relação
        const resultCreation = await Employees.create({ name, birth, address, email,isActive:true, positionId});

        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create Employees:', err)
        return res.status(500).send();
    }
}
