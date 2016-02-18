console.log("INICIO CATEGORIA.JS");

var onepiece = "";
onepiece += '				<section class="page-header">\n';
onepiece += '					<div class="container">\n';
onepiece += '						<div class="row">\n';
onepiece += '							<div class="col-md-12">\n';
onepiece += '								<ul class="breadcrumb">\n';
onepiece += '									<li><a href="#">Inicio</a></li>\n';
onepiece += '									<li class="active">Calendario</li>\n';
onepiece += '								</ul>\n';
onepiece += '							</div>\n';
onepiece += '						</div>\n';
onepiece += '					</div>\n';
onepiece += '				</section>\n';
onepiece += '				<div class="container">\n';
onepiece += '					<div class="modal-body">\n';
onepiece += '						<div class="team-detail">\n';
onepiece += '                        	<div class="row">\n';
onepiece += '								<div class="col-md-4">\n';
onepiece += '									<div class="panel entity-info">\n';
onepiece += '										<div class="body">\n';
onepiece += '											<h2 id="lblcat2" class="ng-hide">Calendario</h2>\n';
onepiece += '										</div>\n';
onepiece += '									</div>\n';
onepiece += '								</div>\n';
onepiece += '								<div class="col-md-8">\n';
onepiece += '									<div class="panel">\n';
onepiece += '										<div class="body" style="position: relative;">\n';
onepiece += '											<i class="fa fa-users"></i>\n';
onepiece += '											<h4>Equipos</h4>\n';
onepiece += '											<div class="tab-content">\n';
onepiece += '												<div class="tab-pane active">\n';
onepiece += '													<div class="players" >\n';
onepiece += '														<p class="text-center text-muted ng-hide"></p>\n';
onepiece += '														<div id="filas" class="row grid"></div>\n';
onepiece += '													</div>\n';
onepiece += '												</div>\n';
onepiece += '											</div>\n';
onepiece += '										</div>\n';
onepiece += '									</div>\n';
onepiece += '								</div>\n';
onepiece += '                       	</div>\n';
onepiece += '						</div>\n';
onepiece += '					</div>\n';
onepiece += '				</div>\n';


$(function() {	

	// Obtenemos el ID del equipo del que vamos a buscar su informacion
	var cat 	 = $_GET("id");
	var op 		 = $_GET("op");
	var html 	 = "";
	
	$.ajax({
        url : "includes/calendario.html",
        dataType: "text",
        success : function (data) {
        	$("#include").html(data);
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
			id: cat,
			op: 'infocal'
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
				htmlCal +=  '									<td class="narrow day">J' + jornada + '</td>\n';
				htmlCal +=  '									<td class="narrow">\n';
				htmlCal +=  '										<a class="team" title="' + nom_eq_loc + '" team-modal="match.local" href="equipo.html?op=infoteam&id=' + id_eq_loc + '">\n';
				htmlCal +=  '											<img src="http://www.cpadelrank.com/img/teams/t_' + id_eq_loc + '.jpg">\n';
				htmlCal +=  '										</a>\n';
				htmlCal +=  '									</td>\n';
				htmlCal +=  '									<td class="local">\n';
				htmlCal +=  '										<a class="team" title="' + nom_eq_loc + '" team-modal="match.local" href="equipo.html?op=infoteam&id=' + id_eq_loc + '">' + nom_eq_loc + '</a>\n';
				htmlCal +=  '									</td>\n';
				htmlCal +=  '									<td class="score">' + lugar +'</td>\n';
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
			
			$("#Calendar").html(htmlCal);
		}, 
		complete: function (){
			$(".gifloading").css("display", "none");
		}
	});
	
	
});
