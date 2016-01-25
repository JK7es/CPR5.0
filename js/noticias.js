carga_noticias ();

function carga_noticias (){

//console.log("carga_noticias");

	$.ajax({
		//url: "http://cantabriapadelrank.com/ws/ws_resp_agenda.php",
		url: "http://www.cpadelrank.com/ws/cpr_ws.php",
		type: 'GET',
		dataType: 'json',
		async: true,
		crossDomain: true,
		timeout: 5000,
		data: {
			op: 'ag'			
		},
		success: function(data){
			
			var noticias = "";
			var mes 	 = "";
			var show_mes = "";
			var anno 	 = "";
			var posicion = 0; // 0 Izquierda, 1 Derecha
			
			noticias += cabecera_noticia();								

			for (var i = 0; i < data.length; i++){
				
				anno = data[i].f_inicio.substring(0, 4);

                if (mes != data[i].mes){
                    mes = data[i].mes;
					show_mes = mes + " - " + anno;
				
				}else{
					show_mes = "";
				}

				posicion = i % 2;	

				noticias += datos_noticias (posicion, show_mes, data[i].titular, data[i].imagen, data[i].imagen2, data[i].noticia, data[i].autor, data[i].fecha);
				
			};
			
			noticias += pie_noticia();								

			$("#include").html(noticias);
//console.log("FIN carga_noticias");
		}, 
		error: function(){
			alert ("No se puede conectar con el servidor");
		}, 
		complete: function (){
			$(".gifloading").css("display", "none");
		}
	});
}

function cabecera_noticia(){
	
	var noticias = 	'				<section class="page-header">';
		noticias += '					<div class="container">';
		noticias += '						<div class="row">';
		noticias += '							<div class="col-md-12">';
		noticias += '								<ul class="breadcrumb">';
		noticias += '									<li><a href="#">Home</a></li>';
		noticias += '								</ul>';
		noticias += '							</div>';
		noticias += '						</div>';
		noticias += '					</div>';
		noticias += '				</section>';

		noticias += '				<div class="container">';
		noticias += '					<div class="row">';
		noticias += '						<div class="col-md-12">';
		noticias += '							<div class="blog-posts">';
		noticias += '								<section class="timeline">';
		noticias += '									<div class="timeline-body">';
		
				
	return noticias;	
}

function datos_noticias (pos, mes, titular, imagen1, imagen2, noticia, autor, fecha){
	
	console.log("datos_noticias INI");
	
	var noticias = '';

	if (mes != ''){
		noticias += '<!-- Timeline -->';
		noticias += '										<div class="timeline-date">';
		noticias += '											<h3 id="mes" class="heading-primary">' + mes + '</h3>';
		noticias += '										</div>';
		noticias += '<!-- Timeline -->';
	}
	
	noticias += '<!-- Article -->';

	if (pos == 0){
		noticias += '										<article class="timeline-box left post post-medium">';
	}
	else{
		noticias += '										<article class="timeline-box right post post-medium">';
	}
	
	noticias += '											<div class="row">';
	noticias += '												<div class="col-md-12">';
	noticias += '													<div class="post-image">';
	noticias += '														<div class="owl-carousel" data-plugin-options=\'{"items":1}\'>';
	noticias += '															<div>';
	noticias += '																<div class="img-thumbnail">';
	noticias += '																	<img id="imagen1" class="img-responsive" src="' + imagen1 + '" alt="">';
	noticias += '																</div>';
	noticias += '															</div>';
	noticias += '															<div>';
	noticias += '																<div class="img-thumbnail">';
	noticias += '																	<img id="imagen2" class="img-responsive" src="' + imagen2 + '" alt="">';
	noticias += '																</div>';
	noticias += '															</div>';
	noticias += '														</div>';
	noticias += '													</div>';
	noticias += '												</div>';
	noticias += '											</div>';
	noticias += '											<div class="row">';
	noticias += '												<div class="col-md-12">';
	noticias += '													<div class="post-content">';
	noticias += '														<h4 class="heading-primary">' + titular + '</h4>';
	noticias += '														<p>' + noticia + '</p>';
	noticias += '													</div>';
	noticias += '												</div>';
	noticias += '											</div>';
	noticias += '											<div class="row">';
	noticias += '												<div class="col-md-12">';
	noticias += '													<div class="post-meta">';
	noticias += '														<span><i class="fa fa-calendar"></i>' + fecha + '</span><br>';
	noticias += '													</div>';
	noticias += '												</div>';
	noticias += '											</div>';
	noticias += '											<div class="row">';
	noticias += '												<div class="col-md-12">';
	noticias += '													<div class="post-meta">';
	noticias += '														<span><i class="fa fa-user"></i> By ' + autor + '</span>';
	noticias += '													</div>';
	noticias += '												</div>';
	noticias += '											</div>';
	noticias += '										</article>';		
		
	return noticias;
}

function pie_noticia(){
	
	
	
	var noticias = ''
		noticias += '<!--Load More-->';
		noticias += '									</div>';
		noticias += '								</section>';
		noticias += '							</div>';
		noticias += '						</div>';
		noticias += '					</div>';
		noticias += '				</div>';
	
	
	
	return noticias;	
}
