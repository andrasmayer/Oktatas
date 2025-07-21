<?php


$data = [
    '2025-01-10' => 'érték1',
    '2025-02-12' => 'érték2',
    '2024-01-14' => 'érték3',
    '2023-03-16' => 'érték4',
    '2023-01-19' => 'érték4',
];

$month = '01'; // ezt szeretnéd szűrni

$filtered = array_filter($data, function($value, $key) use ($month) {
    return strpos($key, "-$month-") !== false;
}, ARRAY_FILTER_USE_BOTH);

print_r($filtered);