console.log("INICIO CATEGORIA.JS");

var onepiece = "";
onepiece += '				<section class="page-header">\n';
onepiece += '					<div class="container">\n';
onepiece += '						<div class="row">\n';
onepiece += '							<div class="col-md-12">\n';
onepiece += '								<ul class="breadcrumb">\n';
onepiece += '									<li><a href="#">Inicio</a></li>\n';
onepiece += '									<li class="active">Categoría</li>\n';
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
onepiece += '											<h2 id="lblcat2" class="ng-hide">Categoría</h2>\n';
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
        url : "includes/categoria.html",
        dataType: "text",
        success : function (data) {
        	$("#include").html(data);
        }
    });
	
	
	
	//$("#include").html(onepiece);
	
//console.log("id_categoria: " + cat);

	//alert(id);

	//**********************
	//***** LIST CATS ******
	//**********************

	$.ajax({
		url: 		 'http://www.cpadelrank.com/ws/cpr_ws.php',
		type: 		 'GET',
		dataType: 	 'json',
		crossDomain: true,
		timeout: 	 5000,
		data: {		 cat: cat, 
					 op : op
		},
		success: function(data){
			
			var i 			= 0;
			var cat_padre	= "";
			var categoria 	= "";
			var n_cat		= "";
			var id_equipo	= "";
			var equipo		= "";
			
			while (i < data.length){

				cat_padre = data[i].cat_padre;
				categoria = data[i].categoria;
				id_equipo = data[i].id_equipo;
				equipo 	  = data[i].equipo;

				if (cat_padre != null){
					n_cat = cat_padre.substring(0, 3);
				}

//console.log("indice: " + i);
//console.log("categoria: " + categoria);
//console.log("id_equipo: " + id_equipo);
//console.log("equipo: " + equipo);

				if (i == 0){
//console.log("CAMBIA CABECERA");
					$("#lblcat").html(n_cat + categoria);
					$("#lblcat2").html(n_cat + categoria);
				}
			
				html = html +   '<div class="no-xs-margin col-sm-12 col-md-6 col-lg-6 first">\n';
				html = html +   '	<div class="col-md-6">\n';
				html = html +   '		<a href="equipo.html?op=infoteam&id=' + id_equipo + '">\n';
				html = html +   '			<img class="teampic" src="http://www.cpadelrank.com/img/teams/t_' + id_equipo + '.jpg" onerror="imgErrorTeam(this);">\n';
				html = html +   '		</a>\n';
				html = html +   '	</div>\n';
				html = html +   '	<div class="col-md-6">\n';
				html = html +   '		<div class="info valign">\n';
				html = html +   '			<div class="cell">\n';
				html = html +   '				<h4>\n';
				html = html +   '					<a class="teamname" href="equipo.html?op=infoteam&id=' + id_equipo + '">' + equipo + '</a>\n';
				html = html +   '				</h4>\n';
				html = html +   '			</div>\n';
				html = html +   '		</div>\n';
				html = html +   '	</div>\n';
				html = html +   '</div>\n';

				i++;
			}



//			$("#lnkTeam").attr("href", "http://topera.esy.es/img/teams/");
//			$("#lnkTeam").attr("title", data[0].equipo);

//			$("#lblcateq").html(data[0].categoria);
//			$("lblpistacristal").html(data[0].p_cristal);
//			$("lblpistamuro").html(data[0].p_muro);
			
//			$("#imgTeam").attr("src", "http://cantabriapadelrank.com/img/teams/eq_" + data[0].id_equipo + ".png");
//			$("#imgTeam").attr("onerror", "this.src='http://topera.esy.es/img/sin_foto_75x70.png'");

/*
	<div class="no-xs-margin col-sm-12 col-md-6 col-lg-6 first">
		<div class="col-md-6">
			<a href="/liga-bbva/players/ter-stegen">
				<img src="img/teams/t_572.jpg">
			</a>
		</div>
		<div class="col-md-3">
			<div class="info valign">
				<div class="cell">
					<h3>
						<a href="/liga-bbva/players/ter-stegen">Ter Stegen</a>
					</h3>
				</div>
			</div>
		</div>
	</div>
*/

		$("#filas").html(html);


		},
		error: function (jqXHR, textStatus, errorThrown){			
            console.log('errorThrown:');
            console.log(errorThrown);
		}, 
		complete: function (){
			$(".gifloading").css("display", "none");
		}	
	});	
});
