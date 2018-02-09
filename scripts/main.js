$('document').ready(function() {	
	spr.init();
});

var spr = {};

spr.findNextView = function() {
	console.log('findNextView called');
	if (this.view.name === 'intro') {
		this.view = initInstructionsView();
	} else if (this.view.name === 'instructions') {
		this.view = initPracticeView();
	}
};

spr.init = function() {
	this.view = initIntroView();
};