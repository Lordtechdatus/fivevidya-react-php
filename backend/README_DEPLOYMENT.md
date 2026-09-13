# AcademicEdge Backend Deployment

This backend serves the AcademicEdge Writing & Publication Services API, database migrations, enquiry storage, quote requests, and WhatsApp Cloud API integration.

## 1. Create The Database

Create an empty MySQL or MariaDB database, for example:

```sql
CREATE DATABASE academicedge_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Create a database user and grant privileges for that database through your hosting panel or MySQL CLI.

## 2. Configure Environment

Copy:

```bash
cp .env.example .env
```

Fill these values:

```env
APP_ENV=production
APP_URL=https://your-domain.com
FRONTEND_URL=https://your-domain.com

DB_HOST=localhost
DB_PORT=3306
DB_NAME=academicedge_db
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

Do not commit `.env`. It is ignored by `backend/.gitignore`.

## 3. Create Tables

Preferred CLI migration:

```bash
php bin/migrate.php
```

Expected first run:

```text
Connecting database... OK
001_initial_schema.sql ... DONE
002_whatsapp_tables.sql ... DONE
seed.sql ... DONE
Database migration completed successfully.
```

Expected repeat run:

```text
Connecting database... OK
001_initial_schema.sql ... SKIPPED
002_whatsapp_tables.sql ... SKIPPED
seed.sql ... DONE
Database migration completed successfully.
```

If your hosting does not allow CLI access, import `database/schema.sql` through phpMyAdmin, then import `database/seed.sql`.

## 4. Configure WhatsApp Cloud API

Set server-side values in `.env` only:

```env
WHATSAPP_API_VERSION=v21.0
WHATSAPP_ACCESS_TOKEN=your_meta_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_VERIFY_TOKEN=your_private_webhook_verify_token
WHATSAPP_NOTIFY_PHONE=business_phone_to_receive_notifications
```

Never place WhatsApp tokens in React, Vite variables, `public/`, or the browser bundle.

Set the Meta webhook callback URL to:

```text
https://your-domain.com/api/whatsapp/webhook.php
```

Subscribe to message and status webhook fields in Meta.

## 5. API Endpoints

Contact enquiry:

```text
POST /api/contact.php
```

Quote request:

```text
POST /api/quote.php
```

Legacy website submit compatibility:

```text
POST /api/submit.php
```

WhatsApp send service:

```text
POST /api/whatsapp/send.php
```

WhatsApp webhook:

```text
GET  /api/whatsapp/webhook.php
POST /api/whatsapp/webhook.php
```

## 6. Apache / Shared Hosting

The included `public/.htaccess` keeps SPA routing intact and prevents direct access to common secret, SQL, and log file patterns from the public directory. Keep the real `.env`, logs, and database files outside the web-accessible document root whenever your host allows it.

## 7. Smoke Tests

After deployment:

1. Open `/api/health.php`.
2. Submit the contact form and confirm a row in `contact_enquiries`.
3. Submit the quote form and confirm a row in `quote_requests`.
4. Verify the webhook in Meta using the configured `WHATSAPP_VERIFY_TOKEN`.
5. Send a test webhook POST and confirm a row in `whatsapp_webhook_events`.
6. Confirm WhatsApp notification rows in `whatsapp_messages` when WhatsApp credentials are configured.

## 8. Logging

Private logs are written under `backend/logs/`:

- `application.log`
- `whatsapp.log`
- `webhook.log`

Token-like fields are redacted before logging. Production API responses return JSON and do not expose stack traces.
