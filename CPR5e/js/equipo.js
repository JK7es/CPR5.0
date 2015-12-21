console.log("INICIO EQUIPO.JS");

		//$( document ).on( "pagecreate", function() {
$(function() {	

	// Obtenemos el ID del equipo del que vamos a buscar su informacion
	var id 		= $_GET("id");
	var temp	= $_GET("temp");
console.log("id_equipo: " + id);
console.log("temporada: " + temp);

	//alert(id);

//ws_resp_info_equipo.php?id=542
//ws_resp_info_equipo_jugadores.php?id=542
//ws_resp_info_equipo_calendario.php?id=542

	  ///////////////////////
	 ///// INFO EQUIPO /////
	///////////////////////

	$.ajax({
		url: 		 'http://topera.esy.es/ws_resp_info_equipo.php',
		type: 		 'GET',
		dataType: 	 'json',
		async: 		 false,
		crossDomain: true,
		timeout: 	 5000,
		data: {		 id	: id, 
					 temp: temp
		},
		success: function(data){


//"id_equipo": "572",
//"equipo": "BF Mataleñas C (M)",
//"categoria": "3ª Cat GR-A",
//"temporada": "2015",
//"id_club": null,
//"club": null,
//"p_cubiertas": null,
//"p_cristal": null,
//"p_muro": null


			$("#lblTeam").html(data[0].equipo);

			$("#lnkTeam").attr("href", "http://topera.esy.es/img/teams/");
			$("#lnkTeam").attr("title", data[0].equipo);

			$("#lblcateq").html(data[0].categoria);
			$("lblpistacristal").html(data[0].p_cristal);
			$("lblpistamuro").html(data[0].p_muro);
			
			$("#imgTeam").attr("src", "http://cantabriapadelrank.com/img/teams/eq_" + data[0].id_equipo + ".png");
			$("#imgTeam").attr("onerror", "this.src='http://topera.esy.es/img/sin_foto_75x70.png'");
			

			  /////////////////////////////
			 ///// LISTADO JUGADORES /////
			/////////////////////////////
			$.ajax({
				url: 		 'http://topera.esy.es/ws_resp_info_equipo_jugadores.php',
				type: 		 'GET',
				dataType: 	 'json',
				async: 		 false,
				crossDomain: true,
				timeout: 	 5000,
				data: {
					id		: id,
					temp	: temp
				},
				success: function(listado){

					var i 			= 0;

					while (i < listado.length){

						i++;
					}

				}
			});		

			  /////////////////////////////
			 ///// CALENDARIO EQUIPO /////
			/////////////////////////////				
			$.ajax({
				url: 		 'http://topera.esy.es/ws_resp_info_equipo_calendario.php',
				type: 		 'GET',
				dataType: 	 'json',
				async: 		 false,
				crossDomain: true,
				timeout: 	 5000,
				data: {
					id		: id,
					temp	: temp
				},
				success: function(calendario){

					var i 			= 0;

console.log("calendario.length--> " + calendario.length); 
					while (i < calendario.length){

						i++;
					}
				}
			});
			
console.log("fin lista calendario");
		}
	});
	
});