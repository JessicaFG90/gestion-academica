//Para el menú
const readline = require('readline');

//Creamos la interfaz de lectura conectada al teclado y a la consola.
const rl = readline.createInterface({
  input: process.stdin,  //Leemos desde el teclado.
  output: process.stdout //Mostramos en la consola.
});

//Recibe el texto a mostrar y una función callback que se ejecuta con la respuesta del usuario.
function preguntar(texto, callback) {
  rl.question(texto, callback); //Muestra el texto y llama a callback con lo que escriba el usuario.
}


//=== BLOQUE 9: ÁMBITO DE VARIABLES ===

//Variable GLOBAL: Es accesible desde cualquier parte del programa.
var sistemaActivo = true; //var tiene ámbito de función (o global si está fuera).

//Ejemplo de diferencia entre var y let:
function ejemploAmbitoVariables() {
  //var tiene ámbito de FUNCIÓN: Se puede usar fuera del bloque if.
  if (true) {
    var variableVar = "Soy var."; //Declarada dentro del if.
    let variableLet = "Soy let."; //Declarada dentro del if.
    console.log("Dentro del if - var:", variableVar); //Funciona.
    console.log("Dentro del if - let:", variableLet); //Funciona.
  }
  console.log("Fuera del if - var:", variableVar); //Funciona: var "escapa" del bloque.
  //console.log("Fuera del if - let:", variableLet); //ERROR: let NO escapa del bloque.
  //let respeta el bloque {} donde fue declarada, pero var se puede utilizar fuera de él.
}

//Llamamos a la función para demostrar el comportamiento.
ejemploAmbitoVariables();

//=== BLOQUE 1: ARRAY GLOBAL DE ESTUDIANTES ===

//Array GLOBAL que almacenará todos los objetos estudiante.
let estudiantes = []; //Array vacío al inicio, se irá llenando con agregarEstudiante().

//=== BLOQUE 2: REGISTRO DE ESTUDIANTES ===

//Función para agregar un nuevo estudiante al array global.
function agregarEstudiante(id, nombre, edad) {
  try {
    //Validación 1 -> El ID debe ser de tipo number.
    if (typeof id !== "number") {
      throw new Error("El ID debe ser un número."); //Si no lo es, lanza el error.
    }

    //Validación 2 -> El nombre debe ser un String y no puede estar vacío.
    if (typeof nombre !== "string" || nombre.trim() === "") {
      throw new Error("El nombre debe ser un texto no vacío."); //Si no es un texto o está vacío, lanza el error.
    }

    //Validación 3 -> La edad debe ser un número entero y positivo.
    if (typeof edad !== "number" || !Number.isInteger(edad) || edad <= 0) {
      throw new Error("La edad debe ser un número entero positivo."); //Si no es un número, no es entero o es negativo (menos que 0), lanza el error.
    }

    // Validación 4 -> No puede existir otro estudiante con el mismo ID.
    for (let i = 0; i < estudiantes.length; i++) { //Recorremos el array con un for.
      if (estudiantes[i].id === id) { //Comparación estricta para comprobar IDs.
        throw new Error(`Ya existe un estudiante con el ID ${id}.`); //Si el ID ya existe, lanza el error.
      }
    }

    //Si todas las validaciones pasan, creamos el objeto estudiante.
    let nuevoEstudiante = {
      id: id, //Identificador único (número).
      nombre: nombre, //Nombre del estudiante (String).
      edad: edad, //Edad del estudiante (número entero positivo).
      notas: [], //Array vacío para almacenar las notas que se añadan después.

      //=== BLOQUE 7: OBJETOS Y THIS ===
      //this hace referencia al propio objeto estudiante en el que está el método.
      mostrarInformacion: function () {
        console.log("--- Información del Estudiante ---");
        console.log("Nombre:", this.nombre); //Accedemos al nombre del propio objeto.
        console.log("Edad:", this.edad); //Accedemos a la edad del propio objeto.
        console.log("Número de notas registradas:", this.notas.length); //Longitud del array de notas.
      }
    };

    //Insertamos el nuevo estudiante al final del array global usando push().
    estudiantes.push(nuevoEstudiante);
    console.log(`✅ Estudiante ${nombre} añadido correctamente con ID ${id}.`);

  } catch (error) { //Si se lanzó algún error con throw, lo capturamos aquí y mostramos el mensaje.
    console.log("❌ Error al registrar estudiante: ", error.message);
  } finally { //El bloque finally siempre se ejecuta, haya error o no.
    console.log("Intento de registro finalizado.");
  }
}

