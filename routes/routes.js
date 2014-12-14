
Router.route('/', function () {
  this.render('index');
});


// Onboarding
Router.route('/sign_in', function () {
  this.render('sign_in');
});
Router.route('/sign_up', function () {
  this.render('sign_up');
});
Router.route('/onboard_student', function () {
  this.render('onboard_student');
});
Router.route('/onboard_teacher', function () {
  this.render('onboard_teacher');
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


// Sample Student
Router.route('/sample_student', function () {
    this.layout('student_layout');
    this.render('sample_student_side', {to: 'side_content'});
    this.render('sample_student')
});

// Router.route('/class_student', function () {
//     this.render('student_body');
//     this.render('class_student');
// });
// Router.route('/my_profile_student', function () {
//     this.render('student_body');
//     this.render('my_profile_student');
// });
// Router.route('/student_profile_student', function () {
//     this.render('student_body');
//     this.render('student_profile_student');
// });
// Router.route('/task_student', function () {
//     this.render('student_body');
//     this.render('task_student');
// });
// Router.route('/settings_student', function () {
//     this.render('student_body');
//     this.render('settings_student');
// });
// Router.route('/my_section_student', function () {
//     this.render('student_body');
//     this.render('my_section_student');
// });
// Router.route('/view_section_student', function () {
//     this.render('student_body');
//     this.render('view_section_student');
// });
// Router.route('/settings_student', function () {
//     this.render('student_body');
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



