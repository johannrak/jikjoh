<?php

$server = "remotemysql.com";
$username = "yRR1O9D20g";
$password = "gyZWei8sOe";
$database = "yRR1O9D20g";

$con = new mysqli($server, $username, $password, $database);

if ($con->connect_error) {
  die ("Connection failed: " .$conn->connect_error);
}

$id = mysqli_real_escape_string($con,$_POST["id"]);
$firstname = mysqli_real_escape_string($con,$_POST["firstname"]);
$lastname = mysqli_real_escape_string($con,$_POST["lastname"]);
$height = mysqli_real_escape_string($con,$_POST["height"]);
$weight = mysqli_real_escape_string($con,$_POST["weight"]);
$age = mysqli_real_escape_string($con,$_POST["age"]);
$gender = mysqli_real_escape_string($con,$_POST["gender"]);
$sql = "UPDATE user_table set firstname = '$firstname', lastname = '$lastname', height = $height, weight = $weight, age = $age, gender = b'$gender' where id = $id";

if ($con->query($sql) === TRUE) {
  echo true;
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();

?>
