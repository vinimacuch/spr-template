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

	return view;
};


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
