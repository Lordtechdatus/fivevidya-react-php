<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
  'ok' => true,
  'service' => 'Lord-Tech Datus Thesis PHP API',
  'time' => gmdate('c')
]);
