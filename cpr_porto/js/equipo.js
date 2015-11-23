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

					var i 		= 0;
					var html  	= '';

console.log("Antes del while-->" + listado.length);

					while (i < listado.length){

						// Creamos las filas de los encuentros
						html = html + '	<div class="no-xs-margin col-sm-12 col-md-6 col-lg-6 first">';
						html = html + '		<div class="player-card animate-zoom-in">';
						html = html + '			<div class="info valign">';
						html = html + '				<div class="cell">';
						html = html + '					<div class="row">';
						html = html + '						<div class="stat col-xs-6 ">';
						html = html + '							<img class="player-icon" src="http://topera.esy.es/img/players/x_' + listado[i].id_jugador + '.jpg"></div>';
						html = html + '							<div class="stat col-xs-6">';
						html = html + '								<h4>';
						html = html + '									<a href="/liga-bbva/players/claudio-bravo">' + listado[i].jugador + '</a>';
						html = html + '								</h4>';
						html = html + '							</div>';
						html = html + '						</div>';
						html = html + '						<div class="row">';
						html = html + '							<div class="stat col-xs-6">';
						html = html + '								<span style="font-size:21px">' + listado[i].puntos + '</span>';
						html = html + '								<h5>Puntos</h5>';
						html = html + '							</div>';
						html = html + '							<div class="stat col-xs-6">';
						html = html + '								<span style="font-size:21px">' + listado[i].rank + 'º</span>';
						html = html + '								<h5>Ranking</h5>';
						html = html + '							</div>';
						html = html + '						</div>';
						html = html + '					</div>';
						html = html + '				</div>';
						html = html + '			</div>';
						html = html + '		</div>';
						html = html + '	</div>';

						i++;
					}
					console.log("valor de i " + i + 1);
					$("#lblnplayers").html(i+1);
					$("#lstPlayers").html(html);
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

					var i		= 0;					
					var html  	= "";

console.log("calendario.length--> " + calendario.length); 
					while (i < calendario.length){

						html = html + '	<div class="col-sm-6">';
						html = html + '		<div class="mini-match">';
						html = html + '			<div class="row">';
						html = html + '				<div class="col-xs-5 local">';
						html = html + '					<a class="team" title="' + calendario[i].nlocal + '" team-modal="match.local" href="#">';
						html = html + '						<img src="http://cantabriapadelrank.com/img/teams/eq_' + calendario[i].local + '.png">';
						html = html + '					</a>';
						html = html + '					<a class="team" title="' + calendario[i].nlocal + '" team-modal="match.local" href="#">' + calendario[i].nlocal + '</a>';
						html = html + '				</div>';
						html = html + '				<div class="col-xs-2 score">' + calendario[i].resultado + '</div>';
						html = html + '				<div class="col-xs-2 date ng-hide">' + calendario[i].fecha + '</div>';
						html = html + '				<div class="col-xs-5 visitor">';
						html = html + '					<a class="team" title="' + calendario[i].nvisitante + '" team-modal="match.visitor" href="#">' + calendario[i].nvisitante + '</a>';
						html = html + '					<a class="team" title="' + calendario[i].nvisitante + '" team-modal="match.visitor" href="#">';
						html = html + '						<img src="http://cantabriapadelrank.com/img/teams/eq_' + calendario[i].visitante + '.png">';
						html = html + '					</a>';
						html = html + '				</div>';
						html = html + '			</div>';
						html = html + '		</div>';
						html = html + '	</div>';

						i++;
					}
					$("#lstCalendario").html(html);
				}
			});
			
console.log("fin lista calendario");
		}
	});
	
});