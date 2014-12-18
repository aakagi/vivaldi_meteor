Template.alert.helpers({
    alert: function() {
        return Session.get('alert');
    },
    alertType: function() {
        return Session.get('alertType');
    }
});