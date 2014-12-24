setAlert = function(alertType, alert) {
        Session.set('alert', alert);
        Session.set('alertType', alertType);
        setTimeout(function () {
            console.log("timeout");
            Session.set('alert', null);
            Session.set('alertType', null);
            Session.set('buttonName', null);
        }, 3200);
    }

//userid: string
//data: JSON
updateUserData = function(userid, data){
	//I think I can access the collection directly? 
    currentUser = users.update({_id: userid}, {$set: data});
}