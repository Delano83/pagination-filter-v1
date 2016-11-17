function app() {
    'use strict';
    //Gather the students array
    var students = document.getElementsByClassName("student-item"),
        //Gather the number of student-details list items in the page
        numOfStudents = students.length,
        //Calculate how many pages there are by figuring out the length and dividing it by 10
        studentPages = Math.ceil(numOfStudents / 10),
        //get the studentListUL which will be handy in a bunch of ways
        studentListUL = document.getElementsByClassName("student-list"),
        //create the pagination div
        paginationDiv = document.createElement("DIV"),
        //instantiate the counter
        i;

    //Create a function that hides all students
    function hideAllStudents() {
        for (i = 0; i < students.length; i ++) {
            if (students[i]) {
                students[i].style.display = 'none';
            }
        }
    }

    //Create a function for the transition between pages
    function removeFade(element) {
        var opacity = 0.1;
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
            opacity += opacity * 0.1;
        }, 10);
    }

    //Create a function that allows for the simple removal of elements
  /*  Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    };
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    };*/

    //Create a function that shows and hides specific groups of students for the pagination
    function showStudents(arrayOfStudents, numToShowFrom, numToShowTo) {
        hideAllStudents();
        //then show specific students
        for (i = numToShowFrom; i < numToShowTo; i ++) {
            if (arrayOfStudents[i]){
                arrayOfStudents[i].style.display = 'block';
                //Include fade when transitioning between pages.
                removeFade(arrayOfStudents[i]);
            }
        }
    }

    //Create a pagination div
    function createPaginationDiv(numOfPages){
        var pageDiv = document.getElementsByClassName("page")[0];
        pageDiv.appendChild(paginationDiv);
        paginationDiv.className = "pagination";
        //Create the pagination ul
        var paginationUl = document.createElement("UL");
        paginationDiv.appendChild(paginationUl);
        paginationUl.id = "paginationUL-id";
        //Create the correct number of li items
        for (i = 1; i <= numOfPages; i++) {
            //Populate the li items with the page numbers
            var el = document.createElement("LI");
            paginationUl.appendChild(el);
            el.innerHTML = "<a href=# id=" + i + ">" + i + "</a>";
        }
    }

    //Write a function that delivers 10 at a time based on the page numbers
    function deliverPaginatedResults(studentArray, pageNum) {
        var fromNumber = pageNum * 10 - 10;
        var toNumber = pageNum * 10;
        if (pageNum == 1) {
            showStudents(studentArray,0,10);
        } else {
            showStudents(studentArray,fromNumber, toNumber);
        }
    }

    //Create initial pagination div
    createPaginationDiv(studentPages);
    //Hide all records except for the first 10 onload
    showStudents(students,0,10);
    //Trigger the page switching function whenever we click a specific anchor with a specific id
    paginationDiv.children[0].addEventListener("click", function (e){
            deliverPaginatedResults(students, e.target.id);
    });

    //Find the student's record containing the name
    function searchStudents(){
        //Hide all of the li items in the student-list
        hideAllStudents();
        var searchBox = document.getElementById("search-input");
        var searchValue;
        searchValue = searchBox.value.toLowerCase();
        var parentUl = document.getElementById("paginationUL-id");
            if (parentUl) {
                parentUl.remove();

            }
            //if the element is already there, get rid of it so that messages don't duplicate
        var errorDiv = document.getElementById("errorID");
            if (errorDiv){
                errorDiv.remove();
            }

          var details = [];
        //Search the li item to find the record either by name or email address - make sure it is case insensitive
        //populate the details array to make sure we're just searching the right fields
        for (var i = 0; i < students.length; i++) {
            var detailsDiv = students[i].children[0];
            details.push(detailsDiv.children[1]);
            details.push(detailsDiv.children[2]);
        }
        //loop over that array, and look for the search value and put it's parent element in a new array
        var showCurrentStudents = [];
        for (i = 0; i < details.length; i++) {
         if (details[i].textContent.includes(searchValue)) {
               var detailDiv = details[i].parentElement;
             var studentLi = detailDiv.parentElement;
             //Show the li
             if (showCurrentStudents.indexOf(studentLi) >= 0){
             }else {
                 showCurrentStudents.push(studentLi);
             }

            }
        }
        //If no matches are found, include a message in the HTML to tell the user there are no matches.
        if (showCurrentStudents.length === 0) {
            var errorMessage = document.createElement("LI");
            errorMessage.id = "errorID";
            errorMessage.innerHTML = "Sorry, no students containing " + searchValue + " were found.";
            studentListUL[0].appendChild(errorMessage);
        }

               //create the new variable
                var studentNewPages = Math.ceil(showCurrentStudents.length / 10);
                if (studentNewPages > 1) {
                    createPaginationDiv(studentNewPages);
                }
                showStudents(showCurrentStudents,0, 10);
                var paginationUL = document.getElementById("paginationUL-id");
                if (paginationUL){
                 paginationUL.addEventListener("click", function (e){
                 deliverPaginatedResults(showCurrentStudents, e.target.id);
                });
              }

        }


    //Create a function that adds the search input and button to the page
    function addSearchDiv(){
        //Get the parent div
        var pageHeader = document.getElementsByClassName("page-header")[0];
        //Assemble the search div
        var searchDiv = document.createElement("DIV");
        searchDiv.className = "student-search";
        //Assemble the search input
        var searchInput = document.createElement("INPUT");
        searchInput.id = "search-input";
        searchInput.type = "text";
        searchInput.placeholder = "Search for students....";
        //Assemble the button
        var searchButton = document.createElement("BUTTON");
        searchButton.innerHTML = "Search";
        //Append them to the first div with the class of page-header
        pageHeader.appendChild(searchDiv);
        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton);
        searchButton.addEventListener("click", searchStudents);
        //As the user types in the search box, dynamically filter the student listings as you type
        searchInput.addEventListener("keyup", searchStudents);
    }
    addSearchDiv();
}
app();
