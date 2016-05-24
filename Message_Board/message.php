<?php
error_reporting(E_ALL);
ini_set('display_errors','Off');
session_start();
echo "Welcome:::".$_SESSION['username'];
?>
<?php
//if the current message is a reply storing the original message id to the session
if($_GET){
$_SESSION['follows'] = $_GET['id'];  
}
?>
<?php
//prevent the users to visit other pages before logging in 
if(!isset($_SESSION['username'])){ 
header("Location:board.php");
}
?>

<html>
<center>
<form action="message.php" name="message"  method="POST">
<textarea name="posts" rows="4" cols="50">
</textarea><br/>
<input type="submit" name="message"  value="post"/>
</form>
</center>
</html>
<?php
error_reporting(E_ALL);
ini_set('display_errors','Off');
if($_POST['message'])
{
$redirect = "welcome.php";
$username = $_SESSION['username'];
$message = $_POST['posts'];
try{
echo "inside try";
$dbname = dirname($_SERVER["SCRIPT_FILENAME"]) . "/mydb.sqlite";
$dbh = new PDO("sqlite:$dbname");
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$d = $dbh->prepare("select datetime('now','localtime')") or print_r($dh->errorInfo()); //get the current date and time 
$d->execute();
$e = $d->fetch();
echo "time".$e[0]; 
$f = $dbh->prepare("select fullname from users where username='$username'");
$f->execute();
$fulname = $f->fetch();
$q = $dbh->prepare('INSERT INTO posts(id,postedby,follows,datetime,message) VALUES(?,?,?,?,?)');
if (!$dbh) {
    echo "\nPDO::errorInfo():\n";
    print_r($pdo->errorInfo());
}
// if the message is not a reply follows values if empty
if(!isset($_SESSION['follows'])){  
$follows = "";
$q->execute(array(uniqid(),$username,$follows,$e[0],$message));
}
//if the message is a reply , follows id retrieved from the session and inserted to the posts table
else   
{
$q->execute(array(uniqid(),$username,$_SESSION['follows'],$e[0],$message)); 
unset($_SESSION['follows']);
}

unset($_SESSION['id']);
header('Location: '.$redirect);
}
catch(PDOException $e){
echo 'caught',$e->getMessage(),"\n";
  die();
}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
catch (IOException $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
}
?>