<?php
error_reporting(E_ALL);
ini_set('display_errors','off');
?>
<form action="register.php" name="register"  method="post">
<center>
<fieldset>
Username: <input type="text" name="username"><br/>
Password: &nbsp;<input type="password" name="password"><br/>
Fullname: &nbsp;<input type="text" name="fullname"><br/>
email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="email"><br/>
<input type="submit" name="register" value="Register"/><br/>
</fieldset>
</center>
</form>
<?php
if($_POST && $_POST['username']!="")
{
$redirect = "board.php";
$username = $_POST['username'];
$password = $_POST['password'];
$fullname = $_POST['fullname'];
$email = $_POST['email'];
try{
$dbname = dirname($_SERVER["SCRIPT_FILENAME"]) . "/mydb.sqlite";
$dbh = new PDO("sqlite:$dbname");
$dbh->beginTransaction();

//query to insert values into users table and to check for primary key violation
$dbh->exec('insert into users values("'.$username.'","' . md5($password) . '","'.$fullname.'","'.$email.'")') or die('Username already exists'); 
$dbh->commit();

header('Location: '.$redirect);
}
catch(PDOException $dbh){
print "Error! UserName already taken please select a different username";
}
}
?>