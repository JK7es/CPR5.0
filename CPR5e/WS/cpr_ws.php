<?php

	header('content-type: application/json; charset=utf-8');
	header("access-control-allow-origin: *");
/******************************************************************************/
/******************************************************************************/
/********************** CONFIGURACION GENERAL *********************************/
/******************************************************************************/
/******************************************************************************/


	// Se genera la Conexion a la base de datos MySql
	$host 	= "mysql.hostinger.es";
	$user	= "u742715305_rodri";
	$pass	= "u742715305_rodri";
	$db		= "u742715305_rodri";

//	$host 	= "mysql.hostinger.es";
//	$user	= "u312321597_top";
//	$pass	= "123456";
//	$db		= "u312321597_top";

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

	// En funcion de la opcion que enviamos enviamos la información requerida
	$opcion = $_REQUEST['op'];
	
	switch ($opcion) {
		// Se crea el menu masculino
		case 'mnm':
			getMenu("M");
			break;
		// Se crea el menu masculino
		case 'mnf':
			getMenu("F");
			break;
		// Se obtiene las noticias
		case 'ag':
			getAgenda();
			break;
		//Jugadores de la calculadora	
		case 'jgcal':
			getJgCalculadora();
			break;	
		// Información del jugador	
		case 'infojg':
			getInfoJugador();
			break;
		// Información de los partidos de un jugador
		case 'infojgpar':
			getInfoJugadorPartidos();
			break;
		// Información de los partidos de un jugador
		case 'infojgstat':
			getEstadisticaJugador();
			break;
		// Información general de un equipo
		case 'infoteam':
			getInfoEquipo();
			break;
		// Información de los jugadores de un equipo
		case 'infoteamjg':
			getInfoEquipoJugadores();
			break;
		// Información del calendario de un equipo
		case 'infoteamcal':
			getInfoEquipoCalendario();
			break;
		default:
			# code...
			break;
	}

	// 
	function getMenu($sexo){
		//
		// http://mikehillyer.com/articles/managing-hierarchical-data-in-mysql/
		//
		// Consulta para los equipos masculinos
		//
		$consulta 	=  "SELECT g1.id_categoria, g1.categoria, g2.id_categoria AS id_cat_grupo, g2.categoria AS grupo
						FROM competiciones c, categorias g1 LEFT OUTER JOIN categorias g2
						ON g1.id_categoria = g2.id_cat_padre
						WHERE 1 = 1
						AND c.id_competicion = g1.id_competicion
						AND c.anno = YEAR(CURDATE())
						AND g1.id_cat_padre IS NULL
						AND g1.sexo = '" . $sexo . "'";
						
		//echo $consulta . "\n";

		$sql 		= mysql_query($consulta);
		
		if (!$sql){
			echo "La conexion no se logro-> " . mysql_error();
			die;
		}
		
		//Se crea el array que va a tener los datos obtenidos por la DB
		$datos 		= array();
		
		while ($row = mysql_fetch_object($sql)){
			$datos[] = array('id_categoria' => $row->id_categoria, 
							 'categoria' 	=> $row->categoria, 
							 'id_cat_grupo' => $row->id_cat_grupo,
							 'grupo'  		=> $row->grupo
							);
		}

		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';
		
	}

	// Obtiene el listado de los jugadores pertenecientes al equipo
	function getInfoEquipoCalendario(){
		// Se obtienen los parametros
		$idjugador	= $_REQUEST['id'];		
		$temporada  = $_REQUEST['temp'];

		if ($temporada == null || $temporada == ""){
			$temporada = "YEAR(CURDATE())";
		}

		//Se crea la consulta
		$consulta 	=  "SELECT fecha, categoria, jornada, local, visitante, resultado,
				   			   (SELECT equipo FROM equipos WHERE id_equipo=local AND temporada = c.temporada) AS nlocal,
				   			   (SELECT equipo FROM equipos WHERE id_equipo=visitante  AND temporada = c.temporada) AS nvisitante
				   		FROM calendario c
				   		WHERE (local = " . $id . " OR visitante = " . $id .")
				   		AND c.temporada = " . $temporada;

		//echo $consulta . "\n";

		$sql 		= mysql_query($consulta);

		if (!$sql){
			echo "La conexion no se logro-> " . mysql_error();
			die;
		}

		//Se crea el array que va a tener los datos obtenidos por la DB
		$datos 		= array();

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

	}

	// Obtiene el listado de los jugadores pertenecientes al equipo
	function getInfoEquipoJugadores(){
		// Se obtienen los parametros
		$idjugador	= $_REQUEST['id'];		
		$temporada  = $_REQUEST['temp'];

		if ($temporada == null || $temporada == ""){
			$temporada = "YEAR(CURDATE())";
		}

		//Se crea la consulta
		$consulta 	= " SELECT jet.rank, jg.id_jugador, jg.jugador, jet.puntos
						FROM jgeqtemp jet, jugadores jg
						WHERE jet.id_jugador = jg.id_jugador
						AND jet.temporada = " . $temporada;
		$consulta = $consulta . " AND jet.id_equipo = " . $id;
		$consulta = $consulta . " ORDER BY jet.puntos DESC";


		//echo $consulta . "\n";

		$sql 		= mysql_query($consulta);

		if (!$sql){
			echo "La conexion no se logro-> " . mysql_error();
			die;
		}


		//Se crea el array que va a tener los datos obtenidos por la DB
		$datos 		= array();

		while ($row = mysql_fetch_object($sql)){
			$datos[] = array('rank' 		=> $row->rank, 
							 'id_jugador' 	=> $row->id_jugador, 
							 'jugador' 	  	=> $row->jugador,
							 'puntos'  		=> $row->puntos
							);
		}

		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';

	}

	// Obtiene la información general de un equipo
	function getInfoEquipo(){
		// Se obtienen los parametros
		$idjugador	= $_REQUEST['id'];		
		$temporada  = $_REQUEST['temp'];

		if ($temporada == null || $temporada == ""){
			$temporada = "YEAR(CURDATE())";
		}

		//Se crea la consulta
		$consulta 	= " SELECT DISTINCT eq.id_equipo, equipo, eq.temporada, cat.categoria, cl.id_club, cl.club, cl.p_cubiertas, cl.p_cristal, cl.p_muro
						FROM categorias cat, equipos eq LEFT JOIN clubes cl ON eq.id_club = cl.id_club
						WHERE eq.id_categoria = cat.id_categoria";
		$consulta 	= $consulta . " AND id_equipo = " . $id ;
		$consulta 	= $consulta . " AND eq.temporada = " . $temporada ;
		$consulta 	= $consulta . " ORDER BY temporada DESC";

		//echo $consulta . "\n";

		$sql 		= mysql_query($consulta);

		if (!$sql){
			echo "La conexion no se logro-> " . mysql_error();
			die;
		}

		//Se crea el array que va a tener los datos obtenidos por la DB
		$datos 		= array();

		// Se recorre los datos de la consulta y se insertan en el array
		while ($row = mysql_fetch_object($sql)){
			$datos[] = array('id_equipo'	=> $row->id_equipo, 
	 						 'equipo'		=> $row->equipo,
	 						 'temporada'	=> $row->temporada,							 
							 'categoria'	=> $row->categoria,
							 'id_club'		=> $row->id_club,
							 'club'			=> $row->club,
							 'p_cubiertas'	=> $row->p_cubiertas,
							 'p_cristal'	=> $row->p_cristal,
							 'p_muro'		=> $row->p_muro							 
							);
		}

		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';
	}

	// Obtiene los partidos jugados en todos los torneos de un jugador.
	function getEstadisticaJugador(){
		// Se obtienen los parametros
		$idjugador	= $_REQUEST['idpl'];		
		$temporada  = $_REQUEST['temp'];
			if ($temporada == null || $temporada == ""){
				$temporada = "YEAR(CURDATE())";
			}

		//Se prepara la peticion
		$consulta 	= " SELECT torneo, if(left(marcador, 1) - right(marcador, 1)>0, 'V', 'D') resultado, count(1) veces, SUBSTR( fecha, 7 ) AS anno
					    FROM auxiliar_partidos a 
						WHERE 1 = 1
						AND idjugador = " . $idjugador;
		$consulta  .= " GROUP BY anno, torneo, resultado ";
		$consulta  .= " ORDER BY anno, torneo ";
		
		//echo $consulta . "\n";

		$sql 		= mysql_query($consulta);

		if (!$sql){
			echo "La conexion no se logro-> " . mysql_error();
			die;
		}

		//Se crea el array que va a tener los datos obtenidos por la DB
		$datos 		= array();

		// Variables para el calculo
		$nwin		= 0;
		$nlose		= 0;
		$porcentaje	= 0;
		$escribe 	= false;

		$row 		= mysql_fetch_object($sql);
		$anno		= $row->anno;
		$torneo 	= $row->torneo;

		// Volvemos al primer registro
		mysql_data_seek ( $sql, 0);
		
		// Se recorre los datos de la consulta y se insertan en el array
		while ($row = mysql_fetch_object($sql)){

			if ($row->anno != $anno || $row->torneo != $torneo){
				$anno 		= $row->anno;
				$torneo		= $row->torneo;
				$nwin		= 0;
				$nlose		= 0;
				$porcentaje	= 0;
				$escribe	= false;
			}

			if ($row->resultado == 'V'){
				$nwin = $row->veces; 
				$escribe	= true;
			}else{
				$nlose = $row->veces; 
			}	

			$porcentaje = ($nwin / ($nwin + $nlose)) * 100;

			if ($escribe == true){
				$datos[] = array('anno'			=> $anno, 
								 'torneo'		=> $torneo,
								 'victorias'	=> $nwin,
								 'derrotas'		=> $nlose,
								 'porcentaje'	=> round($porcentaje, 0)
								);
			}
		}
		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';
	}

	// Obtiene la informacion referente a los partidos de un jugador
	function getInfoJugadorPartidos(){
		
	}

	// Obtiene la información referente a un jugador 
	function getInfoJugador(){
		// Se obtienen los parametros
		$idjugador	= $_REQUEST['idpl'];
		$temporada 	= $_REQUEST['temp'];

		//Se prepara la peticion
		$consulta 	= " SELECT jg.id_jugador, jg.nombre, jg.puntos, eq.id_equipo, eq.equipo, cat.id_categoria, cat.categoria, cat.sexo 
					    FROM jugador jg, equipos eq, categorias cat
					    WHERE 1 = 1
					    AND jg.id_equipo = eq.id_equipo
					    AND eq.id_categoria = cat.id_categoria ";
		$consulta  .= " AND jg.id_jugador = " . $idjugador ;
		$consulta  .= " AND eq.temporada = " . $temporada ;

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
			$datos[] = array('id_jugador'	=> $row->id_jugador, 
	 						 'nombre'		=> $row->nombre,
	 						 'puntos'		=> $row->puntos,							 
							 'id_equipo'	=> $row->id_equipo,
							 'equipo'		=> $row->equipo,
							 'id_categoria'	=> $row->id_categoria,
							 'categoria'	=> $row->categoria,
							 'sexo'			=> $row->sexo,
							 'temporada'	=> $row->temporada							 
							);
		}

		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';

	}

	// Se muestra una lista de jugadores que coincide con las letras introducidas en la calculadora de puntos
	// Se eliminan los jugadores seleccionados anteriormente 

	function getJgCalculadora(){

		// Se obtienen los parametros
		$nombre 	= $_REQUEST['nom'];
		$sexo 		= $_REQUEST['sexo'];
		$sel 		= $_REQUEST['sel'] . "0";
		$temporada 	= "YEAR(CURDATE())";

		//Se prepara la peticion
		$consulta 	= "SELECT j.id_jugador, j.nombre, c.anno, c.descripcion, jp.ranking, jp.puntos, e.equipo, e.id_equipo
					   FROM competiciones c, jug_puntos jp, jugadores j, eq_jug ej, equipos e
					   WHERE jp.id_competicion = c.id_competicion
					   AND jp.id_jugador = j.id_jugador
					   AND ej.id_jugador = jp.id_jugador
					   AND ej.id_competicion = c.id_competicion
					   AND ej.id_equipo = e.id_equipo ";
		$consulta  .= "AND c.anno = Date_format(now(),'%Y') ";
//		$consulta  .= "AND j.sexo = '" . $sexo . "' ";
		$consulta  .= "AND j.id_jugador NOT IN (" . $sel . ") ";
		$consulta  .= "AND UPPER(j.nombre) LIKE '%" . $nombre . "%' ";
		$consulta  .= "ORDER BY nombre asc LIMIT 0, 25 ";
		
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
			$datos[] = array('rank' 	  => $row->rank, 
	 						 'id_jugador' => $row->id_jugador, 
							 'jugador' 	  => $row->nombre,
							 'id_equipo'  => $row->id_equipo,
							 'equipo' 	  => $row->equipo,
							 'temporada'  => $row->anno,
							 'puntos' 	  => $row->puntos
							);
		}

		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';
	}


	// Calculo de los eventos mas proximos tomando en cuenta la fecha actual.
	// Los eventos pasados no apareceran.
	function getAgenda(){

		//Se prepara la peticion
		$consulta 	= "SELECT id_noticia, titular, noticia, imagen, f_inicio, f_fin, autor, fecha, MONTH(f_inicio) AS mes 
					   FROM noticias 
					   WHERE (f_fin <= SYSDATE() OR f_fin IS NULL)
					   OR (f_inicio > SYSDATE())
					   ORDER BY f_inicio DESC";
		
		$sql 		= mysql_query($consulta);

		if (!$sql){
			echo "La conexion no se logro-> " . mysql_error();
			die;
		}

		//Se crea el array que va a tener los datos obtenidos por la DB
		$datos = array();

		// Se recorre los datos de la consulta y se insertan en el array
		while ($row = mysql_fetch_object($sql)){		

			$datos[] = array('id_noticia'	=> $row->id_noticia,
							 'titular' 		=> $row->titular, 
							 'noticia' 		=> $row->noticia,
							 'imagen'  		=> $row->imagen,
							 'f_inicio' 	=> $row->f_inicio,
							 'f_fin'		=> $row->f_fin,
							 'autor'	  	=> $row->autor,
							 'fecha'  		=> $row->fecha,
							 'mes'			=> traduceMes($row->mes)
							);

		}

		// Se muestra el ohjeto JSON
		echo '' . json_encode($datos) . '';

	}	

	//Se cierra la conexion con el servidor
	mysql_close($servidor);//

	// Se declara que esta aplicacion genera un JSON	
	//	header('Content-type: application/json');

	// Se abre acceso a las conexiones que requieran de esta aplicacion.
	//	header("Access-Control-Allow-Origin: *");

	function traduceMes ($mes){

		$traduccion = "";

		switch ($mes) {
			case '1':
				$traduccion = 'Enero';
				break;
			case '2':
				$traduccion = 'Febrero';
				break;
			case '3':
				$traduccion = 'Marzo';
				break;
			case '4':
				$traduccion = 'Abril';
				break;
			case '5':
				$traduccion = 'Mayo';
				break;
			case '6':
				$traduccion = 'Junio';
				break;
			case '7':
				$traduccion = 'Julio';
				break;
			case '8':
				$traduccion = 'Agosto';
				break;
			case '9':
				$traduccion = 'Septiembre';
				break;
			case '10':
				$traduccion = 'Octubre';
				break;
			case '11':
				$traduccion = 'Noviembre';
				break;
			case '12':
				$traduccion = 'Diciembre';
				break;
		}
		return $traduccion;
	}
?>