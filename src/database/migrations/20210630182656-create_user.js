'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      nome:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      cpf:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      acesso:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1,
        
      },
      nivel:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull:false,
      },
     /*  recuperarSenha:{
        type: Sequelize.String,
        allowNull:false,

      },
      expiracaoToken:{
        type: Sequelize.DATE,
        allowNull:false,
      }, */
      updatedAt:{
        type: Sequelize.DATE,
        allowNull:false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
