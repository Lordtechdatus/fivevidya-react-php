<?php
// Local demo enquiry endpoint for the React frontend.
// It stores submissions in backend/storage/submissions.ndjson.

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
];

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'POST requests only.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid JSON request.']);
    exit;
}

function clean_text($value, $max = 4000) {
    $value = is_string($value) ? trim($value) : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

$name = clean_text($data['name'] ?? '', 120);
$email = clean_text($data['email'] ?? '', 190);
$phone = clean_text($data['phone'] ?? '', 60);
$service = clean_text($data['service'] ?? '', 160);
$message = clean_text($data['message'] ?? '', 4000);
$source = clean_text($data['source'] ?? 'website', 80);

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Name, email and research requirement are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$record = [
    'id' => bin2hex(random_bytes(8)),
    'created_at' => gmdate('c'),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'service' => $service,
    'message' => $message,
    'source' => $source,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
];

$storageDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'storage';
if (!is_dir($storageDir) && !mkdir($storageDir, 0775, true) && !is_dir($storageDir)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Could not create storage directory.']);
    exit;
}

$file = $storageDir . DIRECTORY_SEPARATOR . 'submissions.ndjson';
$line = json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Could not save the enquiry.']);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Request submitted successfully. The local PHP backend saved it.',
    'id' => $record['id'],
]);
