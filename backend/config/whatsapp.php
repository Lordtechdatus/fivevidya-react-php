<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

function ae_whatsapp_config(): array
{
    return [
        'api_version' => ae_env('WHATSAPP_API_VERSION', 'v21.0'),
        'access_token' => ae_env('WHATSAPP_ACCESS_TOKEN', ''),
        'phone_number_id' => ae_env('WHATSAPP_PHONE_NUMBER_ID', ''),
        'business_account_id' => ae_env('WHATSAPP_BUSINESS_ACCOUNT_ID', ''),
        'verify_token' => ae_env('WHATSAPP_VERIFY_TOKEN', ''),
        'notify_phone' => ae_env('WHATSAPP_NOTIFY_PHONE', ''),
    ];
}
