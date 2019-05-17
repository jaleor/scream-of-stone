var keystone = require('keystone');
var Types = keystone.Field.Types;
var moment = require('moment');

/**
 * History Model
 * ==========
 */
var History = new keystone.List('History', {
	map: {name: 'createdDt'}, 
	label: 'Historia clínica', 
	singular: 'Historia', 
	plural: 'Historias',
	defaultSort: '-createdDt',
	drilldown: 'pet'
});

function defaultDate () {
    return moment();
}

History.add({
	createdDt: { label: 'Fecha / hora', type: Types.Date, default: defaultDate(), initial: true, format: 'DD/MM/YYYY HH:mm', inputFormat: 'DD/MM/YYYY HH:mm' },
	notes: { label: 'Observaciones', type: Types.Textarea },
	pet: { label: 'Paciente', type: Types.Relationship, ref: 'Pet', createInline: true, required: true, initial: true}
});

/*History.schema.virtual('tokens', function() {
    return 'xxx';
});*/

/**
 * Registration
 */
History.defaultColumns = 'createdDt|20%, pet|10%, notes|70%';
History.register();
