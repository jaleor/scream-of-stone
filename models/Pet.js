var keystone = require('keystone');
var Types = keystone.Field.Types;
//var Owner = require('Owner');

/**
 * Pet Model
 * ==========
 */
var Pet = new keystone.List('Pet');

Pet.add({
	name: { type: String, required: true, index: true },
	owner: { type: Types.Relationship, ref: 'Owner', createInline: true},
	specie:{ type: Types.Select, options: 'canino, felino'},
	breed: { type: Types.Select, options: 'mestizo, caniche'},
	gender: { type: Types.Select, options: 'hembra, macho', default: 'hembra' },
	castrated: { type: Types.Boolean },
	pelage: { type: String },	
	birthDate: { type: Types.Date },
	notes: { type: Types.Textarea },
	/*histories: { type: Types.Relationship, ref: 'History', many: true, createInline: true }
  	content: {
    	brief: { type: Types.Html, wysiwyg: true, height: 150 },
    	extended: { type: Types.Html, wysiwyg: true, height: 400 }
  	}*/
});

Pet.relationship({ path: 'histories', ref: 'History', refPath: 'pet'});

/**
 * Registration
 */
Pet.defaultColumns = 'name, owner, specie';
Pet.register();
