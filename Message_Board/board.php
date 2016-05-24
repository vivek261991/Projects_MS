<?php
/* NAME: VIVEK VAIDYANATHASUBRAMANIAN http://omega.uta.edu/~vxv6079/project4/board.php */
?>
<?php session_start(); ?>
<html>
<head><title>Message Board</title></head>
<body>
<?php
error_reporting(E_ALL);
ini_set('display_errors','On');

try {
  $dbname = dirname($_SERVER["SCRIPT_FILENAME"]) . "/mydb.sqlite";
  $dbh = new PDO("sqlite:$dbname");
  $dbh->beginTransaction();
} catch (PDOException $e) {
  print "Error!: " . $e->getMessage() . "<br/>";
  die();
}
?>
<form action="board.php" method="post">
Username: <input type="text" name="username"><br/>
Password: &nbsp;<input type="password" name="password">
<input type="submit" value="Login"/><br/>
</form>
<form action="register.php" method="post">
<input type="submit" name="register" id="register" value="New Users must register here"/> 
</form>
<?php
if($_POST){
	$newURL = "welcome.php";
	if($_POST['username']!=null&&$_POST['password']!=null){
		$username = $_POST['username'];
		$_SESSION['username'] = $username;
		$password = $_POST['password'];
		//md5 password encryption
		$md5pwd = md5($password);
		$dbname = dirname($_SERVER["SCRIPT_FILENAME"]) . "/mydb.sqlite";
		$dbh = new PDO("sqlite:$dbname");
		$f = $dbh->query("SELECT fullname FROM users WHERE username='$username'");
		$f->execute();
		$e = $f->fetch();
		$_SESSION['fullname']= $e[0];
		$q = @$dbh->query("SELECT count(username) FROM users WHERE username='$username' AND password='$md5pwd'");
		if ($q->fetchColumn() == false) 
			{echo "Login Failure!";}
		//once validated with the database page is redirected to the welcome.php
		else{
			header('Location: '.$newURL);
			echo "Login success!";
		}
	}

//if the fields are blank then the message will be printed
	else{
		echo "enter username and password";
	}
}
?>
</body>
</html>
