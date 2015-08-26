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
	$consulta 	= "SELECT jg.id_jugador, jg.jugador, eq.id_equipo, eq.equipo, cat.id_categoria, cat.categoria, jet.temporada, jet.puntos 
					FROM jugadores jg, jgeqtemp jet, equipos eq, categorias cat
					WHERE 1 = 1
					AND jg.id_jugador = jet.id_jugador
					AND jet.id_equipo = eq.id_equipo
					AND jet.temporada = eq.temporada
					AND eq.id_categoria = cat.id_categoria
					AND jet.temporada = " . $temporada;
	$consulta 	= $consulta . " AND jg.id_jugador = " . $id ;
			
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
		$datos[] = array('id_jugador' 	=> $row->id_jugador, 
						 'jugador' 	  	=> $row->jugador,
						 'id_equipo'  	=> $row->id_equipo,
						 'equipo' 	  	=> $row->equipo,
						 'id_categoria' => $row->id_categoria,
						 'categoria'  	=> $row->categoria,
						 'categoria2'  	=> $row->categoria,
						 'temporada'  	=> $row->temporada,
						 'puntos' 	  	=> $row->puntos
						);
	}

	// Se muestra el ohjeto JSON
	echo '' . json_encode($datos) . '';

	//Se cierra la conexion con el servidor
	mysql_close($servidor);//


?>