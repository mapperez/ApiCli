const formatErrors = (Generalerror,otherErrors) => {



  let objErrors = [];
  const listaErrores = Generalerror.errors;
  const SystemaError = Generalerror;
  const OtrosErrores = otherErrors;



  if(listaErrores){
    Object.entries(errors).map(error => {
      const { path, message } = error[1];
      objErrors.push({ path, message });
    });
    objErrors = objErrors.concat(otherErrors);
  }

  if(SystemaError){
    if(SystemaError.code){
      
      switch(SystemaError.code){
        case 11000:

        objErrors = objErrors.concat({
          path: "Registro",
          message: "El usuario ya esta registrado"
        });

        break; 

        default: 
          objErrors = objErrors.concat({
            path: SystemaError.name,
            message: SystemaError.message
          });
        break;
      }

     
    }else{
      Object.entries(SystemaError).map(error => {
        const { path, message } = error[1];
        objErrors.push({ path, message });
      });
      objErrors = objErrors.concat(otherErrors);

    }
   
  }




 
  
  return objErrors;
};

export default formatErrors;
