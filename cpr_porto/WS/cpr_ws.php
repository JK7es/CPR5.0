<?php
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/********************** CONFIGURACION GENERAL *********************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

	// Vamos a mostrar un Javascript
	header('Content-Type: application/javascript;charset=utf-8');

	// Se genera la Conexion a la base de datos MySql
//	$host 	= "mysql.hostinger.es";
//	$user	= "u742715305_cpr";
//	$pass	= "PDRtopera";
//	$db		= "u742715305_cpr";

	$host 	= "mysql.hostinger.es";
	$user	= "u312321597_top";
	$pass	= "123456";
	$db		= "u312321597_top";

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
		// Se obtiene la agenda de eventos
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
		default:
			# code...
			break;
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
		$consulta 	= "SELECT gr.rank, gr.id_jugador, jg.jugador, eq.id_equipo, eq.equipo, gr.temporada, puntos
					   FROM jgeqtemp gr, jugadores jg, equipos eq, categorias cat
					   WHERE gr.id_jugador = jg.id_jugador
					   AND   gr.id_equipo = eq.id_equipo
					   AND   eq.id_categoria = cat.id_categoria
					   AND   eq.temporada =  YEAR(CURDATE())
					   AND   gr.temporada = YEAR(CURDATE()) ";
		$consulta  .= "AND UPPER(jg.jugador) LIKE '%" . $nombre . "%' ";
		$consulta  .= "AND cat.sexo = '" . $sexo . "' ";
		$consulta  .= "AND gr.id_jugador NOT IN (" . $sel . ") ";
		$consulta  .= "ORDER BY puntos desc LIMIT 0, 25 ";

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
							 'jugador' 	  => $row->jugador,
							 'id_equipo'  => $row->id_equipo,
							 'equipo' 	  => $row->equipo,
							 'temporada'  => $row->temporada,
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
					   FROM eventos 
					   WHERE (f_inicio >= SYSDATE() AND f_fin <= SYSDATE())
					   OR (f_inicio > SYSDATE())
					   ORDER BY f_inicio ASC";
		
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