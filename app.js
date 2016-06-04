// Initialize global variables
var $totalStudentListings = $(".student-item.cf");
var $totalSearchListings;
var $listings;
var pageCount;

var counter = 0;


// delete line 22 after you've replaced visible throughout
var visible = $("#list");

// Section 1: Initial state
// When document loads, hide all but first 10 students.
$(document).ready(function(){
  $("#list").addClass("initialhide");
})

// Section 2: Pagination filter
// The following must work both for all the student listings and for search listings,
// so I will wrap it all in function paginate()
// Though initially, I must use all the student listings
$listings = $totalStudentListings;


function paginate(){

  // Create new div with class of "pagination" at bottom of page to put page numbers into
  var $newDiv = $("<div></div>").addClass("pagination");
  $("body").append($newDiv);

  // This function will calculate how many page buttons we need
  function calculatePages(total) {
    // Must round pageCount up, or else would get too few pages
    pageCount = Math.ceil(total/10);
    console.log(total);
    console.log(pageCount);
    return pageCount;
  }

  // This function will add the correct number of buttons to bottom of page.
  // It will also set their contents and links.
  function addPageButtons() {
    for (var i=0; i< pageCount; i++){
      var $newPageNumber = $("<li></li>").addClass("paginationanchor");
      $newDiv.append($newPageNumber);
      var $newAnchor = $("<a></a>").attr("href", "#").text(i+1);
      $newPageNumber.append($newAnchor);
    }
  }

  calculatePages($($listings).length);
  addPageButtons();


 // When you click on an anchor, show correct 10 listings
    $(".paginationanchor").click(function(){
        var i = $(".paginationanchor").index(this);
        console.log("You clicked button number " + (i+1));
        var startingRange = (i*10);
        console.log(startingRange);
        var endingRange = ((i+1)*10-1);
        console.log(endingRange);


        // Clear initial display class on ul
        $("#list").remove("initialhide");

        //If listings === totalSearchListings, then anything not in totalSearchListings
        //needs a class of hidden
        //  $(".searchhide").addClass("hidden");

            // This for loop fades out all items in listings array that aren't needed
             for (var j=0; j<($listings.length); j++) {

               if (j < startingRange || j > endingRange) {
                  $listings.eq(j).fadeOut("slow");
               }  else {
                   console.log("Item " + j + " is in the range.");
                    $listings.eq(j).fadeIn("slow");
              }

             }

      })

}

paginate();


// Section 3: Search

//Create new div to contain search field and button
//**newSearchDiv should really have an id instead of a class?
// Do I really need all these IDs/classes?
var $newSearchDiv = $("<div></div>").addClass("student-search");
$("#pageheader").append($newSearchDiv);
var $newInput = $("<input placeholder='Search for students...'>");
$newSearchDiv.append($newInput);
var $newButton = $("<button id='searchbutton'>Search</button>")
$newSearchDiv.append($newButton);

/*
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

         if ($(this).hasClass("hidden")) {
           $(this).removeClass("hidden");
         }

         if ($(this).hasClass("showsearch")) {
           $(this).removeClass("showsearch");
         }

         if ($(this).hasClass("searchhide")) {
           $(this).removeClass("searchhide");
         }

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
   // Remove page numbers div so a new one can be created to correspond with search results
   $(".pagination").remove();
   // Do I really need the next line?
   $("#list").removeClass("initialhide");
   $("#message").remove();


   if (counter === 0) {
      // put this in its own function
      var $msgDiv = $("<div id='message'></div>")
      $("#list").append($msgDiv);
      var $msg = $("<p></p>").text("Sorry, there were no results found.");
      $msgDiv.append($msg);


    } else {
      $totalSearchListings = $(".showsearch");
          for (var m=10; m<($(totalSearchListings).length); m++) {
            $totalSearchListings[m].addClass("hidden");
    }
      $listings = $totalSearchListings;
      paginate();
    }
})
*/

/*

// Section 4: Live search filter

$("#searchinput").keyup(function(){
    var searchterm = $(this).val();
    counter = 0;

    $(".pagination").remove();
    $("#list").removeClass("initialhide");

        // If search field goes back to being blank, reset initial pagination view
        if ($("#searchinput").val().length === 0) {
            $("#list").addClass("initialhide");
            listings = totalStudentListings;
            paginate();
        }

        // Loop over all of the listings
        $(".student-item.cf").each(function() {

          if ($(this).hasClass("hidden")) {
            $(this).removeClass("hidden");
          }

          if ($(this).hasClass("showsearch")) {
            $(this).removeClass("showsearch");
          }

          if ($(this).hasClass("searchhide")) {
            $(this).removeClass("searchhide");
          }

          // Search names or emails for match
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

 // Put this in its own function
    if (counter === 0) {

       var $msgDiv = $("<div id='message'></div>")
       $("#list").append($msgDiv);
       var $msg = $("<p></p>").text("Sorry, there were no results found.");
       $msgDiv.append($msg);


     } else {
       $totalSearchListings = $("showsearch");
           for (var m=10; m<($($totalSearchListings).length); m++) {
             $totalSearchListings[m].addClass("hidden");
           }
     }

    $listings = $totalSearchListings;
    paginate();

})
*/
