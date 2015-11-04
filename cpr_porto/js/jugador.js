console.log("INICIO JUGADOR.JS");
            
            //$( document ).on( "pagecreate", function() {
$(function() {	
    
    // Obtenemos el ID del jugador que vamos a buscar su informacion
    var id 		= $_GET("id");
console.log("id_jugador: " + id);                
    //alert(id);
    var fecha	= new Date();
	var anno 	= fecha.getFullYear();
	var lig_w	= 0; // Partidos de liga ganados
	var lig_l 	= 0; // Partidos de liga perdidos
	var cop_w 	= 0; // Partidos de copa ganados
	var cop_l 	= 0; // Partidos de copa perdidos
	var cir_w 	= 0; // Partidos de circuito ganados
	var cir_l 	= 0; // Partidos de circuito perdidos
	var mas_w 	= 0; // Partidos de circuito ganados
	var mas_l 	= 0; // Partidos de circuito perdidos
	var lose	= 0; // Derrota
	var ratio 	= 0; // Media
    
	var lig2_w	= 0; // Partidos de liga ganados
	var lig2_l 	= 0; // Partidos de liga perdidos
	var cop2_w 	= 0; // Partidos de copa ganados
	var cop2_l 	= 0; // Partidos de copa perdidos
	var cir2_w 	= 0; // Partidos de circuito ganados
	var cir2_l 	= 0; // Partidos de circuito perdidos
	var mas2_w 	= 0; // Partidos de circuito ganados
	var mas2_l 	= 0; // Partidos de circuito perdidos

	var ratio2 	= 0; // Media
				
				
    $.ajax({
        url: 		 'http://topera.esy.es/ws_resp_info_jugador.php',
        type: 		 'GET',
        dataType: 	 'json',
        async: 		 false,
        crossDomain: true,
        timeout: 	 5000,
        data: {		 id	: id, 
            		 temp: anno
        },
        success: function(data){
           
			$("#lbName").html(data[0].jugador);
			$("#lbEquipo").html("<a href='info_equipo.html?id=" + data[0].id_equipo + "'  data-ajax='false'>" + data[0].equipo + "</a>");
			$("#lbCategoria").html(data[0].categoria);
			$("#lbCircuito").html(data[0].categoria2);
			$("#lbPuntos").html(data[0].puntos);

			$("#imgEq").attr("src", "http://topera.esy.es/img/players/x_" + data[0].id_equipo + ".jpg");
			$("#imgEq").attr("alt", data[0].equipo);
			$("#imgEq").attr("onerror", "this.src=&quot;http://topera.esy.es/img/sin_foto_75x70.png&quot;");

			$("#imgJg").attr("src", "http://topera.esy.es/img/players/x_" + data[0].id_jugador + ".jpg");
			$("#imgJg").attr("alt", data[0].jugador);
			$("#imgJg").attr("onerror", "this.src=&quot;http://topera.esy.es/img/sin_foto_75x70.png&quot;");

///////////////////////////////					
            $.ajax({
                url: 		 'http://topera.esy.es/ws_resp_partidos_jugador.php',
                type: 		 'GET',
                dataType: 	 'json',
                async: 		 false,
                crossDomain: true,
                timeout: 	 5000,
                data: {
                    id	: id
                },
                success: function(data2){
                    
//idjugador, fecha, torneo, marcador, pareja, rival1, rival2, puntos							
                    var i 		= 0;							

                    html = 	"<table data-role='table' id='info_partidos' data-mode='table' class='ui-responsive'>" +
                            "	<thead>" +
                            "		<tr>" +
                            "			<th></th>" +
                            "			<th data-priority='1'>Fecha</th>" +
                            "			<th></th>" +
                            "			<th data-priority='4'>Pareja</th>" +
                            "			<th data-priority='3'>Rivales</th>" +
                            "			<th data-priority='2'>Puntos</th>" +
                            "		</tr>" +
                            "	</thead>" +
                            "	<tbody>";
                            
                    while (i < data2.length){

                        html = html + "<tr>";								

                        if (eval(data2[i].marcador) > 0){
                            html = html + "	<td><img src='http://topera.esy.es/img/victory.png' class='img_victory'></td>";
							lose = 0;
                        }
                        else{
                            html = html + "	<td><img src='http://topera.esy.es/img/defeat.png' class='img_defeat'></td>";
							lose = 1;
                        }
                        
						
                        html 	   = html + "	<td>" + data2[i].fecha + "</th>";
						var datfec = data2[i].fecha;
                        datfec 	   = datfec.substring(datfec.length - 4);
						var stats  = (datfec == anno - 1);
						var stats2 = (datfec == anno - 2);															
                        var img    = "";

                        if (data2[i].torneo == "MASTER"){
                            img = "http://topera.esy.es/img/master.png";
							if (stats){
								if (lose == 1){
									mas_l++; 
								}
								else{
									mas_w++;
								}
							}
							if (stats2){
								if (lose == 1){
									mas2_l++; 
								}
								else{
									mas2_w++;
								}
							}
                        }else if (data2[i].torneo == "REGIONAL"){
                            img = "http://topera.esy.es/img/regional.png";
							if (stats){
								if (lose == 1){
									cir_l++; 
								}
								else{
									cir_w++;
								}
							}
							if (stats2){
								if (lose == 1){
									cir2_l++; 
								}
								else{
									cir2_w++;
								}
							}
                        }else if (data2[i].torneo == "CIRCUITO"){
                            img = "http://topera.esy.es/img/circuito.png";
							if (stats){
								if (lose == 1){
									cir_l++; 
								}
								else{
									cir_w++;
								}
							}
							if (stats2){
								if (lose == 1){
									cir2_l++; 
								}
								else{
									cir2_w++;
								}
							}
                        }else if (data2[i].torneo == "COPA"){
                            img = "http://topera.esy.es/img/copa.png";
							if (stats){
								if (lose == 1){
									cop_l++; 
								}
								else{
									cop_w++;
								}
							}
							if (stats2){
								if (lose == 1){
									cop2_l++; 
								}
								else{
									cop2_w++;
								}
							}
                        }else if (data2[i].torneo == "LIGA"){
                            img = "http://topera.esy.es/img/liga.png";
							if (stats){
								if (lose == 1){
									lig_l++; 
								}
								else{
									lig_w++;
								}
							}
							if (stats2){
								if (lose == 1){
									lig2_l++; 
								}
								else{
									lig2_w++;
								}
							}
                        }else if (data2[i].torneo == "TORNEO"){
                            img = "http://topera.esy.es/img/torneo.png";
                        }
                        
                        html = html + 	"	<td><img src='" + img + "' class='img_torneo'></td>";
                        
                        if (data2[i].id_pareja != null){
                            html = html + "	<td><a href='info_jugador.html?id=" + data2[i].id_pareja +"' data-ajax='false'>" + data2[i].pareja + "</a></td>";
                        }
                        else{
                            html = html + "	<td>" + data2[i].pareja + "</td>";
                        }
                        if (data2[i].id_rival1 != null){
                            html = html + "	<td>-<a href='info_jugador.html?id=" + data2[i].id_rival1 +"' data-ajax='false'>" + data2[i].rival1 + "</a><br>-";
                        }
                        else{
                            html = html + "	<td>-" + data2[i].rival1 + "<br>-";
                        }
                        if (data2[i].id_rival2 != null){
                            html = html + "<a href='info_jugador.html?id=" + data2[i].id_rival2 +"' data-ajax='false'>" + data2[i].rival2 + "</a></td>"
                        }
                        else{
                            html = html + data2[i].rival2 + "</td>";
                        }
                        
                        html = html + " <td>" + data2[i].puntos + "</td>" +
                                        "</tr>";									
                        i++;
                    }							
                    html = html + "	</tbody>" +
                                  "</table>";
                }
            });
            $("#table_box_par").html(html);
			$("#p").addClass("ui-btn-active");
        }
    });
	
	$("#lbAnno").html(anno-1);				
	html = datosTorneo(lig_w, lig_l);
	$("#lbLiga").html(html);				
	html = datosTorneo(cop_w, cop_l);
	$("#lbCopa").html(html);				
	html = datosTorneo(cir_w, cir_l);
	$("#lbCir").html(html);				
	html = datosTorneo(mas_w, mas_l);
	$("#lbMaster").html(html);
	
	$("#lbAnno2").html(anno-2);				
	html = datosTorneo(lig2_w, lig2_l);
	$("#lbLiga2").html(html);				
	html = datosTorneo(cop2_w, cop2_l);
	$("#lbCopa2").html(html);				
	html = datosTorneo(cir2_w, cir2_l);
	$("#lbCir2").html(html);				
	html = datosTorneo(mas2_w, mas2_l);
	$("#lbMaster2").html(html);
	
	
	$("#lbAnnoT").html("Total");				
	html = datosTorneo(lig_w + lig2_w, lig_l + lig2_l);
	$("#lbLigaT").html(html);				
	html = datosTorneo(cop_w + cop2_w, cop_l + cop2_l);
	$("#lbCopaT").html(html);				
	html = datosTorneo(cir_w + cir2_w, cir_l + cir2_l);
	$("#lbCirT").html(html);				
	html = datosTorneo(mas_w + mas2_w, mas_l + mas2_l);
	$("#lbMasterT").html(html);
	
});

function datosTorneo(win, lose){
	
	divisor = win + lose;
	if (divisor > 0){
		ratio = ((win/divisor)*100).toFixed(2);
	}else{
		ratio = 0;
	}
	txt = "W:" + win + " L:" + lose + " %:" + ratio;				
	return txt;				
}