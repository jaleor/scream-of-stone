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
	defaultSort: '-createdDt'
});

function defaultDate () {
    return moment();
}

History.add({
	createdDt: { type: Types.Date, default: defaultDate(), initial: true, format: 'DD/MM/YYYY HH:mm', inputFormat: 'DD/MM/YYYY HH:mm' },
	notes: { type: Types.Textarea },
	pet: { type: Types.Relationship, ref: 'Pet', createInline: true, required: true, initial: true}
});


/**
 * Registration
 */
History.defaultColumns = 'createdDt|20%, pet|10%, notes|70%';
History.register();
