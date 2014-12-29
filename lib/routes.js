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
  this.layout('general_layout');
  this.render('dashboard_view');
});


// Settings
Router.route('/settings', function () {
  this.layout('general_layout');
  this.render('settings');
});




// Misc
Router.route('/student_body', function () {
  this.render('student_body');
});
Router.route('/side_bar', function () {
  this.render('side_bar');
});
Router.route('/sign_out', function () {
  this.render('sign_out');
});
Router.route('/admin_controls', function () {
  this.render('admin_controls');
});
Router.route('/side_menu', function () {
  this.render('side_menu');
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
// Router.route('/teacher_profile_student', function () {
    // this.layout('general_layout');
//     this.render('student_profile_student');
// });
// Router.route('/task_student', function () {
    // this.layout('general_layout');
//     this.render('task_student');
// });
// Router.route('/settings_student', function () {
    // this.layout('general_layout');
//     this.render('settings_student');
// });
// Router.route('/my_section_student', function () {
    // this.layout('general_layout');
//     this.render('my_section_student');
// });
// Router.route('/view_section_student', function () {
    // this.layout('general_layout');
//     this.render('view_section_student');
// });
// Router.route('/settings_student', function () {
    // this.layout('general_layout');
//     this.render('settings_student');
// });


// Sample Teacher
// Router.route('/sample_teacher', function () {
//   this.render('sample_teacher');
// });
// Router.route('/class_teacher', function () {
//   this.render('class_teacher');
// });
// Router.route('/task_teacher', function () {
//   this.render('sample_teacher');
// });
// Router.route('/manage_class_teacher', function () {
//   this.render('sample_teacher');
// });
// Router.route('/student_teacher', function () {
//   this.render('sample_teacher');
// });
// Router.route('/section_teacher', function () {
//   this.render('sample_teacher');
// });
// Router.route('/teacher_chat_teacher', function () {
//   this.render('sample_teacher');
// });
// Router.route('/settings_teacher', function () {
//   this.render('sample_teacher');
// });



