practiceThisMonth = function(userId) {
    var instrumentStatsDoc = InstrumentStats.findOne({
        studentId: userId
    });

    var d = new Date();
    var currentMonth = d.getMonth();
    var monthPractice = 0;


    for (i = 0; i < instrumentStatsDoc.history.length; i++) {
        var historyMonth = instrumentStatsDoc.history[i].date.getMonth();
        if (historyMonth == currentMonth){
            monthPractice += instrumentStatsDoc.history[i].duration;
            console.log(monthPractice);
        }
    }

    var roundMin = Math.round(monthPractice/60);


    
    return roundMin;

}

userTotalPractice = function(userId) {
    var instrumentStatsDoc = InstrumentStats.findOne({
        studentId: userId
    });

    var userPractice = 0;
    for (i = 0; i < instrumentStatsDoc.history.length; i++) {
        userPractice += instrumentStatsDoc.history[i].duration;
        console.log(userPractice);
    }

    var roundMin = Math.round(userPractice/60);

    return roundMin;
}

userExp = function(userId) {
    var instrumentStatsDoc = InstrumentStats.findOne({
        studentId: userId
    });

    return instrumentStatsDoc.experience;
}