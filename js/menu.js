/**
 * 
 */

var mnu_p1 = '';
var mnu_p2 = '';
var mnu_pf = '';

mnu_p1 += '							<nav>\n';
mnu_p1 += '								<ul class="nav nav-pills" id="mainNav">\n';
mnu_p1 += '<!-- HOME -->\n';
mnu_p1 += '									<li class="dropdown active">\n';
mnu_p1 += '										<a class="dropdown-toggle" href="index.html">\n';
mnu_p1 += '											Inicio\n';
mnu_p1 += '										</a>\n';
mnu_p1 += '									</li>\n';
mnu_p1 += '<!-- CategorÃ­as Masculinas -->\n';
mnu_p1 += '									<li class="dropdown dropdown-mega">\n';
mnu_p1 += '										<a class="dropdown-toggle" href="#">\n';
mnu_p1 += '											Categorías Masculinas\n';
mnu_p1 += '										</a>\n';
mnu_p1 += '										<ul class="dropdown-menu">\n';
mnu_p1 += '											<li>\n';
mnu_p1 += '												<div class="dropdown-mega-content">\n';
mnu_p1 += '													<div id="menumas" class="row">\n';
mnu_p1 += '													</div>\n';
mnu_p1 += '												</div>\n';
mnu_p1 += '											</li>\n';
mnu_p1 += '										</ul>\n';
mnu_p1 += '									</li>\n';
mnu_p1 += '<!-- CategorÃ­as Femeninas -->\n';
mnu_p1 += '                                    <li class="dropdown dropdown-mega">\n';
mnu_p1 += '										<a class="dropdown-toggle" href="#">\n';
mnu_p1 += '											Categorías Femeninas\n';
mnu_p1 += '										</a>\n';
mnu_p1 += '										<ul class="dropdown-menu">\n';
mnu_p1 += '											<li>\n';
mnu_p1 += '												<div id="menufem" class="dropdown-mega-content">\n';
mnu_p1 += '													</div>\n';
mnu_p1 += '												</div>\n';
mnu_p1 += '											</li>\n';
mnu_p1 += '										</ul>\n';
mnu_p1 += '									</li>\n';
mnu_p1 += '<!-- Equipos\n';
mnu_p1 += '                                    <li class="dropdown">\n';
mnu_p1 += '										<a class="dropdown-toggle" href="#">Equipos</a>\n';
mnu_p1 += '										<ul id="menuEq" class="dropdown-menu">\n';
mnu_p1 += '										</ul>\n';
mnu_p1 += '									</li>\n';
mnu_p1 += '-->\n';
mnu_p1 += '<!-- Utilidades-->\n';
mnu_p1 += '                                    <li class="dropdown">\n';
mnu_p1 += '										<a class="dropdown-toggle" href="#">Utilidades</a>\n';
mnu_p1 += '										<ul class="dropdown-menu">\n';
mnu_p1 += '											<li><a href="calculadora.html">Calculador</a></li>\n';
mnu_p1 += '											<li><a href="mapa.html">Mapa de Pistas</a></li>\n';
mnu_p1 += '<!--\n';
mnu_p1 += '											<li><a href="page-team.html">Alineador</a></li>\n';
mnu_p1 += '                                            <li><a href="page-team.html">Busca Pistas</a></li>\n';
mnu_p1 += '-->\n';
mnu_p1 += '										</ul>\n';
mnu_p1 += '									</li>\n';
mnu_p1 += '								</ul>\n';
mnu_p1 += '							</nav>\n';

console.log("INICIO CREA_MENU");
crea_menu ();

function crea_menu(){
		
	$("#menu").append(mnu_p1);
		
	crea_menu_mas ();
	crea_menu_fem ();
	
}

