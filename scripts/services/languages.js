class LanguageService {
	constructor() {
		this._saveLanguage(localStorage.getItem('lang') || 'en');
	}

	initialize() {
		let scriptTag = document.createElement('script');

		scriptTag.id = 'script-lang';
		scriptTag.type = 'text/javascript';
		scriptTag.src = `../../locale/${this.lng}.js`;

		document.querySelector('head').appendChild(scriptTag);

		scriptTag.onload = () => document.lang.forEach(e => $(`.${e.id}`).html(e.text));
	}

	setLanguage(lng) {
		let scriptTag = document.getElementById('script-lang');

		scriptTag.parentNode.removeChild(scriptTag);

		this._saveLanguage(lng);
		this.initialize();
	}

	_saveLanguage(lng) {
		this.lng = lng;
		localStorage.setItem('lang', this.lng);
	}
}