'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Specialty.hasMany(models.Doctor_Info, { foreignKey: 'specialtyId', as: 'specialtyData' } )

        }
    };
    Specialty.init({
        iconName: DataTypes.STRING,
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        shortDescription: DataTypes.TEXT,
        descriptionHTML: DataTypes.TEXT,
        descriptionMarkdown: DataTypes.TEXT,
        nameEn: DataTypes.STRING,
        shortDescriptionEn: DataTypes.TEXT,
        descriptionHTMLEn: DataTypes.TEXT,
        descriptionMarkdownEn: DataTypes.TEXT,
        nameJp: DataTypes.STRING,
        shortDescriptionJp: DataTypes.TEXT,
        descriptionHTMLJp: DataTypes.TEXT,
        descriptionMarkdownJp: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};