//=== BLOQUE 3: GESTIÓN DE NOTAS ===

//Función para agregar una nota a un estudiante existente.
function agregarNota(idEstudiante, nota) {
  //Validación -> La nota debe estar entre 0 y 10 (ambos incluidos).
  if (nota < 0 || nota > 10) {
    console.log("❌ La nota debe estar entre 0 y 10."); //Si es negativa o mayor que 10, lanza el mensaje de error.
    return; //Salimos de la función sin hacer nada más.
  }

  //Buscamos el estudiante recorriendo el array con un bucle for.
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].id === idEstudiante) { //Comparación estricta === para comparar el ID.
      estudiantes[i].notas.push(nota); //Añadimos la nota al array de notas del estudiante.
      console.log(`✅ Nota ${nota} añadida al estudiante con ID ${idEstudiante}.`);
      return; //Salimos de la función una vez encontrado y actualizado el estudiante.
    }
  }

  //Si el bucle termina sin encontrar el estudiante, mostramos error.
  console.log(`❌ No se encontró ningún estudiante con ID ${idEstudiante}.`);
}

//=== BLOQUE 4: CÁLCULO DE PROMEDIO ===

//Función para calcular y mostrar el promedio de notas de un estudiante.
function calcularPromedio(idEstudiante) {
  let estudianteEncontrado = null; //Variable para guardar el estudiante cuando lo encontremos.

  //Buscamos el estudiante usando forEach con una arrow function (función flecha).
  estudiantes.forEach((est) => {
    if (est.id === idEstudiante) { //Si el id coincide.
      estudianteEncontrado = est;  //Guardamos la referencia al estudiante.
    }
  });

  //Si no se encontró ningún estudiante con ese ID, avisamos y salimos.
  if (estudianteEncontrado === null) {
    console.log(`❌ No se encontró ningún estudiante con ID ${idEstudiante}.`);
    return;
  }

  //Si el estudiante no tiene notas, no se puede calcular el promedio.
  if (estudianteEncontrado.notas.length === 0) {
    console.log(`⚠️ El estudiante ${estudianteEncontrado.nombre} no tiene notas registradas.`);
    return;
  }

  let notasNumericas = estudianteEncontrado.notas.map((nota) => Number(nota)); //Convertimos cada nota a Number explícitamente.

  //Calculamos la suma de todas las notas con un bucle for.
  let suma = 0; //Acumulador de la suma.
  for (let i = 0; i < notasNumericas.length; i++) {
    suma = suma + notasNumericas[i]; //Sumamos cada nota al acumulador.
  }

  //Calculamos el promedio dividiendo la suma entre el número de notas.
  let promedio = suma / notasNumericas.length;

  //Mostramos las notas procesadas con map y el promedio resultante.
  console.log(`📝 Notas de ${estudianteEncontrado.nombre}: `, notasNumericas);
  console.log(`📊 Promedio de ${estudianteEncontrado.nombre}: ${promedio.toFixed(2)}`); //toFixed(2) muestra 2 decimales.

  //Determinamos el nivel del estudiante según su promedio con una arrow function.
  const obtenerEstado = (prom) => {
    if (prom < 5) return "Suspende."; //Promedio menor que 5.
    else if (prom >= 5 && prom < 9) return "Aprobado."; //Entre 5 (inclusive) y 9 (exclusive)
    else return "Excelente."; //Promedio 9 o superior
  };

  //Llamamos a la arrow function con el promedio calculado y mostramos el resultado.
  console.log(`📌 Estado: ${obtenerEstado(promedio)}`);
}

//=== BLOQUE 5: ANÁLISIS DE STRINGS ===

