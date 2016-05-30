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
var namesArray;
var emailsArray;

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

          startingRange = (i*10);
          console.log(startingRange);
          endingRange = ((i+1)*10-1);
          console.log(endingRange);

          // This for loop sets display to none for all items in listings array that aren't needed
           for (var j=0; j<listings.length; j++) {
             // But first, remove any instances of "hidden" class that have been added to listings
             listings[j].className = "student-item cf";
             if (j < startingRange || j > endingRange) {
                  console.log("Item " + j + " is not in the range.");
                  listings[j].classList.add("hidden");
                  console.log(listings[j]);
              }
           }
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
newInput.placeholder = "Search for students...";
newSearchDiv.appendChild(newInput);
newButton = document.createElement("BUTTON");
newSearchDiv.appendChild(newButton);
newButtonText = document.createTextNode("Search");
newButton.appendChild(newButtonText);


//Link search button to searchListings function
newButton.addEventListener("click", searchListings);
//Also link input field keyup to searchListings function
//newInput.addEventListener("keyup", searchListings);
//On keydown? on search field, clear placeholder


//first, create two arrays from student listings, one for names and one for emails
var namesArray = document.getElementsByTagName("h3");
console.log(namesArray);
var emailsArray = document.getElementsByClassName("email");
console.log(emailsArray);

//This function will search listings for a match
//indexOf returns -1 if it is not in the array
function searchListings() {
  console.log("Search started");
  listings = totalSearchListings;
//  for (var k=0; k<totalStudentListings.length; k++){
//      if ( (namesArray.indexOf(newInput.value) > -1) || (emailsArray.indexOf(newInput.value) > -1) ) {
//      //add students details to totalSearchListings arrays
//      totalSearchListings += totalStudentListings[k];
//      }
//  }
}
