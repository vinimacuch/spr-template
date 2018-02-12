// creates the Introduction view
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config.intro.title,
		text: config.intro.text,
		button: config.intro.buttonText
	}));

	showNextView();

	return view;
};


// creates Instruction view
var initInstructionsView = function() {
	var view = {};
	view.name = 'instructions';
	view.template = $("#instructions-view").html();
	$('#main').html(Mustache.render(view.template, {
		title: config.instructions.title,
		text: config.instructions.text,
		button: config.instructions.buttonText
	}));

	showNextView();

	return view;
};


// creates Practice view
var initPracticeView = function() {
	var view = {};
	view.name = 'practice',
	view.template = $('#practice-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config.practice.title,
		text: config.practice.text,
		buttonBetween: config.practice.buttonBetween,
		buttonText: config.practice.buttonText
	}));

	showNextView();

	return view;
};

// creates Trial View
var initTrialView = function(trialInfo, CT) {
	var view = {};
	view.name = 'trial';
	view.template = $('#trial-view').html();
	$('#main').html(Mustache.render(view.template, {
		currentTrial: CT + 1,
		totalTrials: data.trials.length,
		buttonBetween: config.practice.buttonBetween,
		buttonText: config.practice.buttonText
	}));

	showNextView();

	return view;
};

// creates Subject Info View
var initSubjInfo = function() {
	var view = {};
	view.name = 'trial';
	view.template = $('#subj-info-view').html();
	$('#main').html(Mustache.render(view.template, {}));

	showNextView();

	return view;
}


// HELPERS:
// functions shared between more than two views.

// attached spr.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in spr.findNextView() which is located in main.js
var showNextView = function() {
	var nexts = $('.next-view');

	for (var i=0; i<nexts.length; i++){
		nexts[i].addEventListener('click', function() {
			spr.findNextView();
		});
	}
};
