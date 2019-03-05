$().ready(() => {
	let once = true;
	$('#carouselExampleIndicators').on('slid.bs.carousel', () => {
		var index = $('div.active').index();
		if (index > 0) {
			let sketch = sketches[index - 1];
			if (!sketch.initialized) {
				new p5(sketch.fn, sketch.parent);
				sketch.initialized = true;
			}
		}
	});
});