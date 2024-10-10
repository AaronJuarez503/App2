 var tools={
    function_declarations: [
      {
        name: "sumar",
        description: "Suma dos números",
        parameters: {
          type: "object",
          properties: {
            num1: { type: "number", description: "Primer número" },
            num2: { type: "number", description: "Segundo número" }
          },
          required: ["num1", "num2"]
        }
      },
      {
        name: "restar",
        description: "Resta dos números",
        parameters: {
          type: "object",
          properties: {
            num1: { type: "number", description: "Número del cual restar" },
            num2: { type: "number", description: "Número a restar" }
          },
          required: ["num1", "num2"]
        }
      },
      {
        name: "multiplicar",
        description: "Multiplica dos números",
        parameters: {
          type: "object",
          properties: {
            num1: { type: "number", description: "Primer número" },
            num2: { type: "number", description: "Segundo número" }
          },
          required: ["num1", "num2"]
        }
      },
      {
        name: "dividir",
        description: "Divide dos números",
        parameters: {
          type: "object",
          properties: {
            num1: { type: "number", description: "Dividendo" },
            num2: { type: "number", description: "Divisor" }
          },
          required: ["num1", "num2"]
        }
      }
    ]
  };


  module.exports=tools;