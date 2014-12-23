setAlert = function(alertType, alert) {
        Session.set('alert', alert);
        Session.set('alertType', alertType);
        setInterval(function () {
            console.log("timeout");
            Session.set('alert', null);
            Session.set('alertType', null);
            Session.set('buttonName', null);
        }, 3200);
    }