//Función que detecta la primera letra que se repite en un nombre.
function primeraLetraRepetida(nombre) {
  //Validamos que el parámetro recibido sea un String.
  if (typeof nombre !== "string") {
    console.log("❌ El parámetro debe ser un texto.");
    return; //Salimos si no es String.
  }

  //Convertimos el nombre a minúsculas para que "A" y "a" se consideren el mismo carácter.
  let nombreMinusculas = nombre.toLowerCase();

  //Recorremos el nombre caracter a caracter con el primer bucle for.
  for (let i = 0; i < nombreMinusculas.length; i++) {
    let caracterActual = nombreMinusculas[i]; //Obtenemos el caracter en la posición i.

    //Ignoramos los espacios.
    if (caracterActual === " ") {
      continue; //Pasamos al siguiente caracter.
    }

    //Comparamos el carácter actual con todos los que van después de él.
    for (let j = i + 1; j < nombreMinusculas.length; j++) {
      if (caracterActual === nombreMinusculas[j]) { //Si encontramos una coincidencia...
        console.log(`🔍 La primera letra repetida en ${nombre} es: ${caracterActual}`);
        return caracterActual; //...devolvemos la letra repetida y salimos.
      }
    }
  }

  //Si llegamos aquí es porque no se encontró ninguna letra repetida.
  console.log(`🔍 No hay letras repetidas en ${nombre}.`);
  return null; //Devolvemos null para indicar que no hay repetición.
}

//=== BLOQUE 6: RECURSIVIDAD ===

//Función recursiva que calcula la suma de todos los números desde 1 hasta n.
function sumaHastaN(n) {
  //Validación -> n debe ser un número entero y positivo.
  if (typeof n !== "number" || !Number.isInteger(n) || n <= 0) {
    console.log("❌ El parámetro debe ser un número entero positivo.");
    return 0; //Devolvemos 0 si el parámetro no es válido.
  }

  //Caso Base: Cuando n es 1, la suma es simplemente 1 (ya no llamamos a la función).
  if (n === 1) {
    return 1; //Fin de la recursión.
  }

  //Caso Recursivo: Sumamos n al resultado de llamar a la función con n-1.
  return n + sumaHastaN(n - 1);
}

//=== BLOQUE 8: MANIPULACIÓN AVANZADA DE ARRAYS ===

//Función que muestra los estudiantes con promedio mayor o igual a 9.
function mostrarEstudiantesDestacados() {
  //Función auxiliar para calcular el promedio de un estudiante (usada internamente).
  function obtenerPromedio(estudiante) {
    if (estudiante.notas.length === 0) return 0; //Si no tiene notas, promedio 0.
    let suma = 0; //Acumulador.
    for (let i = 0; i < estudiante.notas.length; i++) {
      suma += estudiante.notas[i]; //Sumamos cada nota.
    }
    return suma / estudiante.notas.length; //Devolvemos el promedio.
  }

  //Usamos filter() para quedarnos solo con los estudiantes cuyo promedio sea >= 9.
  let destacados = estudiantes.filter(function (est) {
    return obtenerPromedio(est) >= 9; //filter mantiene los estudiantes que devuelven true.
  });

  //Usamos map() para transformar el array de objetos en un array sólo con los nombres.
  let nombresDestacados = destacados.map(function (est) {
    return est.nombre; //Extraemos sólo el nombre de cada estudiante destacado.
  });

  //Mostramos el resultado en consola
  console.log("🌟 Estudiantes destacados (promedio >= 9):", nombresDestacados);
}

//=== BLOQUE 1: FUNCIÓN PRINCIPAL DEL SISTEMA ===

