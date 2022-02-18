const { departments, Sequelize } = require('../models')
const t = require('../helpers/transactions');
const Create = async (req, res) => {
    try {
        const { data } = req.body;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const Createdep = await Person.bulkCreate(data, { transaction: transaction.data });
        if (!Createdep) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(400).send({
                status: 'error',
                message: 'dep failed created'
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }

        res.status(201).send({
            status: 'success',
            //data: 
        });
    } catch (error) {
        res.send(error);
    }
}

const findById = async (req, res, next) => {
    try {
        const { id,name } = req.params;
        const finddepById = await Person.findByPk(id,name, {
            include: [
                {
                    model: dep,
                }
                /*{
                    model: dep
                }*/

            ],
        });
        if (!finddepById) {
            res.status(404).send({
                status: 'error',
                message: `Person with id ${id} not found`
            });
        }
        res.status(200).send({
            status: 'success',
            //data: finddepById
        });
    } catch (error) {
        next(error);
    }
}
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const {name} = req.body;
        const finddepById = await dep.findOne({
            where: {
                id
            },
            transaction: transaction.data
        });
        if (!finddepById) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(404).send({
                status: 'error',
                message: `dep with id ${id} not found`
            });
        }
        if (id) finddepById.id = id;
        if (name) findPersonById.name = name;
        const updatedep = await finddepById.save({ transaction: transaction.data });
        if (!updatedep) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(400).send({
                status: 'error',
                message: `data dep with id ${id} failed update`
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }
        res.status(200).send({
            status: 'success',
            //data: updatePerson
        });
    } catch (error) {
        next(error);
    }
}
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const finddepById = await dep.findByPk(id, { transaction: transaction.data });
        if (!finddepById) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(404).send({
                status: 'error',
                message: `dep with id ${id} not found`
            })
        }
        const deletedep = await finddepById.destroy({ transaction: transaction.data });
        if (!deletedep) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(503).send({
                status: 'error',
                message: `dep with id ${id} failed delete`
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }
        res.status(200).send({
            status: 'success',
            message: `dep with id ${id} deleted`
        });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    Create,
    findById,
    update,
    destroy,
}