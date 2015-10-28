console.log("Carga CUSTOM.JS");


$(function() {
	console.log("empieza");
	$( "#txtp1j1" ).autocomplete({
		source: function( request, response ) {

			$.ajax({
				url:		"http://topera.esy.es/ws_resp_jugadores.php",
				dataType:	"json",	
				data: {
					nom:	$( "#txtp1j1" ).val().toUpperCase(),
					sexo:	$('input[name="radiosexo"]:checked').val()
				}, 
				success: function(data) {
					response($.map(data, function(item) {	
						console.log("Retorno success");
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
			console.log("selecciona");
			$('#idp1j1').val(ui.item.id_jugador);
			$('#ptsp1j1').val(ui.item.puntos);
			console.log("ID: " + $('#idp1j1').val());
			console.log("PUNTOS: " + $('#ptsp1j1').val());

			$('#imgp1j1').attr("src","http://topera.esy.es/img/players/x_" + ui.item.id_jugador + ".jpg");
			$('#imgp1j1').attr("alt", ui.item.value);
			$('#nomp1j1').html(ui.item.value);


			dibujaPieChart();

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
				url:		"http://topera.esy.es/ws_resp_jugadores.php",
				dataType: 	"json",
				data: {
					nom:	$( "#txtp1j2" ).val().toUpperCase(),
					sexo:	$('input[name="radiosexo"]:checked').val()
				},
				success: function(data) {
					response($.map(data, function(item) {
						console.log("Retorno success");
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
			console.log("selecciona");
			$('#idp1j2').val(ui.item.id_jugador);
			$('#ptsp1j2').val(ui.item.puntos);
			console.log("ID: " + $('#idp1j2').val());
			console.log("PUNTOS: " + $('#ptsp1j2').val());

			$('#imgp1j2').attr("src","http://topera.esy.es/img/players/x_" + ui.item.id_jugador + ".jpg");
			$('#imgp1j2').attr("alt", ui.item.value);
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
				url:		"http://topera.esy.es/ws_resp_jugadores.php",
				dataType: 	"json",
				data: {
					nom:	$( "#txtp2j1" ).val().toUpperCase(),
					sexo:	$('input[name="radiosexo"]:checked').val()
				},
				success: function(data) {
					response($.map(data, function(item) {
						console.log("Retorno success");
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
			console.log("selecciona");
			$('#idp2j1').val(ui.item.id_jugador);
			$('#ptsp2j1').val(ui.item.puntos);
			console.log("ID: " + $('#idp2j1').val());
			console.log("PUNTOS: " + $('#ptsp2j1').val());

			$('#imgp2j1').attr("src","http://topera.esy.es/img/players/x_" + ui.item.id_jugador + ".jpg");
			$('#imgp2j1').attr("alt", ui.item.value);
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
				url:		"http://topera.esy.es/ws_resp_jugadores.php",
				dataType: 	"json",
				data: {
					nom:	$( "#txtp2j2" ).val().toUpperCase(),
					sexo:	$('input[name="radiosexo"]:checked').val()
				},
				success: function(data) {
					response($.map(data, function(item) {
						console.log("Retorno success");
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
			console.log("selecciona");
			$('#idp2j2').val(ui.item.id_jugador);
			$('#ptsp2j2').val(ui.item.puntos);
			console.log("ID: " + $('#idp2j2').val());
			console.log("PUNTOS: " + $('#ptsp2j2').val());

			$('#imgp2j2').attr("src","http://topera.esy.es/img/players/x_" + ui.item.id_jugador + ".jpg");
			$('#imgp2j2').attr("alt", ui.item.value);
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
	    
		console.log("sexo: " + $('input[name="radiosexo"]:checked').val());
		console.log("competicion: " + $('input[name="radiocomp"]:checked').val());
		console.log("ganador: " + $('input[name="radioganador"]:checked').val());

		var pareja1 =  Number($('#ptsp1j1').val()) + Number($('#ptsp1j2').val());
		console.log("Jugador1-1: " + $('#ptsp1j1').val());
		console.log("Jugador1-2: " + $('#ptsp1j2').val());
		console.log("Pareja1: " + pareja1);

		var pareja2 =  Number($('#ptsp2j1').val()) + Number($('#ptsp2j2').val());
		console.log("Jugador2-1: " + $('#ptsp2j1').val());
		console.log("Jugador2-2: " + $('#ptsp2j2').val());
		console.log("Pareja2: " + pareja2);

		console.log("Categoria: " + $('#catLiga').val());
		console.log("Categoria: " + $('#catLiga option:selected' ).text());
		 

		var resultado = calcula ($('#ptsp1j1').val(), $('#ptsp1j2').val(), 
			                     $('#ptsp2j1').val(), $('#ptsp2j2').val(), 
			                     $('input[name="radiocomp"]:checked').val(), 
			                     $('#catLiga').val(), 
			                     $('input[name="radioganador"]:checked').val());

	});
	$("#btnLimp").click(function(){
	    alert("Boton Limpia presionado");
	});
});


function getTextoMes(mes){
	switch (mes) {
		case 1:
			txtMes = "Enero";
			break;
		case 2:
			txtMes = "Febrero";
			break;
		case 3:
			txtMes = "Marzo";
			break;
		case 4:
			txtMes = "Abril";
			break;
		case 5:
			txtMes = "Mayo";
			break;
		case 6:
			txtMes = "Junio";
			break;
		case 7:
			txtMes = "Julio";
			break;
		case 8:
			txtMes = "Agosto";
			break;
		case 9:
			txtMes = "Septiembre";
			break;
		case 10:
			txtMes = "Octubre";
			break;
		case 11:
			txtMes = "Noviembre";
			break;
		case 12:
			txtMes = "Diciembre";
			break;	
	}
	return txtMes;
}


function dibujaPieChart(){
	plot2 = jQuery.jqplot('chart2', 
						  [[['Pareja 1', 75],
						    ['Pareja 2', 25]]], 
						    {
					    		title: 'Relación de Victorias', 
					    		seriesDefaults: {
					    			shadow: false, 
					    			renderer: jQuery.jqplot.PieRenderer, 
					    			rendererOptions: { 
										startAngle: 180, 
										sliceMargin: 4, 
										showDataLabels: true }
								}, 
      							legend: { show:true, location: 'w' }
							}
  						);
}
