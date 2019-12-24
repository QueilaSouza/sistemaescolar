<? $painel_atual = "professor";?>
<!DOCTYPE html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<? require "../config.php"; $code; ?>
<link href="css/topo.css" rel="stylesheet" type="text/css" />
<title>To Learn - Administração do Professor</title>
<script language="javascript" src="../js/jquery-1.7.2.min.js"></script>
<script src="../js/lightbox.js"></script>
<link href="../css/lightbox.css" rel="stylesheet" />


<link rel="stylesheet" href="../jquery.superbox.css" type="text/css" media="all" />
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>

	<script type="text/javascript" src="../jquery.superbox-min.js"></script>
	<script type="text/javascript">

		$(function(){

			$.superbox.settings = {

				closeTxt: "Fechar",

				loadTxt: "Carregando...",

				nextTxt: "Next",

				prevTxt: "Previous"

			};

			$.superbox();

		});

	</script>
     <?php require "../conexao.php"; ?>
</head>

<body>
<div id="box_topo">
 
 <div id="logo">
  <img src="../img/logo.jpg" width="250" />
 </div>
 
 <div id="campo_busca">
 
 
 
  <form name="" method="post" action="" enctype="multipart/form-data">
   <input type="text" name="key" /><input class="input" type="submit" name="search" value="" />
  </form>
 </div>
 
 <div id="mostra_login">
  <h1><strong>Olá Professor! Seu código é:</strong> <?php echo @$code; ?> <strong><a href="../config.php?pg=sair">Sair</a></strong></h1>
 </div>
</div>

<div id="box_menu">
 
 <div id="menu_topo">
  <ul>
   <li><a href="index.php">HOME</a></li>
   <li><a href="turmas_e_alunos.php">TURMAS & ALUNOS</a></li>   
   <li><a href="">TODAS AS AVALIAÇÕES</a>
    <ul>
     <li><a href="trabalhos_bimestrais.php">Trabalhos bimestrais</a></li>
     <li><a href="todas_as_avaliacoes.php?pg=provas_bimestrais">Provas bimestrais</a></li>
     <li><a href="trabalhos_extras.php">Trabalhos extras</a></li>
     <li><a href="notas_observacoes.php">Notas de observação</a></li>
    </ul>
   </li>
   <li><a href="suporte_tecnico.php">SUPORTE TECNICO</a></li>
  </ul>
 </div>
</div>
</body>
</html>