/*
====================================================
FIND THE SEARCH BOX

const = creates a variable that cannot be changed.

document = the entire webpage that JavaScript
can access.

getElementById() = finds an HTML element using
its id.

Example HTML:
<input id="teamSearch">

JavaScript finds that input and stores it
inside the variable called "search".

Now we can control the search box.
====================================================
*/

const search = document.getElementById("teamSearch");



/*
====================================================
FIND ALL TEAM ROWS

querySelectorAll() = finds multiple HTML elements
using a CSS selector.

"tbody tr" means:
- Look inside tbody
- Find every tr (table row)

This creates a list of every team row.

Example:
rows = [
 Woodstock row,
 Nackawic row,
 Fredericton row
]

====================================================
*/

const rows = document.querySelectorAll("tbody tr");



/*
====================================================
LISTEN FOR USER ACTIONS

addEventListener() = waits for something to happen.

Common events:
- click = user clicks something
- input = user types something
- mouseover = mouse goes over something

Here:
When the user types in the search box,
run the function below.

====================================================
*/

search.addEventListener("input", function(){



    /*
    ====================================================
    GET WHAT THE USER TYPED

    search.value = the text currently inside the box.

    Example:
    User types:
    "Nack"

    search.value becomes:
    "Nack"

    toLowerCase() changes uppercase letters to
    lowercase so searching is easier.

    NACK = nack
    Nack = nack

    They all become the same.

    ====================================================
    */

    let value = search.value.toLowerCase();



    /*
    ====================================================
    LOOP THROUGH EVERY TEAM

    forEach() means:
    "Do this once for every item."

    Example:

    Team 1 → check
    Team 2 → check
    Team 3 → check

    row represents the current team being checked.

    ====================================================
    */

    rows.forEach(row => {



        /*
        ====================================================
        GET TEAM NAME FROM THE ROW

        children[] lets us access a specific cell.

        Your table:

        <td>2</td>          children[0]
        <td>Nackawic</td>   children[1]
        <td>0</td>          children[2]
        <td>0</td>          children[3]


        children[1] grabs the Team column.

        textContent gets the actual words inside.

        Example:
        <td>Nackawic</td>

        becomes:

        "Nackawic"

        ====================================================
        */

        let team = row.children[1].textContent.toLowerCase();



        /*
        ====================================================
        CHECK IF THE TEAM MATCHES

        if = asks a question.

        includes() checks if something contains
        another piece of text.

        Example:

        "nackawic".includes("nack")

        Result:
        true ✅


        && means "AND"

        So both things must be true:

        1. Team contains the search
        2. Search is not empty

        ====================================================
        */

        if(team.includes(value) && value !== "") {



            /*
            ====================================================
            CHANGE CSS USING JAVASCRIPT

            style allows JavaScript to change CSS.

            This is the same as writing:

            outline: 3px solid white;

            in CSS.

            ====================================================
            */

            row.style.outline = "3px solid white";


            /*
            Makes the row slightly bigger.

            Same as CSS:

            transform: scale(1.03);

            ====================================================
            */

            row.style.transform = "scale(1.03)";



        } else {



            /*
            ====================================================
            REMOVE THE EFFECT

            If the team does not match,
            return the row back to normal.

            ====================================================
            */

            row.style.outline = "none";

            row.style.transform = "scale(1)";


        }


    });


});
rows.forEach((row, index) => {
    if (index > 6)
}
    