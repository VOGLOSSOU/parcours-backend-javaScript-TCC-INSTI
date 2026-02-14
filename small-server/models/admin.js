// models/admin.js
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le prénom est requis." },
          is: /^[a-zA-Z\séèêëàâäùûüôöîïç'-]+$/i,
          len: [2, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Cet email est déjà utilisé.",
        },
        validate: {
          notNull: { msg: "L'email est requis." },
          isEmail: { msg: "Veuillez fournir un email valide." },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le mot de passe est requis." },
          len: {
            args: [8, 100],
            msg: "Le mot de passe doit contenir entre 8 et 100 caractères.",
          },
        },
      },
    },
    {
      tableName: "admins",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Admin;
};
