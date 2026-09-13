<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/whatsapp.php';

final class WhatsAppService
{
    private array $config;

    public function __construct(?array $config = null)
    {
        $this->config = $config ?? ae_whatsapp_config();
    }

    public function isConfigured(): bool
    {
        return $this->config['access_token'] !== '' && $this->config['phone_number_id'] !== '';
    }

    public function sendTextMessage(string $to, string $body, array $context = []): array
    {
        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type' => 'individual',
            'to' => $this->normalizePhone($to),
            'type' => 'text',
            'text' => ['preview_url' => false, 'body' => $body],
        ];
        return $this->sendPayload($payload, 'text', $body, null, $context);
    }

    public function sendTemplateMessage(string $to, string $templateName, string $languageCode = 'en', array $components = [], array $context = []): array
    {
        $payload = [
            'messaging_product' => 'whatsapp',
            'to' => $this->normalizePhone($to),
            'type' => 'template',
            'template' => [
                'name' => $templateName,
                'language' => ['code' => $languageCode],
            ],
        ];
        if ($components !== []) {
            $payload['template']['components'] = $components;
        }
        return $this->sendPayload($payload, 'template', null, $templateName, $context);
    }

    public function notifyNewEnquiry(array $data, int $id, string $type = 'enquiry'): ?array
    {
        $recipient = $this->config['notify_phone'];
        if (!$this->isConfigured() || $recipient === '') {
            return null;
        }
        $body = "New AcademicEdge " . ($type === 'quote' ? 'Quote Request' : 'Enquiry') . "\n\n"
            . "Name: {$data['name']}\n"
            . "Phone: " . ($data['phone'] ?: 'Not provided') . "\n"
            . "Email: " . ($data['email'] ?: 'Not provided') . "\n"
            . "Service: " . ($data['service'] ?: 'Not specified') . "\n\n"
            . "Requirement:\n" . ($data['message'] ?? $data['requirement'] ?? '') . "\n\n"
            . "Reference ID:\nAE-{$id}";
        $context = $type === 'quote' ? ['quote_request_id' => $id] : ['enquiry_id' => $id];
        return $this->sendTextMessage($recipient, $body, $context);
    }

    public function logMessage(array $row): int
    {
        $pdo = ae_db();
        $stmt = $pdo->prepare('INSERT INTO whatsapp_messages (enquiry_id, quote_request_id, direction, sender_phone, recipient_phone, message_type, message_body, template_name, meta_message_id, status, error_code, error_message, payload_json, sent_at, failed_at) VALUES (:enquiry_id, :quote_request_id, :direction, :sender_phone, :recipient_phone, :message_type, :message_body, :template_name, :meta_message_id, :status, :error_code, :error_message, :payload_json, :sent_at, :failed_at)');
        $stmt->execute([
            'enquiry_id' => $row['enquiry_id'] ?? null,
            'quote_request_id' => $row['quote_request_id'] ?? null,
            'direction' => $row['direction'] ?? 'outgoing',
            'sender_phone' => $row['sender_phone'] ?? null,
            'recipient_phone' => $row['recipient_phone'] ?? null,
            'message_type' => $row['message_type'] ?? 'text',
            'message_body' => $row['message_body'] ?? null,
            'template_name' => $row['template_name'] ?? null,
            'meta_message_id' => $row['meta_message_id'] ?? null,
            'status' => $row['status'] ?? 'queued',
            'error_code' => $row['error_code'] ?? null,
            'error_message' => $row['error_message'] ?? null,
            'payload_json' => isset($row['payload_json']) ? json_encode($row['payload_json'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : null,
            'sent_at' => $row['sent_at'] ?? null,
            'failed_at' => $row['failed_at'] ?? null,
        ]);
        return (int) $pdo->lastInsertId();
    }

    public function saveWebhookEvent(array $payload): int
    {
        $event = $this->extractWebhookMeta($payload);
        $pdo = ae_db();
        $stmt = $pdo->prepare('INSERT INTO whatsapp_webhook_events (event_type, meta_message_id, phone_number_id, payload) VALUES (:event_type, :meta_message_id, :phone_number_id, :payload)');
        $stmt->execute([
            'event_type' => $event['event_type'],
            'meta_message_id' => $event['meta_message_id'],
            'phone_number_id' => $event['phone_number_id'],
            'payload' => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        ]);
        return (int) $pdo->lastInsertId();
    }

    public function processWebhook(array $payload): void
    {
        $pdo = ae_db();
        foreach (($payload['entry'] ?? []) as $entry) {
            foreach (($entry['changes'] ?? []) as $change) {
                $value = $change['value'] ?? [];
                foreach (($value['messages'] ?? []) as $message) {
                    $this->logMessage([
                        'direction' => 'incoming',
                        'sender_phone' => $message['from'] ?? null,
                        'message_type' => $message['type'] ?? 'text',
                        'message_body' => $message['text']['body'] ?? null,
                        'meta_message_id' => $message['id'] ?? null,
                        'status' => 'received',
                        'payload_json' => $message,
                    ]);
                }
                foreach (($value['statuses'] ?? []) as $status) {
                    $statusName = $status['status'] ?? null;
                    $messageId = $status['id'] ?? null;
                    if (!$statusName || !$messageId) {
                        continue;
                    }
                    $field = match ($statusName) {
                        'sent' => 'sent_at',
                        'delivered' => 'delivered_at',
                        'read' => 'read_at',
                        'failed' => 'failed_at',
                        default => null,
                    };
                    $sql = 'UPDATE whatsapp_messages SET status = :status, error_code = :error_code, error_message = :error_message';
                    if ($field) {
                        $sql .= ", {$field} = COALESCE({$field}, NOW())";
                    }
                    $sql .= ' WHERE meta_message_id = :meta_message_id';
                    $stmt = $pdo->prepare($sql);
                    $error = $status['errors'][0] ?? [];
                    $stmt->execute([
                        'status' => $statusName,
                        'error_code' => $error['code'] ?? null,
                        'error_message' => $error['title'] ?? ($error['message'] ?? null),
                        'meta_message_id' => $messageId,
                    ]);
                }
            }
        }
    }

    public function markWebhookProcessed(int $eventId): void
    {
        $stmt = ae_db()->prepare('UPDATE whatsapp_webhook_events SET processed = 1, processed_at = NOW() WHERE id = ?');
        $stmt->execute([$eventId]);
    }

    private function sendPayload(array $payload, string $messageType, ?string $body, ?string $templateName, array $context): array
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('WhatsApp Cloud API is not configured.');
        }
        $url = 'https://graph.facebook.com/' . $this->config['api_version'] . '/' . $this->config['phone_number_id'] . '/messages';
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->config['access_token'],
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            CURLOPT_TIMEOUT => 20,
        ]);
        $raw = curl_exec($ch);
        $curlError = curl_error($ch);
        $statusCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $response = is_string($raw) ? json_decode($raw, true) : null;
        $metaId = $response['messages'][0]['id'] ?? null;
        $ok = $curlError === '' && $statusCode >= 200 && $statusCode < 300 && $metaId;
        $error = $response['error'] ?? [];

        $logId = $this->logMessage([
            'enquiry_id' => $context['enquiry_id'] ?? null,
            'quote_request_id' => $context['quote_request_id'] ?? null,
            'direction' => 'outgoing',
            'sender_phone' => $this->config['phone_number_id'],
            'recipient_phone' => $payload['to'] ?? null,
            'message_type' => $messageType,
            'message_body' => $body,
            'template_name' => $templateName,
            'meta_message_id' => $metaId,
            'status' => $ok ? 'sent' : 'failed',
            'error_code' => $error['code'] ?? ($curlError ? 'curl_error' : null),
            'error_message' => $error['message'] ?? ($curlError ?: null),
            'payload_json' => ['request' => $payload, 'response' => $response, 'status_code' => $statusCode],
            'sent_at' => $ok ? date('Y-m-d H:i:s') : null,
            'failed_at' => $ok ? null : date('Y-m-d H:i:s'),
        ]);

        if (!$ok) {
            throw new RuntimeException($error['message'] ?? $curlError ?: 'WhatsApp message failed.');
        }

        return ['message_id' => $metaId, 'log_id' => $logId, 'response' => $response];
    }

    private function normalizePhone(string $phone): string
    {
        return preg_replace('/[^0-9]/', '', $phone) ?? '';
    }

    private function extractWebhookMeta(array $payload): array
    {
        $value = $payload['entry'][0]['changes'][0]['value'] ?? [];
        $message = $value['messages'][0] ?? [];
        $status = $value['statuses'][0] ?? [];
        return [
            'event_type' => isset($value['messages']) ? 'message' : (isset($value['statuses']) ? 'status' : ($payload['object'] ?? 'unknown')),
            'meta_message_id' => $message['id'] ?? ($status['id'] ?? null),
            'phone_number_id' => $value['metadata']['phone_number_id'] ?? null,
        ];
    }
}
