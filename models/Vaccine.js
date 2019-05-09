var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Vaccine Model
 * ==========
 */
var Vaccine = new keystone.List('Vaccine', {
	map: {name: 'createdDt'}, label: 'Plan sanitario', singular: 'Tratamiento', plural: 'Tratamientos'
});

Vaccine.add({
	createdDt: { type: Types.Datetime, default: Date.now },
	notes: { type: Types.Textarea },
	pet: { type: Types.Relationship, ref: 'Pet'}
});


/**
 * Registration
 */
Vaccine.defaultColumns = 'createdDt, notes';
Vaccine.register();
