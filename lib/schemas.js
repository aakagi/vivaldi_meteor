var Section = new SimpleSchema({
	name: {
		type: String
		label: "Name"
	},
	students: {
		type: Array
		label: "Students"
	}});

Sections.attachSchema(Section);