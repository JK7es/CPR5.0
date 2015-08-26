<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<!-- TemplateBeginEditable name="doctitle" -->
<title>Documento sin título</title>
<!-- TemplateEndEditable -->
<!-- TemplateBeginEditable name="head" -->
<!-- TemplateEndEditable -->
<link href="../css/estiloprincipal.css" rel="stylesheet" type="text/css" />
<link href="../css/font-awesome.css" rel="stylesheet" type="text/css" />
<link href="../css/menu.css" rel="stylesheet" type="text/css" />

<?php include("../includes/google.php"); ?>
</head>

<body>

<div class="container">
  <div class="header"><?php include("../includes/cabecera.php"); ?>
  <div class="clearfloat"></div>
  <?php include("../includes/menu.php"); ?></div>
  <div class="sidebar1">

    <p> Los v&iacute;nculos anteriores muestran una estructura de navegaci&oacute;n b&aacute;sica que emplea una lista no ordenada con estilo de CSS. Util&iacute;cela como punto de partida y modifique las propiedades para lograr el aspecto deseado. Si necesita men&uacute;s desplegables, cr&eacute;elos empleando un men&uacute; de Spry, un widget de men&uacute; de Adobe Exchange u otras soluciones de javascript o CSS.</p>
    <p>Si desea que la navegaci&oacute;n se sit&uacute;e a lo largo de la parte superior, simplemente mueva ul.nav a la parte superior de la p&aacute;gina y vuelva a crear el estilo.</p>
    <!-- end .sidebar1 --></div>
  <div class="content">
    <h1>Instrucciones</h1>
    <p>Tenga en cuenta que la CSS para estos dise&ntilde;os cuenta con numerosos comentarios. Si realiza la mayor parte de su trabajo en la vista Dise&ntilde;o, eche un vistazo al c&oacute;digo para obtener sugerencias sobre c&oacute;mo trabajar con la CSS para dise&ntilde;os fijos. Puede quitar estos comentarios antes de lanzar el sitio. Para obtener m&aacute;s informaci&oacute;n sobre las t&eacute;cnicas usadas en estos dise&ntilde;os CSS, lea este art&iacute;culo en el Centro de desarrolladores de Adobe: <a href="http://www.adobe.com/go/adc_css_layouts">http://www.adobe.com/go/adc_css_layouts</a>.</p>
    <h2>M&eacute;todo de borrado</h2>
    <p>Dado que todas las columnas son flotantes, este dise&ntilde;o usa una declaraci&oacute;n clear:both en la regla .footer. Esta t&eacute;cnica de borrado fuerza a .container a conocer d&oacute;nde terminan las columnas con el fin de mostrar cualquier borde o color de fondo que coloque en .container. Si su dise&ntilde;o exige la eliminaci&oacute;n de .footer de .container, deber&aacute; usar un m&eacute;todo de borrado diferente. El m&aacute;s fiable consiste en a&ntilde;adir una &lt;br class=&quot;clearfloat&quot; /&gt; o &lt;div  class=&quot;clearfloat&quot;&gt;&lt;/div&gt; tras la &uacute;ltima columna flotante (pero antes de que se cierre .container). Esto proporcionar&aacute; el mismo efecto de borrado.</p>
    <h3>Sustituci&oacute;n de logotipo</h3>
    <p>Se ha utilizado un marcador de posici&oacute;n de imagen en el .header de este dise&ntilde;o, en el que lo m&aacute;s probable es que desee colocar un logotipo. Se recomienda quitar el marcador de posici&oacute;n y reemplazarlo por su propio logotipo vinculado. </p>
    <p> Tenga en cuenta que si utiliza el inspector de propiedades para navegar hasta la imagen de su logotipo empleando el campo Origen (en lugar de quitar y reemplazar el marcador de posici&oacute;n), deber&aacute; quitar el fondo en l&iacute;nea y mostrar las propiedades. Estos estilos en l&iacute;nea s&oacute;lo se utilizan para hacer que el marcador de posici&oacute;n del logotipo aparezca en los navegadores para fines de demostraci&oacute;n. </p>
    <p>Para quitar los estilos en l&iacute;nea, aseg&uacute;rese de que el panel Estilos CSS est&aacute; configurado como Actual. Seleccione la imagen y, en la secci&oacute;n Propiedades del panel Estilos CSS, haga clic con el bot&oacute;n derecho del rat&oacute;n y elimine las propiedades de visualizaci&oacute;n y de fondo. (Por supuesto que siempre podr&aacute; ir directamente al c&oacute;digo y eliminar all&iacute; los estilos en l&iacute;nea de la imagen o el marcador de posici&oacute;n.)</p>
    <h4>Fondos</h4>
    <p>Por naturaleza, el color de fondo de cualquier div s&oacute;lo se muestra a lo largo del contenido. Esto significa que si est&aacute; usando un color de fondo o un borde para crear el aspecto de una columna lateral, &eacute;ste no se extender&aacute; hasta el pie de p&aacute;gina, sino que se detendr&aacute; donde termine el contenido. Si la div de .content siempre va a incluir m&aacute;s contenido, puede colocar un borde en la div de .content para separarla de la columna.</p>
    <!-- end .content --></div>
  <div class="footer">
   <?php include("../includes/pie.php"); ?></div>
  <!-- end .container --></div>
</body>
</html>
