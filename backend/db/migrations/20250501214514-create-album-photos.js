const options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"AlbumPhotos",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				album_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Albums",
						key: "id",
					},
					onDelete: "CASCADE",
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
		options.tableName = "AlbumPhotos";
		await queryInterface.dropTable(options);
	},
};
