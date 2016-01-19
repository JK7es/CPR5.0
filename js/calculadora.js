console.log("Carga calculadora.js");


$(function() {
	console.log("empieza");
	
	$.ajax({
	    url : "includes/calculadora.html",
	    dataType: "text",
	    success : function (data) {
	    	$("#include").html(data);
	    },
	    complete : function (){
	    	
///////////////////////////
	    	
	    	$( "#txtp1j1" ).autocomplete({
	    		source: function( request, response ) {

	    			$.ajax({
	    				//url:		"http://topera.esy.es/ws_resp_jugadores.php",
	    				url:		"http://www.cpadelrank.com/ws/cpr_ws.php",
	    				dataType:	"json",	
	    				data: {
	    					op:		"jgcal",
	    					nom:	$( "#txtp1j1" ).val().toUpperCase(),
	    					sexo:	$('input[name="radiosexo"]:checked').val(),
	    					sel:    getPlayerSelected()
	    				}, 
	    				success: function(data) {
	    					response($.map(data, function(item) {	
	    						
	    						return {
	    							label:		item.jugador + " (" + item.puntos + ")",
	    							value:		item.jugador + " (" + item.puntos + ")",
	    							puntos:		item.puntos,
	    							id_jugador:	item.id_jugador
	    						};
	    					}));
	    				},
	    				error: function(xhr, textStatus, error) {
	    					console.log("error: " + error);	
	    				}
	    			});
	    		},
	    		minLength: 3,
	    		select: function(event, ui) {
	    			
	    			$('#idp1j1' ).val(ui.item.id_jugador);
	    			$('#ptsp1j1').val(ui.item.puntos);
	    			
	    			$('#imgp1j1').attr("src","http://www.cpadelrank.com/img/players/x_" + ui.item.id_jugador + ".jpg");
	    			$('#imgp1j1').attr("alt", ui.item.value);
	    			$('#lnkp1j1').attr("href", "jugador.html?op=infojg&id=" + ui.item.id_jugador);
	    			$('#nomp1j1').html(ui.item.value);

	    		},
	    		open: function() {
	    			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	    		},
	    		close: function() {
	    			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	    		}
	    	});


	    	$( "#txtp1j2" ).autocomplete({
	    		source: function( request, response ) {
	    			$.ajax({
	    				//url:		"http://topera.esy.es/ws_resp_jugadores.php",
	    				url:		"http://www.cpadelrank.com/ws/cpr_ws.php",
	    				dataType: 	"json",
	    				data: {
	    					op:		"jgcal",
	    					nom:	$( "#txtp1j2" ).val().toUpperCase(),
	    					sexo:	$('input[name="radiosexo"]:checked').val(),
	    					sel:    getPlayerSelected()
	    				},
	    				success: function(data) {
	    					response($.map(data, function(item) {
	    						
	    						return {
	    							label:		item.jugador + " (" + item.puntos + ")",
	    							value:		item.jugador + " (" + item.puntos + ")",
	    							puntos:		item.puntos,
	    							id_jugador:	item.id_jugador
	    						};
	    					}));
	    				},
	    				error: function(xhr, textStatus, error) {
	    					console.log("error: " + error);
	    				}
	    			});
	    		},
	    		minLength: 3,
	    		select: function(event, ui) {
	    			
	    			$('#idp1j2').val(ui.item.id_jugador);
	    			$('#ptsp1j2').val(ui.item.puntos);
	    			
	    			$('#imgp1j2').attr("src","http://www.cpadelrank.com/img/players/x_" + ui.item.id_jugador + ".jpg");
	    			$('#imgp1j2').attr("alt", ui.item.value);
	    			$('#lnkp1j2').attr("href", "jugador.html?op=infojg&id=" + ui.item.id_jugador);
	    			$('#nomp1j2').html(ui.item.value);
	    		},
	    		open: function() {
	    			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	    		},
	    		close: function() {
	    			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	    		}
	    	});
	    	
	    	$( "#txtp2j1" ).autocomplete({
	    		source: function( request, response ) {
	    			$.ajax({
	    				//url:		"http://topera.esy.es/ws_resp_jugadores.php",
	    				url:		"http://www.cpadelrank.com/ws/cpr_ws.php",
	    				dataType: 	"json",
	    				data: {
	    					op:		"jgcal",
	    					nom:	$( "#txtp2j1" ).val().toUpperCase(),
	    					sexo:	$('input[name="radiosexo"]:checked').val(),
	    					sel:    getPlayerSelected()
	    				},
	    				success: function(data) {
	    					response($.map(data, function(item) {
	    						
	    						return {
	    							label:		item.jugador + " (" + item.puntos + ")",
	    							value:		item.jugador + " (" + item.puntos + ")",
	    							puntos:		item.puntos,
	    							id_jugador:	item.id_jugador
	    						};
	    					}));
	    				},
	    				error: function(xhr, textStatus, error) {
	    					console.log("error: " + error);
	    				}
	    			});
	    		},
	    		minLength: 3,
	    		select: function(event, ui) {
	    			
	    			$('#idp2j1').val(ui.item.id_jugador);
	    			$('#ptsp2j1').val(ui.item.puntos);
	    			
	    			$('#imgp2j1').attr("src","http://www.cpadelrank.com/img/players/x_" + ui.item.id_jugador + ".jpg");
	    			$('#imgp2j1').attr("alt", ui.item.value);
	    			$('#lnkp2j1').attr("href", "jugador.html?op=infojg&id=" + ui.item.id_jugador);
	    			$('#nomp2j1').html(ui.item.value);
	    		},
	    		open: function() {
	    			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	    		},
	    		close: function() {
	    			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	    		}
	    	});

	    	$( "#txtp2j2" ).autocomplete({
	    		source: function( request, response ) {
	    			$.ajax({
	    				//url:		"http://topera.esy.es/ws_resp_jugadores.php",
	    				url:		"http://www.cpadelrank.com/ws/cpr_ws.php",
	    				dataType: 	"json",
	    				data: {
	    					op:		"jgcal",
	    					nom:	$( "#txtp2j2" ).val().toUpperCase(),
	    					sexo:	$('input[name="radiosexo"]:checked').val(),
	    					sel:    getPlayerSelected()
	    				},
	    				success: function(data) {
	    					response($.map(data, function(item) {
	    			
	    						return {
	    							label:		item.jugador + " (" + item.puntos + ")",
	    							value:		item.jugador + " (" + item.puntos + ")",
	    							puntos:		item.puntos,
	    							id_jugador:	item.id_jugador
	    						};
	    					}));
	    				},
	    				error: function(xhr, textStatus, error) {
	    					console.log("error: " + error);
	    				}
	    			});
	    		},
	    		minLength: 3,
	    		select: function(event, ui) {
	    			
	    			$('#idp2j2').val(ui.item.id_jugador);
	    			$('#ptsp2j2').val(ui.item.puntos);
	    			
	    			$('#imgp2j2').attr("src","http://www.cpadelrank.com/img/players/x_" + ui.item.id_jugador + ".jpg");
	    			$('#imgp2j2').attr("alt", ui.item.value);
	    			$('#lnkp2j2').attr("href", "jugador.html?op=infojg&id=" + ui.item.id_jugador);
	    			$('#nomp2j2').html(ui.item.value);
	    		},
	    		open: function() {
	    			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	    		},
	    		close: function() {
	    			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	    		}
	    	});

	    	$("#btnCalc").click(function(){
	    		
	    		$("#field").css("visibility", "visible");	    		
	    	    
	    		var pareja1 =  Number($('#ptsp1j1').val()) + Number($('#ptsp1j2').val());
	    		var pareja2 =  Number($('#ptsp2j1').val()) + Number($('#ptsp2j2').val());
	    		var resultaodP1;
	    		var resultaodP2;

	    		var resultado = calcula (pareja1, 
	    								 pareja2, 
	    			 					 $('input[name="radiocomp"]:checked').val(), 
	    								 $('#catLiga').val(), 
	    			                     $('input[name="radioganador"]:checked').val());

	    		var htmlPtsWin  = ' <span class="points bg points-good">' + resultado.ganador + '</span>';
	    		var htmlPtsLose = ' <span class="points bg points-worst">' + resultado.perdedor + '</span>';

	    		if ($('input[name="radioganador"]:checked').val() == 1){
	    			resultaodP1 = htmlPtsWin;
	    			resultaodP2 = htmlPtsLose;
	    		}else{
	    			resultaodP1 = htmlPtsLose;
	    			resultaodP2 = htmlPtsWin;
	    		}
	    		
	    console.log(htmlPtsWin);
	    console.log(htmlPtsLose);
	    console.log(resultaodP1);
	    console.log(resultaodP2);

	    		$('#nomp1j1').html($('#nomp1j1').html() + resultaodP1);
	    		$('#nomp1j2').html($('#nomp1j2').html() + resultaodP1);
	    		$('#nomp2j1').html($('#nomp2j1').html() + resultaodP2);
	    		$('#nomp2j2').html($('#nomp2j2').html() + resultaodP2);

	    	});
	    	$("#btnLimp").click(function(){
	    	    alert("Boton Limpia presionado");
	    	    // Se borran las opciones de formulario
	    	    $('input:radio[name=radiosexo]')[0].checked 	= true;
	    	    $('input:radio[name=radiocomp]')[0].checked 	= true;
	    	    $('input:radio[name=radioganador]')[0].checked 	= true;
	    	    $('input:radio[name=radiosexo]')[0].checked 	= true;
	    	    $('#catLiga option:eq(1)');
	    	    
	    	    var imagen = "http://www.cpadelrank.com/img/players/x_0.png";
	    	    
	    	    //Borramos los jugadores
	    	    $('#txtp1j1').val("");
	    	    $('#idp1j1' ).val("");
	    		$('#ptsp1j1').val("");		
	    		$('#imgp1j1').attr("src", imagen);
	    		$('#imgp1j1').attr("alt", "Sin foto");
	    		$('#nomp1j1').html("");
	    		$('#idp1j1').html("");
	    		$('ptsp1j1').html("");

	    		$('#txtp1j2').val("");
	    	    $('#idp1j2' ).val("");
	    		$('#ptsp1j2').val("");		
	    		$('#imgp1j2').attr("src", imagen);
	    		$('#imgp1j2').attr("alt", "Sin foto");
	    		$('#nomp1j2').html("");
	    		$('#idp1j2').html("");
	    		$('ptsp1j2').html("");

	    	    $('#txtp2j1').val("");
	    	    $('#idp2j1' ).val("");
	    		$('#ptsp2j1').val("");		
	    		$('#imgp2j1').attr("src", imagen);
	    		$('#imgp2j1').attr("alt", "Sin foto");
	    		$('#nomp2j1').html("");
	    		$('#idp21').html("");
	    		$('ptsp2j1').html("");

	    		$('#txtp2j2').val("");
	    	    $('#idp2j2' ).val("");
	    		$('#ptsp2j2').val("");		
	    		$('#imgp2j2').attr("src", imagen);
	    		$('#imgp2j2').attr("alt", "Sin foto");
	    		$('#nomp2j2').html("");
	    		$('#idp2j2').html("");
	    		$('ptsp2j2').html("");
	    	});

	    	$('#txtp1j1').focus(function(){
	    		this.select();
	    	});
	    	$('#txtp1j2').focus(function(){
	    		this.select();
	    	});
	    	$('#txtp2j1').focus(function(){
	    		this.select();
	    	});
	    	$('#txtp2j2').focus(function(){
	    		this.select();
	    	});	
	    		    	
	    }
	});
	
});

