//All the JS code to append markup for the search and pagination links is in this file.
//Create pagination links depending on the number of students. We want 10 max per page.
//The first 10 students are shown when the page loads, and each pagination link displays the correct students.
//Clicking on “1” in the pagination links should should show students 1 to 10, etc...
//The correct HTML markup gets appended in the correct place (see filter-example.html) when the page loads.
//Searching is not case sensitive, you can type "Delano" or "delano"
//When the search button is pressed, the results should show up.
//Pagination links should update depending on the number of search results.


  var eachStudent = document.querySelectorAll(".student-item");
  var page = document.querySelector(".page");
  var numberOfStudents = eachStudent.length;
  var numberOfPages = Math.ceil(numberOfStudents / 10);
  var studentList = document.querySelector(".student-list");
  var pagination = document.createElement('div');
  var i;

  //Start by hiding all the students on the list
  var hideAll = function() {
      for (var i = 0; i < eachStudent.length; i++) {
           eachStudent[i].style.display = "none";
      }
  };

  //Create function to fade in when the user change pages
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

  //Create a function that shows and hides students from and to a specific index
  function displayStudents(studentsArray, FromIndex, ToIndex) {
       //Start by hiding all the students
      hideAll();
      //Show students from and to a specific index
      for (var i = FromIndex; i < ToIndex; i++) {
        studentsArray[i].style.display = 'block';
        //Include a fade in transition
        fadeIn(studentsArray[i]);
      }
  }

  function createPagination(numberOfPages) {
    //Create the static elements for the pagination
    var ulList = document.createElement('ul');
    //Giving them attributes to select them easily
    pagination.setAttribute("class", "pagination");
    ulList.setAttribute("id", "pagelist");
    //Append the ulList to the main pagination div
    page.appendChild(pagination);
    pagination.appendChild(ulList);
    for (var i = 1; i <= numberOfPages; i++) {
      //Create the dynamic elements in the pagination
      var liList = document.createElement('li');
      ulList.appendChild(liList);
      //Create pagination links
      var pageLink = document.createElement('a');
      pageLink.setAttribute("href", "#");
      pageLink.setAttribute("id", i);
      pageLink.innerHTML = i;
      liList.appendChild(pageLink);
    }
    return pagination;
}

  function show10(studentArray, pageNumber) {
    var showFrom = pageNumber * 10 - 10;
    var showTo = pageNumber * 10;

    if (pageNumber == 1) {
        displayStudents(studentArray, 0, 10);
    } else {
        displayStudents(studentArray, showFrom, showTo);
    }
  }

  createPagination(numberOfPages);
  displayStudents(eachStudent, 0, 10);

  pagination.children[0].addEventListener("click", function (e){
          show10(eachStudent, e.target.id);
  });

  //Find the student's record containing the name
  function searchFunction(){
      //Start by hiding all the students on the page
      hideAll();
      var searchBox = document.getElementById("search-input");
      var filter;
      filter = searchBox.value.toLowerCase();
      var mypages = document.getElementById("pagelist");
      //remove the initial pagination so we can replace it with the updated one
          if (mypages) {
              mypages.remove();
          }
          //if the element is already there, get rid of it so that messages don't duplicate
      var error = document.getElementById("errorID");
          if (error){
              error.remove();
          }

        var studentDetails = [];
      //Search the li item to find the record either by name or email address - make sure it is case insensitive
      //populate the details array to make sure we're just searching the right fields
      for (var i = 0; i < eachStudent.length; i++) {
          //var detailsDiv = eachStudent[i].children[0];
          studentDetails.push(document.getElementsByTagName("h3"));
          studentDetails.push(document.querySelectorAll("span[class=email]"));
      }
      //loop over that array, and look for the search value and put it's parent element in a new array
      var filteredStudents = [];
      for (i = 0; i < studentDetails.length; i++) {
       if (studentDetails[i].textContent.indexOf(filter) != -1) {
           var detailDiv = studentDetails[i].parentElement;
           var studentLi = detailDiv.parentElement;
           //Show the li
           if (filteredStudents.indexOf(studentLi) >= 0){
           } else {
               filteredStudents.push(studentLi);
           }

          }
      }
      //If no matches are found, include a message in the HTML to tell the user there are no matches.
      if (filteredStudents.length === 0) {
          var errorMessage = document.createElement("p");
          var studentList = document.querySelector(".student-list");
          errorMessage.id = "errorID";
          errorMessage.innerHTML = "Sorry, no students containing " + filter + " were found.";
          studentList.appendChild(errorMessage);
      }

         //Create the new variable that contains all students in the page
          var updatedPages = Math.ceil(filteredStudents.length / 10);
          if (updatedPages > 1) {
              createPagination(updatedPages);
          }
          displayStudents(filteredStudents,0, 10);
          var paginationUL = document.getElementById("pagelist");
          if (paginationUL){
          paginationUL.addEventListener("click", function (e){
          show10(filteredStudents, e.target.id);
          });
        }
      }


      //Create a function that adds the search input and button to the page
      function addSearchDiv(){
          //Get the parent div
          var pageHeader = document.getElementsByClassName("page-header")[0];
          //Assemble the search div
          var searchDiv = document.createElement("div");
          searchDiv.className = "student-search";
          //Assemble the search input
          var searchInput = document.createElement("input");
          searchInput.id = "search-input";
          searchInput.type = "text";
          searchInput.placeholder = "Search for students....";
          //Assemble the button
          var searchButton = document.createElement("button");
          searchButton.innerHTML = "Search";
          //Append them to the first div with the class of page-header
          pageHeader.appendChild(searchDiv);
          searchDiv.appendChild(searchInput);
          searchDiv.appendChild(searchButton);

          searchButton.addEventListener("click", searchFunction);
          //As the user types in the search box, dynamically filter the student listings as you type
          searchInput.addEventListener("keyup", searchFunction);
      }
      addSearchDiv();
