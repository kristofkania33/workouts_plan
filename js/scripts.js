var addWorkout = document.getElementById('addWorkout'),
    workout_name = document.getElementById('workout_name'),
    workout_time = document.getElementById('workout_time'),
    excercises = document.getElementById('excercises');

var excercises_set = [];
var create_workout_set = document.getElementById('create_workout_set'),
    set_workout = document.getElementById('set_workout');

function generateSet() {
	    excercises.innerHTML = "";
	    excercises_set.map(function(item) {
        var excercise1 = document.createElement('td');
        excercise1.innerText = 'Trening: ' + item.name + ' , czas trwania: ' + item.time;
        excercises.appendChild(excercise1);
        });
}
  

addWorkout.addEventListener('click', function() {
	 
        excercises_set.push({"name": workout_name.value, "time": workout_time.value});
        generateSet();
        delete excercises_set[0];
    });

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60,  10);
        seconds = parseInt(timer % 60,  10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (timer > 0) {
            timer = duration;
         }
   
        
    }, excercises_set[0].time);
    
}





create_workout_set.addEventListener('click',function() {
	if (excercises.length == 0) {
		set_workout.style.display = 'block';
	}
	else {
		set_workout.style.display = 'none';
		var display = $('#show_time');
		startTimer(excercises_set[0].time, display);
	}
});