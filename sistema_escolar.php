<?php 

$login= ['login'];
$senha=[''];
$connect=mysqli_connect('localhost','id12031183_sistemaescolar01','', 'id12031183_sistemaescolar01');
$db = mysqli_select_db ('id12031183_sistemaescolar01');
$query_select = “SELECT * FROM login WHERE id='$code'”;
$select = "mysqli_query=($ query_select, $ connect)";
$array = "mysqli_fetch_array ($ select)";
$logarray = "$array ['login']";

if ($ login == “” || $ login == null){ 
echo "";
}else{
  if($logarray == $login){

    echo"<script language='javascript' type='text/javascript'>alert('Esse login já existe');window.location.href='cadastro.html';</script>";
    die();

  }else{
    $query = "INSERT INTO usuarios (login,senha) VALUES ('$login','$senha')";
    $insert = mysqli_query($query,$connect);
    
    if($insert){
      echo"<script language='javascript' type='text/javascript'>alert('Usuário cadastrado com sucesso!');window.location.href='login.html'</script>";
    }else{
      echo"<script language='javascript' type='text/javascript'>alert('Não foi possível cadastrar esse usuário');window.location.href='cadastro.html'</script>";
    }
  }
}

?>
