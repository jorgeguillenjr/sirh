<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Validate required fields
$required = ['empresa', 'nombre', 'email', 'telefono'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        echo json_encode(['success' => false, 'message' => "Campo requerido: $field"]);
        exit;
    }
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Prepare email content
$to = 'sirh.honduras@gmail.com';
$subject = 'Nueva Solicitud de Cotización - ' . $input['empresa'];

$servicios = is_array($input['servicios']) ? implode(', ', $input['servicios']) : ($input['servicios'] ?? 'No especificado');

$message = "
NUEVA SOLICITUD DE COTIZACIÓN

INFORMACIÓN DE LA EMPRESA:
• Empresa: {$input['empresa']}
• Número de empleados: " . ($input['empleados'] ?? 'No especificado') . "

INFORMACIÓN DE CONTACTO:
• Nombre: {$input['nombre']}
• Cargo: " . ($input['cargo'] ?? 'No especificado') . "
• Email: {$input['email']}
• Teléfono: {$input['telefono']}

SERVICIOS DE INTERÉS:
$servicios

MENSAJE ADICIONAL:
" . ($input['mensaje'] ?? 'No hay mensaje adicional') . "

---
Enviado desde el formulario web de SIRH
Fecha: " . date('Y-m-d H:i:s') . "
IP: {$_SERVER['REMOTE_ADDR']}
";

// Email headers
$headers = [
    'From: noreply@' . $_SERVER['HTTP_HOST'],
    'Reply-To: ' . $input['email'],
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$success = mail($to, $subject, $message, implode("\r\n", $headers));

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email enviado correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al enviar el email']);
}
?>