module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define("file", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
    });
  
    return File;
  };