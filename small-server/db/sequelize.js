// src/db/sequelize.js

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// 1) Import des factory functions de tes modèles
const ProfileModel    = require('../models/profile');
const AdminModel      = require('../models/admin');

// 2) Création de la connexion Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    dialectOptions: { connectTimeout: 40000 },
    logging: false
  }
);

// 3) Initialisation de chaque modèle
const Profile    = ProfileModel(sequelize, DataTypes);
const Admin      = AdminModel(sequelize, DataTypes);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base réussie.');
    await sequelize.sync({ alter: true });
    console.log('La base de données a bien été initialisée (sync alter).');
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données :", error);
  }
};

module.exports = {
  sequelize,
  initDb,
  Profile,
  Admin
};