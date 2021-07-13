const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        acesso: DataTypes.INTEGER,
        nivel: DataTypes.STRING,
        senha: DataTypes.STRING,
        /* recuperarSenha: DataTypes.STRING,
        expiracaoToken:DataTypes.DATE */
      },
      {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (client) => {
      if (client.senha) {
        client.senha = await bcrypt.hash(client.senha, 8);
      }
    });
    return this;
  }
  checkPassword(senha){
    return bcrypt.compare(senha, this.senha)
  }
}
module.exports = User