<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
  'ok' => true,
  'service' => 'AcademicEdge Writing & Publication Services PHP API',
  'time' => gmdate('c')
]);
