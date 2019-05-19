var keystone = require('keystone');
var Types = keystone.Field.Types;
var moment = require('moment');

/**
 * History Model
 * ==========
 */
var History = new keystone.List('History', {
	map: {name: 'createdDtEs'}, 
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
	createdDtEs: { label: 'Fecha / hora', type: Types.Text, watch: true, noedit: true, initial: false, hidden: true, value: function (callback) {
		callback(null, moment(this.createdDt).format('DD/MM/YYYY HH:mm'));
    }},
	notes: { label: 'Observaciones', type: Types.Textarea },
	pet: { label: 'Paciente', type: Types.Relationship, ref: 'Pet', createInline: true, required: true, initial: true}
});


/**
 * Registration
 */
History.defaultColumns = 'createdDtEs|20%, pet|20%, notes|60%';
History.register();
