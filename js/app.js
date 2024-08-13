//Seleccionamos los elementos del DOM(document object model)
const textArea = document.querySelector(".text-area"); //Caja donde el usuario ingresa el texto a encriptar.
const mensaje = document.querySelector(".mensaje"); //Caja donde se mostrará el texto encriptado.

//Reglas de Encriptar

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

//Reglas de Desencriptar

// La letra "enter" es convertida para "e"
// La letra "imes" es convertida para "i"
// La letra "ai" es convertida para "a"
// La letra "ober" es convertida para "o"
// La letra "ufat" es convertida para "u"

function validarTexto(texto){
    if(texto.trim() === "") { //Verifica si el texto está vacío.
        alert("El texto está vacío. Ingresa algún texto.")
        return false; //Si el texto está vacío después de eliminar estos espacios, se muestra una alerta indicando que el campo está vacío y la función devuelve false.
    }

    // ^ = Indica el inicio de una cadena.
    // [a-z\s] = Define el conjunto de caracteres permitidos. (a-z = Permite cualquier letra minuscula desde la "a" hasta la "z").
    // \s = Permite cualquier espacio en blanco.
    // + = Inidica el patrón anterior (letras minusculas y espacios) debe aparecer al menos una vez, y puede repetirse muchas veces.
    // $ = Indica el final de la cadena.


    const caracteres = /^[a-z\s]+$/; //Estamos creando una expresión que se utiliza para definir un patrón que el texto debe cumplir.
    if(!caracteres.test(texto)){ //Este metodo verifica si el texto coincide con el patron definido por la expresion regular. (El operador ! niega el resultado, verifica si el texto no cumple con el patrón.)
        alert("El texto contiene caracteres no permitidos. Solo permite letras minúsculas y espacios.");
        return false; //Si el texto contiene algún carácter fuera de estos (como números, mayúsculas o símbolos), la función devuelve false y muestra una alerta indicando que hay caracteres no permitidos.
    } 

    return true;
}


function btnEncriptar(){ //Funcion donde se ejecuta cuando el usuario presiona el botón "encriptar".
    const textoUsuario = textArea.value;
    if(validarTexto(textoUsuario)){
        const textoEncriptado = encriptar(textArea.value) //Obtiene el texto ingresado por el usuario. (Luego llama otra función llamada encriptar, pasando el texto del usuario como argumento.)
        mensaje.value = textoEncriptado //Asigna el resultado de la encriptacion al área de texto de salida.
        textArea.value = ""; //Vaciamos el contenido del elemento de texto (textarea) después de que se ha realizado la encriptación o desencriptación. 
        mensaje.style.backgroundImage = "none"; //Quitamos la imagen una vez presionemos el boton encriptar o desencriptar.
    }
}

//Hacemos lo mismo con el botón de desencriptar pero en este caso cambiamos para el botón de desencriptar.

function btnDesencriptar(){ 
    const textoUsuario = textArea.value;
    if(validarTexto(textoUsuario)){
        const textoDesencriptado = desencriptar(textArea.value)
        mensaje.value = textoDesencriptado
        textArea.value = "";
        mensaje.style.backgroundImage = "none";
    }
}


function copiar(){ //Definimos una funcion copiar que no recibe ningún parámetro.
    if(mensaje.value){ //Verifica si tiene algún contenido.(mensaje = referencia a un elemento de entrada de texto como input o textarea.)(.value = obtiene el contenido actual del elemento.)
        mensaje.select()//Si hay contenido, el método selecciona todo el texto dentro del elemento(mensaje).
        document.execCommand("copy"); //Antiguo pero compatible. Copia el texto actualmente seleccionado al portapapeles del sistema.

        //Cambiamos el texto del botón
        const botonCopiar = document.querySelector(".btn-copiar"); //Seleccionamos el elemento del DOM. (Está es la caja del boton copiar)
        botonCopiar.textContent = "¡Copiado!"; //Aquí cambiamos el texto copiar a ("¡Copiado!"). La propiedad correcta para cambiar el texto de un elemento es textContent (o innerText en algunos casos).
        setTimeout(() => botonCopiar.textContent = "Copiar", 2000); //setTimeout función que permite ejecutar un fragmento de codigo despues de un tiempo especifico.(=> arrow function, forma de escribir una función anónima).(2000 tiempo de espera en milisegundos. 2000 milisegundos equivalen a 2 segundos).

    }else {
        alert("¡No hay texto para copiar!") //Si no hay texto para copiar nos mostrará el mensaje.
    }
}

//Creamos una función para Encriptar.

function encriptar(stringEncriptada){ //Es la funcion principal que realiza la transformación del texto.
    let codigos = [["e" , "enter"] , ["i" , "imes"] , ["a" , "ai"] , ["o" , "ober"] , ["u" , "ufat"]]; //Se crea una matriz de códigos que contiene las reglas de encriptación. Cada submatriz tiene dos elementos: carácter a remplazar y el texto que lo reemplazará.
    stringEncriptada = stringEncriptada.toLowerCase(); //Convierte todo el texto a minúsculas para asegurar que el proceso de encriptación funcione correctamente, ya que solo admiten minúsculas.

    for(let i = 0; i < codigos.length; i++){ //Se utiliza un bucle for para iterar a través de cada regla en la matriz "códigos".
        if(stringEncriptada.includes(codigos[i][0])){ //Verifica si el texto contiene el carácter actual que necesita ser reemplazado.
            stringEncriptada = stringEncriptada.replaceAll(codigos[i][0] ,codigos[i][1]); //Reemplaza todas las ocurrencias del carácter actual con su equivalente encriptado.

        }

    }

    return stringEncriptada; //La función devuelve el texto encriptado.
}

//Creamos otra función para el botón desencriptar. (Cambiamos valores para desencriptar, utiliza la misma metodología, la matriz de codigos las cambiamos también)

function desencriptar(stringDesencriptar){
    let codigos = [["enter" , "e"] , ["imes" , "i"] , ["ai" , "a"] , ["ober" , "o"] , ["ufat" , "u"]];
    stringDesencriptar = stringDesencriptar.toLowerCase();

    for(let i = 0; i < codigos.length; i++){
        if(stringDesencriptar.includes(codigos[i][0])){
            stringDesencriptar = stringDesencriptar.replaceAll(codigos[i][0] ,codigos[i][1]);

        }

    }

    return stringDesencriptar;
}
