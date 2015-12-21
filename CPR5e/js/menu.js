/**
 * 
 */

console.log("INICIO CREA_MENU");
crea_menu ();

function crea_menu(){
	crea_menu_mas ();
	crea_menu_fem ();
	crea_menu_equipos();
}

function crea_menu_mas (){
	
	$.ajax({
		//url: "http://cantabriapadelrank.com/ws/ws_resp_agenda.php",
		url: "http://www.cantabriapadelrank.com/ws/cpr_ws.php",
		type: 'GET',
		dataType: 'json',
		async: true,
		crossDomain: true,
		timeout: 5000,
		data: {
			op: 'mnm'			
		},
		success: function(data){
console.log("peticion ws");
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

console.log(html);			
			
			$("#menumas").html(html);
		}, 
		error: function(){
			alert ("No se puede conectar con el servidor");
		}
	})
	.then( function ( response ) {
		
		console.log("function (response)");

	});
	
}

function crea_menu_fem (){
	
	$.ajax({
		//url: "http://cantabriapadelrank.com/ws/ws_resp_agenda.php",
		url: "http://www.cantabriapadelrank.com/ws/cpr_ws.php",
		type: 'GET',
		dataType: 'json',
		async: true,
		crossDomain: true,
		timeout: 5000,
		data: {
			op: 'mnf'			
		},
		success: function(data){
console.log("peticion ws");
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

console.log(html);			
			
			$("#menufem").html(html);
		}, 
		error: function(){
			alert ("No se puede conectar con el servidor");
		}
	})
	.then( function ( response ) {
		
		console.log("function (response)");

	});
	
}