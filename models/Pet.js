var keystone = require('keystone');
var Types = keystone.Field.Types;
//var Owner = require('Owner');

/**
 * Pet Model
 * ==========
 */
var Pet = new keystone.List('Pet', {
	autokey: { path: 'slug', from: 'newKey', unique: true },
    map: { name: 'newKey' },
	label: 'Pacientes', singular: 'Paciente', plural: 'Pacientes'
});

Pet.add({
	newKey: { label: 'Nombre', type: Types.Text, watch: true, noedit: true, initial: false, hidden: true, value: function (callback) {
        var name = this.name;
        var owner = this.owner;
        keystone.list('Owner').model.findOne({_id: this.owner.toString()}).exec(function (err, u) {
            if (err) {
                callback(err, "unknown")
            } else {
                var r = name + " - (" + u.name.first + " " + u.name.last + ")";
                callback(null, r)
            }
        });
    }},
	name: { label: 'Nombre', type: String, required: true, index: true, initial: true },
	owner: { label: 'Dueño', type: Types.Relationship, ref: 'Owner', createInline: true, required: true, initial: true },
	specie:{ label: 'Especie', type: Types.Relationship, ref: 'Specie', createInline: true, required: true, initial: true },
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
Pet.defaultColumns = 'newKey, owner, specie';
Pet.register();
