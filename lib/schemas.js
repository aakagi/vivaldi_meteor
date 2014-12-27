var Section = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	students: {
		type: [Object],
		label: "Students"
	}});

Sections.attachSchema(Section);

var ClassSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	school: {
		type: String,
		label: "School"
	},
	teachers: {
		type: [Object],
		label: "Teachers"
	},
	students: {
		type: [Object],
		label: "Students"
	},
	sections: {
		type: [Object],
		label: "Sections"
	}
});

Classes.attachSchema(ClassSchema);