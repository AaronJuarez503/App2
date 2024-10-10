const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD8gfAM2ehwMh8E1t2myHN1yY2h7RLvpw4");


const {tools}= require('../Sexto_integrante/tools')

const {inst} = require('../Sexto_integrante/instruciones')





async function model0(req,res) {
    var promt = req.body.mensaje;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",systemInstruction:inst}); // Obtenemos el modelo generativo de Google.

    const chat = model.startChat({
      tools: tools, // Pasamos las herramientas matemáticas al chat.
      generationConfig: { temperature: 0.7 } // Configuración de generación.
    });


    try {
    
        const result = await chat.sendMessage([{ text: promt }]); // Enviamos el mensaje del usuario al chat.
        const response = await result.response; 
        res.send(response.text())
        
    } catch (error) {
        throw error
        
    }
   
}


module.exports = {
    question:model0
}