function getPlayerSelected(){
	
	var selected = "";

	if ($('#idp1j1').val() != ""){
		selected += $('#idp1j1').val() + ',';
	}
	if ($('#idp1j2').val() != ""){
		selected += $('#idp1j2').val() + ',';
	}
	if ($('#idp2j1').val() != ""){
		selected += $('#idp2j1').val() + ',';
	}
	if ($('#idp2j2').val() != ""){
		selected += $('#idp2j2').val();
	}

	console.log(selected);
	return selected;
}


/* *************************************************************** * 
 * Calcula los puntos de los partidos de la liga cantabra de Padel *
 * *************************************************************** */
function calcula (ptsP1, ptsP2, torneo, categoria, ganador){

 	var const_K
 	var const_K_winner;
 	var const_K_loser;

 	var const_D;
 	var const_K;

 	var pts_p1;
 	var pts_p2;

 	var pts_ganados;
 	var pts_perdidos;

 	// Se suman los puntos de cada pareja
 	pts_p1 	= ptsP1;
 	pts_p2 	= ptsP2;

 	console.log("Calculo de la constante D: calcula_const_D(" + pts_p1 + ", " + pts_p2 + ");");
 	const_D = calcula_const_D(pts_p1, pts_p2);

 	console.log("Calculo de la constante K: calcula_const_K(" + torneo + ", " + categoria + ");");
 	const_K = calcula_const_K(torneo, categoria);

 	const_K_winner 	= const_K.winner;
	const_K_loser 	= const_K.loser;

 	console.log("const_K_winner: " + const_K_winner);
 	console.log("const_K_loser: " + const_K_loser);

 	if (pts_p1 >= pts_p2){

 		console.log("P1 >= P2 " + pts_p1 + " >= " + pts_p2);

 		if (ganador == 1){	// Pareja 1

			pts_ganados  = Math.round(const_K_winner * (50 - const_D))
			pts_perdidos = Math.round(const_K_loser  * (50 - const_D)) * (-1);

			console.log("Puntos Pareja 1 Winner: " + pts_ganados);
			console.log("Puntos Pareja 2 Loser: " +  pts_perdidos);
 		}
 		else{				// Pareja 2

 			pts_ganados  = Math.round(const_K_winner * (50 + const_D));
			pts_perdidos = Math.round(const_K_loser  * (50 + const_D)) * (-1);

			console.log("Puntos Pareja 2 Winner: " + pts_ganados);
			console.log("Puntos Pareja 1 Loser: " +  pts_perdidos);
 		}
 	}
 	else{

 		console.log("P1 >= P2 " + pts_p1 + " < " + pts_p2);

 		if (ganador == 1){	// Pareja 1

 			pts_ganados  = Math.round(const_K_winner * (50 + const_D))
			pts_perdidos = Math.round(const_K_loser  * (50 + const_D)) * (-1);

			console.log("Puntos Pareja 1 Winner: " + pts_ganados);
			console.log("Puntos Pareja 2 Loser: " +  pts_perdidos);
 		}
 		else{				// Pareja 2

 			pts_ganados  = Math.round(const_K_winner * (50 - const_D))
			pts_perdidos = Math.round(const_K_loser  * (50 - const_D)) * (-1);

			console.log("Puntos Pareja 1 Winner: " + pts_ganados);
			console.log("Puntos Pareja 2 Loser: " +  pts_perdidos);	
 		}
 	}

 	return retorno = {
 		ganador : pts_ganados,
 		perdedor: pts_perdidos
 	}
}


