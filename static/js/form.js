"use strict"

let inputCaptcha= document.querySelector(".inp-captcha"); 
let captchas=[{identificador:1, valor: "pdw38"}, {identificador:2, valor: "2en7g"},{identificador:3, valor:"8fexn"}] 

let captcha;

cambiarCaptcha();
let form= document.querySelector("#form");
form.addEventListener("submit", verificarCaptcha);

let recarga= document.querySelector(".img-recargar"); 
recarga.addEventListener("click", cambiarCaptcha);

function cambiarCaptcha(){
    captcha=Math.floor(Math.random()*captchas.length+1);
    document.querySelector(".img-captcha").src="../static/images/captcha" +captcha+ ".jpg"; 

}

function existeCaptcha (text){
    for (let c of captchas){
        if((text== c.valor))
            return true;
    }
    return false;
}

function verificarCaptcha(event){
    event.preventDefault();
    let text=document.querySelector('.inp-captcha').value;
    if (text=="")
        document.querySelector(".alerta").innerHTML= "Ingresar código de seguridad para enviar el formulario";  
    else
        if(existeCaptcha(text)==true){
            if (validarDatos()==true){
                document.querySelector(".alerta").innerHTML="El formulario se envió correctamente";
                form.reset();    
            }  
            else{
                document.querySelector(".alerta").innerHTML="El formulario tiene campos incorrectos";
            }
        }
        else{
            document.querySelector(".alerta").innerHTML="El código de seguridad ingresado es incorrecto"
            cambiarCaptcha();
        }
    cambiarCaptcha();
} 
function validarDatos(){
    let nombre=document.getElementById("nombre").value.trim();
    let apellido=document.getElementById("apellido").value.trim();
    let dni=document.getElementById("dni").value.trim();
    let tel=document.getElementById("telefono").value.trim();
    let error=document.getElementById("error");
    if(nombre=== " "|| apellido === " " || tel===""){
        error.textContent="Los campos no deben estar vacíos, complete por favor";
        error.style.color= "red";
        return false;
    }
    if(!/^[a-zA-Z]+$/.test(nombre)){
        error.textContent="Ingrese un nombre válido";
        error.style.color= "red";
        return false;
        
    }
    if(!/^[a-zA-Z]+$/.test(apellido)){
        error.textContent="Ingrese un apellido válido";
        error.style.color= "red";
        return false;
    }
    if(!/^[0-9]+$/.test(tel)){
        error.textContent="Ingrese un teléfono válido";
        error.style.color= "red";
        return false;
    }
    if (isNaN(tel)){
        error.textContent="Ingrese sólo números para el teléfono";
        error.style.color= "red";
        return false;
    }
    if(!/^[0-9]{7,8}$/.test(dni)){
        error.textContent="Ingrese un dni válido";
        error.style.color= "red";
        return false;
    }
    if (isNaN(dni)){
        error.textContent="Ingrese sólo números para el dni";
        error.style.color= "red";
        return false;
    }
    return true;
}  


