<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

class Registration {
    private $conn;
    private $table_name = "registrations";

    public $name;
    public $email;
    public $message;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        // Validaciones básicas
        if (empty($this->name) || empty($this->email) || empty($this->message)) {
            return ["success" => false, "message" => "Todos los campos son requeridos"];
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            return ["success" => false, "message" => "Email no válido"];
        }

        if (strlen($this->name) < 3 || strlen($this->name) > 100) {
            return ["success" => false, "message" => "El nombre debe tener entre 3 y 100 caracteres"];
        }

        // Verificar email duplicado
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return ["success" => false, "message" => "Este email ya está registrado"];
        }

        // Insertar registro
        $query = "INSERT INTO " . $this->table_name . "
                SET name=:name, email=:email, message=:message";

        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->message = htmlspecialchars(strip_tags($this->message));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":message", $this->message);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "Registro exitoso"];
        }
        return ["success" => false, "message" => "Error al registrar"];
    }
}

// Procesar la petición
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    $registration = new Registration($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name) && !empty($data->email) && !empty($data->message)) {
        $registration->name = $data->name;
        $registration->email = $data->email;
        $registration->message = $data->message;

        $result = $registration->create();
        echo json_encode($result);
    } else {
        echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>