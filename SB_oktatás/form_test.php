<?php
var_dump($_POST);

echo "<br><br><br>";
var_dump($_GET);

echo "<br><br><br>";
echo $_GET["input"] . " ==> ". strlen($_GET["input"]);

echo "<br>";

echo urlencode($_GET["input"]) ." ==> ". strlen(urlencode($_GET["input"]));

echo "<br><br><br>";