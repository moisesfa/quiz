// Definicion del modelo de Quiz
// El fichero quiz.js es parte del modelo (directorio models) y define 
// la estructura de la tabla con 2 campos (tipo string)

module.exports = function (sequelize, DataTypes) {
	return sequelize.define ('Quiz', 
							{ pregunta: DataTypes.STRING,
							  respuesta: DataTypes.STRING
							});
}