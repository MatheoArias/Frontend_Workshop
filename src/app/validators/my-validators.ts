import { AbstractControl } from "@angular/forms"

export class MyValidators {

  static validPasswordNumber(control:AbstractControl){
    const value=control.value;
    if(!containNumber(value)){
      return{invalid_password_number:true}
    }
    return null
  }

  //This function validated if function
  static validPassworExpression(control:AbstractControl){
    const value=control.value;
    if(!isExpression(value)){
      return{invalid_password_expression:true}
    }
    return null
  }

  //This function verififiqued if passwordd input is equal to password confirm input
  static matchPassword(control:AbstractControl):object | null{
    const password=control?.get('password')?.value;
    const passwordConfirm=control?.get('password_confirm')?.value;
    if(password==passwordConfirm){
      console.log('Diferentes')
      return null
    }
    return {match_password:true}
  }
}

//this is function separated the text string  in  an array and  verifiqued if  any the array items  is a number..
function containNumber(value:string){
  return value.split('').find(item=>isNumber(item)) !== undefined
}

//This is function
function isNumber(value:string){
  return !isNaN(parseInt(value,10))
}

//This validation is for register new user
function isExpression(value:string){
  const regex = /[!@#$%^&*()/\-.?]/g;
  return value.match(regex);
}
