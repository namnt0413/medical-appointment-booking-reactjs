'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Clinics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB('long')
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
            addressEn: {
                type: Sequelize.STRING
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
            addressJp: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Clinics');
    }
};