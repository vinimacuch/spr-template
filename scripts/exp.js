// experiment's data is stored in an object called "data".
var data = {};

// data.trials is a list of objects containing the trial info for each slide of the experiment.
// example of a trial object:
// {"target_color": "white", "number_of_target_color_balls": 3, "sentence": "Some balls are black in the picture"}
// what the trial object contains depends on the particular experiment.
data.trials = [
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

data.subjInfo = {};
data.author = config.experimentAuthor;
data.experiment_id = config.experimentID;
data.description = config.experimentDescription;