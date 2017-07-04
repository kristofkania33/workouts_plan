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
});

function startTimer(duration, display) {
       //Tutaj na początek zliczany jest całkowity czas jaki trzeba poświecić na cały zestaw (czyli sumę time wszystkich ćwiczeń). 
   var time = excercises_set.reduce(function(sum, item) {
    return sum+item.time;
  }, 0);
   //ustawmy, które ćwiczenie obsługujemy aktualnie. Domyślnie startujemy od peirwszego.
   var present_workout = 0;
   
   //zmienna bedzie przechowywala ile czasu jeszcze zosotalo do zakonczenia cwiczenia
   var time_left = excercises_set[0].time;
   
   //teraz zróbmy sobię funkcję, która będzie się odpalała co sekundę
   function update() {
     if(time == 0) { //jesli calkowity czas sie skonczyl, to 
      clearInterval(timer); //wyczyść interval
      return false;  //przerwij funkcję
     }
     if(time_left == 0) {
       //cwiczenie sie skonczylo
       present_workout++; //wybieramy kolejny workout z listy. Mozemy nizej dac informacje na stronie ,ze zaczynamy exercise_set[present_workout].name
       time_left = excercises_set[present_workout].time; //ustawiamy czas z nowego cwiczenia
     } else {
       time_left--;
       time--;
       //zaktualizuj informacje na stronie
     }
   }

   var timer = setInterval(update,1000);
}


create_workout_set.addEventListener('click', function() {
	if (excercises.length == 0) {
		set_workout.style.display = 'block';
	}
	else {
		set_workout.style.display = 'none';
		startTimer(time, display);
		var display = $('#show_time');
        var time = excercises_set.reduce(function(sum, item) {
        return sum+item.time;
        }, 0);
	}
	
});