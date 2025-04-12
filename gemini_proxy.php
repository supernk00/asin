<?php
// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle OPTIONS requests (pre-flight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Only POST requests are allowed']);
    exit;
}

// Get POST data
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

// Validate input
if (!isset($data['emojis']) || empty($data['emojis'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No emojis provided']);
    exit;
}

$emojis = $data['emojis'];

// Your Gemini API key (ideally should be in an environment variable)
$apiKey = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key

// Old endpoint (gemini-pro)
// $geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// New endpoint (gemini-1.5-flash or gemini-1.5-pro)
$geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
$url = $geminiEndpoint . "?key=" . $apiKey;

// Prepare the prompt for Gemini
$prompt = "Analyze the following emojis as if they describe a friendship: '$emojis'. 
Give a creative, thoughtful and positive analysis of what these emojis might say about 
the friendship between two people. Make the response sound warm, personal, and insightful. 
Keep the response between 2-3 sentences.";

// Prepare the request payload
$payload = [
    "contents" => [
        [
            "parts" => [
                [
                    "text" => $prompt
                ]
            ]
        ]
    ]
];

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Execute the request
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => curl_error($ch), 'analysis' => getFallbackAnalysis($emojis)]);
    curl_close($ch);
    exit;
}

// Get response status code
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close cURL
curl_close($ch);

// Process response based on status code
if ($statusCode !== 200) {
    echo json_encode(['error' => 'API Error', 'status' => $statusCode, 'analysis' => getFallbackAnalysis($emojis)]);
    exit;
}

// Process and return the Gemini API response
$responseData = json_decode($response, true);

// Extract the analysis from Gemini's response
$analysis = "Your friendship is unique and special!"; // Default fallback

if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
    $analysis = $responseData['candidates'][0]['content']['parts'][0]['text'];
}

// Return the analysis
echo json_encode(['analysis' => $analysis]);

// Fallback function if Gemini API fails
function getFallbackAnalysis($emojis) {
    // Mock AI analysis based on emoji patterns
    if (strpos($emojis, '🎉') !== false || strpos($emojis, '🤣') !== false) {
        return "Fun Partners in Crime! Your friendship is filled with laughter and adventure.";
    } else if (strpos($emojis, '💖') !== false || strpos($emojis, '🤝') !== false) {
        return "Soul Connection! You have a deep emotional bond that transcends ordinary friendship.";
    } else if (strpos($emojis, '📚') !== false || strpos($emojis, '💡') !== false) {
        return "Growth Buddies! You inspire each other to learn and grow continuously.";
    } else {
        return "Unique Connection! Your friendship has special qualities that make it one of a kind.";
    }
}
?>