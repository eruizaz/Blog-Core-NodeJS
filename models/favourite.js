module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Favourite',
            { userId: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo user no puede estar vacio"}
                 }
              },
              postId: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo post no puede estar vacio"}
                 }
              },
              best: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo post no puede estar vacio"},
                     min: 1,
                     max: 5
                 }
              },
              updatedAt: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo de fecha de actualizacion no puede estar vacio"}
                 }
              },
              createdAt: {
                 type: DataTypes.INTEGER,
                 validate: {
                     notEmpty: {msg: "El campo de fecha de creacion no puede estar vacio"}
                 }
              },
            });
}
