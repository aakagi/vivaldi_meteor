// Index
Router.route('/', function () {
  if (Meteor.user()) {
    Router.go('/home');
  }
  this.render('index');
});
// Onboarding
Router.route('/sign_in', function () {
  this.layout('onboarding_layout');
  this.render('sign_in');
});
Router.route('/sign_up', function () {
  this.layout('onboarding_layout');
  this.render('sign_up');
});
Router.route('/confirm_email', function () {
  this.layout('onboarding_layout');
  this.render('confirm_email');
});
Router.route('/onboard_form', function () {
  this.layout('onboarding_layout');
  this.render('onboard_form');
});

// Home
Router.route('/home', function () {
  if (Meteor.userId()){
    this.layout('general_layout');
    this.render('home_view');
  }
  else{
    Router.go('/index');
  }
});


// Settings
Router.route('/settings', function () {
  if (Meteor.userId()){
    this.layout('general_layout');
    this.render('settings');
  }
  else{
    Router.go('/index');
  }
  
});

//logging out!

Router.route('/logout', function(){
  Meteor.logout(function(err){
    if (err){
      console.log(err);
    }
    else{
      Router.go('/index');
    }
  });
});

//class page: there's only one for student and teacher, but it's just rendered differently 
Router.route('/class/:id', function(){
  if (Meteor.userId()){
    var classId = this.params.id;
    var thisClass = Classes.findOne({_id: classId});
    this.render('class_view', {data: thisClass});
  }
  else{
    Router.go('home');
  }
  
});

// Sample Student
Router.route('/sample_student', function () {
    this.layout('general_layout');
    this.render('sample_student');
});
Router.route('/class_student', function () {
    this.render('student_body');
    this.render('class_student');
});
Router.route('/my_profile_student', function () {
    this.layout('general_layout');
    this.render('my_profile_student');
});
Router.route('/student_profile_student', function () {
    this.layout('general_layout');
    this.render('student_profile_student');
});
