<?php
    //Destinatario
    $destinatario = 'rangelaxel23@gmail.com';

    //Remitente
    $nombre = $_POST['nombre'];
    $asunto = $_POST['asunto'];
    $correo = $_POST['correo'];
    $mesnaje = $_POST['mensaje'];

    //Cuerpo del mensaje
    $header = "Enviado desde la pagina Axel Rangel";
    $mensajeCompleto = $mesnaje . "\nAtentamente: " . $nombre . "\n" . $correo;

    //Metodo para enviar correo
    mail($destinatario, $asunto, $mensajeCompleto, $header);
    echo "<script>alert('Correo eniavo con exito')</script>";
    echo "<script> setTimeout(\"location.href='index.html#contacto'\",1000)</script>";
?>