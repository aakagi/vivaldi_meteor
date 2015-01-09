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
    },
    locked: {
        type: Boolean,
        label: "Locked"
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
    creationDate: {
        type: Date,
        label: "Date Assigned"
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
    senderID: {
        type: String,
        label: "Sender ID"
    },
    body: {
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
    instrument: {
        type: String,
        label: "Instrument Name"
    },
    experience: {
        type: Number,
        label: "Experience"
    },
    history: {
        type: [Object],
        label: "Practice History"
    }
});

InstrumentStats.attachSchema(statsSchema);

var userMessageSchema = new SimpleSchema({
    senderID: {
        type: String,
        label: "Sender"
    },
    recipientID: {
        type: String,
        label: "Recipient"
    },
    body: {
        type: String,
        label: "Body"
    },
    date: {
        type: Date,
        label: "Date"
    }
});

userMessages.attachSchema(userMessageSchema);

var challengeSchema = new SimpleSchema({
    challenger: {
        type: String,
        label: "Challenger"
    },
    challenged: {
        type: String,
        label: "Challenged"
    },
    start: {
        type: Date,
        label: "Start Date"
    },
    end: {
        type: Date,
        label: "End Date"
    },
    startXPchallenger:{
        type: Number,
        label: "Start XP for Challenger"
    },
    startXPchallenged:{
        type: Number,
        label: "Start XP for Challenged"
    },
    accepted: { 
        type: Boolean,
        label: "Accepted"
    },
    winner: {
        type: String,
        label: "Winner",
        optional: true
    }
});

Challenges.attachSchema(challengeSchema);


// TODO:
// var notificationSchema = new SimpleSchema({
//     assignedUserId: {
//         type: String,
//         label: "Assigned To"
//     },
    // type: {
    //     type: String,
    //     label: "Type"
    //     // practiceTask
    //     // audioTask
    //     // postTask
    //     // studentPost
    //     // sectionChat
    //     // userChat


//     },
//     anchorId: {
//         type: String,
//         label: "Append to Anchor"
//     },
//     created: {
//         type: Date,
//         label: "Created Date"
//     },
//     active: {
//         type: Boolean,
//         label: "Active"
//     }
// });

// Notifications.attachSchema(notificationSchema);
