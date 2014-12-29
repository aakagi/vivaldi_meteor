Template.change_password.events({
    'click #savePassword': function() {
    	confirm = document.getElementById('confirmPwd').value
        newpwd = document.getElementById('newPwd').value
        oldpwd = document.getElementById('currentPwd').value
        if (confirm == newpwd){
            Accounts.changePassword(oldpwd, newpwd, function(err){
                if (err){
                    setAlert('error', err);
                }
                else{
                    setAlert('info', 'password changed successfully');
                }
            });
        }
        else{
            //passwords do not match
            setAlert('error', 'passwords do not match');
        }
    	
    }
});