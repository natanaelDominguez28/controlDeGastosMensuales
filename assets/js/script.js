let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDetallesGastos = [];

function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let detalleGasto = document.getElementById("detalleGasto").value;

    console.log(nombreGasto);
    console.log(valorGasto);
    
    if (nombreGasto == "" || valorGasto == "" || detalleGasto == "") {
        alert('Por favor, rellena todos los campos');
        return;
    }else{
       listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDetallesGastos.push(detalleGasto); 
    }
    
    console.log(listaNombresGastos);    
    console.log(listaValoresGastos);
    console.log(listaDetallesGastos);
    
    actualizarListaGastos();
}

//Funcion que actualiza la lista de gastos
function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
   
    let htmlLista = "";
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcion = listaDetallesGastos[posicion];
        htmlLista += `<li>${elemento} - ${descripcion} - USD ${valorGasto.toFixed(2)}
        <button onclick="modificarGasto(${posicion});">Modificar</button>
        <button style="background-color: red;" onclick="eliminarGasto(${posicion});">Eliminar</button> 
        </li>`;
        //Validamos que el gasto no supere los USD $150
        if (valorGasto > 150 ) {
            //avisamos al usuario que el gasto supera los USD $150
            alert('Cuidado!, hiciste un gasto mayor a USD $150');
        }
    //Calculamos el total de gastos
        totalGastos += Number(valorGasto);
        console.log(totalGastos);
        
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

//Funcion que limpia el formulario
function limpiar() {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("detalleGasto").value = "";
}

//Funcion que elimina el gasto
function eliminarGasto(posicion){
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    listaDetallesGastos.splice(posicion,1);
    actualizarListaGastos();
}

//Funcion que modifica el gasto
function modificarGasto(posicion){
    document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
    document.getElementById("valorGasto").value = listaValoresGastos[posicion];
    document.getElementById("detalleGasto").value = listaDetallesGastos[posicion];  
    
    //Cambiamos el texto del boton
    const cambiarBoton = document.getElementById("botonFormulario");
    cambiarBoton.innerText = "Actualizar Gasto";

    //Cambiamos el evento del boton
    cambiarBoton.onclick = function(){
        //Llamamos a la funcion que actualiza el gasto
        actualizarGastos(posicion);
        //Cambiamos el texto del boton nuevamente y cambiamos el evento actual por el evento original
        cambiarBoton.innerText = "Agregar Gasto";
        cambiarBoton.onclick = function(){clickBoton();};
    }
}

//Funcion que actualiza el gasto con los nuevos valores
function actualizarGastos(posicion){
    listaNombresGastos[posicion] = document.getElementById("nombreGasto").value;
    listaValoresGastos[posicion] = document.getElementById("valorGasto").value;
    listaDetallesGastos[posicion] = document.getElementById("detalleGasto").value;
    actualizarListaGastos();
}