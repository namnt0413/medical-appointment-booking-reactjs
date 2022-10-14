'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            description: {
                type: Sequelize.TEXT('long')
            },
            contentHTMLEn: {
              type: Sequelize.TEXT('long')
            },
            contentMarkdownEn: {
                type: Sequelize.TEXT('long')
            },
            descriptionEn: {
                type: Sequelize.TEXT('long')
            },  

            contentHTMLJp: {
              type: Sequelize.TEXT('long') 
            },
            contentMarkdownJp: {
                type: Sequelize.TEXT('long')
            },
            descriptionJp: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('Markdowns');
    }
};