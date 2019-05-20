var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Owner Model
 * ==========
 */
var Owner = new keystone.List('Owner', {
	map: {name:'name'},
	label: 'Propietarios', singular: 'Propietario', plural: 'Propietarios'
});

Owner.add({
	name: { label: 'Nombre / Apellido', type: Types.Name, required: true, index: true, initial: true },
	telephone: { label: 'Teléfono', type: String },
	/*address: { label: 'Dirección', type: Types.Location, defaults: { country: 'Argentina' } }*/
	address: { label: 'Dirección', type: String },
	email: { label: 'Email', type: Types.Email },
	notes: { label: 'Observaciones', type: Types.Textarea }
});


/**
 * Registration
 */
Owner.defaultColumns = 'name, telephone';
Owner.register();
