import Sessao from "../models/SessaoModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            const response = await Sessao.findAll({
                order: [['id', 'desc']],
            });
        
            return res.status(200).send({
                message: 'dados encontrados',
                data: response,
            });
        }

        const response = await Sessao.findOne({
            where: {
                id: id
            }
        });

        if(!response) {
            return res.status(404).send('não achou');
        }

        return res.status(200).send({
            message: 'dados encontrados',
            data: response,
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const create = async (corpo) => {
    try {
        const {
            lugares,
            dataInicio,
            dataFim,
            preco,
            idFilme,
            idSala
        } = corpo

        const response = await Sessao.create({
            lugares,
            dataInicio,
            dataFim,
            preco,
            idFilme,
            idSala
        });

        return response;

    } catch (error) {
        throw new Error(error.message);
    }
}

const update = async(corpo, id) => {
    try {
        const response = await Sessao.findOne({
            where: {
                id
            }
        });

        if(!response) {
            throw new Error('não achou');
        }
        Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
        await response.save();
        return response;

    } catch (error) {
        throw new Error(error.message);
    }
}

const persist = async(req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            const response = await create(req.body);
            return res.status(201).send({
                message: 'criado com sucesso',
                data: response
            });
        }

        const response = await update(req.body, id);
        return res.status(201).send({
            message: 'atualizado com sucesso',
            data: response
        });
        
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            return res.status(400).send('informe please');
        }

        const response = await Sessao.findOne({
            where: {
                id
            }
        });

        if(!response) {
            return res.status(404).send('nao achou');
        }
        await response.destroy();

        return res.status(200).send({
            message: 'registro excluido',
            data: response
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

export default {
    get,
    persist,
    destroy,
}