Template.index.rendered = function() {
  function openStudentSignUp() {
      $('#getStarted').fadeOut(250, function() {
          $('#studentSignUpForm').slideDown(250);
      });
  }

  function openRegisterModal() {
      windowWidth = window.innerWidth;
      if (windowWidth > 960) {
          newMarginTop = '-320px';
      } else if (windowWidth > 768) {
          newMarginTop = '-300px';
      } else {
          newMarginTop = '-270px';
      }
      $('#register-popup').animate({
              marginTop: newMarginTop,
              paddingTop: '20px',
              backgroundColor: 'rgba(255,255,255,0.95)'
          },
          '200', 'easeInOutBack', function() {
              $('#emailAdminSignup').focus();
          });
      $('#register-content').slideDown('200', 'easeInOutBack', function() {

      });

  }

  function closeRegisterModal() {
      $('#register-popup').animate({
              marginTop: '0',
              paddingTop: '20px'
          },
          '200', 'easeInOutBack', function() {
              $('#register-popup').animate({
                      backgroundColor: 'rgba(255,255,255,0)'
                  },
                  '200', 'easeInOutBack');
          });
      $('#register-content').slideUp('200', 'easeInOutBack', function() {

      });
  }


      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var loginFormVisible = false;
      var bigWindow = true;

      if (windowWidth < 960) {
          bigWindow = false;
      }

      $('#loginOpen').click(function(event) {
          if (!loginFormVisible) {
              $('#loginOpen').animate({
                  'width': '166px',
              }, 'fast', function(event) {

                  $("#emailInput, #pwdInput, #rememberMe").bind('keypress', function(e) {
                      if(e.keyCode==13){
                          loginSubmit();
                      }
                  });


                  $('#loginOpen').attr('onclick', 'loginSubmit()');
                  $('#emailInput, #pwdInput, #rememberMeInput').slideDown('fast', function() {
                      $('#emailInput').focus();
                      $('#closeInput').fadeIn('fast');
                  });
              });
              if (windowWidth < 960 && !loginFormVisible) {
                  $('#loginBack').slideDown('fast', function() {});
                  $('#bodyContent').animate({
                      marginTop: '200px'
                  }, 'fast');
              }
              loginFormVisible = true;
          }
      });
      $('#closeInput').click(function(event) {
          if (loginFormVisible) {
              $('#closeInput').fadeOut('fast', function() {
                  $('#emailInput, #pwdInput, #rememberMeInput').slideUp('fast', function() {
                      $('#loginOpen').animate({
                          'width': '65px'
                      }, 'fast');
                      $('#loginOpen').removeAttr('onclick');
                      if (windowWidth < 960) {
                          $('#loginBack').slideUp('fast');
                          $('#bodyContent').animate({
                              marginTop: '0'
                          }, 'fast');
                      }
                  });
              });

              loginFormVisible = false;
          }
      });

      window.onresize = function(event) {
          windowWidth = window.innerWidth;
          windowHeight = window.innerHeight;
          if (bigWindow && windowWidth < 960) {
              if (loginFormVisible) {
                  $('#loginBack').slideDown('fast', function() {});
                  $('#bodyContent').animate({
                      marginTop: '200px'
                  }, 'fast');
              }
              bigWindow = false;
          } else if (!bigWindow && windowWidth >= 960) {
              if (loginFormVisible) {
                  $('#loginBack').slideUp('fast', function() {});
                  $('#bodyContent').animate({
                      marginTop: '0'
                  }, 'fast');
              }
              bigWindow = true;
          }
      };

}

