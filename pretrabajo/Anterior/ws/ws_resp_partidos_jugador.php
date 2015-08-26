<?php
	// Vamos a mostrar un Javascript
	header('Content-Type: application/javascript;charset=utf-8');
	
	$id 		= $_REQUEST['id'];
	$temporada  = $_REQUEST['temp'];
	if ($temporada == null || $temporada == ""){
		$temporada = "YEAR(CURDATE())";
	}
	//Generar respuesta Json con PHP y MySql

	// Se genera la Conexion a la base de datos MySql

	$host 	= "HOST";
	$user	= "USER";
	$pass	= "PASS";
	$db		= "DB";

	// Conexion con el servidor

	$servidor 	= mysql_connect($host, $user, $pass);

	if (!$servidor){
		echo "No se ha conseguido la conexión con el servidor-> " . mysql_error();
		die;
	}

	mysql_query("SET NAMES 'utf8'");
	//Se elige el formato de datos para la conexion UTF8
	mysql_set_charset("UTF8", $servidor);

	//Se crea la conexion con la DDBB
	$conexion 	= mysql_select_db($db, $servidor);

	if (!$conexion){
		echo "No se ha podido seleccionar la DB-> " . mysql_error();
		die;
	}
	
	//Se prepara la peticion
	$consulta = "SELECT idjugador, fecha, torneo, marcador, pareja, j.id_jugador AS id_pareja, " .
				"       rival1, jr1.id_jugador AS id_rival1, rival2, jr2.id_jugador AS id_rival2, puntos, " .
				"       CONCAT( SUBSTR( fecha, 7 ) , SUBSTR( fecha, 4, 2 ) , SUBSTR( fecha, 1, 2 ) ) AS anno " .
				"FROM auxiliar_partidos a " .
				"LEFT OUTER JOIN jugadores j ON a.pareja = j.jugador " .
				"LEFT OUTER JOIN jugadores jr1 ON a.rival1 = jr1.jugador " .
				"LEFT OUTER JOIN jugadores jr2 ON a.rival2 = jr2.jugador " .
				"WHERE idjugador = " . $id . " " .
				"ORDER BY anno DESC";
			
			
//echo $consulta;
	
	$sql 		= mysql_query($consulta);

	if (!$sql){
		echo "La conexion no se logro-> " . mysql_error();
		die;
	}

	//Se crea el array que va a tener los datos obtenidos por la DB
	$datos = array();

	// Se recorre los datos de la consulta y se insertan en el array
	while ($row = mysql_fetch_object($sql)){
		$datos[] = array('id_jugador' 	=> $row->idjugador,
						 'fecha'  		=> $row->fecha,
						 'torneo' 	  	=> $row->torneo,
						 'marcador' 	=> $row->marcador,
						 'pareja' 	  	=> $row->pareja,
						 'id_pareja' 	=> $row->id_pareja,  	
						 'rival1'  		=> $row->rival1,
						 'id_rival1' 	=> $row->id_rival1,  	
						 'rival2'  		=> $row->rival2,
						 'id_rival2' 	=> $row->id_rival2,  	
						 'puntos'  		=> $row->puntos
						);
	}

	// Se muestra el ohjeto JSON
	echo '' . json_encode($datos) . '';

	//Se cierra la conexion con el servidor
	mysql_close($servidor);//


?>