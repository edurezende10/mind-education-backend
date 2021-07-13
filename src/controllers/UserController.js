const User = require('../models/User');
const bcrypt = require('bcrypt');
const { update, destroy } = require('../models/User');
const database = require('../config/database');
const Sequelize = require('sequelize');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
      
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ error: 'não foi possivel listar usuarios' });
    }
  },
  async store(req, res) {
    try {
      const data = req.body;
      const userExist = await User.findOne({
        where: Sequelize.or({ email: data.email }, { cpf: data.cpf }),
      });

      if (userExist) {
        if (userExist.email === data.email) {
          return res.status(400).json({ error: 'email já cadastrado' });
        }
        return res.status(400).json({ error: 'cpf já cadastrado' });
      }

      const user = await User.create(data);
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.json({ error: 'não foi possivel criar o usuario' });
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      if (req.user.nivel === 999 || req.user.id == id) {
        const user = await User.findOne({
          where: { id },
        });
        return res.status(200).json(user);
      }
      return res.status(401).json({ error: "Você não tem autorização" });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Não foi possivel criar o usuario" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8);
      }
      if (req.user.nivel === 999 || req.user.id == id) {
        await User.update(data, {
          where: { id },
        });
        return res.json({ message: "Atualizado com sucesso!" });
      }
      return res.status(401).json({ error: "Você não tem autorização" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Não foi possivel atualizar o usuario" });
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.destroy({ where: { id } });
      return res.json({ message: 'usuario deletado com sucesso' });
    } catch (error) {
      console.log(error);
      return res.json({ error: 'não foi possivel deletar o usuario' });
    }
  },
};
