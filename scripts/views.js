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
	var readingTimes = [];
	var sentence = initSentence();
	$('#main').html(Mustache.render(view.template, {
		currentTrial: CT + 1,
		totalTrials: data.trials.length,
		sentence: trialInfo.sentence.split(" "),
		buttonText: config.practice.buttonText
	}));

	setTimeout(function() {
		$('.img').addClass('nodisplay');

		// attaches an event listener for key pressed
		// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
		$('body').on('keyup', handleKeyUp);
	}, 1000);

	// checks whether the key pressed is space and if so calls sentence.showNextWord()
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		if (e.which === 32) {
			sentence.showNextWord();
		}
	};


	$('input[name=question]').on('change', function() {
		$('body').off('keyup', handleKeyUp);
		data.trials[CT].response = $('input[name=question]:checked').val();
		setTimeout(function() {
			spr.findNextView();
		}, 200);
	});

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

// creates Thanks View
var initThanksView = function(sendData) {
	var view = {};
	view.name = 'thanks';
	view.template = $('#thanks-view').html();
	$('#main').html(Mustache.render(view.template, {
		thanksMessage: config.thanks.message
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


// creates a sentence object that has showNextWord() function
var initSentence = function() {
	var sentence = {};
	// keeps track of word to be shown
	var currentWord = -1;

	// picks the word that should be shown when space is clicked
	// when there are no more words to show, the question appears
	sentence.showNextWord = function() {
		var words = $('.word').toArray();

		currentWord++;
		if (currentWord < words.length){
			$(words[currentWord]).addClass('visible');
			$(words[currentWord -1]).removeClass('visible');
		}
		// when all the words have been shown, the last one is hidden
		// and the response buttons appear
		else {
			// hides last word
			$(words[currentWord -1]).removeClass('visible');
			// shows the response buttons
			$('.question').removeClass('nodisplay');
		}
	};

	return sentence;
};