$(function () {


  




    function vercompras() {
        $.ajax({
            url: '/users/vercompras',
            method: 'GET',
            success: function(response) {
                console.log('Respuesta exitosa:', response);
                if (response) {
                    $('.holi').text('Al pareser ya has realizados compra anteriormente te pedidos que nos brindes tu codigo de verificacion')
                    
                } else {
                    $('.holi').text('Al pareser es la rpimera ves que realizas una compra por favor ingrege el codigo que la empresa te proporiciono si no lo tienes puedes perdilo ')
                }

                
            },
            error: function(xhr, status, error) {
                
                console.error('Error en esta petición específica:', error);
            }
        });
        
        


        
    }

    
















    $('#acceptButton').on('click',()=>{
        $('#container').css({
            'display':'none'
        })

        $('#btns').css({
            'display':'none'
        })

        $('#box4').css({
            'display':'block'
        })
        vercompras()
    })
    
})