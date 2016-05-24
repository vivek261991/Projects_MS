<?php
session_start();
echo "Welcome:::".$_SESSION['username'];
?>
<form action="welcome.php"  method="post">
<input type="submit" name="logout"  value="Logout"/> 
</form>
<form action="message.php" method="post">
<input type="submit" value="New Message"/> 
</form>
<?php
if(isset($_POST['logout'])){ //when logout button is clicked session gets unset and redirected
session_unset();
header("Location: board.php");
//die();
}
?>
<?php
if(!isset($_SESSION['username'])){ //to prevent the users to get to see the other pages before logging in
header("Location:board.php");
}
?>
<?php

$dbname = dirname($_SERVER["SCRIPT_FILENAME"]) . "/mydb.sqlite";
  //echo $dbname;
  $dbh = new PDO("sqlite:$dbname");
$stmt = $dbh->prepare('select posts.id,posts.postedby,posts.follows,posts.message,posts.datetime,users.fullname from posts,users where posts.postedby = users.username order by datetime("datetime") asc');  //query to join values from two tables users and posts to get message id,username,fullname,follows id,date/time,message
  $stmt->execute();
  //print "<pre>";
  //$_SESSION['username'] = $username;
	
  while ($row = $stmt->fetch()) {
   
    echo "<form action='message.php' method='GET'/>";
	echo "<fieldset>";
        echo "<b>";
        echo "MESSAGE ID:".$row['id'];
	echo "</b>";
        echo "&nbsp;";
	echo "<b>";
        echo "USERNAME:".$row['postedby'];
        echo "</b>";
        echo "&nbsp;";
        echo "<b>"; 
        echo "FULLNAME:".$row['fullname'];
	echo "</b>";
        echo "&nbsp;";
        echo '<input type="hidden" value='.$row['id'].' name="id"/>';
    //$_SESSION['id']=$row['id'];
	echo '<input type="hidden" value='.$row['postedby'].' name="postedby"/>';
	echo "<b>";
        if($row['follows']!=null){                 //print the follows id if the current message is a reply
	echo "REPLIED TO:".$row['follows'];
	}
        echo "</b>";
	echo '<br/>';
        echo "<b>";
        echo "Date/Time:".$row['datetime'];
        echo "</b>";
        echo '<br/>';
        if($row['follows']!=null){              //distinguishes reply message from new message with background-color attribute  
        echo "<fieldset style='background-color:#66FFCC;'>";
	echo $row['message'];
	echo "</fieldset>";
        }
        else{                                    //if the message is a newly created message
        echo "<fieldset style='background-color:#CCFFCC;'>";
        echo $row['message'];
        echo "</fieldset>";
        }
	echo "<input type='submit' value='Reply'/>"; 
	echo "</fieldset>";
        echo "</form>";
	echo "<br/>";
	echo "<br/>";
  }
?>