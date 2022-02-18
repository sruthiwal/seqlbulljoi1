const Joi = require('joi');
const {department}=require('../controller/dep');
async function validdep(req,res){
const schema = Joi.object({ name: Joi.string() .min(5) .required(),
  id:Joi.string().min(2).required()
   });
  const validation = schema.validate(req.body);
  res.send(validation);
  
}
module.exports=exports=validdep;

/*const schema=Joi.object().keys({
    id:Joi.string(),
    name:Joi.string(),
  })
  /*Joi.Validate(schema,(err,value)=>{
    if(err){
      res.send(err)
    } else{
      next()
    }
  })
}*/
//module.exports=exports=validdep;