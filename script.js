/*
====================================================
FIND THE SEARCH BOX

const = creates a variable.

document = the entire webpage JavaScript can access.

getElementById() = finds an HTML element using its id.

====================================================
*/

const search = document.getElementById("teamSearch");



/*
====================================================
FIND ALL TEAM ROWS

querySelectorAll("tbody tr") means:

Find every <tr> inside the <tbody>.

This gives us a list of all teams.

====================================================
*/

const rows = document.querySelectorAll("tbody tr");



/*
====================================================
TEAM SEARCH FEATURE

When the user types:
- Check every team
- Highlight matching teams

====================================================
*/

search.addEventListener("input", function(){


    /*
    Gets what the user typed
    and makes it lowercase.
    */

    let value = search.value.toLowerCase();



    /*
    Goes through every team row.
    
    row = current team row being checked.

    */

    rows.forEach(row => {



        /*
        children[1] is the Team column.

        Example:

        children[0] = Position
        children[1] = Team Name
        children[2] = Points
        children[3] = Games Played

        */

        let team = row.children[1].textContent.toLowerCase();



        /*
        Checks if the team name contains
        what the user typed.

        */

        if(team.includes(value) && value !== "") {


            row.style.outline = "3px solid white";

            row.style.transform = "scale(1.03)";


        } else {


            row.style.outline = "none";

            row.style.transform = "scale(1)";


        }


    });


});





/*
====================================================
HIDE EXTRA TEAMS

forEach gives us:

row = the actual table row

index = the position number starting at 0


Remember:

Index 0 = 1st place
Index 6 = 7th place
Index 7 = 8th place


We hide everything after the top 7.

====================================================
*/


rows.forEach((row, index) => {


    if(index >= 7) {


        row.style.display = "none";


    }


});





/*
====================================================
SHOW MORE BUTTON

Find the button using its id.

HTML:

<button id="showMoreButton">
    Show More
</button>

====================================================
*/


const showMoreButton = document.getElementById("showMoreButton");



/*
====================================================
WHEN BUTTON IS CLICKED

Right now this only detects the click.

Next step:
Make it reveal the hidden rows.

====================================================
*/


showMoreButton.addEventListener("click", function(){
    rows.forEach((row, index) => {
        if(index >= 7) {
            row.style.display = "";
        }
    });


});



/*
====================================================
SHOW LESS BUTTON

When the user clicks the Show Less button:

Loop through every team.

If the team is 8th place or lower
(index 7 or greater),

hide that row again.

====================================================
*/

const showLessButton = document.getElementById("showLessButton");

showLessButton.addEventListener("click", function(){

    rows.forEach((row, index) => {

        if(index >= 7) {

            row.style.display = "none";

        }

    });

});
