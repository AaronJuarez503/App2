const verfication=require('./Gtoken')


module.exports={

    hay:function(req,res,next){
        const token = req.cookies.authToken;

        async function ay() {
            try {
               var respuesta = await verfication.validarToken2(token)
               console.log(respuesta)
               next();
            } catch (error) {
                res.render('error')
            }
            
        }

        if (!token) {
            console.log("renviando")
            res.render('login/inicio');
        } else {
            ay();
         }



    }


}
