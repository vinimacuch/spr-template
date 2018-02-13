# A template for creating self paced reading (spr) experiments

An example of a self paced reading experiment can be found: (to be completed).


## Views

view sequence:
Introduction -> Instructions -> Practice trial (multiple) -> Begin Exp -> Trial (multiple) -> Subject Info -> Thank You

* Introduction view: contains general information about the experiment

elements: title, text and a button for advancing to the next view.

the content of the view (html) is in index.html lines ..
the js related to the view is in js/views.js lines ..

first view shown, shown once


* Instruction view: contains instructions about the experiment

elements: title, text and a button for advancing to the next view.

the content of the view (html) is in index.html lines ..
the js related to the view is in js/views.js lines ..

shown once


* Practice trial view: contains an example/s of a separate trial

elements: stumulus, sentence, response field and advance button

the content of the view (html) is in index.html lines ..
the js related to the view is in js/views.js lines ..

shown as many times as practice trials there are
advance button brings the same view type (practice trial) when there are more practice trials to be shown and moves to the next view type when all practice trials have been shown


* Begin Experiment view: warns the partipant the real experiment is about to begin

elements: text and advance button

the content of the view (html) is in index.html lines ..
the js related to the view is in js/views.js lines ..

shown once


* Trial view: contains a trial

elements: progress bar, stimulus, sentence, response field, next button

the content of the view (html) is in index.html lines ..
the js related to the view is in js/views.js lines ..

shown as many times as trials there are
advance button brings the same view type (trial) when there are more trials to be shown and moves to the next view type when all trials have been shown


* Subject Info view: contains a questionnaire for collecting extra information about the participant

elements: question fields, next button

shown once


* Thanks view: contains a thank you message and a hidden form that sends the collected results to the server

elements: text and form (not visible)



## Configuraion

to be completed

texts are changable

config.js



## Data format

to be completed

var data = {}

data.trials = []

each trial is an {}

each trial contains key-value pairs (same keys expected)

mandatory keys in the trial obj: "sentence"

trial object's info is passed to trial view and the info is filled in the template


## How is the repo organised

to be completed
