Meteor.startup(function () {
  smtp = {
    username: 'vivaldimailer@gmail.com',   // eg: server@gentlenode.com
    password: 'YCombVivaldi',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 
    'smtp://' + encodeURIComponent(smtp.username) 
    + ':' + encodeURIComponent(smtp.password) 
    + '@' + encodeURIComponent(smtp.server) 
    + ':' + smtp.port;
});


// (server-side)
Meteor.startup(function() {
  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'Vivaldi Team <vivaldimailer@gmail.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'Vivaldi Education';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.enrollAccount.subject = function(user) {
    return 'Confirm Your Email Address';
  };

  Accounts.emailTemplates.enrollAccount.text = function(user, url) {
    var hashIndex = url.indexOf('#');
    var rootPath = url.substring(0, hashIndex - 1);
    var hash = url.substring(hashIndex);
    var newUrl = rootPath + '/onboard_form/' + hash;
    console.log(newUrl);
    return 'click on the following link to make your account: ' + newUrl;
  };
});

