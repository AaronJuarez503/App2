
$(function() {
    // Agregar una entrada al historial
    $('form').on('submit', function(e) {
         e.preventDefault();

        
         var contraseña = $('#contraseña').val();
         var confirm_password=$("#contra2").val();
         var $mensaje=$('#successMessage')
         var $formulario=$('#formulario')
         var $errormessage=$('#errorMessage')


        // alert("contraseñas "+ contraseña +":" +confirm_password)

        fetch('/nueva_pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ password: contraseña,Confirmar_contraseña:confirm_password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    $formulario.css({
                    'display':'none',
                    })
    
               
                    $mensaje.css({
                    'display':'block',
                    })
    
                } else if( typeof data.errors.password !== 'undefined'){
                    $('#inpu1').html(` <h2 id="e1" class="error1" 
                                
                                style="position: relative;
                                font-family: 'Times New Roman', Times, serif;
                                font: small-caps 200% serif;
                                font-size: 10px;
                                color: #9b599b;
    
    
                                "><i class='bx bxs-error-circle' ></i>  ${data.errors.password}</h2>
                        
                 
                 
                 `)
                }
                else if (typeof data.errors.Confirmar_contraseña !== 'undefined'){
                    
                 $('#inpu2').html(` <h2  class="error2" 
                                
                                style="position: relative;
                                font-family: 'Times New Roman', Times, serif;
                                font: small-caps 200% serif;
                                font-size: 10px;
                                color: #9b599b;
    
    
                                "><i class='bx bxs-error-circle' ></i>  ${data.errors.Confirmar_contraseña}</h2>
                        
                 
                 
                 `)
                    
                }
               // console.log(data.errors)
                
            })
            .catch(error => {

            
                
        

                });



                var $passwordInputs = $('#contraseña,#contra2');
               
                
        
            $passwordInputs.on('input', function() {
                // Oculta el mensaje de error
        
                $('#e1').empty();
                $('#inpu2').empty();
            });
        
      });
 }

)//fin