// the config provides the option of customising texts and titles across the website.

var config = {
	// mandatory field
	"experimentAuthor": "Stela Plamenova",
	"experimentID": "spr-001",

	// experiment setting
	"expSettings": {
		// if you want the image in the experiment to disappear set to true
		"hideImage": true,
		// for how long the image is shown before it dissapears in ms (1000 ms = 1 sec)
		// needed if "hideImage" is set to true
		"showDuration": 1000
	},

	// intro view
	"intro": {
		// introduction title
		"title": "Welcome to XPrag experiments!",
		// introduction text
		"text": "Lorem ipsum dolor sit amet consectetur adipiscing elit tellus auctor, risus metus mauris nibh leo senectus varius taciti bibendum, laoreet tempor orci ligula iaculis odio malesuada nostra. Erat gravida consequat nunc pharetra libero tempus lobortis placerat, laoreet vitae eget vivamus eros luctus sed nullam auctor, vel sem hac quam facilisis aptent blandit. Bibendum molestie morbi ullamcorper vitae accumsan dapibus ultricies aliquet mi luctus, ante suscipit purus consequat nascetur a senectus cras donec.",
		// instroduction's slide proceeding button
		"buttonText": "Begin Experiment"
	},

	// instructions view
	"instructions": {
		// instruction's title
		"title": "Instructions",
		// instruction's text
		"text": "instructions on how to do the exp",
		// instuction's slide proceeding button text
		"buttonText": "Go to practice trial"
	},

	// practice trial view
	"practice": {
		"title": "Practice",
		"text": "This is a practice trial",
		// button text between trials
		"buttonText": "Next",
	},

	// trial view
	"trial": {
		// button text between trials
		"buttonText": "Next",
	},

	// thanks view
	"thanks": {
		"message": "Thank you for taking part in this experiment!"
	}
}
