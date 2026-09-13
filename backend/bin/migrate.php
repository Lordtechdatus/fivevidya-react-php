<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

echo "Connecting database... ";
try {
    $pdo = ae_db();
    echo "OK\n";
} catch (Throwable $exception) {
    fwrite(STDERR, "FAILED\n" . $exception->getMessage() . "\n");
    exit(1);
}

$pdo->exec("CREATE TABLE IF NOT EXISTS migrations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

$migrationDir = __DIR__ . '/../database/migrations';
$files = glob($migrationDir . '/*.sql') ?: [];
sort($files, SORT_NATURAL);

foreach ($files as $file) {
    $name = basename($file);
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM migrations WHERE migration_name = ?');
    $stmt->execute([$name]);
    if ((int) $stmt->fetchColumn() > 0) {
        echo "{$name} ... SKIPPED\n";
        continue;
    }
    try {
        $sql = file_get_contents($file);
        if ($sql === false) {
            throw new RuntimeException('Could not read migration file.');
        }
        $pdo->exec($sql);
        $record = $pdo->prepare('INSERT INTO migrations (migration_name) VALUES (?)');
        $record->execute([$name]);
        echo "{$name} ... DONE\n";
    } catch (Throwable $exception) {
        fwrite(STDERR, "{$name} ... FAILED\n" . $exception->getMessage() . "\n");
        exit(1);
    }
}

$seedPath = __DIR__ . '/../database/seed.sql';
if (is_file($seedPath)) {
    echo "seed.sql ... ";
    try {
        $pdo->exec(file_get_contents($seedPath) ?: '');
        echo "DONE\n";
    } catch (Throwable $exception) {
        fwrite(STDERR, "FAILED\n" . $exception->getMessage() . "\n");
        exit(1);
    }
}

echo "Database migration completed successfully.\n";
