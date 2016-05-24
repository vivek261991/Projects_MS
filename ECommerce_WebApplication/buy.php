<?php
/* VIVEK VAIDYANATHASUBRAMANIAN
http://omega.uta.edu/~vxv6079/project3/buy.php */
?>
<?php session_start(); ?>
<html>
<head><title>Buy Products</title></head>
<style type="text/css">
table {
 border-collapse: collapse;
}
</style>
<body>
<?php 
error_reporting(E_ALL);
ini_set('display_errors','off');

?>
<?php //LOGIC TO EMPTY THE BASKET
$clear = $_GET['clear'];
if($clear == '1'){
unset($_SESSION['cart']);
}
?>
<?php //CODE TO DELETE THE LINE ITEMS 
$delete_id = $_GET["delete"];
if($delete_id){
$_SESSION['cart']=array_values($_SESSION['cart']);
$count = count($_SESSION['cart']);
for($i=0;$i<$count;$i++){
if($delete_id == $_SESSION['cart'][$i]['id']){
unset($_SESSION['cart'][$i]);
break;
}
}
}
?>
<p>Shopping Basket:</p>
<?php //CODE TO DISPLAY THE ITEMS ADDED TO THE BASKET AND RETRIEVING THE SAME FROM THE SESSION
$submit = $_GET; 
if($submit){
$buy = $_GET["buy"];
foreach($_SESSION['categ'] as $a1){
if($a1['id'] == $buy){

$_SESSION['cart'][] = array( 'id' =>(string) $a1['id'],'name' => (string) $a1[name],'fullDescription' => (string) $a1[fullDescription],'sourceURL' => (string) $a1[sourceURL],'minPrice' => (string) $a1[minPrice],'productOffersURL' => (string) $a1[productOffersURL]);
break;
		}
		}
		echo '<table  bgcolor="#D8D8D8" border="1">';
		foreach($_SESSION['cart'] as $a2){
		//echo '<fieldset>';
		echo '<tr>';
		echo '<td><img src='.$a2['sourceURL'].'/></td>';
        echo '<td>' .$a2['name'] . '</td>';
        echo '<td>' .$a2['fullDescription'] . '</td>';
        echo '<td>' .$a2['minPrice'] .'</td>';
		echo '<td><a href="buy.php?delete=' . $a2['id'] . '">Delete</a></td>'; 
		echo '</tr>';
        //echo '</fieldset>';
  }
  echo '</table>';
}

		
?>
<br/>
<table border="1">
<tr>
<td><p>TOTAL:</p></td>
<td>$
<?php //DISPLAY AND UPDATE THE TOTAL PRICE UPON ADDITION OF EACH ITEM TO THE CART , IF EMPTY DISPLAYS $0
//echo "TOTAL:$";
$price = 0;
foreach($_SESSION['cart'] as $a2){
$price =$price + $a2['minPrice'];
}
echo $price;
?></td>
<tr>
</table>
<br/>
<form method="get" action="buy.php">
<input type="hidden" value="1" name="clear">
<input type="submit" value="Empty Basket">
</form>



<form action="buy.php" method="GET">
<fieldset>
<legend>Find Products:</legend>
Category:<select name="category">
<?php //CODE TO APPEND XML RESPONSE TO THE SELECT DROP DOWN VALUES WHICH DISPLAYS CATEGORIES
$url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/rest/CategoryTree?apiKey=78b0db8a-0ee1-4939-a2f9-d3cd95ec0fcc&visitorUserAgent&visitorIPAddress&trackingId=7000610&categoryId=72&showAllDescendants=true';
$xmlstr = file_get_contents($url);
$xml = new SimpleXMLElement($xmlstr);
$id = $xml->category->attributes();
echo '<option value=' . $id["id"] . '>' . $xml->category->name . "</option>";
foreach($xml->category->categories->category as $a){
echo "<optgroup label=' . $a->name . '>";
foreach($a->categories->category as $b){
$x = $b->attributes();
echo '<option value=' . $x["id"] . '>' . $b->name . "</option>";
}
echo "</optgroup>";
}
?>
</select>
Name: <input type="text" name="search">&nbsp;<input type="submit">
</fieldset>
</form>
<?php //CODE TO GET SEARCH RESULTS BY APPENDING THE CATEGORY ID AND KEYWORD FROM THE ABOVE FORM TO THE URL
$submit = $_GET; 
if($submit){
$search = $_GET["search"];
$categ = $_GET["category"];
$refine = explode(" ",$search);
$count = count($refine);
$keyword_encoded = urlencode($search);
$options = array('http' => array('protocol_version' => '1.0','method' => 'GET'));
$url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/rest/GeneralSearch?apiKey=78b0db8a-0ee1-4939-a2f9-d3cd95ec0fcc&trackingId=7000610&categoryId='.$categ.'&keyword='.$keyword_encoded.'&numItems=20';

$context = stream_context_create($options);
$xmlstr = file_get_contents($url,false,$context);
$xml = new SimpleXMLElement($xmlstr);
$_SESSION['categ'];
echo '<table bgcolor="66CC99" border="1">';
foreach($xml->categories->category->items->product as $iterate)
{
$_SESSION['categ'][] = array( 'id' =>(string) $iterate['id'],'name' => (string) $iterate->name,'fullDescription' => (string) $iterate->fullDescription,'sourceURL' => (string) $iterate->images->image[0]->sourceURL,'minPrice' => (string) $iterate->minPrice,'productOffersURL' => (string) $iterate->productOffersURL);
$_SESSION['minpPrice'][] = array( 'minPrice' => (string) $iterate->minPrice );    

		echo '<tr>';
		echo '<td><a href="buy.php?buy=' . $iterate['id'] . '"><img src="' . $iterate->images->image[0]->sourceURL . '"/></a></td>';
        echo '<td>' .$iterate->name . '</td>';
        echo '<td>'; 
		echo $iterate->fullDescription;
        echo '</td>';
		echo '<td>' .$iterate->minPrice .'</td>';
		echo '<td><a href="' .$iterate->productOffersURL .'" alt="' .$iterate->name. '">Click here for offers!!!</a></td>'; 
		echo '</tr>';
		
}
echo '</table>';
}
?>
</body>
</html>