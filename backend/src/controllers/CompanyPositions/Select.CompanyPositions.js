const { CompanyPositions, Employees, Positions} = require('../../models')
const { validationResult } = require('express-validator');

const getAllCompanyPositions = async (req, res) => {
    try {
        const query = await CompanyPositions.findAll({
             attributes: { exclude: ['createdAt', 'updatedAt'] },   
             include: [
                {
                    model: Employees,
                    as: 'Employees',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },   
                },
                {
                    model: Positions,
                    as: 'Positions',
                    attributes: ['name'] 
                },
            ],
        });
        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro getAllCompanyPositions: ', err)
        return res.status(500).send();
    }
}

const getCompanyPositionsById = async (req, res) => {
    try {
        const query = await CompanyPositions.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Employees,
                    as: 'Employees',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },   
                },
                {
                    model: Positions,
                    as: 'Positions',
                    attributes: ['name'] 
                },
            ],
        });
        if (query === null) {
            return res.status(200).json({ errors: [{  msg: 'Não existe funcionário cadastrado com esse id.', location: 'body' }] })
        }
        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro getCompanyPositionsById:', err)
        return res.status(500).send();
    }
}


module.exports = { getAllCompanyPositions, getCompanyPositionsById }
