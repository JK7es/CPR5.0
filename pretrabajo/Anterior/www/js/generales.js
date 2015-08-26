PATH = "http://topera.esy.es/";


/////////////////////////////////////////////////////////////////////////////
//	Funcion que obtiene el valor de un parametro pasado por get
//	http://index.htm?id=1&puesto=2
//
//	llamada-->	$_GET("id"); Devuelve 1 
/////////////////////////////////////////////////////////////////////////////

function $_GET(param){

	// Obtener la url completa 
	url = document.URL;

	// Buscar a partir del signo de interrogación ? 
	url = String(url.match(/\?+.+/));
	
	// limpiar la cadena quitándole el signo ? 
	url = url.replace("?", "");	

	// Crear un array con parametro=valor 
	url = url.split("&");

	
	//Recorrer el array url
	//obtener el valor y dividirlo en dos partes a través del signo =
	//0 = parametro
	//1 = valor
	//Si el parámetro existe devolver su valor
	
	x = 0;
	while (x < url.length){
		p = url[x].split("=");
		if (p[0] == param){
			return decodeURIComponent(p[1]);
		}
		x++;
	}
}


// Quita el recuadro si la imagen no se muestra.
function Carga_noPic(){
	//window.event.srcElement.style.display = "None";	
}