//Pagination and Content Filter
	//This project allows the user to navigate througth the whole list of students
	//It allows user to search for students
	//It also allows user to change the number of student he wants to have on each pages
	//And finally, the user can add a new student to the list

//Starting with variables
	var studentPerPage = 10;
	var studentlist = $(".student-item");
	var numberofpages;
	var students = [];
	var pageActive = 1;

//Start the pagination
	start();

//Global functions
	function start() {
		createHeader();
		refresh(1,0);
	}

	function refresh(page, student) {
		pageActive = page;
		studentlist = $(".student-item");
		createStudentList();
		showStudents(student);
		appendPagination(page);
	}


//Basic function
	//Show a specific number of students, "studentPerPage"
		function showStudents(parameter) {
			studentlist.hide();
			$(".student-list .error").remove();
			for (var i = 0; i <studentPerPage; i+= 1) {
					studentlist.eq(students[i + parameter]).show();
			}
		}


//Create elements
	//Create the list of students into the variable "students"
		function createStudentList() {
			var searchbox = $(".student-header input").val().toUpperCase();

			students = [];

			for (var i=0; i<studentlist.length; i+=1) {
				if (studentlist.eq(i).children("div").children("h3").text().toUpperCase().indexOf(searchbox) > -1 || studentlist.eq(i).children("div").children(".email").text().toUpperCase().indexOf(searchbox) > -1) {
					students.push(i);
				}
			}
			numberofpages  = Math.ceil(students.length / studentPerPage);
		}

	//Create the header, with the search input, and the buttons
		function createHeader () {
			var div = $(".student-header");
			var input = $('<input placeholder="Search for students...">');
			var searchbutton = $('<button id="searchbutton">Search</button>');
			var clearbutton = $('<button id="clearbutton">Clear</button>');
			var morebutton = $('<button id="more">...More</button>');
			div.children().remove();
			$(div).append(input);
			$(div).append(searchbutton);
			$(div).append(clearbutton);
			$(div).append(morebutton);
		}

	//Create the pagination
		function createPagination (pagenumber, active) {
			var listItem = $("<li></li>");
			var anchor = $('<a href="#">'+ pagenumber + '</a>');
			if (pagenumber===active) {
				anchor.addClass("active");
			}
			listItem.append(anchor);
			return listItem;
		}

	//Append the pagination to the DOM
		function appendPagination (active) {
			var pagination = $("#pagination");
			pagination.children().remove();
			if (numberofpages >1) {
				for (var i = 1; i <= numberofpages; i +=1) {
					pagination.append(createPagination(i, active));
				}
			}
		}

	//Create a new student
		function createStudent () {
			var listItem = $('<li class="student-item cf">');
				var divdetails = $('<div class="student-details"></div>');
					var avatar = $('<img class="avatar" src="' + prompt("Enter the source of the image") + '">');
					var name = $('<h3>' + prompt("Enter the name of the student") + '</h3>');
					var email = $('<span class="email">' + prompt("Enter the email of the student") + '</span>');
				var divjoin = $('<div class="joined-details"></div>');
					var join = $('<span class="date">Joined ' + prompt("When did he join the team?") + '</span>');

			$(divdetails).append(avatar);
			$(divdetails).append(name);
			$(divdetails).append(email);
			$(divjoin).append(join);
			$(listItem).append(divdetails);
			$(listItem).append(divjoin);

			$(".student-list").append(listItem);
			refresh(pageActive, (pageActive-1)*studentPerPage);
		}



//Other function
	//Change the number of students to display onto the page
		function change () {
			var change = parseInt(prompt("Set the new number of student you want to display on each pages :"));
			studentPerPage = change;
			refresh(1,0);
			}

	//The search method
		function searchMethod () {
			var message = $('<h2 class="error">Sorry, no student matches your search.</h2>');
			refresh(1,0);
			if (students.length <=0) {
				$(".student-list .error").remove();
				$(".student-list").append(message);
			}

		}



//Set the "onclick" method
	//Set the click to the pagination, to navigate between each pages
		$("#pagination").on("click", "a", function(){
			var pageValue = parseInt($(this).text());
			var anchors = $("#pagination a");
			pageActive = pageValue;
			showStudents((pageValue-1)*studentPerPage);
			anchors.removeClass("active");
			$(this).addClass("active");

		});

	//Set the click to the search button, to display the students matching to the search
		$(".student-header").on("click", "#searchbutton", function () {
			searchMethod();
		});

	//Set the click to the 'clear' button, to start over the whole pagination
		$(".student-header").on("click", "#clearbutton", function () {
			$(".student-header input").val("");
			pageActive = 1;
			start();
		});

	//Set the click to the 'more' button, to manage the user to add students, by typing 'add', and to change the number of students on each pages by typing 'change'
		$(".student-header").on("click", "#more", function () {
			var quit = false;
			do {
			var asking = prompt("What do you want to do? You can type 'change' to change the number of students on each pages, or you can type 'add' to add a new student. To quit, you can type 'quit'.").toUpperCase();
			if (asking == "CHANGE") {
				change();
				quit = true;
			} else if (asking == "ADD") {
				createStudent();
				quit = true;
			} else if (asking == "QUIT") {
				quit = true;
			} else {
				alert("You didn't enter the right parameter. Try again.");
			}
			} while (!quit);
		});



//Stick the page header to the top
		$(".page-header").sticky({topSpacing:0});
