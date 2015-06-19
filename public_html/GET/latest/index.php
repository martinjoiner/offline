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

$arrPics = array( 	'/images/aeroplane.jpg',
					'/images/dancer.jpg',
					'/images/kitten.jpg',
					'/images/moon.jpg',
					'/images/pizza.jpg'
				);

// Generate a random number of chapters between 4 and 10
$iLimit = rand( 3, 9 );
for( $i = 0; $i < $iLimit; $i++ ){
	$arrTemp = array();
	$arrTemp['title'] = "Chapter " . $i;
	$arrTemp['text'] = md5( $i . time() . $i );

	// Randomly assign an image or not
	$imgPointer = rand(0, sizeof($arrPics) * 2);
	if( $imgPointer < sizeof($arrPics) ){
		$my_blob = file_get_contents( $_SERVER['DOCUMENT_ROOT'] . $arrPics[$imgPointer]);
		// Remove this image from the array
		array_splice($arrPics, $imgPointer, 1);
		$my_blob = base64_encode( $my_blob );
		$arrTemp['blobImage'] = $my_blob;
	} 
	$skvReturn['arrChapters'][$i] = $arrTemp;
}

echo json_encode( $skvReturn );
