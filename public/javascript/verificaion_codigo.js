$(function () {


  




    function vercompras() {
        $.ajax({
            url: '/users/vercompras',
            method: 'GET',
            success: function(response) {
                console.log('Respuesta exitosa:', response);
                
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