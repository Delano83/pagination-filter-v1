//All the JS code to append markup for the search and pagination links is in this file.
//Create pagination links depending on the number of students. We want 10 max per page.
//The first 10 students are shown when the page loads, and each pagination link displays the correct students.
//Clicking on “1” in the pagination links should should show students 1 to 10, etc...
//The correct HTML markup gets appended in the correct place (see filter-example.html) when the page loads.
//Searching is not case sensitive, you can type "Delano" or "delano"
//When the search button is pressed, the results should show up.
//Pagination links should update depending on the number of search results.
//Create the main variables
var page = document.querySelector(".page");
var eachStudent = document.querySelectorAll(".student-item");
var numberOfStudents = eachStudent.length;
var pageHeader = document.getElementsByClassName("page-header")[0];
var numberOfPages = Math.ceil(numberOfStudents / 10);
var pagination = document.createElement("div");
var studentList = document.querySelector(".student-list");

//Create function to fade in transition between pages
function fadeIn(el) {
    el.style.opacity = 0;
    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
    tick();
}

//Start by hiding all the students on the list
var hideAll = function() {
    for (var i = 0; i < eachStudent.length; i++) {
        eachStudent[i].style.display = "none";
    }
};

//Create a function that shows and hides students from and to a specific index
function displayStudents(studentsArray, FromIndex, ToIndex) {
    //Start by hiding all the students
    hideAll();
    //Show students from and to a specific index
    for (var i = FromIndex; i < ToIndex; i++) {
        if (studentsArray[i]) {
            studentsArray[i].style.display = "block";
            //Include a fade in transition
            fadeIn(studentsArray[i]);
        }
    }
}
//Display only the first ten students on the page
displayStudents(eachStudent, 0, 10);


function createPagination(numberOfPages) {
    //Create the static elements for the pagination
    var ulList = document.createElement("ul");
    //Giving them attributes to select them easily
    pagination.setAttribute("class", "pagination");
    ulList.setAttribute("id", "pagelist");
    //Append the ulList to the main pagination div
    page.appendChild(pagination);
    pagination.appendChild(ulList);
    for (var i = 1; i <= numberOfPages; i++) {
        //Create the dynamic elements in the pagination
        var liList = document.createElement("li");
        ulList.appendChild(liList);
        //Create pagination links
        var pageLink = document.createElement("a");
        pageLink.setAttribute("href", "#");
        pageLink.setAttribute("id", i);
        pageLink.innerHTML = i;
        liList.appendChild(pageLink);
    }
    return pagination;
}
//Trigger the createPagination function and pass the number of pages as an argument
createPagination(numberOfPages);

//Function to display only ten students per page
function show10(studentArray, pageNumber) {
    //Multiply the page number by 10 and get extract 10 for the first student on the page
    var showFrom = pageNumber * 10 - 10;
    //Mutliply the page number by 10 to get the last student on the page
    var showTo = pageNumber * 10;
    //If they are less than 10 students in the results, then display only from 0 to 10
    //else showFrom one index to the last index
    if (pageNumber == 1) {
        displayStudents(studentArray, 0, 10);
    } else {
        displayStudents(studentArray, showFrom, showTo);
    }
}

//Recreate Search Element in Js
function searchBar() {
    //Creating the three elements that make up the search bar, the div, the input and the button
    var studentSearch = document.createElement("div");
    var input = document.createElement("input");
    var searchButton = document.createElement("button");
    //Set some attributes for these elements
    studentSearch.setAttribute("class", "student-search");
    searchButton.setAttribute("id", "search-button");
    input.setAttribute("id", "inputSearch");
    //Add some text to our elements
    var txtNode = document.createTextNode("Search");
    input.type = "text";
    input.placeholder = "Type a name here...";
    //Append them to the page
    searchButton.appendChild(txtNode);
    studentSearch.appendChild(input);
    studentSearch.appendChild(searchButton);
    pageHeader.appendChild(studentSearch);
    //Add our eventListeners the the search elements
    //Trigger the search function when the user presses the searchButton
    searchButton.addEventListener("click", searchFunction);
    //Filter dynamically as the user types in the box
    input.addEventListener("keyup", searchFunction);
}

//When the user clicks on a page number, go to that page.
pagination.children[0].addEventListener("click", function(e) {
    show10(eachStudent, e.target.id);
});

//Create a function that will find the results matching the user's query
function searchFunction() {
    //Start by hiding all the students on the page
    hideAll();
    //Select the main elements we will need on the page.
    //Select the search bar.
    var searchBar = document.getElementById("inputSearch");
    //Initiate our filter
    var filter;
    //Get the value of our search bar as the user types
    filter = searchBar.value.toLowerCase();
    var mypages = document.getElementById("pagelist");
    //Get our error messages
    var error = document.getElementById("errorMessage");
    //Create our arrays to handle the data
    //StudentDetails wil handle all the names and emails
    var studentDetails = [];
    //filteredStudents will display the names and emails that match the user's query
    var filteredStudents = [];
    //Remove the current pagination
    if (mypages) {
        mypages.remove();
    }
    //Remove the error message if it's there
    if (error) {
        error.remove();
    }
    //Loop over each student and push the name and email to the studentDetails array
    for (var i = 0; i < eachStudent.length; i++) {
        //Select the first children to each student li
        var detailsFilter = eachStudent[i].children[0];
        //Push all student name's in the studentDetails array
        studentDetails.push(detailsFilter.children[1]);
        //Push all student's emails in the studentDetails array
        studentDetails.push(detailsFilter.children[2]);
    }


    //Loop over the studentDetails array to find corresponding matches to the user's search
    //Push these results in the filteredStudents array
    for (i = 0; i < studentDetails.length; i++) {
        //If a student correponds to the search value then take his parent element and push it in the new array
        if (studentDetails[i].innerText.indexOf(filter) != -1) {
            //Find the parent element of the matching student
            var parentDetails = studentDetails[i].parentElement;
            var liDetails = parentDetails.parentElement;
            //Push the right elements in the new array
            if (filteredStudents.indexOf(liDetails) === -1) {
                filteredStudents.push(liDetails);
            }
        }
    }

    //Create a paragraph  for the error message that will display when there are no results
    if (filteredStudents.length < 1) {
        var studentList = document.querySelector(".student-list");
        var errorMessage = document.createElement("p");
        errorMessage.setAttribute("id", "errorMessage");
        //Create a message saying there are no results for the correponding search
        errorMessage.innerHTML = "Your search for " + filter + " did not match any results.";
        studentList.appendChild(errorMessage);
    }

    //Create a variable for the updated pages
    var updatedPages = Math.ceil(filteredStudents.length / 10);
    //If the number of pages is more than 1, call the create Pagination
    if (updatedPages > 1) {
        createPagination(updatedPages);
    }
    //Call the updated displayStudents function
    displayStudents(filteredStudents, 0, 10);

    //Select pagination
    var mypages = document.getElementById("pagelist");
    //If there are pages at the bottom of the page
    if (mypages) {
        //When the user clicks on a page number, go to that page.
        mypages.addEventListener("click", function(e) {
            //Call the show10 function to display the corresponding results.
            show10(filteredStudents, e.target.id);
        });
    }
}

searchBar();
