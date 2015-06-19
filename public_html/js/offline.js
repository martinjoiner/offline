

$.ajax({
	type: "GET",
	url: "/GET/latest/index.php", 
	dataType: "json"
}).done(function( data ){

	// AJAX succeeded, lets pass the data to the display functions 
	localforage.setItem('arrDate', data.arrDate, function(err, value){ displayDate(value); } );
	localforage.setItem('arrChapters', data.arrChapters, function(err, value){ displayChapters(value); } );

}).fail( function(){

	// AJAX failed, lets grab data from local cache and call the display functions 
	localforage.getItem('arrDate').then( displayDate );
	localforage.getItem('arrChapters').then( displayChapters );

});


function displayData( data ){

}

function displayDate( arrDate ){
	var objDate = new Date( arrDate[0], arrDate[1], arrDate[2], arrDate[3], arrDate[4], arrDate[5] );
	var strDate = 'Loaded data from ' + objDate;

	$('#content').append( '<h2>' + strDate + '</h2>' );
}


function displayChapters( arrChapters ){

	var elemContent = document.getElementById('content');

	for( var i = 0, iLimit = arrChapters.length; i < iLimit; i++ ){
		elemContent.appendChild( generateChapterDiv( arrChapters[i] ) );
	}

}

function generateChapterDiv( skvChapter ){

	var elemDiv = document.createElement('div');

	// Append a h3 element
	var elemH3 = document.createElement('h3');
	elemH3.textContent = skvChapter.title;
	elemDiv.appendChild(elemH3);

	// Append an image element if it needs one
	if( typeof skvChapter.blobImage === 'string' ){
		elemImg = document.createElement('img');
		elemImg.src = 'data:image/bmp;base64,' + skvChapter.blobImage;
		elemDiv.appendChild(elemImg);
	}

	// Append a paragraph elemenet
	var elemP = document.createElement('p');
	elemP.textContent = skvChapter.text;
	elemDiv.appendChild(elemP);

	return elemDiv;
}



// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

	window.applicationCache.addEventListener('updateready', function(e) {
		if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
			// Browser downloaded a new app cache.
			if (confirm('A new version of this site is available. Load it?')) {
				window.location.reload();
			}
		} else {
			// Manifest didn't changed. Nothing new to server.
		}
	}, false);

}, false);

