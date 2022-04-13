const { Positions } = require('../../models')
const { validationResult } = require('express-validator');

const getAllPositions = async (req, res) => {
    try {
        const query = await Positions.findAll({
             attributes: { exclude: ['createdAt', 'updatedAt'] },   
             order: [['name', 'ASC']],
             });
        

        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro getAllPositions: ', err)
        return res.status(500).send();
    }
}

const getPositionsById = async (req, res) => {
    try {
        const query = await Positions.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (query === null) {
            return res.status(200).json({ errors: [{  msg: 'Não existe cargo cadastrado com esse id.', location: 'body' }] })
        }
        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro getPositionsById:', err)
        return res.status(500).send();
    }
}


module.exports = { getAllPositions, getPositionsById }
