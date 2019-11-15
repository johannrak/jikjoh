 <?php
 header("Access-Control-Allow-Origin: *");

$server = "remotemysql.com";
$username = "yRR1O9D20g";
$password = "gyZWei8sOe";
$database = "yRR1O9D20g";

$con = new mysqli($server, $username, $password, $database);

if ($con->connect_error) {
  die ("Connection failed: " .$conn->connect_error);
}

$username = mysqli_real_escape_string($con,$_POST["usernameRegister"]);
$firstname = mysqli_real_escape_string($con,$_POST["firstname"]);
$lastname = mysqli_real_escape_string($con,$_POST["lastname"]);
$password = mysqli_real_escape_string($con,$_POST["passwordRegister"]);
$height = mysqli_real_escape_string($con,$_POST["height"]);
$weight = mysqli_real_escape_string($con,$_POST["weight"]);
$age = mysqli_real_escape_string($con,$_POST["age"]);
$gender = mysqli_real_escape_string($con,$_POST["gender"]);
$sql = "INSERT INTO user_table (firstname, lastname, age, gender, weight, height, username, password) values ('$firstname','$lastname',$age,b'$gender',$weight,$height,'$username','$password')";

if ($con->query($sql) === TRUE) {
  echo true;
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();

?>
