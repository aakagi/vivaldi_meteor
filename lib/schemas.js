var Section = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	students: {
		type: Array,
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
		type: Array,
		label: "Teachers"
	},
	students: {
		type: Array,
		label: "Students"
	},
	sections: {
		type: Array,
		label: "Sections"
	}
});

Classes.attachSchema(ClassSchema);