/*!
 * 
 * calculadora.js - Calcula los puntos de los partidos de la liga cantabra de Padel
 * 
*/


function calcula (pts_p1j1, pts_p1j2, pts_p2j1, pts_p2j2, torneo, categoria, ganador){

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
 	pts_p1 	= pts_p1j1 + pts_p1j2;
 	pts_p2 	= pts_p2j1 + pts_p2j2;

 	const_D = calcula_const_D(pts_p1, pts_p2);

 	const_K = calcula_const_K(torneo, categoria);

 	console.log("const_K.winner: " + const_K.winner);
 	console.log("const_K.loser: " + const_K.loser);

 	const_K_winner 	= const_K.winner
	const_K_loser 	= const_K.loser

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

// Calculo de las constantes K para la pareja ganadora y perdedora.
// Se calcula en funcion del torneo y la categoría
function calcula_const_K(torneo, categoria){
	console.log("Torneo: " + torneo);
	console.log("Categoria: " + categoria);
 	switch (torneo){
 		
 		case "L": 	// LIGA

 			switch (categoria){

 				case 1: // 1º Categoria
console.log("CASE 1");
 					const_K_winner 	= 1.25;
 					const_K_loser	= 0.75;
console.log("F-CASE 1");
 					break;
 				
 				case 2: // 2º Categoria
 					const_K_winner 	= 1;
 					const_K_loser	= 1;
 					break;

 				case 3: // 3º Categoria
 					const_K_winner 	= 0.75;
 					const_K_loser	= 1.25;
 					break;

 				case 4: // 4º Categoria
 					const_K_winner 	= 0.5;
 					const_K_loser	= 1.5;
 					break;		
 			}
 			break;

 		case "C": 	// COPA

 			switch (categoria){

 				case 1: // 1º Categoria
 					const_K_winner 	= 1.25;
 					const_K_loser	= 0.75;
 					break;
 				
 				case 2: // 2º Categoria
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

 // Calculo de la constante D 
function calcula_const_D(pts_p1, pts_p2){

 	var const_D = Math.round(Math.abs(pts_p1 - pts_p2)/50);

 	if (const_D > 50){ 		
 		
 		const_D = 50;
 	}
 	console.log("Constante D: " + const_D);

 	return const_D;
}