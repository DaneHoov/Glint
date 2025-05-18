const options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"PhotoLabels",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				photo_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Photos",
						key: "id",
					},
					onDelete: "CASCADE",
				},
				label_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Labels",
						key: "id",
					},
					onDelete: "CASCADE",
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options,
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "PhotoLabels";
		await queryInterface.dropTable(options);
	},
};
