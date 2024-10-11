$(function () {

    
    $('#mio').off('click', '#btns').on('click', '#btns', function() {
        const toast = document.getElementById("toastNotificacion");
     
      toast.className = "toast mostrar";
      
      // Después de 3 segundos, quitar la clase "mostrar"
      setTimeout(function(){
        toast.className = toast.className.replace("mostrar", "");
      }, 3000);

    })
})