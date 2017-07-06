//assign dom objects to variables

var addWorkout = document.getElementById('addWorkout'),
    workout_name = document.getElementById('workout_name'),
    workout_time = document.getElementById('workout_time'),
    first_workout = document.getElementById('first_workout'),
    show_time = document.getElementById('show_time'),
    excercises = document.getElementById('excercises'),
    create_workout_set = document.getElementById('create_workout_set'),
    set_workout = document.getElementById('set_workout');

//create empty set of exercises

var excercises_set = [];

/* FUNCTIONS */

//funtion for generating workout list from exercises array

function generateSet() {
	
	//empty excersises DOM container
	excercises.innerHTML = "";
	
	//add single workouts to DOM table
	excercises_set.map(function(item) {
		
       		var excercise1 = document.createElement("tr"); //create row
		var column = document.createElement("td"); //create one column
		
       		column.innerText = 'Trening: ' + item.name + ' - czas trwania: ' + item.time + '';
		
		excercise1.appendChild(column);
        	excercises.appendChild(excercise1);
		
        });
}
  
//function for running a workout session

function startTimer() {
      
   //count time needed for completing whole session	
   var time = excercises_set.reduce(function(sum, item) {
    	return sum + Number(item.time);
   }, 0);

   //set present workout to the first workout from the array
   var present_workout = 0;
   
   //get time needed for completing the first workout
   var time_left = excercises_set[0].time;
     
   //update counter	
   function update() {
	   
     if(time === 0) { //if time has runned out
      
	     clearInterval(timer); //stop interval
	     
	     //set html elements
  	     set_workout.style.display = 'block';
     	     addWorkout.style.display = 'block';
	     workout_name.style.display = 'block';
	     workout_time.style.display = 'block';
	     create_workout_set.style.display = 'block';
             show_time.innerText = 'Gratulacje. Trening zakończony. Twoja forma rosnie!';
     	     first_workout.innerText = 'Stworzysz nowy zestaw ?'
	     
	     //empty exercises array
             excercises_set = [];
	     generateSet(); //regenerate HTML view
      
     }
     else if(time_left === 0) { //workout time has ended
   	
		present_workout++; //pointer for new workout from the list
      		if(excercises_set[present_workout]) {
			 time_left = excercises_set[present_workout].time; //calculate time for new workout
		}
	    	else {
			clearInterval(timer); //stop interval
			alert('Error!');
			return false;
		}
      
     } else {
	     
	     	//update workut info
       		first_workout.innerText = 'Twoje cwiczenie: >>' + excercises_set[present_workout].name + '<<';
      		show_time.innerText = 'Czas start: >> ' + excercises_set[present_workout].time + ' !   <<  Odliczamy!';
	     
	     	//update time needed for completing workout
      		time_left--;
      		time--;
     }
   }
   

   var timer = setInterval(update,1000); //set interval (update status every second)
}


/* EVENT LISTENERS */

//addWorkout click event -> click to add workout

addWorkout.addEventListener('click', function() {
	 
	//w tym miejscu powinieneś jeszcze sprawdzić, czy workout_time jest rzeczywiście liczbą 
	//i jeśli nie, to spróbować skonwertować ją do liczby. Jeśli sie nie uda, to warto wysweitlić błąd
	
	//push new workout to array
        excercises_set.push({name: workout_name.value, time: workout_time.value});
	
	//regenerate HTML view
        generateSet();
});

//createWorkoutSet click event -> click to start session

create_workout_set.addEventListener('click', function() {
	
	if (excercises.length == 0) { //if there are no exercises
		
		addWorkout.style.display = 'block';
		workout_name.style.display = 'block';
		workout_time.style.display = 'block';
		
	}
	else { 
		
		set_workout.style.display = 'none';
		create_workout_set.style.display ='none';
		startTimer();	
	}
	
});
