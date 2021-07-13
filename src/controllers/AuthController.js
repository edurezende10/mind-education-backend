const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuthConfig = require('../config/auth');
const crypto = require('crypto')

module.exports = {
  async store(req, res) {
    const { login, senha } = req.body;
    try {
      const userExist = await User.findOne({
        where: Sequelize.or({ email: login }, { cpf: login }),
      });
      if (!userExist) {
        return res.status(401).json({ error: 'usuario não econtrado' });
      }
      if (!userExist.acesso === 1) {
        return res.status(401).json({ error: 'usuario desativado' });
      }
      if (!(await userExist.checkPassword(senha))) {
        return res.status(401).json({ error: 'senha incorreta' });
      }
      const { id, nome, email, cpf, acesso, nivel } = userExist;

      res.status(200).json({
        user: {
          id,
          nome,
          email,
          cpf,
          acesso,
          nivel,
        },
        token: jwt.sign(
          {
            id,
            nome,
            email,
            cpf,
            acesso,
            nivel,
          },
          AuthConfig.secret,
          {
            expiresIn: AuthConfig.expireIn,
          },
        ),
      });
    } catch (error) {
      return res.status(400).json({ error: 'Ops.... Ocorreu um erro' });

      console.log(error);
    }
  },/* 
  async resetPass(req,res){
    const {email} = req.body

    try {
      const userExist = await User.findOne({
        where: {email },
      });

      if(!userExist){
        res.status(400).send({error:"E-mail não localizado"})
      }

      const token = crypto.randomBytes(20).toString('hex')
    
      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.update( {
        where: { id },
      });

    } catch (error) {
      res.status(400).send({error:"Error ao resetar senha"})
    }
  } */
};
