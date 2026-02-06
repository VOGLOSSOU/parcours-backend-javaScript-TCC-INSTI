// src/routes/profile/getAllProfiles.js
require("dotenv").config();
const Profile = require("../../db/sequelize").Profile;
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.get("/api/profiles", async (req, res) => {
    try {
      // Récupération de tous les profils avec Sequelize
      const profiles = await Profile.findAll({
        order: [
          ["created_at", "DESC"], // Tri par date de création décroissante
        ],
      });

      // Réponse avec la liste des profils
      res.status(200).json({
        message: "Liste des profils récupérée avec succès.",
        count: profiles.length,
        data: profiles.map((profile) => ({
          id: profile.id,
          firstName: profile.firstName,
          country: profile.country,
          city: profile.city,
          domain: profile.domain,
          availability: profile.availability,
          contactMethod: profile.contactMethod,
          ageRange: profile.ageRange,
          gender: profile.gender,
          technologies: profile.technologies,
          description: profile.description,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        })),
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((e) => e.message);
        return res
          .status(400)
          .json({ message: "Validation échouée.", errors: messages });
      }
      console.error("Erreur lors de la récupération des profils :", error);
      res.status(500).json({
        message:
          "Échec de la récupération des profils. Veuillez réessayer plus tard.",
      });
    }
  });
};
