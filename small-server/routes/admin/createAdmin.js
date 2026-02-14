// src/routes/admin/createAdmin.js
require("dotenv").config();

const Admin = require("../../db/sequelize").Admin;
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.post("/api/admins", async (req, res) => {
    try {
      const { firstName, email, password } = req.body;

      // Validation des champs obligatoires
      if (!firstName || !email || !password) {
        return res.status(400).json({
          message: "Les champs firstName, email et password sont requis.",
        });
      }

      // Chiffrement du mot de passe avec bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'Admin
      const admin = await Admin.create({
        firstName,
        email,
        password: hashedPassword,
      });

      // Réponse (sans le mot de passe)
      res.status(201).json({
        message: "Admin créé avec succès.",
        data: {
          id: admin.id,
          firstName: admin.firstName,
          email: admin.email,
          created_at: admin.created_at,
          updated_at: admin.updated_at,
        },
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((e) => e.message);
        return res
          .status(400)
          .json({ message: "Validation échouée.", errors: messages });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({
          message: "Violation de contrainte unique.",
          errors: error.errors.map((e) => e.message),
        });
      }
      console.error("Erreur lors de la création de l'admin :", error);
      res.status(500).json({
        message:
          "Échec de la création de l'admin. Veuillez réessayer plus tard.",
      });
    }
  });
};
