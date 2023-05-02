import { AbstractControl } from "@angular/forms"

export class MyValidators {

  static validPasswordNumber(constrol:AbstractControl){
    const value=constrol.value;
    if(!containNumber(value)){
      return{invalid_password_number:true}
    }
    return null
  }

  static validPassworExpression(constrol:AbstractControl){
    const value=constrol.value;
    if(!isExpression(value)){
      return{invalid_password_expression:true}
    }
    return null
  }

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

function containNumber(value:string){
  return value.split('').find(item=>isNumber(item)) !== undefined
}

/*if is number, return True*/
function isNumber(value:string){
  return !isNaN(parseInt(value,10))
}

function isExpression(value:string){
  const regex = /[!@#$%^&*()/\-.?]/g;
  return value.match(regex);
}
