$().ready(() => {
	let once = true;
	$('#carouselExampleIndicators').on('slid.bs.carousel', () => {
		var index = $('div.active').index();
		if (once && index > 0) {
			for (let i = 0; i < sketches.length; i++) {
				new p5(sketches[i], `carousel_sketch_${i}`);
			}
			once = false;
		}
	});
});