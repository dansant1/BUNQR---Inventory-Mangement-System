FormasdePago = new Mongo.Collection('formasdepago');


FormasDePagoSchema = new SimpleSchema({
	descripcion: {
		type: String
	},
	periodo: {
		type: Number
	},
	tipo: {
		type: String
	},
	negocioId: {
		type: String
	}
});

FormasdePago.attachSchema(FormasDePagoSchema);