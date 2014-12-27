var Section = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	students: {
		type: [String],
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
		type: [String],
		label: "Teachers"
	},
	students: {
		type: [String],
		label: "Students"
	},
	sections: {
		type: [String],
		label: "Sections"
	}
});

Classes.attachSchema(ClassSchema);