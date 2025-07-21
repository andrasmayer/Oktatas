<?php
$url = 'http://localhost:8080/server.php';  // Cseréld le az URL-t a tényleges címre
$response = @file_get_contents($url);

if ($response !== false) {
    echo "A server.php fut.";
} else {
    echo "A server.php nem fut.";
}