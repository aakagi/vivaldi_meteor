Template.home_view.helpers({
    firstName: function() {
        userid = Meteor.userId();
        user = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return user.profile.firstName;
    },
    lastName: function() {
        userid = Meteor.userId();
        user = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return user.profile.lastName;
    },
    userClasses: userClasses,
    studentSections: studentSections,
    isTeacher: isTeacher,
    // Teacher home toggle between classes and leaderboards
    showClasses: function() {
    	return Session.get('showClasses');
    }, 
    seeLeaderboards: function() {
    	return Session.get('seeLeaderboards');
    },
    // Student home toggle between Tasks and Stats
    showTasks: function() {
    	return Session.get('showTasks');
    }, 
    viewStats: function() {
    	return Session.get('viewStats');
    },
    weeklyOverviewData: function() {
        var labels = [];
        var data = [];

        var date = new Date();
        date = date.setDate(date.getDate - 6);
        var i = 0;
        while (i < 7) {

            labels.push(date);
            data.push(getStudentPracticeByDate(Meteor.userId(), date));
            date = date.setDate(date.getDate() + 1);
            i++;
        }
        console.log(labels);
        console.log(data);
        return data;
        
    }
});

Template.home_view.rendered = function () {
    // Teacher home toggle between classes and leaderboards
    Session.set('showClasses', true);
    Session.set('seeLeaderboards', false);
    // Student home toggle between Tasks and Stats
    Session.set('showTasks', true);
    Session.set('viewStats', false);

    var complete = {
        labels: labels,
        datasets: [
            {
                label: Meteor.userId(),
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: data
            }
        ]
    }
    console.log('halp: ' + complete);
};

Template.home_view.events({
    // Teacher home toggle between classes and leaderboards
	'click #showClasses': function(){
		Session.set('showClasses', true);
		Session.set('seeLeaderboards', false);
	},
	'click #seeLeaderboards': function(){
		Session.set('showClasses', false);
		Session.set('seeLeaderboards', true);
	},
    // Student home toggle between Tasks and Stats
	'click #showTasks': function(){
		Session.set('showTasks', true);
		Session.set('viewStats', false);
	},
    'click #viewStats': function() {
        Session.set('showTasks', false);
        Session.set('viewStats', true);
    },
})
