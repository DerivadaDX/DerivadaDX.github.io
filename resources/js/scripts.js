$().ready(() => {
	const carousel = $('#main_carousel');

	carousel.height(window.innerHeight * 3 / 5);
	carousel.on('slid.bs.carousel', (event) => {
		if (event.to > 0) {
			const sketch = sketches[event.to - 1];

			if (!sketch.initialized) {
				new p5(sketch.fn, sketch.parent);
			}
		}
	});
});