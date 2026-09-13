<?php
// Router for PHP's local development server; real assets and API files retain their handlers.
$publicRoot = realpath(__DIR__ . '/public');
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/');
$candidate = realpath($publicRoot . $path);
if ($candidate !== false && str_starts_with($candidate, $publicRoot . DIRECTORY_SEPARATOR) && is_file($candidate)) {
    return false;
}
if (preg_match('~^/(api|assets)(/|$)~', $path) || preg_match('~\.[a-zA-Z0-9]+$~', $path)) {
    http_response_code(404);
    echo 'Not found';
    return true;
}
header('Content-Type: text/html; charset=utf-8');
readfile($publicRoot . '/index.html');
return true;
