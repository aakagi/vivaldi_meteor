Template.temp_stats.helpers({
    currentMonth: function() {
        function currentMonth() {
            var d = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[d.getMonth()];
        }
        return currentMonth();
    },
    monthTime: function() {
        
        return practiceThisMonth(Meteor.userId());
    },
    totalTime: function() {
        return userTotalPractice(Meteor.userId());
    },
    userLevel: function() {
        return convertExpToLevel(userExp(Meteor.userId()))
    },
    totalExp: function() {
        return userExp(Meteor.userId());
    },
});