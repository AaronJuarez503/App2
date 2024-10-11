const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD8gfAM2ehwMh8E1t2myHN1yY2h7RLvpw4");
const {inst} = require('../Sexto_integrante/instruciones');
const tools = require("../Sexto_integrante/tools");

const metodos =require('../Sexto_integrante/funciones')


async function chatMath(prompt) {
    const model = genAI.getGenerativeModel({
         model: "gemini-1.5-flash",
        systemInstruction:inst ,
        tools: {functionDeclarations: [tools.buscar_marca, tools.sumar, tools.buscar_Empresa]},
        generationConfig: { temperature: 0.1 }
      });
      

        const chat = model.startChat();
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        
    try {
        if (response.candidates[0].content.parts[0].functionCall) {
                const call = result.response.functionCalls()[0];
                
            if (call) {
                    console.log(call.name)
                    console.log(`Ejecutando función: ${call.name} con argumentos:`,call.args);
                    const apiResponse = await metodos.functions[call.name](call.args);
                    console.log(apiResponse)
                    // Asegúrate de que la respuesta esté en el formato correcto
                    const formattedResponse = {
                        name: call.name,
                        response: { value: apiResponse } // Envolver el valor en un objeto
                    };
                    console.log("Respuesta formateada:", formattedResponse); // Log para depuración
                    
                    const result2 = await chat.sendMessage([{ functionResponse: formattedResponse }]);
                    // Log para depuración
                    console.log(result2.response.text());
                    return result2.response.text();
            }
        }

        return response.text();
            


    } catch (error) {
        console.error("Error detallado:", error);
        return `Lo siento, ha ocurrido un error al procesar tu solicitud: ${error.message}`;
    }
}
 




async function model0(req,res) {
    try {
        const respuestaSuma = await chatMath(req.body.mensaje);
        res.send(respuestaSuma);

        // const respuestaMensaje = await chatMath('Envía este mensaje: Hola Alan');
        // console.log(`Respuesta mensaje: ${respuestaMensaje}`);
    } catch (error) {
        console.error("Error en test:", error);
    }
}




module.exports = {
    question:model0
}