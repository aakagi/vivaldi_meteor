Template.create_class.events({
    'click #createClass': function() {
        //get class data from fields
        className = document.getElementById('className').value;
        sectionNames = document.getElementById('sectionNames').value;
        schoolName = currentSchool();
        //split string using handy-dandy split function
        sectionNames = sectionNames.split(", ");
        userId = Meteor.userId();
        sectionIDs = []
        //defines a document, inserts it, then inserts the section ID into an array
        //array will be saved to the class document
        for (section in sectionNames) {
            sectionDoc = {
                name: section,
                users: []
            };
            sectionID = Sections.insert(sectionDoc);
            sectionIDs.push(sectionID);
        }
        //add teacher section
        teacherSectionDoc = {
            name: "Teachers",
            users: [userId]
        }
        teacherSectionID = Sections.insert(teacherSectionDoc);
        sectionIDs.push(teacherSectionID);

        classDoc = {
            name: className,
            school: schoolName,
            teachers: [userId],
            students: [],
            sections: sectionIDs
        };
        Classes.insert(classDoc, function(err, id){
        	if (err){
        		console.log(err);
        		setAlert('error', 'error writing to database');
        	}
        	else{
        		setAlert('info', 'class created successfully!');
        	}

        });
    }
});