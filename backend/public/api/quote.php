<?php
declare(strict_types=1);

require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../includes/repositories.php';
require_once __DIR__ . '/../../services/WhatsAppService.php';

ae_apply_cors();
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ae_error('POST requests only.', 405);
}
ae_rate_limit('quote');

$data = ae_request_json();
$payload = [
    'name' => ae_clean_text($data['name'] ?? '', 150),
    'email' => ae_clean_text($data['email'] ?? '', 190),
    'phone' => ae_clean_text($data['phone'] ?? '', 30),
    'country' => ae_clean_text($data['country'] ?? '', 120),
    'service' => ae_clean_text($data['service'] ?? '', 190),
    'research_area' => ae_clean_text($data['research_area'] ?? '', 255),
    'requirement' => ae_clean_text($data['requirement'] ?? ($data['message'] ?? ''), 5000),
    'budget' => ae_clean_text($data['budget'] ?? '', 100),
    'deadline' => ae_clean_text($data['deadline'] ?? '', 30),
    'preferred_contact_method' => ae_clean_text($data['preferred_contact_method'] ?? 'whatsapp', 50),
];

$errors = [];
if ($payload['name'] === '') $errors['name'] = 'Name is required.';
if ($payload['phone'] === '') $errors['phone'] = 'Phone is required.';
if ($payload['email'] !== '' && !filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Valid email is required.';
if ($payload['service'] === '') $errors['service'] = 'Service is required.';
if ($payload['requirement'] === '') $errors['requirement'] = 'Requirement is required.';
if ($payload['deadline'] !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $payload['deadline'])) $errors['deadline'] = 'Deadline must use YYYY-MM-DD.';
if ($errors) ae_error('Please correct the highlighted fields.', 422, $errors);

try {
    $id = ae_insert_quote($payload);
    try {
        (new WhatsAppService())->notifyNewEnquiry(['message' => $payload['requirement']] + $payload, $id, 'quote');
    } catch (Throwable $exception) {
        ae_log('whatsapp', 'WhatsApp quote notification failed.', ['error' => $exception->getMessage(), 'quote_request_id' => $id]);
    }
    ae_success(['quote_request_id' => $id], 'Your quote request has been submitted successfully.');
} catch (Throwable $exception) {
    ae_log('application', 'Database quote submission failed; using legacy NDJSON fallback.', ['error' => $exception->getMessage()]);
    try {
        $fallbackId = ae_save_legacy_submission(['type' => 'quote'] + $payload + ['ip' => $_SERVER['REMOTE_ADDR'] ?? null]);
        ae_success(['id' => $fallbackId], 'Your quote request has been submitted successfully.');
    } catch (Throwable $fallbackException) {
        ae_log('application', 'Quote fallback failed.', ['error' => $fallbackException->getMessage()]);
        ae_error('Unable to submit your quote request. Please try again.', 500);
    }
}
