<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

function ae_db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = ae_env('DB_HOST', 'localhost');
    $port = ae_env('DB_PORT', '3306');
    $name = ae_env('DB_NAME', 'academicedge_db');
    $user = ae_env('DB_USER', '');
    $password = ae_env('DB_PASSWORD', '');

    if ($user === '') {
        throw new RuntimeException('Database credentials are not configured.');
    }

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
    return $pdo;
}
