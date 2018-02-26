// experiment's data is stored in an object called "data".

// data.trials is a list of objects containing the trial info for each slide of the experiment.
// example of a trial object:
// {"target_color": "white", "number_of_target_color_balls": 3, "sentence": "Some balls are black in the picture"}
// what the trial object contains depends on the particular experiment.
var initExp = function() {
	var data = {};

	trials_raw = [
		{"sentence": "Most of the balls are black in the picture"},
		{"sentence": "Some of the balls are white in the picture"},
		{"sentence": "Some of the balls are white in the picture"},
		{"sentence": "Some of the balls are white in the picture"},
		{"sentence": "All of the balls are black in the picture"},
		{"sentence": "All of the balls are black in the picture"},
		{"sentence": "None of the balls are black in the picture"},
		{"sentence": "None of the balls are black in the picture"},
		{"sentence": "Most of the balls are white in the picture"},
		{"sentence": "None of the balls are black in the picture"}
	];

	// function that shuffles the items in a list
	var shuffleComb = function(comb) {
		var counter = comb.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;

			let temp = comb[counter];
			comb[counter] = comb[index];
			comb[index] = temp;
		}

		return comb;
	};

	data.trials = shuffleComb(trials_raw);

	return data;
};