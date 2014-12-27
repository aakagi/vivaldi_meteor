Template.manage_class.events({
    'click #saveClass': function() {
        var classData = Template.currentData();
        var classID = classData._id;
        newName = document.getElementById('className').value
        Classes.update({
            _id: classID
        }, {
            $set: {
                name: newName
            }
        }, function (err){
        	if (err){
        		console.log(err);
        		setAlert('error', 'error writing to database');
        	}
        	else {
        		setAlert('info', 'class updated successfully!');
        	}
        });
    }
});

Template.manage_class.helpers({
	'studentList': function(){
		var studentIDs = Template.currentData().students;
		return Students.find({$in: studentIDs}).fetch();
	}
});

Template.students.events({
	'click #deleteStudent': function(){
		var studentID = Template.currentData()._id;
		var classData = Template.parentData(1);
		var studentList = classData.students;
		var indx = oldStudentList.indexOf(studentID);
		studentList.splice(indx, 1);
		Classes.update({_id: classData._id}, {$set: {students: studentList}}, function(err){
			if (err){
        		console.log(err);
        		setAlert('error', 'error writing to database');
        	}
        	else {
        		setAlert('info', 'student deleted');
        	}
		});
	}
})