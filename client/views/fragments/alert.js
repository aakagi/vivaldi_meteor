Template.alert.helpers({
    alert: function() {
        return Session.get('alert');
    },
    alertMessage: function() {
    	return Session.get('alertMessage');
    },
    alertType: function() {
        return Session.get('alertType');
    },
    isSuccess: function() {
    	if (Session.get('alertType') == 'success') {
    		return true;
    	}
    	return false;
    },
    isInfo: function() {
    	if (Session.get('alertType') == 'info') {
    		return true;
    	}
    	return false;
    },
    isError: function() {
    	if (Session.get('alertType') == 'error') {
    		return true;
    	}
    	return false;
    },
});