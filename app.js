// Initialize variables
var totalStudentListings = document.getElementsByClassName("student-item cf");
var totalSearchListings;
var listings;
var pageCount;
var newPageNumber;
var newAnchor;
var newNumber;
var startingRange;
var endingRange;
var i;
var newSearchDiv;
var pageHeader;
var newInput;
var newButton;
var thisAnchor;
var input;
var counter = 0;
var htmlversion;

// Section 1: Initial state
// When document loads, hide all but first 10 students.
var visible = document.getElementById('list');
console.log(visible);

window.onload = function(){
  visible.classList.add("initialhide");
  console.log(visible.classList);
}

// Section 2: Pagination filter
// The following must work both for all the student listings and for search listings
// So I will wrap it all in function paginate(listings)
// Though initially, I must use all the student listings
listings = totalStudentListings;


function paginate(){

  // Create new div with class of "pagination" at bottom of page to put page numbers into
  var newDiv = document.createElement("DIV");
  newDiv.className += "pagination";
  document.body.appendChild(newDiv);

  // This function will calculate how many page buttons we need
  function calculatePages(total) {
    // Must round pageCount up, or else would get too few pages
    pageCount = Math.ceil(total/10);
    console.log(total);
    console.log(pageCount);
    return pageCount;
  }

  // This function will dynamically add the correct number of buttons to bottom of page.
  // It will also set their contents and links.
  function addPageButtons() {
    for (var i=0; i< pageCount; i++){
      newPageNumber = document.createElement("LI");
      newPageNumber.className += "paginationanchor";
      newDiv.appendChild(newPageNumber);
      console.log(newPageNumber);
      newAnchor = document.createElement("A");
      newAnchor.href = "#";
      newPageNumber.appendChild(newAnchor);
      console.log(newAnchor);
      newNumber = document.createTextNode(i+1);
      newAnchor.appendChild(newNumber);
      console.log(newNumber);
    }
  }
  calculatePages(listings.length);
  addPageButtons();

  //Grab all the anchors that were just created
  var anchors = document.getElementsByClassName("paginationanchor");
  console.log(anchors);

  //When you click on an anchor, call displayListings function
  for (var i=0; i<anchors.length; i++) {
            anchors[i].addEventListener("click", displayListings(i));
            console.log("Click link added.");
  }

  // This function will show the relevant 10 listings, depending on which anchor is clicked.
  function displayListings(i){

           return function(){

              console.log("You clicked button number " + (i+1));
              //clear initial display class on ul
              visible.classList.remove("initialhide");
              console.log(visible.classList);
              // clear any existing display classes on listings
              //totalStudentListings.classList = "student-item cf";
            //  console.log(totalStudentListings.className);
             if ($(".student-item.cf").hasClass("hidden")) {
                $(".student-item.cf").removeClass("hidden");
              }



                startingRange = (i*10);
                console.log(startingRange);
                endingRange = ((i+1)*10-1);
                console.log(endingRange);

              /*  //If listings === totalSearchListings, then anything not in totalSearchListings
                //needs a class of hidden
                if (listings === totalSearchListings) {
                  for (q=0; q<totalStudentListings; q++) {
                    if (listings[q].classList = ("student cf")) {
                      listings[q].classList = ("student cf hidden")
                    }
                  }
                }*/
                $(".searchhide").addClass("hidden");

                // This for loop sets display to none for all items in listings array that aren't needed
                 for (var j=0; j<listings.length; j++) {
                   console.log(listings[j]);
                   // But first, remove any instances of "hidden" class that have been added to listings
                  // listings[j].className = "student-item cf";
                   if (j < startingRange || j > endingRange) {
                        console.log("Item " + j + " is not in the range.");
                        //listings[j].classList.add("hidden");
                        $(listings).eq(j).addClass("hidden");

                        console.log(listings[j]);
                    }  /*else {
                        $(listings).eq(j).fadeIn("slow");
                    }*/
                      /* else {
                        listings[j].className += ("fadein");
                        $(".fadein").fadeIn();
                      } */
                 }
                // $("html").fadeIn();
            }
   }
}

paginate();



// How to reset listings when search button is pressed, or in case of dynamic search, on keydown. But then,
// if someone leaves search field, the normal pagination filter should still work
// So just set listings back to totalStudentListings


// Section 3: Search

//Create new div to contain search field and button
newSearchDiv = document.createElement("DIV");
newSearchDiv.className += ("student-search");
pageHeader = document.getElementById("pageheader");
pageHeader.appendChild(newSearchDiv);
newInput = document.createElement("INPUT");
newInput.id += ("searchinput");
newInput.placeholder = "Search for students...";
newSearchDiv.appendChild(newInput);
newButton = document.createElement("BUTTON");
newButton.id += ("searchbutton");
newSearchDiv.appendChild(newButton);
newButtonText = document.createTextNode("Search");
newButton.appendChild(newButtonText);




