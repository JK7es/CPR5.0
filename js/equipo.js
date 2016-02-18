console.log("INICIO EQUIPO.JS");

		//$( document ).on( "pagecreate", function() {
$(function() {	

	// Obtenemos el ID del equipo del que vamos a buscar su informacion
	var id		= $_GET("id");
	var temp	= $_GET("temp");

	$.ajax({
        url : "includes/equipo.html",
        dataType: "text",
        success : function (data) {
        	$("#include").html(data);
        }
    });

	///////////////////////
	///// INFO EQUIPO /////
	///////////////////////

	$.ajax({
//		url: 		 'http://topera.esy.es/ws_resp_info_equipo.php',
		url:		 'http://www.cpadelrank.com/ws/cpr_ws.php',
		type: 		 'GET',
		dataType: 	 'json',
		crossDomain: true,
		timeout: 	 5000,
		data: {		 id: id, 
			 		 op: 'infoteam'
		},
		success: function(data){
			
			var ptsMin 		= 9999;
			var ptsMax		= 0;
			var ptsMed		= 0;
			
			var id_equipo 	= data[0].id_equipo;
			var equipo 		= data[0].equipo;
			var categoria	= data[0].cat_padre;

			var html		= "";
			
			html  = '<h2 class="ng-hide">' + equipo + '</h2>\n';
			html += '      <a class="team" title="' + equipo + '" href="#">\n';
			html += '         <img class="imgteam" src="http://www.cpadelrank.com/img/teams/t_' + id_equipo + '.jpg"  onerror="imgErrorTeam(this);">\n';
			html += '      </a>\n';
			
			$("#lblTeam").html(equipo);
			$("#teamHeader").html(html);
			$("#categ").html(categoria);

			
			/////////////////////////////
			///// LISTADO JUGADORES /////
			/////////////////////////////
			$.ajax({
				url: 		 'http://www.cpadelrank.com/ws/cpr_ws.php',
				type: 		 'GET',
				dataType: 	 'json',
				crossDomain: true,
				timeout: 	 5000,
				data: {
					id: id,
					op: 'infoteamjg'
				},
				success: function(data2){

					var i 		= 0;
					var htmljg	= "";
					htmljg =   '<div class="clearfix visible-lg visible-md"></div>\n';
					while (i < data2.length){
						
						var id_jugador  = "";
						var jugador		= "";
						var puntos		= "";
						
						id_jugador  = data2[i].id_jugador;
						jugador		= data2[i].jugador;
						puntos		= parseInt(data2[i].puntos);						
						
						ptsMed = (puntos + ptsMed);
						
						if (ptsMin > puntos){
							ptsMin = puntos;
						}
						if (ptsMax < puntos){
							ptsMax = puntos;
						}
						
						htmljg +=	'<div class="no-xs-margin col-sm-12 col-md-6 col-lg-6">\n';
						htmljg +=	'	<player player="player" extra="extra" settings="settings">\n';
						htmljg +=	'		<div class="player-card animate-zoom-in">\n';
						htmljg +=	'			<div class="header">\n';
						htmljg +=	'				<div transclude-to="header"></div>\n';
						htmljg +=	'			</div>\n';
						htmljg +=	'			<div class="team-pos valign pull-left"></div>\n';
						htmljg +=	'			<div class="pic pull-left">\n';
						htmljg +=	'				<a player-modal="player" href="jugador.html?op=infojg&id=' + id_jugador + '">\n';
						htmljg +=	'					<div class="player-icon ok" style="background-image: url(http://www.cpadelrank.com/img/players/x_' + id_jugador + '.jpg), url(http://www.cpadelrank.com/img/players/x_0.png);"></div>\n';
						htmljg +=	'				</a>\n';
						htmljg +=	'					<div>\n';
						htmljg +=	'						<h5 title="Puntos">' + puntos + ' pts</h5>\n';
						htmljg +=	'					</div>\n';
						htmljg +=	'			</div>\n';
						htmljg +=	'			<div class="info valign">\n';
						htmljg +=	'				<div class="cell">\n';
						htmljg +=	'					<h4><a player-modal="player" href="jugador.html?op=infojg&id=' + id_jugador + '">' + jugador + '</a></h4>\n';						
						htmljg +=	'				</div>\n';
						htmljg +=	'			</div>\n';
						htmljg +=	'		</div>\n';
						htmljg +=	'	</player>\n';                                                      
						htmljg +=	'</div>\n';
						
						i++;						
					}

					$("#numjug").html(i);
					$("#rowjg").html(htmljg);
					
					$("#maxpts").html(ptsMax);
					$("#minpts").html(ptsMin);
					$("#medpts").html(Math.round(ptsMed/i));
				}
			});		

			/////////////////////////////
			///// CALENDARIO EQUIPO /////
			/////////////////////////////				
			$.ajax({
				url: 		 'http://www.cpadelrank.com/ws/cpr_ws.php',
				type: 		 'GET',
				dataType: 	 'json',
				crossDomain: true,
				timeout: 	 5000,
				data: {
					id: id,
					op: 'infoteamcal'
				},
				success: function(calendario){

					var i 			= 0;
					var htmlCal		= "";
					
					var jornada 	= "";
					var fecha		= "";
					var lugar		= "";
					var tanda		= "";
					var id_eq_loc	= "";
					var nom_eq_loc	= "";
					var id_eq_vis	= "";
					var nom_eq_vis	= "";
					var fec_previs 	= "";
					var resultado	= "";
					

					htmlCal +=  '						<table class="calendario">\n';
					htmlCal +=  '							<tbody>\n';
					
					while (i < calendario.length){						
						jornada 	= calendario[i].jornada;
						fecha		= calendario[i].fecha;
						fec_previs 	= calendario[i].fecha_prevista;
						
						if (fecha != null){ 
							fecha = formatFecha(fecha);						
						}
						else{							
							fecha = fec_previs;							
						}

						lugar		= calendario[i].lugar;
						tanda		= calendario[i].tanda;
						id_eq_loc	= calendario[i].id_eq_local;
						nom_eq_loc	= calendario[i].nom_eq_local;
						id_eq_vis	= calendario[i].id_eq_visitante;
						nom_eq_vis	= calendario[i].nom_eq_visitante;						
						resultado	= calendario[i].resultado;

						if (resultado == null) resultado = "";


						htmlCal +=  '								<tr class="mini-match won">\n';
						htmlCal +=  '									<td class="narrow day">J' + (i + 1) + '</td>\n';
						htmlCal +=  '									<td class="narrow">\n';
						htmlCal +=  '										<a class="team" title="' + nom_eq_loc + '" team-modal="match.local" href="equipo.html?op=infoteam&id=' + id_eq_loc + '">\n';
						htmlCal +=  '											<img src="http://www.cpadelrank.com/img/teams/t_' + id_eq_loc + '.jpg">\n';
						htmlCal +=  '										</a>\n';
						htmlCal +=  '									</td>\n';
						htmlCal +=  '									<td class="local">\n';
						htmlCal +=  '										<a class="team" title="' + nom_eq_loc + '" team-modal="match.local" href="equipo.html?op=infoteam&id=' + id_eq_loc + '">' + nom_eq_loc + '</a>\n';
						htmlCal +=  '									</td>\n';
						htmlCal +=  '									<td class="score">' + resultado +'</td>\n';
						htmlCal +=  '									<td class="date ng-hide" >\n';
						htmlCal +=  '										<div>' + fecha + '</div>\n';
						htmlCal +=  '									</td>\n';
						htmlCal +=  '									<td class="visitor">\n';
						htmlCal +=  '										<a class="team" title="' + nom_eq_vis + '" team-modal="match.visitor" href="equipo.html?op=infoteam&id=' + id_eq_vis + '">' + nom_eq_vis + '</a>\n';
						htmlCal +=  '									</td>\n';
						htmlCal +=  '									<td class="narrow">\n';
						htmlCal +=  '										<a class="team" title="' + nom_eq_vis + '" team-modal="match.visitor" href="equipo.html?op=infoteam&id=' + id_eq_vis + '">\n';
						htmlCal +=  '											<img src="http://www.cpadelrank.com/img/teams/t_' + id_eq_vis + '.jpg">\n';
						htmlCal +=  '										</a>\n';
						htmlCal +=  '									</td>\n';
						htmlCal +=  '								</tr>\n';
		
						i++;
					}

					htmlCal +=  '							</tbody>\n';
					htmlCal +=  '						</table>\n';
					
//console.log(htmlCal);
					
					$("#teamCal").html(htmlCal);
				}
			});
			
console.log("fin lista calendario");
		}, 
		complete: function (){
			$(".gifloading").css("display", "none");
		}
	});
	
});