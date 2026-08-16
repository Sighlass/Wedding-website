<?php
$localhost= "localhost";
$user="root";
$password="";
$database="wedding";

$conn = mysqli_connect($localhost,$user,$password,$database);

$name=$_POST['Name'];
$email=$_POST['Email'];
$attendance=$_POST['Attendance'];
$notes=$_POST['Notes'];

$sql = "INSERT INTO rsvp (Name,Email,Attendance,Notes)
VALUES ('$name','$email','$attendance','$notes')";

$query=mysqli_query($conn, $sql);
if ($query) {
    echo "RSVP submitted successfully!";
} else 
    echo"Error:".mysqli_error($conn)";
?>