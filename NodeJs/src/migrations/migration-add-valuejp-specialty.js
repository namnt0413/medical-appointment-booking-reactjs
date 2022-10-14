'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Specialties', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            iconName: {
              type: Sequelize.STRING
            },
            image: {
              type: Sequelize.BLOB('long')
            },
            name: {
                type: Sequelize.STRING
            },
            shortDescription:{
                type: Sequelize.TEXT
            },
            descriptionHTML: {
                type: Sequelize.TEXT
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT
            },

            nameEn: {
              type: Sequelize.STRING
            },
            shortDescriptionEn:{
                type: Sequelize.TEXT
            },
            descriptionHTMLEn: {
                type: Sequelize.TEXT
            },
            descriptionMarkdownEn: {
                type: Sequelize.TEXT
            },

            nameJp: {
              type: Sequelize.STRING
            },
            shortDescriptionJp:{
                type: Sequelize.TEXT
            },
            descriptionHTMLJp: {
                type: Sequelize.TEXT
            },
            descriptionMarkdownJp: {
                type: Sequelize.TEXT
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Specialties');
    }
};