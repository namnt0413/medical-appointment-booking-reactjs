'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.belongsTo(models.User, {foreignKey: 'doctorId' } );
        }
    };
    Markdown.init({
        doctorId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        contentHTMLEn: DataTypes.TEXT('long'),
        contentMarkdownEn: DataTypes.TEXT('long'),
        descriptionEn: DataTypes.TEXT('long'),
        contentHTMLJp: DataTypes.TEXT('long'),
        contentMarkdownJp: DataTypes.TEXT('long'),
        descriptionJp: DataTypes.TEXT('long'),

    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};