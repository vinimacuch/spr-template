// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {	
	spr.init();
});

var spr = {};

spr.findNextView = function() {
	if (this.view.name === 'intro') {
		this.view = initInstructionsView();
	} else if (this.view.name === 'instructions') {
		this.view = initPracticeView();
		this.CPT++;
	} else if (this.view.name === 'practice' && (this.CPT < this.TPT)) {
		this.view = initPracticeView();
		this.CPT++;
	} else if (this.view.name === 'practice' && this.CPT === this.TPT) {
		this.view = initBeginExpView();
	} else if (this.view.name === 'beginExp') {
		this.view = initTrialView(data.trials[this.CT], this.CT);
		this.CT++;
	} else if (this.view.name === 'trial' && this.CT < this.TT) {
		this.view = initTrialView(data.trials[this.CT], this.CT);
		this.CT++;
	} else if (this.view.name === 'trial' && this.CT === this.TT) {
		this.view = initSubjInfoView();
	} else if (this.view.name === 'subjInfo') {
		this.view = initThanksView();
	}
};

spr.init = function() {
	// CPT - current practice trial
	this.CPT = 0;
	// CT - current trial
	this.CT = 0;

	this.view = initIntroView();
	
	// to be done: get TT and TPT from the model, this now is a temp solution
	// TPT - total practice trials
	this.TPT = 2;
	// TT - total trials
	this.TT = data.trials.length;
};