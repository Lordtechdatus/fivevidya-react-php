<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

function ae_insert_contact(array $input): int
{
    $pdo = ae_db();
    $stmt = $pdo->prepare('INSERT INTO contact_enquiries (name, email, phone, service, subject, message, source, ip_address, user_agent) VALUES (:name, :email, :phone, :service, :subject, :message, :source, :ip_address, :user_agent)');
    $stmt->execute([
        'name' => $input['name'],
        'email' => $input['email'] ?: null,
        'phone' => $input['phone'] ?: null,
        'service' => $input['service'] ?: null,
        'subject' => $input['subject'] ?: null,
        'message' => $input['message'],
        'source' => $input['source'] ?: 'website',
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        'user_agent' => mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500),
    ]);
    return (int) $pdo->lastInsertId();
}

function ae_insert_quote(array $input): int
{
    $pdo = ae_db();
    $deadline = $input['deadline'] ?: null;
    $stmt = $pdo->prepare('INSERT INTO quote_requests (name, email, phone, country, service, research_area, requirement, budget, deadline, preferred_contact_method) VALUES (:name, :email, :phone, :country, :service, :research_area, :requirement, :budget, :deadline, :preferred_contact_method)');
    $stmt->execute([
        'name' => $input['name'],
        'email' => $input['email'] ?: null,
        'phone' => $input['phone'],
        'country' => $input['country'] ?: null,
        'service' => $input['service'] ?: null,
        'research_area' => $input['research_area'] ?: null,
        'requirement' => $input['requirement'] ?: null,
        'budget' => $input['budget'] ?: null,
        'deadline' => $deadline,
        'preferred_contact_method' => $input['preferred_contact_method'] ?: 'whatsapp',
    ]);
    return (int) $pdo->lastInsertId();
}

function ae_save_legacy_submission(array $record): string
{
    $storageDir = ACADEMICEDGE_ROOT . '/storage';
    if (!is_dir($storageDir)) {
        mkdir($storageDir, 0775, true);
    }
    $id = bin2hex(random_bytes(8));
    $record = ['id' => $id, 'created_at' => gmdate('c')] + $record;
    file_put_contents($storageDir . '/submissions.ndjson', json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX);
    return $id;
}
