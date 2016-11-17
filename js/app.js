//All the JS code to append markup for the search and pagination links is in this file.
//Create pagination links depending on the number of students. We want 10 max per page.
//The first 10 students are shown when the page loads, and each pagination link displays the correct students.
//Clicking on “1” in the pagination links should should show students 1 to 10, etc...
//The correct HTML markup gets appended in the correct place (see filter-example.html) when the page loads.
//Searching is not case sensitive, you can type "Delano" or "delano"
//When the search button is pressed, the results should show up.
//Pagination links should update depending on the number of search results.

  var page = document.querySelector(".page");
  var eachStudent = document.querySelectorAll(".student-item");
  var numberOfStudents = eachStudent.length;
  var numberOfPages = Math.ceil(numberOfStudents / 10);
  var pagination = document.createElement("div");
  var studentList = document.querySelector(".student-list");

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

  //Start by hiding all the students on the list
  var hideAll = function() {
      for(var i = 0; i < eachStudent.length; i++) {
           eachStudent[i].style.display = "none";
      }
  };

  //Create a function that shows and hides students from and to a specific index
  function displayStudents(studentsArray, FromIndex, ToIndex) {
       //Start by hiding all the students
      hideAll();
      //Show students from and to a specific index
      for (var i = FromIndex; i < ToIndex; i++) {
        studentsArray[i].style.display = "block";
        //Include a fade in transition
        fadeIn(studentsArray[i]);
      }
  }
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
    createPagination(numberOfPages);

  function show10(studentArray, pageNumber) {
    var showFrom = pageNumber * 10 - 10;
    var showTo = pageNumber * 10;

    if (pageNumber == 1) {
        displayStudents(studentArray, 0, 10);
    } else {
        displayStudents(studentArray, showFrom, showTo);
    }
  }

  //When the user clicks on a page number, go to that page.
  pagination.children[0].addEventListener("click", function (e){
          show10(eachStudent, e.target.id);
  });

  //Create a function that will find the results matching the user's query
  function searchFunction(){
      //Start by hiding all the students on the page
      hideAll();
      //Select the main elements we will need on the page.
            //Select the search bar.
      var searchBar = document.getElementById("search-input");
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

            if (mypages) {
              mypages.remove();
          }


          if (error){
              error.remove();
          }


      for (var i = 0; i < eachStudent.length; i++) {
        //Select the first children to each student li
        var detailsFilter = eachStudent[i].children[0];
        //Push all student name's in the studentDetails array
        studentDetails.push(detailsFilter.children[1]);
        //Push all student's emails in the studentDetails array
        studentDetails.push(detailsFilter.children[2]);
      }

      for (i = 0; i < studentDetails.length; i++) {
       if (studentDetails[i].innerText.indexOf(filter) != -1) {
           var detailDiv = studentDetails[i].parentElement;
           var studentLi = detailDiv.parentElement;
           //Show the li
           if (filteredStudents.indexOf(studentLi) === -1){
             filteredStudents.push(studentLi);
           }
        }
      }

      //If there are no results, display an error message.
      if (filteredStudents.length < 1) {
          var studentList = document.querySelector(".student-list");
          var errorMessage = document.createElement("p");
          errorMessage.setAttribute("id", "errorMessage");
          errorMessage.innerHTML = "Your search for " + filter + " did not match any results.";
          studentList.appendChild(errorMessage);
      }


          var updatedPages = Math.ceil(filteredStudents.length / 10);
          if (updatedPages > 1) {
              createPagination(updatedPages);
          }
          //Call the updated displayStudents function
          displayStudents(filteredStudents,0,10);

          //Select pagination
          var mypages = document.getElementById("pagelist");
          //If there are pages at the bottom of the page
          if (mypages){
          //When the user clicks on a page number, go to that page.
          mypages.addEventListener("click", function (e) {
          //Call the show10 function to display the corresponding results.
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
