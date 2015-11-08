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

	// Load the Visualization API library and the piechart library.
  	google.load('visualization', '1.0', {'packages':['corechart']});
	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawChart());

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

			$("#imgEq").attr("src", "http://topera.esy.es/img/teams/" + data[0].id_equipo + ".jpg");
			$("#imgEq").attr("alt", data[0].equipo);
			$("#imgEq").attr("onerror", "this.src='http://topera.esy.es/img/sin_foto_75x70.png'");

			$("#lnkEq").attr("href", "http://topera.esy.es/img/teams/");
			$("#lnkEq").attr("title", data[0].equipo);

			$("#imgJg").attr("src", "http://topera.esy.es/img/players/x_" + data[0].id_jugador + ".jpg");
			$("#imgJg").attr("alt", data[0].jugador);
			$("#imgJg").attr("onerror", "this.src='http://topera.esy.es/img/sin_foto_75x70.png'");

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

					var i 	= 0;
					var j 	= 0;
					html  	= "";
					var pts = $("#lbPuntos").html();


					var chartDat= new Array();
					var cData 	= new Array();
					cData 		= ["Fecha", "Puntos"];

					chartDat.push(cData);

console.log("pts--> " + pts); 

console.log("data2.length--> " + data2.length); 
					while (i < data2.length){

						// Creamos las filas de los encuentros
						html = html +   "<tr>";
						html = html +   "	<td class='narrow day'>" + eval(i + 1) + "</td>";

						html = html +   "	<td class='narrow day'>" + data2[i].fecha + "</td>";
						html = html +   "	<td class='narrow day'><img src='" + getTipoTorneo(data2[i].torneo) + "' ></td>";
//						html = html +   "	<td class='narrow day'>" + getTipoTorneo(data2[i].torneo) + "</td>";
						html = html +   "	<td class='narrow day'><a href='info_jugador.html?id=" + data2[i].id_pareja + "' data-ajax='false'>" + data2[i].pareja + "</a></td>";
//						html = html +   "	<td class='narrow day'>" + getTipoTorneo(data2[i].torneo) + "</td>";
						html = html +   "	<td class='narrow day'>";
						html = html +   "		<a href='info_jugador.html?id=" + data2[i].id_rival1 +"' data-ajax='false'>" + data2[i].rival1 + "</a><br>";
						html = html +   "		<a href='info_jugador.html?id=" + data2[i].id_rival2 +"' data-ajax='false'>" + data2[i].rival2 + "</a>";
						html = html +   "	</td>";
						html = html +   "	<td class='narrow day'>" + data2[i].puntos + "</td>";
						html = html +   "	<td class='narrow day'>" + data2[i].puntos + "</td>";
						html = html +   "</tr>";

						// Inicio Calculo estadistico
console.log ("************-" + i + "-*************");
						var anno = data2[i].fecha.substring(data2[i].fecha.length - 4);
console.log ("anno: " + anno);
console.log("data2[i].puntos--> " + data2[i].puntos);
						pts = pts - data2[i].puntos;
console.log("pts--> " + pts);

						
						if (eval(data2[i].puntos) != 0){

							cData = [data2[i].fecha, pts];
							chartDat.push(cData);
						}

						i++;
					}

					var str = JSON.stringify(chartDat);
				}
			});
			$("#matchlist").html(html);
console.log("fin lista partidos");
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

console.log ("getTipoTorneo: " + torneo);

	if (torneo == "MASTER"){
		img = "http://topera.esy.es/img/master.png";
	}else if (torneo == "REGIONAL"){
		img = "http://topera.esy.es/img/regional.png";
	}else if (torneo == "CIRCUITO"){
		img = "http://topera.esy.es/img/circuito.png";		
	}else if (torneo == "COPA"){
		img = "http://topera.esy.es/img/copa.png";
	}else if (torneo == "LIGA"){
		img = "http://topera.esy.es/img/liga.png";
	}else if (torneo == "TORNEO"){
		img = "http://topera.esy.es/img/torneo.png";
	}

	return img;
}


function drawChart() {

	var data = google.visualization.arrayToDataTable([["Fecha","Puntos"],["17/08/2014",1808],["17/08/2014",1850],["08/08/2014",1813],["17/05/2014",1869],["10/05/2014",1914],["03/05/2014",1886],["26/04/2014",1949],["05/04/2014",1904],["28/03/2014",1850],["08/03/2014",1819],["22/02/2014",1794],["08/02/2014",1779],["26/01/2014",1724],["18/01/2014",1685],["16/08/2013",1722],["10/08/2013",1685],["26/05/2013",1737],["11/05/2013",1796],["04/05/2013",1855],["27/04/2013",1903],["13/04/2013",1860],["23/03/2013",1923],["17/03/2013",1885],["08/03/2013",1929],["22/02/2013",1891],["15/02/2013",1935],["03/02/2013",1896],["25/01/2013",1849],["20/01/2013",1814],["12/01/2013",1773]]);

	var options = {
					title: 'Company Performance',
					hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
					vAxis: {minValue: 0}
				  };

	var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

