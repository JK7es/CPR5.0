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
	$consulta 	= "SELECT fecha, categoria, jornada, local, visitante, resultado,
				   (SELECT equipo FROM equipos WHERE id_equipo=local AND temporada = c.temporada) AS nlocal,
				   (SELECT equipo FROM equipos WHERE id_equipo=visitante  AND temporada = c.temporada) AS nvisitante
				   FROM calendario c
				   WHERE (local = " . $id . " OR visitante = " . $id .")
				   AND c.temporada = " . $temporada;
			
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
		$datos[] = array('fecha' 		=> $row->fecha, 
						 'categoria' 	=> $row->categoria, 
						 'jornada' 	  	=> $row->jornada,
						 'local'  		=> $row->local,
						 'visitante'  	=> $row->visitante,
						 'resultado'  	=> $row->resultado,
						 'nlocal'  		=> $row->nlocal,
						 'nvisitante'  	=> $row->nvisitante
						);
	}

	// Se muestra el ohjeto JSON
	echo '' . json_encode($datos) . '';

	//Se cierra la conexion con el servidor
	mysql_close($servidor);//


?>