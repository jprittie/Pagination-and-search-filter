//Initialize variables
var totalStudentListings = document.getElementsByClassName("student-item cf");
var totalSearchListings;
var pageCount;
var newPageNumber;
var newAnchor;
var anchorArray;
var newNumber;
var thisAnchor;
var i;
var newSearchDiv;
var pageHeader;
var newInput;
var newButton;

// Section 1: Initial state
//if no javascript, all listings show. so must add initial hidden class dynamically
//when document loads, hide all but first 10 students.
//Problem: I can get elements by class name, but then I can't add a new class name. But if I get elements by id, then I can add a new class name. So I had to apply class "initialhide" to the ul.
var visible = document.getElementById('list');
console.log(visible);
//I can get this to work with window.onload, but not document.onload
window.onload = function(){
  visible.classList.add("initialhide");
  console.log(visible.classList);
}

// Section 2: Pagination filter
//The following must work for both the initial listings and for search

//Create new div with class of "pagination" at bottom of page to put page numbers into
var newDiv = document.createElement("DIV");
newDiv.className += "pagination";
document.body.appendChild(newDiv);

//This function will calculate how many page buttons we need
function calculatePages(total) {
  //must round pageCount down, or else would get e.g. 5.4 pages
  pageCount = Math.floor(total/10);
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
  //  newPageNumber.addEventListener("click," displayListings);
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
calculatePages(totalStudentListings.length);
addPageButtons();

//Grab all the anchors that were just dynamically created
var anchors = document.getElementsByClassName("paginationanchor");
console.log(anchors);

//When you click on an anchor, it calls the displayListings function
for (var i=0; i<anchors.length; i++) {
    anchors[i].addEventListener("click", displayListings(i));
    console.log("Click link added.");

}


//This function will show the relevant 10 listings, depending on which anchor is clicked.
/* Currently, it uses totalStudentListings, but it should not, because eventually
  I will have to use it for totalSearchListings as well. */

function displayListings(i){

    return function(){
      console.log("You clicked button number " + (i+1));
      //clear initial display class on ul
      visible.classList.remove("initialhide");
      console.log(visible.classList);

        var startingRange = (i*10);
        console.log(startingRange);
        var endingRange = ((i+1)*10-1);
        console.log(endingRange);

        // This for loop sets display to none for all items in listings array that aren't needed
         for (var j=0; j<totalStudentListings.length; j++) {
           //But first, clear any instances of "hidden" class that have been added to totalStudentListings
           totalStudentListings[j].className = "student-item cf";
           if (j < startingRange || j > endingRange) {
                console.log("Item " + j + " is not in the range.");
                totalStudentListings[j].classList.add("hidden");
                console.log(totalStudentListings[j]);
            }
         }
  }
}


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
