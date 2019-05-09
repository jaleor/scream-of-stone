var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * History Model
 * ==========
 */
var History = new keystone.List('History', {
	map: {name: 'createdDt'}
});

History.add({
	createdDt: { type: Types.Datetime, default: Date.now },
	notes: { type: Types.Textarea },
	pet: { type: Types.Relationship, ref: 'Pet'}
});


/**
 * Registration
 */
History.defaultColumns = 'createdDt, notes';
History.register();
