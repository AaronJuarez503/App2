$(function() {

        

    $('.bxs-lock-alt').on('click', function() {
  
  
  
      // Cambiar el icono
      $(this).toggleClass('bxs-lock-open');
      
      // Mostrar/ocultar contraseña
      var passwordInput = $('#pass');
      if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
      } else {
        passwordInput.attr('type', 'password');
      }
    });
  });