<?php
// filepath: /Users/macbook/Documents/Special Edition Website/Version 3/capture_friendship_data.php

// Function to get the user's IP address
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

// Function to get device and browser details
function getDeviceDetails() {
    $userAgent = $_SERVER['HTTP_USER_AGENT'];
    $details = [];

    // Detect browser
    if (strpos($userAgent, 'Firefox') !== false) {
        $details['browser'] = 'Firefox';
    } elseif (strpos($userAgent, 'Chrome') !== false) {
        $details['browser'] = 'Chrome';
    } elseif (strpos($userAgent, 'Safari') !== false) {
        $details['browser'] = 'Safari';
    } elseif (strpos($userAgent, 'Edge') !== false) {
        $details['browser'] = 'Edge';
    } elseif (strpos($userAgent, 'MSIE') !== false || strpos($userAgent, 'Trident') !== false) {
        $details['browser'] = 'Internet Explorer';
    } else {
        $details['browser'] = 'Unknown';
    }

    // Detect platform
    if (strpos($userAgent, 'Windows') !== false) {
        $details['platform'] = 'Windows';
    } elseif (strpos($userAgent, 'Macintosh') !== false || strpos($userAgent, 'Mac OS') !== false) {
        $details['platform'] = 'Mac';
    } elseif (strpos($userAgent, 'Linux') !== false) {
        $details['platform'] = 'Linux';
    } elseif (strpos($userAgent, 'Android') !== false) {
        $details['platform'] = 'Android';
    } elseif (strpos($userAgent, 'iPhone') !== false || strpos($userAgent, 'iPad') !== false) {
        $details['platform'] = 'iOS';
    } else {
        $details['platform'] = 'Unknown';
    }

    $details['user_agent'] = $userAgent;
    return $details;
}

// Capture POST data
$emojis = isset($_POST['emojis']) ? $_POST['emojis'] : 'N/A';
$timestamp = isset($_POST['timestamp']) ? $_POST['timestamp'] : date('Y-m-d H:i:s');
$screenResolution = isset($_POST['screen_resolution']) ? $_POST['screen_resolution'] : 'Unknown';
$analysis = isset($_POST['analysis']) ? $_POST['analysis'] : 'No analysis provided';

// Get IP address and device details
$ipAddress = getUserIP();
$deviceDetails = getDeviceDetails();

// Prepare data for logging
$data = [
    'timestamp' => $timestamp,
    'ip_address' => $ipAddress,
    'browser' => $deviceDetails['browser'],
    'platform' => $deviceDetails['platform'],
    'user_agent' => $deviceDetails['user_agent'],
    'screen_resolution' => $screenResolution,
    'emojis' => $emojis,
    'analysis' => $analysis
];

// Log data to a file (or database)
$logFile = 'friendship_data_log.txt';
file_put_contents($logFile, json_encode($data) . PHP_EOL, FILE_APPEND);

// Respond to the client
header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Data captured successfully!', 'data' => $data]);
?>