$().ready(() => {
	const carousel = $('#main_carousel');

	carousel.on('slide.bs.carousel', (event) => {
		if (event.to > 0) {
			const sketch = sketches[event.to - 1];

			if (!sketch.initialized) {
				new p5(sketch.fn, sketch.parent);
			}
		}
	});
});