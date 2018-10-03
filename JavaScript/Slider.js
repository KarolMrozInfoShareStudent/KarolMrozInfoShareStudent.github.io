
	var i = 0; // Start point
	var images = [];
	var time = 2000;

	// Image List
	images[0] = '';
	images[1] = 'Image/firstPageImage/Slider1/html5.png';
	images[2] = 'Image/firstPageImage/Slider1/CSS.png';
	images[3] = 'Image/firstPageImage/Slider1/JS.png';

	// Change Image
	function changeImg(){
		document.slide.src = images[i];

		if(i < images.length - 1){
			i++;
		} else {
			i = 0;
		}

		setTimeout("changeImg()", time);
	}

	window.onload = changeImg;


