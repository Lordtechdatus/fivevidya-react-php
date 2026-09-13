<?php
declare(strict_types=1);

require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../includes/repositories.php';
require_once __DIR__ . '/../../services/WhatsAppService.php';

ae_apply_cors();
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ae_error('POST requests only.', 405);
}
ae_rate_limit('contact');

$data = ae_request_json();
$payload = [
    'name' => ae_clean_text($data['name'] ?? '', 150),
    'email' => ae_clean_text($data['email'] ?? '', 190),
    'phone' => ae_clean_text($data['phone'] ?? '', 30),
    'service' => ae_clean_text($data['service'] ?? '', 190),
    'subject' => ae_clean_text($data['subject'] ?? '', 255),
    'message' => ae_clean_text($data['message'] ?? ($data['requirement'] ?? ''), 5000),
    'source' => ae_clean_text($data['source'] ?? 'website', 100),
];

$errors = [];
if ($payload['name'] === '') $errors['name'] = 'Name is required.';
if ($payload['email'] !== '' && !filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Valid email is required.';
if ($payload['message'] === '') $errors['message'] = 'Message is required.';
if ($errors) ae_error('Please correct the highlighted fields.', 422, $errors);

try {
    $id = ae_insert_contact($payload);
    try {
        (new WhatsAppService())->notifyNewEnquiry($payload, $id, 'enquiry');
    } catch (Throwable $exception) {
        ae_log('whatsapp', 'WhatsApp enquiry notification failed.', ['error' => $exception->getMessage(), 'enquiry_id' => $id]);
    }
    ae_success(['enquiry_id' => $id], 'Your enquiry has been submitted successfully.');
} catch (Throwable $exception) {
    ae_log('application', 'Database contact submission failed; using legacy NDJSON fallback.', ['error' => $exception->getMessage()]);
    try {
        $fallbackId = ae_save_legacy_submission(['type' => 'contact'] + $payload + ['ip' => $_SERVER['REMOTE_ADDR'] ?? null]);
        ae_success(['id' => $fallbackId], 'Your enquiry has been submitted successfully.');
    } catch (Throwable $fallbackException) {
        ae_log('application', 'Contact fallback failed.', ['error' => $fallbackException->getMessage()]);
        ae_error('Unable to submit your enquiry. Please try again.', 500);
    }
}
