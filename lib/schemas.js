var Section = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    users: {
        type: [String],
        label: "Users"
    },
    leader: {
        type: String,
        label: "Section Leader",
        optional: true
    },
    order: {
        type: Number,
        label: "Order"
    }
});

Sections.attachSchema(Section);


//teachers, students, and sections are arrays of ids
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
    waitlist: {
    	type: [String],
    	label: "Waiting for Confirmation"
    },
    sections: {
        type: [String],
        label: "Sections"
    },
    locked: {
    	type: Boolean,
    	label: "Locked"
    }
});

Classes.attachSchema(ClassSchema);

var Task = new SimpleSchema({
    classId: {
        type: String,
        label: "Class ID"
    },
    type: {
        type: String,
        label: "Task Type"
    }, //'practice', 'audio', or 'post'
    name: {
        type: String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    sections: {
        type: [String],
        label: "Sections"
    },
    duration: {
        type: Number,
        label: "Duration"
    },
    youtubeURL: {
        type: String,
        label: "YouTube Link",
        optional: true
    },
    dueDate: {
        type: Date,
        label: "Due Date"
    },
    creationDate: {
        type: Date,
        label: "Creation Date"
    },
    points: {
        type: Number,
        label: "Point Value"
    }
});

Tasks.attachSchema(Task);

var TaskData = new SimpleSchema({
    taskId: {
        type: String,
        label: "Task ID"
    },
    userId: {
        type: String,
        label: "User ID"
    },
    progress: {
        type: Number,
        label: "Progress"
    }, //seconds
    notes: {
        type: String,
        label: "Notes",
        optional: true
    },
    complete: {
        type: Boolean,
        label: "Completed"
    },
    completionDate: {
        type: Date,
        label: "Completion Date",
        optional: true
    }
});

TasksData.attachSchema(TaskData);

var messageSchema = new SimpleSchema({
    sectionID: {
        type: String,
        label: "Section ID"
    },
    senderID:{
        type: String,
        label: "Sender ID"
    },
    body:{
        type: String,
        label: "Body"
    },
    date: {
        type: Date,
        label: "Date"
    }
});

Messages.attachSchema(messageSchema);

var statsSchema = new SimpleSchema({
    studentId: {
        type: String,
        label: "Student ID"
    },
    instrumentId:{
        type: String,
        label: "Instrument ID"
    },
    experience: {
        type: Number,
        label: "Experience"
    }
});

InstrumentStats.attachSchema(statsSchema);