//////////////////////////////////////////////////////////////////
//Funcion que obtiene el valor de un parametro pasado por get 	//
//http://index.htm?id=1&puesto=2								//
//																//
//llamada-->	$_GET("id"); Devuelve 1 						//
//////////////////////////////////////////////////////////////////
function $_GET(param) {
	var vars = {};
	window.location.href.replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function crea_menu_equipos(){
	
	$.ajax({
		//url: "http://cantabriapadelrank.com/ws/ws_resp_agenda.php",
		url: "http://www.cpadelrank.com/ws/cpr_ws.php",
		type: 'GET',
		dataType: 'json',
		async: true,
		crossDomain: true,
		timeout: 5000,
		data: {
			op: 'mne'			
		},
		success: function(data){
//console.log("peticion ws menu equipos");
			
/*
'sexo' 	=> $row->sexo, 
'id_cat1' 	=> $row->id_cat1, 
'lvl1' 	=> $row->lvl1,
'id_cat2'  => $row->id_cat2,
'lvl2'  	=> $row->lvl2,
'id_equipo'=> $row->id_equipo,
'equipo'	=> $row->equipo					
*/

			var sexo 			= "";
			var sexo_aux		= "";
			var id_cat	 		= "";
			var id_cat_aux  	= "";
			var cat 			= "";
			var id_subcat		= "";			
			var id_subcat_aux 	= "";
			var subcat			= "";
			var id_equipo		= "";
			var id_equipo_aux	= "";
			var equipo			= "";
			
			var openMenu		= false;
			var openSexo		= false;
			var openCat			= false;
			var openSubcat		= false;
			var openEq			= false;
						
			var html	= "";								

			for (var i = 0; i < data.length; i++){
				
				sexo		= data[i].sexo;
				id_cat 		= data[i].id_cat1;
				cat			= data[i].lvl1;
				id_subcat 	= data[i].id_cat2;
				subcat		= data[i].lvl2;
				id_equipo	= data[i].id_equipo;
				equipo		= data[i].equipo;

				if (sexo != sexo_aux){

					if (openSexo){
						
						if (openCat){

							if (openSubcat){
								html   +=  '					</ul>\n';
								html   +=  '				</li>\n';
								html   +=  '			</ul>\n';
								openSubcat = false;

							}else if (id_subcat == null){
								html   +=  '			</ul>\n';
							}

							html   +=  '		</li>\n';
							html   +=  '	</ul>\n';
							openCat = false;
						}

						html   +=  '</li>\n';
						openSexo = false;
					}
				
					html   +=  '<li class="dropdown-submenu">\n';
					html   +=  '	<a href="#">' + sexo + '</a>\n';
					openSexo = true;
				}	

				if (id_cat != id_cat_aux){

					if (openCat){

						if (openSubcat){
							html   +=  '					</ul>\n';
							html   +=  '				</li>\n';
							html   +=  '			</ul>\n';
							openSubcat = false;
						}else if (id_subcat_aux == null){
							html   +=  '			</ul>\n';
						}

						html   +=  '		</li>\n';
						html   +=  '	</ul>\n';
						openCat = false;
					}

					html   +=  '	<ul class="dropdown-menu">0\n';
					html   +=  '		<li class="dropdown-submenu">\n';
					html   +=  '			<a href="' + id_cat + '">' + cat + '</a>\n';

					if (id_subcat == null){
						html   +=  '			<ul class="dropdown-menu">2\n';
					}

					openCat = true;
				}				

				if (id_subcat != id_subcat_aux && id_subcat != null){
					
					if (openSubcat){
						html   +=  '					</ul>\n';
						html   +=  '				</li>\n';
						html   +=  '			</ul>\n';
						openSubcat = false;
					}

					html   +=  '			<ul class="dropdown-menu">2\n';
					html   +=  '				<li class="dropdown-submenu">\n';
					html   +=  '					<a href="' + id_subcat + '">' + subcat + '</a>\n';
					html   +=  '					<ul class="dropdown-menu">\n';
					openSubcat = true;
				}				
				
				if (id_equipo != id_equipo_aux){
					
					html   +=  '						<li><a href="' + id_equipo +'">' + equipo + '</a></li>\n';					
				}

/*				
				if (sexo != sexo_aux){
					
					if (i > 0){
						if (closeUl){
							html   += 	'	</ul>';
							closeUl = false;
						}
						html   += 	'</div>';
					}
					
					html   += 	'<div class="col-md-3">';
					html   += 	'	<span class="dropdown-mega-sub-title">' + cat + '</span>';					
					
					if (grup != null){
						html   +=  '<ul class="dropdown-mega-sub-nav">';
						html   +=  '	<li><a href="categorias.html?op=xxx&id=' + id_grup + '">' + grup + '</a></li>';
						closeUl = true;
					}else{
						html   +=  '<ul class="dropdown-mega-sub-nav">';
						html   +=  '	<li><a href="categorias.html?op=xxx&id=' + id_cat + '">' + cat + '</a></li>';
						html   +=  '</ul>';
					}
					
				}else{
					html   +=  '	<li><a href="categorias.html?op=xxx&id=' + id_grup + '">' + grup + '</a></li>';
				}
				
*/				
				sexo_aux 		= sexo;
				id_cat_aux 		= id_cat;
				id_subcat_aux 	= id_subcat;
				id_equipo_aux	= id_equipo;
				aux = id_cat;

			};

			if (openSexo){
						
				if (openCat){

					if (openSubcat){
						html   +=  '					</ul>\n';
						html   +=  '				</li>\n';
						html   +=  '			</ul>\n';
						openSubcat = false;

					}else if (id_subcat == null){
						html   +=  '			</ul>\n';
					}

					html   +=  '		</li>\n';
					html   +=  '	</ul>\n';
					openCat = false;
				}

				html   +=  '</li>\n';
				openSexo = false;
			}


//console.log("-------" + html);			
			
			return html;
		}, 
		error: function(){
			alert ("No se puede conectar con el servidor");
		}
	});
	
	
}

function crea_menu_mas (){
	
	$.ajax({
		url: "http://www.cpadelrank.com/ws/cpr_ws.php",
		type: 'GET',
		dataType: 'json',
	    async: true,
		crossDomain: true,
		timeout: 5000,
		data: {
			op: 'mnm'			
		},
		success: function(data){
//console.log("peticion ws menu fem");
			var id_cat 	= "";
			var aux 	= "";
			var cat	 	= "";
			var id_grup = "";
			var grup	= "";
			
			var closeUl	= false;
						
			var html	= "";								

			for (var i = 0; i < data.length; i++){
				
				id_cat 	= data[i].id_categoria;
				cat		= data[i].categoria;
				id_grup	= data[i].id_cat_grupo;
				grup	= data[i].grupo;
				
				if (id_cat != aux){
					
					if (i > 0){
						if (closeUl){
							html   += 	'	</ul>';
							closeUl = false;
						}
						html   += 	'</div>';
					}
					
					html   += 	'<div class="col-md-3">';
					html   += 	'	<span class="dropdown-mega-sub-title">' + cat + '</span>';					
					
					if (grup != null){
						html   +=  '<ul class="dropdown-mega-sub-nav">';
						html   +=  '	<li><a href="categorias.html?op=lstcat&id=' + id_grup + '">' + grup + '</a></li>';
						closeUl = true;
					}else{
						html   +=  '<ul class="dropdown-mega-sub-nav">';
						html   +=  '	<li><a href="categorias.html?op=lstcat&id=' + id_cat + '">' + cat + '</a></li>';
						html   +=  '</ul>';
					}
					
				}else{
					html   +=  '	<li><a href="categorias.html?op=lstcat&id=' + id_grup + '">' + grup + '</a></li>';
				}
				
			
				aux = id_cat;
	
			};
			
			if (closeUl){
				html   += 	'	</ul>';
				closeUl = false;
			}			
			
			html   += 	'</div>';			

//console.log("HTML: " + html);			
			
			$("#menumas").html(html);
		}, 
		error: function(){
			alert ("No se puede conectar con el servidor");
		}, 
		complete:
			function(){
			//retorno = h
		}
	});
	
}

function crea_menu_fem (){
	
	$.ajax({
		//url: "http://cantabriapadelrank.com/ws/ws_resp_agenda.php",
		url: "http://www.cpadelrank.com/ws/cpr_ws.php",
		type: 'GET',
		dataType: 'json',
		async: true,
		crossDomain: true,
		timeout: 5000,
		data: {
			op: 'mnf'			
		},
		success: function(data){
//console.log("peticion ws menu mas");
			var id_cat 	= "";
			var aux 	= "";
			var cat	 	= "";
			var id_grup = "";
			var grup	= "";
			
			var closeUl	= false;
						
			var html	= "";								

			for (var i = 0; i < data.length; i++){
				
				id_cat 	= data[i].id_categoria;
				cat		= data[i].categoria;
				id_grup	= data[i].id_cat_grupo;
				grup	= data[i].grupo;
				
				if (id_cat != aux){
					
					if (i > 0){
						if (closeUl){
							html   += 	'	</ul>';
							closeUl = false;
						}
						html   += 	'</div>';
					}
					
					html   += 	'<div class="col-md-3">';
					html   += 	'	<span class="dropdown-mega-sub-title">' + cat + '</span>';					
					
					if (grup != null){
						html   +=  '<ul class="dropdown-mega-sub-nav">';
						html   +=  '	<li><a href="categorias.html?op=lstcat&id=' + id_grup + '">' + grup + '</a></li>';
						closeUl = true;
					}else{
						html   +=  '<ul class="dropdown-mega-sub-nav">';
						html   +=  '	<li><a href="categorias.html?op=lstcat&id=' + id_cat + '">' + cat + '</a></li>';
						html   +=  '</ul>';
					}
					
				}else{
					html   +=  '	<li><a href="categorias.html?op=lstcat&id=' + id_grup + '">' + grup + '</a></li>';
				}
				
			
				aux = id_cat;
/*                
						<div class="col-md-3">
							<span class="dropdown-mega-sub-title">1Âª CategorÃ­a</span>
							<ul class="dropdown-mega-sub-nav">
								<li><a href="shortcodes-accordions.html">Grupo A</a></li>
								<li><a href="shortcodes-toggles.html">Grupo B</a></li>
							</ul>
						</div>						
*/				
	
			};
			
			if (closeUl){
				html   += 	'	</ul>';
				closeUl = false;
			}			
			
			html   += 	'</div>';			

			$("#menufem").html(html);
		}, 
		error: function(){
			alert ("No se puede conectar con el servidor");
		}
	});
	
}

function imgErrorTeam(image) {
	console.log("CAMBIO DE IMAGEN");
    image.onerror = "";
    image.src = "http://www.cpadelrank.com/img/teams/t_0.jpg";
    return true;
}

function imgError(image) {
	console.log("CAMBIO DE IMAGEN");
    image.onerror = "";
    image.src = "http://www.cpadelrank.com/img/players/x_0.png";
    return true;
}