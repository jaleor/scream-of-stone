var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Breed Model
 * ==========
 */
var Breed = new keystone.List('Breed', {
	autokey: { path: 'slug', from: 'newKey', unique: true },
	map: { name: 'newKey' },
	label: 'Razas', 
	singular: 'Raza', 
	plural: 'Razas',
});

Breed.add({
	newKey: { label: 'Nombre', type: Types.Text, watch: true, noedit: true, initial: false, hidden: true, value: function (callback) {
		var name = this.name;
		keystone.list('Specie').model.findOne({_id: this.specie.toString()}).exec(function (err, u) {
            if (err) {
                callback(err, "unknown")
            } else {
                var r = name + ' (' + u.name + ')';
                callback(null, r)
            }
        });
    }},
    name: { type: String, required: true, index: true, initial: true },
	specie:{ label: 'Especie', type: Types.Relationship, ref: 'Specie', createInline: true, required: true, initial: true }
});

/**
 * Registration
 */
Breed.defaultColumns = 'newKey';
Breed.register();
