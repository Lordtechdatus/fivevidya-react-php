<?php
declare(strict_types=1);

require_once __DIR__ . '/../../../includes/bootstrap.php';
require_once __DIR__ . '/../../../config/whatsapp.php';
require_once __DIR__ . '/../../../services/WhatsAppService.php';

ae_apply_cors();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $mode = $_GET['hub_mode'] ?? $_GET['hub.mode'] ?? '';
    $token = $_GET['hub_verify_token'] ?? $_GET['hub.verify_token'] ?? '';
    $challenge = $_GET['hub_challenge'] ?? $_GET['hub.challenge'] ?? '';
    if ($mode === 'subscribe' && hash_equals(ae_whatsapp_config()['verify_token'], (string) $token)) {
        header('Content-Type: text/plain; charset=utf-8');
        echo $challenge;
        exit;
    }
    ae_error('Webhook verification failed.', 403);
}

if ($method !== 'POST') {
    ae_error('Unsupported method.', 405);
}

$raw = file_get_contents('php://input') ?: '';
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    ae_error('Invalid webhook payload.', 400);
}

try {
    $service = new WhatsAppService();
    $eventId = $service->saveWebhookEvent($payload);
    $service->processWebhook($payload);
    $service->markWebhookProcessed($eventId);
    ae_success(['webhook_event_id' => $eventId], 'Webhook received.');
} catch (Throwable $exception) {
    ae_log('webhook', 'WhatsApp webhook processing failed.', ['error' => $exception->getMessage()]);
    ae_error('Webhook could not be processed.', 500);
}
