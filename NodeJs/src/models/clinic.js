'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Clinic.hasMany(models.Doctor_Info, { foreignKey: 'clinicId', as: 'clinicData' } )
        }
    };
    Clinic.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        image: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT,
        descriptionMarkdown: DataTypes.TEXT,
        nameEn: DataTypes.STRING,
        addressEn: DataTypes.STRING,
        descriptionHTMLEn: DataTypes.TEXT,
        descriptionMarkdownEn: DataTypes.TEXT,
        nameJp: DataTypes.STRING,
        addressJp: DataTypes.STRING,
        descriptionHTMLJp: DataTypes.TEXT,
        descriptionMarkdownJp: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};