// Definicion del modelo de Quiz con validacion
// El fichero quiz.js es parte del modelo (directorio models) y define 
// la estructura de la tabla con 2 campos (tipo string)

module.exports = function (sequelize, DataTypes) {
	return sequelize.define ('Quiz', 
							{ pregunta: {
								type: DataTypes.STRING,
								validate: {notEmpty: {msg: "-> Falta Pregunta"}}
								},
							  respuesta: {
							  	type: DataTypes.STRING,
							  	validate: {notEmpty: {msg: "-> Falta Respuesta"}}
							  }
							});
}