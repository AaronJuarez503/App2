$(function () {

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses son 0-11, por lo que se suma 1
    const año = fechaActual.getFullYear();

// Formatear la fecha como "DD/MM/YYYY"
    const fechaFormateada = `${dia}/${mes}/${año}`;

    console.log(fechaFormateada);
    
})