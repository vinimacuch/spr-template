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

// creates Begin experiment view
var initBeginExpView = function() {
	var view = {};
	view.name = 'beginExp';
	view.template = $('#begin-exp-view').html();
	$('#main').html(Mustache.render(view.template, {
		text: config.beginExp.text
	}));

	showNextView();

	return view;
};

// creates Trial View
var initTrialView = function(trialInfo, CT) {
	var view = {};
	view.name = 'trial';
	view.template = $('#trial-view').html();
	var readingDates = [];
	var readingTimes = [];
	var rtCount = trialInfo.sentence.split(" ").length;
	var sentence = initSentence();
	var startingTime = Date.now();

	$('#main').html(Mustache.render(view.template, {
		currentTrial: CT + 1,
		totalTrials: data.trials.length,
		sentence: trialInfo.sentence.split(" "),
		buttonText: config.practice.buttonText
	}));

	
	setTimeout(function() {
		var show = $('.show');
		$('.fixation-container').addClass('nodisplay');

		for (var i=0; i<show.length; i++) {
			$(show[i]).removeClass('nodisplay');
		};
	}, 1000);

	// checks whether the key pressed is space and if so calls sentence.showNextWord()
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		if (e.which === 32) {
			sentence.showNextWord();

			// collects the dates (unix time) in a variable readingDates every time a word is shown
			if (rtCount >= 0) {
				readingDates.push(Date.now());
			}
			rtCount--;
		}
	};

	// converts the readingDates into readingTimes by substracting
	// returns a list of readingTimes
	var getDeltas = function() {
		var deltas = [];

		for (var i = 0; i < readingDates.length - 1; i++) {
			deltas[i] = readingDates[i+1] - readingDates[i];
		};

		return deltas;
	};

	// checks the expSettings in config.js and depending on the settings
	// either show the image for a particular amount of time
	if (config.expSettings.hideImage === true) {
		setTimeout(function() {
			// add a css class to the image to hide it
			$('.img').addClass('nodisplay');

			// attaches an event listener for key pressed
			// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
			$('body').on('keyup', handleKeyUp);
		}, config.expSettings.showDuration + 1000);
	// or the image does not disappear at all
	} else {
		// attaches an event listener for key pressed
		// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
		$('body').on('keyup', handleKeyUp);
	}

	// attaches an event listener to the yes / no radio inputs
	// when an input is selected a response property with a value equal to the answer is added to the trial object
	// as well as a readingTimes property with value - a list containing the reading times of each word
	$('input[name=question]').on('change', function() {
		$('body').off('keyup', handleKeyUp);
		data.trials[CT].timeSpent = Date.now() - startingTime - 1000;
		data.trials[CT].response = $('input[name=question]:checked').val();
		data.trials[CT].readingTimes = getDeltas();
		console.log(data.trials[CT]);
		setTimeout(function() {
			spr.findNextView();
		}, 200);
	});

	return view;
};


// creates Subject Info View
var initSubjInfoView = function() {
	var view = {};
	view.name = 'subjInfo';
	view.template = $('#subj-info-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config.subjInfo.title,
		text: config.subjInfo.text,
		buttonText: config.subjInfo.buttonText
	}));

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

	submitResults(config.is_MTurk, config.contact_email);

	return view;
};


// HELPERS:
// functions shared between more than two views or long functions

// attached spr.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in spr.findNextView() which is located in main.js
var showNextView = function() {
	var nexts = $('.next-view');

	for (var i=0; i<nexts.length; i++){
		if (nexts[i].id === 'sends-data') {
			nexts[i].addEventListener('click', function() {
				data.subjInfo = {
					age: $('#age').val(),
					gender: $('#gender').val(),
					education: $('#education').val(),
					languages: $('#languages').val(),
					comments: $('#comments').val()
				};

				spr.findNextView();
			});
		} else {
			nexts[i].addEventListener('click', function() {
				spr.findNextView();
			});
		}
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


// submits data to the uni server and MTurk's server if the experiment runs on MTurk
// takes two arguments:
// 1) isMTurk - boolean; true if the experiment runs on MTurk
// 2) contactEmail - string
var submitResults = function(isMTurk, contactEmail) {
	// if isMTurk is not given, sets it to false
	isMTurk = typeof isMTurk !== 'undefined' ? isMTurk : false;
	// set a default contact email
	contactEmail = typeof contactEmail !== 'undefined' ? contactEmail : "mchfranke@gmail.com";
	console.log(contactEmail);
	console.log(isMTurk);

	$.ajax({
		type: 'POST',
		url: 'https://procomprag.herokuapp.com/api/submit_experiment',
		crossDomain: true,
		data: {
			'author': config.author,
			'experiment_id': config.experiment_id,
			'trials': data.trials,
			'description': config.description,
			'subject_info': data.subjInfo
		},
		success: function (responseData, textStatus, jqXHR) {
			console.log(textStatus)
			if (isMTurk) {
				// For now we still use the original turk.submit to inform MTurk that the experiment has finished.
				// submits to MTurk's server if isMTurk = true
				submitToMTurk();
			}
			// shows a thanks message after the submission
			$('.thanks-message').removeClass('hidden');
		},
		error: function (responseData, textStatus, errorThrown) {
			// There is this consideration about whether we should still allow such a submission that failed on our side to proceed on submitting to MTurk. Maybe we should after all.
			if (isMTurk) {
				// For now we still use the original turk.submit to inform MTurk that the experiment has finished.
				// Stela might have another implementation which submits only the participant id.
				// Not notifying the user yet since it might cause confusion. The webapp should report errors.

				// submits to MTurk's server if isMTurk = true
				submitToMTurk();
				// shows a thanks message after the submission
				$('.thanks-message').removeClass('hidden');
			} else {
				// It seems that this timeout (waiting for the server) is implemented as a default value in many browsers, e.g. Chrome. However it is really long (1 min) so timing out shouldn't be such a concern.
				if (textStatus == "timeout") {
					alert("Oops, the submission timed out. Please try again. If the problem persists, please contact " + contactEmail + ", including your ID");
				} else {
					alert("Oops, the submission failed. Please try again. If the problem persists, please contact " + contactEmail + ", including your ID");
				}
			}
		}
	});
};

// submits to MTurk's servers
var submitToMTurk = function() {

	$.ajax({
		type: 'POST',
		url: config.MTurk_server,
		data: {
			'assignmentID': '',
			'author': config.author,
			'experiment_id': config.experiment_id,
			'trials': data.trials,
			'description': config.description,
			'subject_info': data.subjInfo
		},
		success: function() {
			console.log('submission successful');
		},
		error: function() {
			console.log('submission failed');
		}
	});

	console.log('submit to mturk');
};