/* *************************************************************** * 
 * Calculo de las constantes K para la pareja ganadora y perdedora *
 * Se calcula en funcion del torneo y la categoría				   *
 * *************************************************************** */
function calcula_const_K(torneo, categoria){
	console.log("Torneo: " + torneo);
	console.log("Categoria: " + categoria);
 	switch (torneo){
 		
 		case "L": 	// LIGA

 			switch (Number(categoria)){

 				case 1: // 1º Categoria
console.log("CASE 1");
 					const_K_winner 	= 1.25;
 					const_K_loser	= 0.75;
 					break;
 				
 				case 2: // 2º Categoria
console.log("CASE 2");
 					const_K_winner 	= 1;
 					const_K_loser	= 1;
 					break;

 				case 3: // 3º Categoria
console.log("CASE 3");
 					const_K_winner 	= 0.75;
 					const_K_loser	= 1.25;
 					break;

 				case 4: // 4º Categoria
console.log("CASE 4");
 					const_K_winner 	= 0.5;
 					const_K_loser	= 1.5;
 					break;		
 			}
 			break;

 		case "C": 	// COPA

 			switch (categoria){

 				case 1: // 1º Categoria
console.log("CASE 1");
 					const_K_winner 	= 1.25;
 					const_K_loser	= 0.75;
 					break;
 				
 				case 2: // 2º Categoria
console.log("CASE 2");
 					const_K_winner 	= 0.75;
 					const_K_loser	= 1.25;
 					break;

 				default: // PREVIA
 					const_K_winner 	= 1;
 					const_K_loser	= 1;
 					break;
 			}
 			break;
 	}

	console.log("const_K_winner: " + const_K_winner);
	console.log("const_K_loser: " + const_K_loser);

 	return retorno = {
 		winner: const_K_winner,
 		loser:  const_K_loser
 	}
}	

/* ************************* * 
 * Calculo de la constante D * 
 * ************************* */
function calcula_const_D(pts_p1, pts_p2){

 	var const_D = Math.round(Math.abs(pts_p1 - pts_p2)/50);

 	if (const_D > 50){ 		
 		
 		const_D = 50;
 	}
 	console.log("Constante D: " + const_D);

 	return const_D;
}



