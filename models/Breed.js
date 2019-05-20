var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Breed Model
 * ==========
 */
var Breed = new keystone.List('Breed', {
	label: 'Razas', 
	singular: 'Raza', 
	plural: 'Razas',
});

Breed.add({
	name: { type: String, required: true, index: true, initial: true },
	specie:{ label: 'Especie', type: Types.Relationship, ref: 'Specie', createInline: true, required: true, initial: true }
});

/**
 * Registration
 */
Breed.defaultColumns = 'name, specie';
Breed.register();
