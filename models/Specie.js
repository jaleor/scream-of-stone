var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Specie Model
 * ==========
 */
var Specie = new keystone.List('Specie');

Specie.add({
	name: { type: String, required: true, index: true, initial: true }
});

/**
 * Registration
 */
Specie.defaultColumns = 'name';
Specie.register();
