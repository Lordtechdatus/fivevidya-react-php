<?php
declare(strict_types=1);

const ACADEMICEDGE_ROOT = __DIR__ . '/..';

function ae_load_env(string $path = ACADEMICEDGE_ROOT . '/.env'): void
{
    if (!is_file($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        $value = trim($value, "\"'");
        if (getenv($key) === false) {
            putenv($key . '=' . $value);
            $_ENV[$key] = $value;
        }
    }
}

function ae_env(string $key, ?string $default = null): ?string
{
    $value = getenv($key);
    return $value === false || $value === '' ? $default : $value;
}

function ae_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function ae_success(array $data = [], string $message = 'OK', int $status = 200): void
{
    ae_json(['success' => true, 'ok' => true, 'data' => $data, 'message' => $message] + $data, $status);
}

function ae_error(string $message, int $status = 400, array $errors = []): void
{
    ae_json(['success' => false, 'ok' => false, 'message' => $message, 'errors' => $errors], $status);
}

function ae_clean_text(mixed $value, int $max = 4000): string
{
    $value = is_string($value) ? trim($value) : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function ae_request_json(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        ae_error('Invalid JSON request.', 400);
    }
    return $data;
}

function ae_log(string $channel, string $message, array $context = []): void
{
    $dir = ACADEMICEDGE_ROOT . '/logs';
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    array_walk_recursive($context, function (&$value, $key): void {
        if (is_string($key) && preg_match('/token|password|secret/i', $key)) {
            $value = '[redacted]';
        }
    });
    $line = json_encode([
        'time' => gmdate('c'),
        'level' => 'error',
        'message' => $message,
        'context' => $context,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    file_put_contents($dir . '/' . preg_replace('/[^a-z0-9_-]/i', '-', $channel) . '.log', $line . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function ae_apply_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = array_filter(array_map('trim', explode(',', ae_env('FRONTEND_URL', '') ?? '')));
    $allowed = array_merge($allowed, [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'http://127.0.0.1:8765',
    ]);
    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function ae_rate_limit(string $endpoint, int $limit = 8, int $windowSeconds = 300): void
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $dir = ACADEMICEDGE_ROOT . '/storage/rate-limit';
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    $key = hash('sha256', $endpoint . '|' . $ip);
    $file = $dir . '/' . $key . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = json_decode(file_get_contents($file) ?: '[]', true) ?: [];
    }
    $hits = array_values(array_filter($hits, fn ($timestamp) => is_int($timestamp) && $timestamp > $now - $windowSeconds));
    if (count($hits) >= $limit) {
        ae_error('Too many submissions. Please wait a few minutes and try again.', 429);
    }
    $hits[] = $now;
    file_put_contents($file, json_encode($hits), LOCK_EX);
}

ae_load_env();
