var keystone = require('keystone');
var Types = keystone.Field.Types;
var moment = require('moment');

/**
 * Vaccine Model
 * ==========
 */
var Vaccine = new keystone.List('Vaccine', {
	map: {name: 'createdDt'}, 
	label: 'Plan sanitario', 
	singular: 'Tratamiento', 
	plural: 'Tratamientos',
	defaultSort: '-createdDt',
	drilldown: 'pet'
});

function defaultDate () {
    return moment();
}

/*Vaccine.schema.methods.dateFormat = function() {
	return 'published';
  }

function createdDtx () {
	return 'xx';
}*/

Vaccine.add({
	createdDt: { label: 'Fecha / hora', type: Types.Date, default: defaultDate(), initial: true, format: 'DD/MM/YYYY HH:mm', inputFormat: 'DD/MM/YYYY HH:mm' },
	notes: { label: 'Observaciones', type: Types.Textarea },
	//createdDtx: { label: '', type: String, default: this.dateFormat()},
	pet: { label: 'Paciente', type: Types.Relationship, ref: 'Pet', createInline: true, required: true, initial: true}
});


/**
 * Registration
 */
Vaccine.defaultColumns = 'createdDt|20%, pet|10%, notes|70%';
Vaccine.register();
