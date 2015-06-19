<?php

header('Content-Type: application/json');


$skvReturn = array();

$skvReturn['appVersion'] = '0.1';

// Current date in the format "Fri Jun 19 2015 11:26:49 BST 2015"
$skvReturn['arrDate'] = array();
$skvReturn['arrDate'][] = intval( date("Y") ); // Year
$skvReturn['arrDate'][] = intval( date("m") ); // month
$skvReturn['arrDate'][] = intval( date("j") ); // day 
$skvReturn['arrDate'][] = intval( date("G") ); // hour 
$skvReturn['arrDate'][] = intval( date("i") ); // minute 
$skvReturn['arrDate'][] = intval( date("s") ); // second 

$skvReturn['arrChapters'] = array();

$iLimit = rand( 3, 9 );
for( $i = 0; $i < $iLimit; $i++ ){
	$skvReturn['arrChapters'][$i] = md5( $i . time() . $i );
}

echo json_encode( $skvReturn );

?>
