console.log("INICIO JUGADOR.JS");

		//$( document ).on( "pagecreate", function() {
$(function() {	
	
	$.ajax({
        url : "includes/jugador.html",
        dataType: "text",
        success : function (data) {
        	$("#include").html(data);
        }
    });
	
	
	// Obtenemos el ID del jugador que vamos a buscar su informacion
	var id 		= $_GET("id");
//console.log("id_jugador: " + id);
	
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

	/////////////////////////
	///// DATOS JUGADOR /////
	/////////////////////////
	$.ajax({
		url: 		 'http://www.cpadelrank.com/ws/cpr_ws.php',
		type: 		 'GET',
		dataType: 	 'json',
		async: 		 true,
		crossDomain: true,
		timeout: 	 5000,
		data: {		 id	: id, 
					 op : 'infojg'
		},
		success: function(data){
			
			$("#lbljg").html(data[0].nombre);
			$("#lbName").html(data[0].nombre);
			$("#lbEquipo").html("<a href='equipo.html?op=infoteam&id=" + data[0].id_equipo + "'  data-ajax='false'>" + data[0].equipo + "</a>");
			
			$("#lbCategoria").html(data[0].categoria);
			$("#lbCircuito").html(data[0].categoria2);
			$("#lbPuntos").html(data[0].puntos);

			$("#imgEq").attr("src", "http://www.cpadelrank.com/img/teams/t_" + data[0].id_equipo + ".jpg");
			$("#imgEq").attr("alt", data[0].equipo);
			$("#imgEq").attr("onerror", "this.src='http://www.cpadelrank.com/img/teams/t_0.png'");

			$("#lnkEq").attr("href", "equipo.html?op=infoteam&id=" + data[0].id_equipo);
			$("#lnkEq").attr("title", data[0].equipo);

			$("#imgJg").attr("src", "http://www.cpadelrank.com/img/players/x_" + data[0].id_jugador + ".jpg");
			$("#imgJg").attr("alt", data[0].jugador);
			$("#imgJg").attr("onerror", "this.src='http://www.cpadelrank.com/img/players/x_0.png'");

			////////////////////////////////
			///// ESTADISTICAS JUGADOR /////
			////////////////////////////////
			$.ajax({
				url: 		 'http://topera.esy.es/cpr_ws.php',
				type: 		 'GET',
				dataType: 	 'json',
				async: 		 true,
				crossDomain: true,
				timeout: 	 5000,
				data: {
					op 		: 'infojgstat',
					idpl	: id
				},
				success: function(stats){

					var i 			= 0;
					var copa_win	= 0;
					var copa_lose	= 0;
					var cir_win		= 0;
					var cir_lose	= 0;
					var lig_win		= 0;
					var lig_lose	= 0;
					var reg_win		= 0;
					var reg_lose	= 0;
					var copa_stats	= 0;
					var cir_stats	= 0;
					var lig_stats	= 0;
					var reg_stats	= 0;
					var tot_win		= 0;
					var tot_lose	= 0;
					var tot_stats	= 0;
					
					while (i < stats.length){

						switch(stats[i].torneo) {
							case 'COPA':
								copa_win 	= copa_win  + parseInt(stats[i].victorias);
								copa_lose	= copa_lose + parseInt(stats[i].derrotas);
								break;
							case 'CIRCUITO':
								cir_win 	= cir_win  + parseInt(stats[i].victorias);
								cir_lose	= cir_lose + parseInt(stats[i].derrotas);
								break;
							case 'LIGA':
								lig_win 	= lig_win  + parseInt(stats[i].victorias);
								lig_lose	= lig_lose + parseInt(stats[i].derrotas);
								break;
							case 'MASTER':
								reg_win 	= reg_win  + parseInt(stats[i].victorias);
								reg_lose	= reg_lose + parseInt(stats[i].derrotas);
								break;
						}
						tot_win		= tot_win  + parseInt(stats[i].victorias);
						tot_lose 	= tot_lose + parseInt(stats[i].derrotas);

						i++;
					}

//					devuelvePorcentaje(copa_win, copa_lose);
//					devuelvePorcentaje(cir_win,  cir_lose);
//					devuelvePorcentaje(lig_win,  lig_lose);
//					devuelvePorcentaje(reg_win,  reg_lose);
//					devuelvePorcentaje(tot_win,  tot_lose);

										
//					cir_stats 	= eval((cir_win  / (cir_win  + cir_lose))  * 100).toFixed(0);
//					lig_stats 	= eval((lig_win  / (lig_win  + lig_lose))  * 100).toFixed(0);
//					reg_stats 	= eval((reg_win  / (reg_win  + reg_lose))  * 100).toFixed(0);
//					tot_stats	= eval((tot_win  / (tot_win  + tot_lose))  * 100).toFixed(0);


					$("#lbLigaStats").html(devuelvePorcentaje(lig_win,  lig_lose) + ' %');
					$("#lbCircuitoStats").html(devuelvePorcentaje(cir_win,  cir_lose) + ' %');
					$("#lbCopaStats").html(devuelvePorcentaje(copa_win, copa_lose) + ' %');
					$("#lbMasterStats").html(devuelvePorcentaje(reg_win,  reg_lose) + ' %');
					$("#lbVictorias").html(devuelvePorcentaje(tot_win,  tot_lose) + ' %');
				}
			});		

			////////////////////////////
			///// PARTIDOS JUGADOR /////
			////////////////////////////				
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

					var i 	= 0;
					var j 	= 0;
					html  	= "";
					var pts = $("#lbPuntos").html();
					var pts_max = 0;
					var pts_min = 99999;

					var j = 0;
					var chartDat= new Array();
					var cData 	= new Array();

					cData.push("Fecha");
					cData.push("Puntos");

					chartDat.push(cData);

//console.log("pts--> " + pts);


//console.log("data2.length--> " + data2.length);
					
					html = html +   "<thead>";
					html = html +   "<tr>";
					html = html +   "	<th>Fecha</th>"; 
					html = html +   "	<th>Torneo</th>"; 
					html = html +   "	<th>Pareja</th>";
					html = html +   "	<th>Rivales</th>";
					html = html +   "	<th>Puntos</th>"; 
					html = html +   "</tr>";
					html = html +   "</thead>"; 
					html = html +   "<tbody>";					
					
					while (i < data2.length){

						// Creamos las filas de los encuentros
						html = html +   "<tr>";
						//html = html +   "	<td class='narrow day'>" + eval(i + 1) + "</td>";

						html = html +   "	<td class='narrow day'>" + data2[i].fecha + "</td>";
						html = html +   "	<td class='narrow day'><img src='" + getTipoTorneo(data2[i].torneo) + "' ></td>";
//						html = html +   "	<td class='narrow day'>" + getTipoTorneo(data2[i].torneo) + "</td>";
						html = html +   "	<td class='narrow day'><a href='jugador.html?op=infojg&id=" + data2[i].id_pareja + "' data-ajax='false'>" + data2[i].pareja + "</a></td>";
//						html = html +   "	<td class='narrow day'>" + getTipoTorneo(data2[i].torneo) + "</td>";
						html = html +   "	<td class='narrow day'>";
						html = html +   "		<a href='jugador.html?op=infojg&id=" + data2[i].id_rival1 +"' data-ajax='false'>" + data2[i].rival1 + "</a><br>";
						html = html +   "		<a href='jugador.html?op=infojg&id=" + data2[i].id_rival2 +"' data-ajax='false'>" + data2[i].rival2 + "</a>";
						html = html +   "	</td>";
						html = html +   "	<td class='narrow day'>" + data2[i].puntos + "</td>";
						//html = html +   "	<td class='narrow day'>" + data2[i].puntos + "</td>";
						html = html +   "</tr>";

						// Inicio Calculo estadistico
//console.log ("************-" + i + "-*************");
						var anno = data2[i].fecha.substring(data2[i].fecha.length - 4);
//console.log ("anno: " + anno);

						if (eval(data2[i].puntos) != 0){


							cData 	= new Array();
							cData.push(data2[i].fecha);							
							cData.push(pts);							
							pts = eval(pts - data2[i].puntos);

							if (pts > pts_max){
								pts_max = pts;
							}
							if (pts < pts_min){
								pts_min = pts;
							}
							chartDat.push(cData);
						}

						i++;
					}
					html = html +   "</tbody>";
					var str = JSON.stringify(voltearArray(chartDat));
					//google.setOnLoadCallback(drawChart);
					drawChart(str, pts_max, pts_min);
				}
			});
		
			$("#matchlist").html(html);
//console.log("fin lista partidos");
		}, 
		complete: function (){
			$(".gifloading").css("display", "none");
			
			$("#matchlist").tablesorter();
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

function getTipoTorneo(torneo){

//console.log ("getTipoTorneo: " + torneo);

	if (torneo == "MASTER"){
		img = "http://www.cpadelrank.com/img/master.png";
	}else if (torneo == "REGIONAL"){
		img = "http://topera.esy.es/img/regional.png";
	}else if (torneo == "CIRCUITO"){
		img = "http://www.cpadelrank.com/img/circuito.png";
	}else if (torneo == "COPA"){
		img = "http://www.cpadelrank.com/img/copa.png";
	}else if (torneo == "LIGA"){
		img = "http://www.cpadelrank.com/img/liga.png";
	}else if (torneo == "TORNEO"){
		img = "http://www.cpadelrank.com/img/torneo.png";
	}

	return img;
}

function drawChart(JsonData, maximo, minimo) {

	var data = google.visualization.arrayToDataTable($.parseJSON(JsonData));

	var options = {
		title: 'Evoluación Puntos',
		vAxis: {minValue: minimo}
	};

	var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

function voltearArray(charData){
	//console.log("Longitud Array: " + charData.length);

	var i = charData.length - 1;
	var j = 0;
	var array = new Array();	

	array[j] = charData[0];

	for (i; i >= 0; i--) {
		//console.log("Indice: " + i);
		//console.log("Nuevo array " + array[j]);	

		j++;

		array[j] = charData[i];
		
	}
	
	return array;
}

// En funcion de dos cantidades devuelve el porcentaje
function devuelvePorcentaje(win, lose){
	
	if (eval(win  + lose) <= 0){

		return 0;
	}

	var retorno =  eval((win  / (win  + lose))  * 100).toFixed(0);

	return retorno;
}
