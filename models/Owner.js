var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Owner Model
 * ==========
 */
var Owner = new keystone.List('Owner');

Owner.add({
	name: { type: Types.Name, required: true, index: true },
	telephone: { type: String },
	address: { type: Types.Location, defaults: { country: 'Argentina' } }
});


/**
 * Registration
 */
Owner.defaultColumns = 'name, telephone';
Owner.register();
