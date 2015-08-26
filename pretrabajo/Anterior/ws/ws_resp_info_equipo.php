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
	$consulta 	= " SELECT DISTINCT eq.id_equipo, equipo, eq.temporada, cat.categoria, cl.id_club, cl.club, cl.p_cubiertas, cl.p_cristal, cl.p_muro
					FROM categorias cat, equipos eq LEFT JOIN clubes cl ON eq.id_club = cl.id_club
					WHERE eq.id_categoria = cat.id_categoria";
	$consulta 	= $consulta . " AND id_equipo = " . $id ;
	$consulta 	= $consulta . " ORDER BY temporada DESC";

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
		$datos[] = array('id_equipo' 	=> $row->id_equipo, 
						 'equipo' 	  	=> $row->equipo,
						 'categoria'  	=> $row->categoria,
						 'temporada'  	=> $row->temporada,
						 'id_club'  	=> $row->id_club,
						 'club'  		=> $row->club,
						 'p_cubiertas'  => $row->p_cubiertas,
						 'p_cristal'  	=> $row->p_cristal,
						 'p_muro'  		=> $row->p_muro						 
						);
	}

	// Se muestra el ohjeto JSON
	echo '' . json_encode($datos) . '';

	//Se cierra la conexion con el servidor
	mysql_close($servidor);//


?>