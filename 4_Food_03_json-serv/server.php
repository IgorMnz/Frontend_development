<?php
$_POST = json_decode(file_get_contents("php://input"), true); //для того чтобы принимать данные в формате JSON
echo var_dump($_POST);