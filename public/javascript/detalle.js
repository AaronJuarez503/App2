$(function () {

   

    const { imagen, fecha, marca } = window.pedidoData;

    console.log('Imagen:', imagen);
    console.log('Fecha:', fecha);
    console.log('Marca:', marca);

    // Llamamos a la función que actualiza la UI
    window.actualizarUI(imagen,fecha,marca);


    Modulo1.ajax(marca,fecha)



    
})