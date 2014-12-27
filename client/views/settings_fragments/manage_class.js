Template.manage_class.events({
    'click #saveClass': function() {
        classData = Template.currentData();
        classID = classData._id;
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