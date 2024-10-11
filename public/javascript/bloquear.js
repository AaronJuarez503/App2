$(function () {

    const fechaActual = new Date();


    const indiceDia = fechaActual.getDay();

    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    const diaSemana = diasSemana[indiceDia];

console.log(`Hoy es ${diaSemana}`);
    
})