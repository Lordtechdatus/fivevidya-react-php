<?php
declare(strict_types=1);

require_once __DIR__ . '/../../../includes/bootstrap.php';
require_once __DIR__ . '/../../../services/WhatsAppService.php';

ae_apply_cors();
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ae_error('POST requests only.', 405);
}

$data = ae_request_json();
$to = ae_clean_text($data['to'] ?? '', 30);
$type = ae_clean_text($data['type'] ?? 'text', 20);

if ($to === '') {
    ae_error('Recipient phone is required.', 422, ['to' => 'Recipient phone is required.']);
}

try {
    $service = new WhatsAppService();
    if ($type === 'template') {
        $template = ae_clean_text($data['template_name'] ?? '', 190);
        if ($template === '') {
            ae_error('Template name is required.', 422, ['template_name' => 'Template name is required.']);
        }
        $result = $service->sendTemplateMessage($to, $template, ae_clean_text($data['language_code'] ?? 'en', 20), is_array($data['components'] ?? null) ? $data['components'] : []);
    } else {
        $body = ae_clean_text($data['message'] ?? '', 5000);
        if ($body === '') {
            ae_error('Message is required.', 422, ['message' => 'Message is required.']);
        }
        $result = $service->sendTextMessage($to, $body);
    }
    ae_success($result, 'WhatsApp message sent.');
} catch (Throwable $exception) {
    ae_log('whatsapp', 'Manual WhatsApp send failed.', ['error' => $exception->getMessage()]);
    ae_error('Unable to send WhatsApp message.', 500);
}
