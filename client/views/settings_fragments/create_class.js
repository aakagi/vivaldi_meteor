Template.create_class.events({
	'click #createClass': function(){
		//get class data from fields
		className = document.getElementById('className').value;
		sectionNames = document.getElementById('sectionNames').value;
		//split string using handy-dandy split function
		sectionNames = sectionNames.split(", ");
		sectionIDs = []
		//defines a document, inserts it, then inserts the section ID into an array
		//array will be saved to the class document
		for (section in sectionNames){
			sectionDoc = {name: section, students: []};
			sectionID = Sections.insert(sectionDoc);
			sectionIDs.push(sectionID);
		}
	}
});