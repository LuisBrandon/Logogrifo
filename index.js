let allLetra = Array();
let control;
$(function () {
    ConnectaAjax("respuestas.json");
});


//Funcion a la que le pasas el nombre de un archivo y atraves de
//AJAX te lo transforma en un json con los datos que contenga.
function ConnectaAjax(archivo) {
    $.ajax({
        url: archivo,
        method: "get",
        dataType: "json",
        //async: false,
        success: function (a) {

            CreaLogogrifo(a, EnumLetra(a));
        }

    });
}

//Esta funcion te crea el logogrifo visualmente.
function CreaLogogrifo(palabras, allLetra) {
   
    
    for (let filas = 0; filas < 7; filas++) {
        //Primer for para crear las filas.
        $("#all").append('<div class="row" id="row' + filas + '">');
        for (let i = 0; i < 10 - filas; i++) {
            //Segundo for para crear los cuadrados donde iran las letras
            let valor = EscribeNum(palabras[filas].palabra[i]);
            $("#row" + filas).append('<input onchange="EscribeAll(' + valor + ', this.value)" type="text" placeholder="'+valor+'" class="n' + valor + ' letras" name="" id="" maxlength="1">');
        }
        //Añade la descripción
        $("#all").append('<div class=row"><p> ' + palabras[filas].descripcion + ' </p></div> </div> ');
    }

}


//Enumera las letras
function EnumLetra(palabras) {
    let letras = Array();
    //Creo el primer array para separar las palabras de una en una en letra por letra
    for (let i = 0; i < palabras.length; i++) {
        letras = (palabras[i].palabra).split("");
        //segundo array para comparar si contengo esa letra en un array
        //donde guardo todas las letras. si no tengo esa letra se guarda en allLetra.
        for (let j = 0; j < letras.length; j++) {
            if ($.inArray(letras[j], allLetra) == -1) {
                allLetra.push(letras[j]);
            }
        }
    }
    return allLetra;
}

//Saca el valor de la letra.
function EscribeNum(letra) {
    //console.log(allLetra)
    return 1 + ($.inArray(letra, allLetra));

}

//Escribe la misma letra en los cuadrados corresponndiente.
function EscribeAll(valor, texto) {
    //Recorre todo los cuadrados con la misma clase y le asigna el valor correspondiente
    $('.n' + valor).each(function () {
        $(this).val(texto)
    })
}

//Comprueba palabras
function CompruebaPalabras() {
    let todas = true;    
    //Recorre el array con todas las letras
    for (let i = 0; i < allLetra.length; i++) {
        if ($('.n' + (i + 1)).val() != allLetra[i]) {
            //Comprueba si el valor que tiene es el correcto
            //Le añade una clase de 'error' o 'correcto' para diferenciarlos visualmente
            $('.n' + (i + 1)).addClass("error")
            todas = false;

        }
        else {
            
            $('.n' + (i + 1)).addClass("correcto")
        }
        $('.n' + (i + 1)).prop("disabled", true)
    }
    $('#comprueba').css('display', 'none');
    $('#reintentar').css('display', 'inline-block');
    
    //Si acierta toda te lanza un mensaje como que has ganado o que has perdido en caso contrario.
    if(todas ==  true){
        alert("¡Has ganado Felicidades!")
    }
    else{
        alert("¡Has fallado, vuelvelo a intentar!")
    }

}

//Reinicia el juego
function JuegadeNuevo() {
    //Activa los input y quita los estilos.
    for (let i = 0; i <= allLetra.length; i++) {
        $('.n' + i).each(function () {
            $(this).val("")
            $('.n' + (i)).removeAttr("disabled");
            $('.n' + (i)).removeClass("correcto")
            $('.n' + (i)).removeClass("error")
        })
    }
    
    
   

    // Hace que vaya apareciendo el botón de Reintentar o de comprobar segun 
    // haga falta.
    $('#comprueba').css('display', 'inline-block');
    $('#reintentar').css('display', 'none');
}