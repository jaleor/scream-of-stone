var keystone = require('keystone');
var Types = keystone.Field.Types;
//var Owner = require('Owner');

/**
 * Pet Model
 * ==========
 */
var Pet = new keystone.List('Pet', {
	label: 'Pacientes', singular: 'Paciente', plural: 'Pacientes'
});

Pet.add({
	name: { label: 'Nombre', type: String, required: true, index: true },
	owner: { label: 'Dueño', type: Types.Relationship, ref: 'Owner', createInline: true},
	specie:{ label: 'Especie', type: Types.Select, options: 'canino, felino'},
	breed: { label: 'Raza', type: Types.Select, options: 'mestizo, caniche'},
	gender: { label: 'Género', type: Types.Select, options: 'hembra, macho', default: 'hembra' },
	/*}, 'Castrado/a', {*/isCastrated: { label: 'Castrado/a', type: Types.Boolean },
	castratedDate: { label: 'Fecha de castración', dependsOn: { isCastrated: true }, type: Types.Date, format: 'DD/MM/YYYY', inputFormat: 'DD/MM/YYYY' },
	pelage: { label: 'Pelaje', type: String },	
	birthDate: { label: 'Fecha de nacimiento', type: Types.Date, format: 'DD/MM/YYYY', inputFormat: 'DD/MM/YYYY' },
	notes: { label: 'Observaciones', type: Types.Textarea },
	//histories: { type: Types.Relationship, ref: 'History', many: true, createInline: true }
});

Pet.relationship({ path: 'histories', ref: 'History', refPath: 'pet'});

Pet.relationship({ path: 'vaccines', ref: 'Vaccine', refPath: 'pet'});

/**
 * Registration
 */
Pet.defaultColumns = 'name, owner, specie';
Pet.register();
