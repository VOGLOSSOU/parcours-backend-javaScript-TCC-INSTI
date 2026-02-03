// src/routes/profile/createProfile.js
require('dotenv').config();
const Profile = require('../../db/sequelize').Profile;
const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports = (app) => {
  app.post('/api/profiles', async (req, res) => {
    try {
      const {
        firstName,
        country,
        city,
        domain,
        availability,
        contactMethod,
        ageRange,
        gender,
        technologies,
        description
      } = req.body;

      // Validation des champs obligatoires
      if (!firstName || !country || !city || !domain || !availability || !contactMethod) {
        return res.status(400).json({
          message: 'Les champs firstName, country, city, domain, availability et contactMethod sont requis.'
        });
      }

      // Création du Profile
      const profile = await Profile.create({
        firstName,
        country,
        city,
        domain,
        availability,
        contactMethod,
        ageRange: ageRange || null,
        gender: gender || null,
        technologies: technologies || [],
        description: description || null
      });

      // Réponse
      res.status(201).json({
        message: 'Profile créé avec succès.',
        data: {
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
          updated_at: profile.updated_at
        }
      });

    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map(e => e.message);
        return res.status(400).json({ message: 'Validation échouée.', errors: messages });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({
          message: 'Violation de contrainte unique.',
          errors: error.errors.map(e => e.message)
        });
      }
      console.error("Erreur lors de la création du profile :", error);
      res.status(500).json({
        message: 'Échec de la création du profile. Veuillez réessayer plus tard.'
      });
    }
  });
};