//Función principal del sistema que muestra el menú y gestiona las opciones.
function iniciarSistema() {

  //Mostramos el menú de opciones en consola.
  console.log("\n========================================");
  console.log("   SISTEMA DE GESTIÓN ACADÉMICA");
  console.log("========================================");
  console.log("1. Agregar estudiante");
  console.log("2. Mostrar estudiantes");
  console.log("3. Calcular promedio de un estudiante");
  console.log("4. Buscar primera letra repetida en nombre");
  console.log("5. Calcular suma recursiva hasta N");
  console.log("6. Salir");
  console.log("========================================");

  //Pedimos al usuario que elija una opción y esperamos su respuesta con el callback.
  preguntar("Selecciona una opción: ", function (opcion) {

    //switch evalúa el valor de opcion y ejecuta el bloque correspondiente.
    switch (opcion) {

      case '1': //--- Opción 1: Agregar estudiante ---
        //Pedimos el nombre, luego dentro del callback pedimos el id y la edad.
        //Cada preguntar() anida al siguiente para respetar el orden de las respuestas.
        preguntar("Introduce el nombre del estudiante: ", function (nombreInput) { //Leemos el nombre.
          preguntar("Introduce el ID (número): ", function (idInput) { //Leemos el ID.
            preguntar("Introduce la edad: ", function (edadInput) { //Leemos la edad.
              let idNumerico = parseInt(idInput, 10); //Convertimos el ID a número entero.
              let edadNumerica = parseInt(edadInput, 10); //Convertimos la edad a número entero.
              agregarEstudiante(idNumerico, nombreInput, edadNumerica); //Registramos el estudiante.
              iniciarSistema(); //Volvemos a mostrar el menú al terminar.
            });
          });
        });
        break; //Salimos del switch.

      case '2': //--- Opción 2: Mostrar estudiantes ---
        if (estudiantes.length === 0) {
          console.log("⚠️ No hay estudiantes registrados aún."); //Aviso si el array está vacío.
        } else {
          console.log("\n📋 Lista de estudiantes:");
          //Recorremos el array y llamamos al método mostrarInformacion de cada estudiante.
          for (let i = 0; i < estudiantes.length; i++) {
            console.log(`\n[Estudiante ${i + 1}]`); //Mostramos el número de orden.
            estudiantes[i].mostrarInformacion(); //Llamamos al método con this (Bloque 7).
          }
          mostrarEstudiantesDestacados(); //Mostramos los estudiantes con promedio >= 9.
        }
        iniciarSistema();
        break;

      case '3': //--- Opción 3: Calcular promedio ---
        preguntar("Introduce el ID del estudiante: ", function (idInput) {
          preguntar("¿Quieres añadir una nota antes de calcular? (s/n): ", function (resp) { //Preguntamos si quiere añadir nota.
            if (resp.toLowerCase() === 's') {
              preguntar("Introduce la nota (0-10): ", function (notaInput) { //Leemos la nota.
                let idNum = parseInt(idInput, 10);
                let notaNum = parseFloat(notaInput);//parseFloat para admitir decimales.
                agregarNota(idNum, notaNum);//Añadimos la nota al estudiante.
                calcularPromedio(idNum); //Calculamos y mostramos el promedio.
                iniciarSistema();
              });
            } else {
              let idNum = parseInt(idInput, 10);
              calcularPromedio(idNum); //Calculamos y mostramos el promedio directamente.
              iniciarSistema();
            }
          });
        });
        break;

      case '4': //--- Opción 4: Primera letra repetida ---
        preguntar("Introduce el nombre a analizar: ", function (nombreInput) {
          primeraLetraRepetida(nombreInput); //Buscamos la primera letra repetida.
          iniciarSistema();
        });
        break;

      case '5': //--- Opción 5: Suma recursiva ---
        preguntar("Introduce un número entero positivo N: ", function (nInput) { //Leemos N.
          let nNumerico = parseInt(nInput, 10);
          let resultadoSuma = sumaHastaN(nNumerico); //Calculamos la suma recursiva.

          //Mostramos el resultado sólo si la función devolvió un número válido.
          if (typeof resultadoSuma === 'number' && resultadoSuma > 0) {
            console.log(`➕ La suma desde 1 hasta ${nNumerico} es: ${resultadoSuma}`);
          }
          iniciarSistema();
        });
        break;

      case '6': //--- Opción 6: Salir ---
        console.log("\n...Saliendo del sistema... 👋");
        rl.close(); //Cerramos la interfaz de readline y el programa termina.
        break; //Salimos del switch y del sistema al no volver a utilizar iniciarSistema().

      default: //--- Cualquier otra entrada no válida ---
        console.log("❌ Opción no válida. Por favor, introduce un número entre 1 y 6.");
        iniciarSistema();
        break;
    }
  });
}

//=== BLOQUE 10: MANEJO GLOBAL DE ERRORES ===

rl.on('close', function () {
  console.log("Sistema finalizado correctamente."); //Equivalente al finally: siempre se ejecuta al cerrar.
});

//Encapsulamos la llamada principal dentro de try/catch tal como pide el ejercicio.
try {
  iniciarSistema(); //Arrancamos el sistema.
} catch (e) {
  //Captura errores síncronos inesperados que ocurran al lanzar iniciarSistema().
  console.log("Error general del sistema"); //Mensaje de error genérico.
  rl.close(); //Cerramos readline si hay un error al arrancar.
}
/*Aquí iría el finally, pero al utilizar readline, lo ejecuta con iniciarSistema() y no deja continuar ni introducir ninguna opción, es como que sale del programa.
Por este motivo, lo he sustituido con rl.on('close'), que saldrá del programa al llamar a rl.close().*/