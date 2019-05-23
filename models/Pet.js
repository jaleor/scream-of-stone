var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	//specie:{ label: 'Especie', type: Types.Relationship, ref: 'Specie', createInline: true, required: true, initial: true, watch: true, value: function (callback) {console.log("xx")} },
	//breed: { label: 'Raza', type: Types.Relationship, ref: 'Breed', dependsOn: { specie: ["5ce3228a998c2c1376243f7f", "5ce31d32f904f810cd82bb87"] }, filters: { specie: ':specie' }, createInline: true, required: false, initial: false },
	//breed: { label: 'Raza', type: Types.Select, options: getBreeds(this.specie) },
	breed: { label: 'Raza (Especie)', type: Types.Relationship, ref: 'Breed', createInline: true, required: true, initial: true },
	gender: { label: 'Género', type: Types.Select, options: 'hembra, macho', default: 'hembra' },
	isCastrated: { label: 'Castrado/a', type: Types.Boolean },
	castratedDate: { label: 'Fecha de castración', dependsOn: { isCastrated: true }, type: Types.Date, format: 'DD/MM/YYYY', inputFormat: 'DD/MM/YYYY' },
	pelage: { label: 'Pelaje', type: String },	
	birthDate: { label: 'Fecha de nacimiento', type: Types.Date, format: 'DD/MM/YYYY', inputFormat: 'DD/MM/YYYY' },
	notes: { label: 'Observaciones', type: Types.Textarea },
	//histories: { type: Types.Relationship, ref: 'History', many: true, createInline: true }
});

Pet.relationship({ path: 'histories', ref: 'History', refPath: 'pet'});

Pet.relationship({ path: 'vaccines', ref: 'Vaccine', refPath: 'pet'});

/* PARA SETEAR LA ESPECIE DESDE LA RAZA
Pet.schema.pre('save', function(next) {
	console.log(this);
	let breed = keystone.list('Breed').model.findOne({_id: this.breed.toString()}).exec(function (err, u) {
		if (err) {
			callback(err, "unknown")
		} else {			
			callback(null, u)
		}
	});
	console.log("breed", breed);
	//this.specie = this.breed.specie;
	next();
    //this.contentFull = this.content.full;
});
*/

	/*
function checkSpecie() {
	console.log("check specie", this.isCastrated);
	this.isCastrated = false;
	return false;
	
}

Pet.schema.post('init', function() {
	console.log("okkkkkk", this.specie);
    //this.contentFull = this.content.full;
});

Pet.schema.virtual('speciex', function () {
	return this.specie;
	if (this.specie) return true;
  });

function getBreeds(specie) {
	
	let breedsOp = [];
	keystone.list('Breed').model.find({'specie': '5ce31d32f904f810cd82bb87'}, function (err, breeds) {
		 breedsOp = breeds;
	});
	return breedsOp;
}*/


/**
 * Registration
 */
Pet.defaultColumns = 'newKey, breed, owner';
Pet.register();
