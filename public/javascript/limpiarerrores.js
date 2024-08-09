$(function () {

    var $input1 = $('.inpu1');
    var $input2 = $('.inpu2');
    var $input3 = $('.inpu3');
    var $input4 = $('.inpu4');
       
        

       $input1.on('input', function() {
           // Oculta el mensaje de error
           $('#div1').empty();
       });

       
       $input2.on('input', function() {
           // Oculta el mensaje de error
           $('#div2').empty();
       });
       
       $input3.on('input', function() {
           // Oculta el mensaje de error
           $('#div3').empty();
       });
       
       $input4.on('input', function() {
           // Oculta el mensaje de error
           $('#div4').empty();
       });
    
  })