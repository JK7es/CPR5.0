
$(function() {
	
	$( "#buscador" ).autocomplete({
		source: function( request, response ) {

			$.ajax({
				//url:		"http://topera.esy.es/ws_resp_jugadores.php",
				url:		"http://www.cpadelrank.com/ws/cpr_ws.php",
				dataType:	"json",	
				data: {
					op:		"search",
					nom:	$( "#buscador" ).val().toUpperCase()
				}, 
				success: function(data) {
					response($.map(data, function(item) {	
						
						return {
							label:	item.nombre,
							value:	item.nombre,							
							id:		item.id,
							tipo:	item.tipo
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
		
			var accion = "";
			
			if (ui.item.tipo == "jg"){
				
				accion = "jugador.html?op=infojg&id=" + ui.item.id;
				
			}
			else if (id = "eq"){
				
				accion = "equipo.html?op=infoteam&id=" + ui.item.id;
				
			}
			console.log("accion " + accion);

			window.location.href = accion;
			
			//$("#buscador").val("action", accion);
			
		},
		open: function() {
			$('.ui-autocomplete').css('width', '150px');
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );

			$('.ui-widget-content').css('border', '1px solid #0088cc');
			$('.ui-widget-content').css('color', '#0088cc !important');
			
			$('.ui-widget').css('font-size', '0.8em');
			
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
		
});
