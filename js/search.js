//Create the search feature
var searchFunction = function searchFeature() {
    console.log("Is my search feature working?");
		//showArray = [];
    //Get the value entered in the search box
    var inputString = document.getElementById('inputSearch');
    var count = 0;
    //Onkeyup we want to filter the content by the string entered in the search box dynamically
    inputString.onkeyup = function() {
        //toUpperCase to make it case insensitive
        var filter = inputString.value.toUpperCase();
        //loop through all the li's
      for (var i = 0; i < showArray.length; i++) {
            //Select the student name and retrieve the .innerText value
            var studentInfo = studentName.innerText;
            count++;
            //Display all the results where indexOf() does not return -1
            showArray.forEach(function() {
                if (studentInfo.toUpperCase().indexOf(filter) != -1) {
                    //console.log(eachStudent[i]);
                    showArray.push(eachStudent[i]);
                    return showArray;
                }
            });
						console.log(showArray);
        }
    }
}
