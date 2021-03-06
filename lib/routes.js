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
  var newId = this.params.query.id;
  this.layout('onboarding_layout');
  this.render('confirm_email', {data: {newId: newId}});
});
Router.route('/onboard_form', function () {
  this.layout('onboarding_layout');
  this.render('onboard_form');
});
Router.route('/forgot_password', function () {
  this.layout('onboarding_layout');
  this.render('forgot_password');
});
Router.route('/reset_password', function (){
  this.layout('onboarding_layout');
  this.render('reset_password');
});

// Home
Router.route('/home', function () {
  if (Meteor.userId()){
    this.layout('general_layout', {data: {title: 'Vivaldi - Home Page'}});
    this.render('home_view');
  }
  else{
    Router.go('/');
  }
});


// Settings
Router.route('/settings', function () {
  if (Meteor.userId()){
    this.layout('general_layout');
    this.render('settings');
  }
  else{
    Router.go('/');
  }
  
});

//logging out!
Router.route('/logout', function(){
  Meteor.logout(function(err){
    if (err){
      console.log(err);
    }
    else{
      Router.go('/');
    }
  });
});

//class page: there's only one for student and teacher, but it's just rendered differently 
Router.route('/class', function(){
  if (Meteor.userId()){
    var classId = this.params.query.id;
    var thisClass = Classes.findOne({_id: classId});
    this.layout('general_layout', {data: {title: thisClass.name + ' - Class Page'}});
    this.render('class_view', {data: thisClass});
  }
  else{
    Router.go('home');
  }
});

//section page
Router.route('/section', function(){
  if (Meteor.userId()){
    var sectionId = this.params.query.id;
    var thisSection = Sections.findOne({_id: sectionId});
    this.layout('general_layout', {data: {title: thisSection.name + ' - Section Page'}});
    this.render('section_view', {data: thisSection});
  }
  else{
    Router.go('home');
  }
});

// user page
Router.route('/user', function(){
  var userId = this.params.query.id;
  // If user is not me
  if (Meteor.userId() && Meteor.userId() != userId) {
    // User object
    var thisUser = Meteor.users.findOne({_id: userId});
    // Renders teacher or student profile
    if (thisUser.profile.teacher) {

      this.layout('general_layout', {data: {title: thisUser.profile.firstName + ' ' + thisUser.profile.lastName + ' - ' + 'Teacher Page'}});
      this.render('teacher_view', {data: thisUser})
    } else {
      this.layout('general_layout', {data: {title: thisUser.profile.firstName + ' ' + thisUser.profile.lastName + ' - ' + 'Student Page'}});
      this.render('student_view', {data: thisUser})
    }
  } else {
    Router.go('home');
  }
});

// task page
Router.route('/task', function() {
  if (Meteor.userId()) {
    var taskId = this.params.query.id;
    var thisTask = Tasks.findOne({_id: taskId});
    this.layout('general_layout', {data: {title: thisTask.type + ' - Task Page'}});
    this.render('task_view', {data: thisTask})
  } else {
    Router.go('home');
  }
});

// How they talk to us
Router.route('/report', function() {
  this.layout('general_layout', {data: {title: 'Mr. Vivaldi'}});
  var thisUser = {
    // Alex's local
    _id: "5MEmDX88gieEJmKFh",
    // Live DB
    // _id: "nu8ShjxieNLwFDwsF",
    profile: {
      firstName: 'Mr.',
      lastName: 'Vivaldi'
    }
  }
  this.render('teacher_view', {data: thisUser});
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
