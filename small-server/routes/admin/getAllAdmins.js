// src/routes/admin/getAllAdmins.js
require("dotenv").config();
const Admin = require("../../db/sequelize").Admin;
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.get("/api/admins", async (req, res) => {
    try {
      // Récupération de tous les admins avec Sequelize
      const admins = await Admin.findAll({
        order: [
          ["created_at", "DESC"], // Tri par date de création décroissante
        ],
        attributes: { exclude: ["password"] }, // Exclure le mot de passe
      });

      // Réponse avec la liste des admins
      res.status(200).json({
        message: "Liste des administrateurs récupérée avec succès.",
        count: admins.length,
        data: admins.map((admin) => ({
          id: admin.id,
          firstName: admin.firstName,
          email: admin.email,
          created_at: admin.created_at,
          updated_at: admin.updated_at,
        })),
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((e) => e.message);
        return res
          .status(400)
          .json({ message: "Validation échouée.", errors: messages });
      }
      console.error("Erreur lors de la récupération des administrateurs :", error);
      res.status(500).json({
        message:
          "Échec de la récupération des administrateurs. Veuillez réessayer plus tard.",
      });
    }
  });
};