//When search button is pressed, this function will search listings for a match
$("#searchbutton").click(function() {
  console.log("Search started");
  counter = 0;
  //totalSearchListings = "";
    // Get text in search field
    var searchtext = $("#searchinput").val().toLowerCase();
    console.log(searchtext);
    // Loop over student listings
      $(".student-item.cf").each(function(){
        // If listing already has "hidden" class, remove it
      //  $(this).css("display", "initial");

         if ($(this).hasClass("hidden")) {
           $(this).removeClass("hidden");
         }

         if ($(this).hasClass("showsearch")) {
           $(this).removeClass("showsearch");
         }

         if ($(this).hasClass("searchhide")) {
           $(this).removeClass("searchhide");
         }
         //console.log($(this).find("h3").text());
         //console.log($(this).find(".email").text());

          // Search for match; indexOf returns -1 if it is not in the array
          if ( ( ($(this).find("h3").text().toLowerCase().indexOf(searchtext)) < 0) ||   ((($(this).find(".email").text().toLowerCase().indexOf(searchtext)) < 0) ) ) {
              console.log("This listing is not a match.");
              $(this).addClass("hidden");
              $(this).addClass("searchhide");
          }
          else {
            console.log("This listing is a match.")
            counter += 1;
            $(this).addClass("showsearch");
          }
      })
   $(".pagination").remove();
   $("#list").removeClass("initialhide");
   $("#message").remove();


   if (counter === 0) {
      // put this in its own function
      var msgDiv = document.createElement("DIV");
      msgDiv.id = ("message");
      visible.appendChild(msgDiv);
      var msg = document.createElement("P");
      msgDiv.appendChild(msg);
      var msgText = document.createTextNode("Sorry, there were no results found.");
      msg.appendChild(msgText);


    } else {
      totalSearchListings = document.getElementsByClassName("showsearch");
          for (var m=10; m<totalSearchListings.length; m++) {
            totalSearchListings[m].classList.add("hidden");
          }
      listings = totalSearchListings;
      paginate();
    }
})

// Section 4: Live search filter

$("#searchinput").keyup(function(){
    var searchterm = $(this).val();
    counter = 0;

    $(".pagination").remove();
    $("#list").removeClass("initialhide");

        // if search field goes back to being blank, reset initial pagination view
        if ($("#searchinput").val().length === 0) {
            $("#list").addClass("initialhide");
            listings = totalStudentListings;
            paginate();
        }

    $(".student-item.cf").each(function() {
  //    $(this).fadeIn();
    //  $(this).css("display", "initial");

      if ($(this).hasClass("hidden")) {
        $(this).removeClass("hidden");
      }

      if ($(this).hasClass("showsearch")) {
        $(this).removeClass("showsearch");
      }

      if ($(this).hasClass("searchhide")) {
        $(this).removeClass("searchhide");
      }


        if ( ($(this).find("h3").text().toLowerCase().search(new RegExp(searchterm, "i")) < 0) || ($(this).find(".email").text().toLowerCase().search(new RegExp(searchterm, "i")) < 0) ) {
          $(this).addClass("hidden");
      $(this).addClass("searchhide");
        } else {
          counter += 1;
          $(this).addClass("showsearch");
        }
    })

    $(".pagination").remove();
    $("#list").removeClass("initialhide");
    $("#message").remove();

       if (counter === 0) {
         var msgDiv = document.createElement("DIV");
         msgDiv.id = ("message");
         visible.appendChild(msgDiv);
         var msg = document.createElement("P");
         msgDiv.appendChild(msg);
         var msgText = document.createTextNode("Sorry, there were no results found.");
         msg.appendChild(msgText);
        } else {
          totalSearchListings = document.getElementsByClassName("showsearch");
              for (var m=10; m<totalSearchListings.length; m++) {
                totalSearchListings[m].classList.add("hidden");
              }
        }
          listings = totalSearchListings;
          paginate();

})
// so animation was affecting inital hide on live search
/*
// 5. Animation

$(".paginationanchor").click(function(){
  $(".hidden").fadeOut("slow");
  $(".searchhide").fadeOut("slow");
  $(".showsearch").fadeIn("slow");
})

$("#searchinput").keyup(function(){
  $(".hidden").fadeOut("slow");
  $(".searchhide").fadeOut("slow");
  $(".showsearch").fadeIn("slow");
})
*/
/*
$(".paginationanchor").click(function(){
  $("html").fadeOut();
  $("html").fadeIn();
})*/

/*$("#searchinput").keyup(function(){
  $("html").fadeOut();
  $("html").fadeIn();
}) */
