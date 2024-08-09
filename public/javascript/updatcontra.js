
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
                                font-size: 18px;
                                color: #9b599b;
    
    
                                "><i class='bx bxs-error-circle' ></i>  ${data.errors.password}</h2>
                        
                 
                 
                 `)
                }
                else if (typeof data.errors.Confirmar_contraseña !== 'undefined'){
                    
                 $('#inpu2').html(` <h2  class="error2" 
                                
                                style="position: relative;
                                font-family: 'Times New Roman', Times, serif;
                                font: small-caps 200% serif;
                                font-size: 18px;
                                color: #9b599b;
    
    
                                "><i class='bx bxs-error-circle' ></i>  ${data.errors.Confirmar_contraseña}</h2>
                        
                 
                 
                 `)
                    
                }
               // console.log(data.errors)
                
            })
            .catch(error => {

                $formulario.css({
                    'display':'none',
                    })
                
                $errormessage.html(`
                <center>
                    <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="error-icon__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="error-icon__cross" fill="none" d="M16 16 36 36 M36 16 16 36"/>
                    </svg>
                    <p class="ley1"  style="color: red;">Error al cambiar la contraseña. <br> Por favor, <br>inténtalo de nuevo más tarde.</p>
                    <br>
                    <br>
                    <button id="boton1" class="buton1" type="button">Intentar nuevamente</button>
                </center>


                 <style>
                     .error-icon__circle {
                            stroke-dasharray: 166;
                            stroke-dashoffset: 166;
                            stroke-width: 2;
                            stroke-miterlimit: 10;
                            stroke: #b21633;
                            fill: none;
                            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                            
                        }
                        
                        .error-icon {
                            position: absolute;
                            top: 120px;
                            right: 500px; 
                            width: 56px;
                            height: 56px;
                            border-radius: 50%;
                            display: block;
                            stroke-width: 2;
                            stroke: #fff;
                            stroke-miterlimit: 10;
                            margin: 10% auto;
                            box-shadow: inset 0px 0px 0px #b21633;
                            animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
                        }

                        .ley{
                            position: absolute;
                            top: 52%;
                            right: 27%;
                        }

                        .buton{
                            position: absolute;
                            top: 63%;
                            right: 28%;
                            background-color: #333;
                            color: #fff;
                            height: 45px;
                            width: 12%;
                            border-radius: 6px;
                            font-size: 16px;
                            cursor: pointer;
                        }
                        .buton:hover{
                            background-color: #555;
                        }
                        
                        .error-icon__cross {
                            transform-origin: 50% 50%;
                            stroke-dasharray: 48;
                            stroke-dashoffset: 48;
                            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
                        }
                        @keyframes stroke {
                            100% {
                            stroke-dashoffset: 0;
                            }
                        }
                        
                        @keyframes scale {
                            0%, 100% {
                            transform: none;
                            }
                            50% {
                            transform: scale3d(1.1, 1.1, 1);
                            }
                        }
                        
                        @keyframes fill {
                            100% {
                            box-shadow: inset 0px 0px 0px 30px #b21633;
                            }
                        }

                        
            
                 </style>




                    `)
    
               
                    $errormessage.css({

                    'display':'block',
                    
                
                
                
                })
                
        

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