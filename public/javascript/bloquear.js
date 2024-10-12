$(function () {

    $('#mio').off('click', '#btns').on('click', '#btns', function() {
        const toast = document.getElementById("toastNotificacion");
     
      toast.className = "toast mostrar";
      
      // Después de 3 segundos, quitar la clase "mostrar"
      setTimeout(function(){
        toast.className = toast.className.replace("mostrar", "");
      }, 3000);

    })
    const fechaActual = new Date();


        const indiceDia = fechaActual.getDay();

        const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

        const diaSemana = diasSemana[indiceDia];

        console.log(diaSemana)
        $.ajax({
          url: `/users/habilitado?marca=${parseInt(localStorage.getItem('id'),10)}&dia=${'viernes'}`,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
              console.log('dato resibido:'+ data)

              if( data === false){
                  console.log('dia bloqueado')
              $('#mio button').each(function(index) {
                  const currentId = $(this).attr('id');
              $(this).attr('id', 'btns');
              $(this).text('🔒')
              
              let lista = JSON.parse(localStorage.getItem('carrito')) || [];
              

                  // Eliminar elementos donde marca es 4
                  for (let i = lista.length - 1; i >= 0; i--) {
                  if (lista[i].marca === parseInt(localStorage.getItem('id'),10)) {
                  lista.splice(i, 1);
                  }
                  }
                  localStorage.setItem('carrito', JSON.stringify(lista));

              


                  // Cambia el id a "btns0", "btns1", etc.
          });
          

              }

          },
          error: function(xhr, status, error) {
              console.error('Error en la petición AJAX:', error);
              $('#resultado').html('Error al cargar los datos');
          }
      })

    
})