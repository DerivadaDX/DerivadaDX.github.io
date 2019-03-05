$().ready(() => {
	const carousel = $('#main_carousel');

	carousel.height(window.innerHeight * 3 / 5);
	carousel.on('slid.bs.carousel', () => {
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