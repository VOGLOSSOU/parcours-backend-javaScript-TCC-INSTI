// models/profile.js
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le prénom est requis.' },
        is: /^[a-zA-Z\séèêëàâäùûüôöîïç'-]+$/i,
        len: [2, 50]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le pays est requis.' },
        is: /^[a-zA-Z\séèêëàâäùûüôöîïç'-]+$/i
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'La ville est requise.' },
        is: /^[a-zA-Z\séèêëàâäùûüôöîïç'-]+$/i
      }
    },
    domain: {
      type: DataTypes.ENUM('tech', 'non-tech'),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le domaine est requis.' },
        isIn: {
          args: [['tech', 'non-tech']],
          msg: 'Le domaine doit être "tech" ou "non-tech".'
        }
      }
    },
    availability: {
      type: DataTypes.ENUM('full-time', 'part-time', 'freelance', 'internship', 'contract'),
      allowNull: false,
      validate: {
        notNull: { msg: 'La disponibilité est requise.' },
        isIn: {
          args: [['full-time', 'part-time', 'freelance', 'internship', 'contract']],
          msg: 'Disponibilité invalide.'
        }
      }
    },
    contactMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'La méthode de contact est requise.' },
        isIn: {
          args: [['email', 'phone', 'whatsapp', 'linkedin', 'twitter']],
          msg: 'Méthode de contact invalide.'
        }
      }
    },
    ageRange: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['18-25', '26-35', '36-45', '46-55', '55+']],
          msg: 'Tranche d\'âge invalide.'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['male', 'female', 'other', 'prefer-not-to-say']],
          msg: 'Genre invalide.'
        }
      }
    },
    technologies: {
      type: DataTypes.JSON, // JSON pour compatibilité MariaDB/MySQL
      allowNull: true,
      defaultValue: [],
      validate: {
        isArrayOrNull(value) {
          if (value !== null && !Array.isArray(value)) {
            throw new Error('Technologies doit être un tableau ou null.')
          }
          if (value && value.some(tech => typeof tech !== 'string')) {
            throw new Error('Chaque technologie doit être une chaîne.')
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 1000],
          msg: 'La description ne peut pas dépasser 1000 caractères.'
        }
      }
    }
  }, {
    tableName: 'profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Profile;
};
