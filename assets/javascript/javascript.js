var recipeArray = [];
var index = 0
console.log(recipeArray)

// Firebase call and authorization
var config = {
    //api key
        apiKey: "AIzaSyA3BzDyft3LLZTe5rAux69uMHVixFiCRAU",
        authDomain: "recipes-7858e.firebaseapp.com",
        databaseURL: "https://recipes-7858e.firebaseio.com",
        projectId: "recipes-7858e",
        storageBucket: "recipes-7858e.appspot.com",
        messagingSenderId: "93447278727"
  };
firebase.initializeApp(config);
var database = firebase.database();

// Firebase observer on the Auth object to get the current user
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
        document.getElementById("login-page").style.display = "none"  //hide login page if already logged in
        document.getElementById("login").innerText = "Logout"  //change login nav page to logout if already logged in

        var user = firebase.auth().currentUser;

        if(user != null){
            var email_id = user.email;
            document.getElementById('welcome').innerText = `Welcome ${email_id}`
            document.getElementById('login').innerHTML = `Logout`
            $('#home').show();
            $('#favorite').show();
            $('#login').show();
            $('#home1').show();
            $('#favorite1').show();
            $('#login1').show();
            loginMenu()
            // API search call
            $('#newRecipe').on('click', function(event) {
                event.preventDefault()
                $('#recipeOutput').empty()
                recipes = $("#autocomplete-input").val().trim()
                recipeDisplay()
            });
            // Recipe API Call Function
            function recipeDisplay (){
                var recipeObjArray= []
                console.log(recipeObjArray)
                var recipes = $("#autocomplete-input").val().trim()
                // Food2Fork API Call
                var queryURL = "https://www.food2fork.com/api/search?key=b6ba5a04e7601145d1bb74c118bab4c1&q=" + recipes
                // Edaman API Call
                var queryURL2 = "https://api.edamam.com/search?q=" + recipes + "&app_id=49ceef25&app_key=a00b5a04f3402c7a3d485e7febff6958"

                // Ajax call for Food2Fork API
                $.ajax({
                    dataType: "json",
                    url: queryURL,
                    method: "GET",
                })
                .then(function(response) {
                    var results = response.recipes
                    console.log(response)
                    for (var i = 0; i < results.length; i++) {
                        // Log curent user
                        var user = firebase.auth().currentUser.email
                        console.log(user)
                        // Setting up Materialize Div Classes
                        var recipeDiv = $('<div class="card">')
                        var title = $('<div class="card-content">')
                        var imageCard = $('<div class="card-image">')
                        var cardAction = $('<div class="card-action">')
                        var cardID = 'search' + index
                        var recipeImage = results[i].image_url
                        var favorite = $("<button id='" + cardID + "' class='favorite-class halfway-fab btn-floating pink'><i class='material-icons'>favorite</i></a>")
                        var currentDate = moment()
                        var date = moment(currentDate, "MM/DD/YYYY").format("MM/DD/YYYY")
                        // Appending Recipe Image to Materialize Div
                        imageCard.append($('<img>').attr("src", recipeImage))
                        imageCard.attr('data-image',results[i].image_url)
                        imageCard.append(favorite)
                        // Appending Recipe Title & Source to Materialize Div
                        title.append($('<h6><br>').append(results[i].title))
                        title.append($('<p><br>').text('By: '+ results[i].publisher))
                        title.attr('data-title', results[i].title)
                        title.append($('<p><br>').html('Search Date: ' + date))
                        // Appending Recipe Links to Materialize Div
                        cardAction.append($('<span>').html("<a href='" + results[i].f2f_url + "'>More Details</a>"))
                        cardAction.append($('<span>').html("<a href='" + results[i].f2f_url + "'>View Ingredients</a><br>"))
                        cardAction.attr('data-link', results[i].f2f_url)
                        // Appending All Elements to Main Materialize Card Div
                        index++
                        recipeDiv.append(imageCard)
                        recipeDiv.append(title)
                        recipeDiv.append(cardAction)
                        // Create local object to push to global array
                        var recipesObj = {
                            user: user,
                            id: cardID,
                            image: recipeImage,
                            title: results[i].title,
                            publisher: results[i].publisher,
                            link: results[i].f2f_url,
                            details: results[i].f2f_url,
                            ingredient: results[i].f2f_url,
                            date: date
                        }
                        recipeArray.push(recipesObj);
                        console.log(recipesObj)
                        // Push API call to html
                        $('#recipeOutput').append(recipeDiv)
                    }
                })

                // Ajax call for Edaman API
                $.ajax({
                    dataType: "json",
                    url: queryURL2,
                    method: "GET",
                })
                .then(function(response) {
                    var results = response.hits;
                    console.log(response)
                    for (var i = 0; i < results.length; i++) {
                        // Log curent user
                        var user = firebase.auth().currentUser
                        console.log(user)
                        // Setting up Materialize Div Classes
                        var cardID = 'search' + index
                        var recipeDiv = $('<div class="card">')
                        var title = $('<div class="card-content">')
                        var imageCard = $('<div class="card-image">')
                        var cardAction = $('<div class="card-action">')
                        var favorite = $("<button id='" + cardID + "' class='favorite-class halfway-fab btn-floating pink'><i class='material-icons'>favorite</i></a>")
                        var currentDate = moment()
                        var date = moment(currentDate, "MM/DD/YYYY").format("MM/DD/YYYY")
                        // var date = moment(fbDate, "mm/dd/yyyy")
                        // Appending Recipe Image to Materialize Div
                        var recipeImage = results[i].recipe.image
                        imageCard.append($('<img>').attr("src", recipeImage))
                        imageCard.attr('data-image',results[i].recipe.image)
                        imageCard.append(favorite)
                        // Appending Recipe Title & Source to Materialize Div
                        title.append($('<h6><br>').text(results[i].recipe.label))
                        title.append($('<p><br>').text('By: '+ results[i].recipe.source))
                        title.attr('data-title', results[i].recipe.label)
                        title.append($('<p><br>').html('Search Date: ' + date))
                        // Appending Recipe Links to Materialize Div
                        cardAction.append($('<span>').html("<a href='" + results[i].recipe.url + "'>More Details</a>"))
                        cardAction.append($('<span>').html("<a href='" + results[i].recipe.url + "'>View Ingredients</a><br>"))
                        cardAction.attr('data-link', results[i].recipe.url)
                        // Appending All Elements to Main Materialize Card Div
                        index++
                        recipeDiv.append(imageCard)
                        recipeDiv.append(title)
                        recipeDiv.append(cardAction)
                        // Create local object to push to global div
                        var recipesObj = {
                            user: user,
                            id: cardID,
                            image: recipeImage,
                            title: results[i].recipe.label,
                            publisher: results[i].recipe.source,
                            link: results[i].recipe.url,
                            details: results[i].recipe.url,
                            ingredient: results[i].recipe.url,
                            date: date
                        }
                        recipeArray.push(recipesObj)
                        console.log(recipesObj)
                        // Push API call to html
                        $('#recipeOutput').append(recipeDiv)
                    }
                })
            }

            // function to call Firebase data
            function outputFavorite() {

                // Set Current User as a variable for favorite's output
                var loggedUser = firebase.auth().currentUser.email
                
                database.ref().on("child_added", function(childSnapshot) {
                    // Pull only current user's data from firebase
                    if (loggedUser == childSnapshot.val().user) {

                        var fbID = childSnapshot.val().id
                        var fbImage = childSnapshot.val().image
                        var fbTitle = childSnapshot.val().title
                        var fbLink = childSnapshot.val().link
                        var fbDetails = childSnapshot.val().details
                        var fbIngredients = childSnapshot.val().ingredient
                        var fbSource = childSnapshot.val().publisher
                        var fbDate = childSnapshot.val().date
                        var recipefbDiv = $('<div class="card">')
                        var titlefbCard = $('<div class="card-content">')
                        var imagefbCard = $('<div class="card-image">')
                        var cardfbAction = $('<div class="card-action">')
                        var fbfavorite = $("<button id='" + fbID + "' class='favorite-delete halfway-fab btn-floating pink'><i class='material-icons'>favorite</i></a>")
                        // append image from fb
                        imagefbCard.append($('<img>').attr("src", fbImage))
                        imagefbCard.attr('data-image',fbImage)
                        imagefbCard.append(fbfavorite)
                        // Appending Recipe Title & Source from fb to dv
                        titlefbCard.append($('<h6><br>').text(fbTitle))
                        titlefbCard.append($('<p><br>').text('By: '+ fbSource))
                        titlefbCard.attr('data-title', fbTitle)
                        titlefbCard.append($('<p><br>').html('Saved Date: ' + fbDate))
                        // Appending Recipe Links to Materialize Div
                        cardfbAction.append($('<span>').html("<a href='" + fbDetails + "'>More Details</a>"))
                        cardfbAction.append($('<span>').html("<a href='" + fbIngredients + "'>View Ingredients</a><br>"))
                        cardfbAction.attr('data-link', fbLink)
                        // Appending All Elements to Main Materialize Card Div
                        recipefbDiv.append(imagefbCard)
                        recipefbDiv.append(titlefbCard)
                        recipefbDiv.append(cardfbAction)
                        // Push firebase data into html
                        $("#favoriteOutput").prepend(recipefbDiv)
                    }
                });
            }
            // Load menus when user is logged in
            function loginMenu () {
                // Switch back to home page
                $(document).on('click', '.navigation-home', function(event) {
                    event.preventDefault() 
                    $('#searchBar').show();
                    $('#recipeButton').show();
                    $('#recipeOutput').show();
                    $('#favoriteOutput').hide();
                });
                // Switch back to favorite page
                $(document).on('click', '.navigation-favorite', function(event) {
                    event.preventDefault()
                    $('#searchBar').hide();
                    $('#recipeButton').hide();
                    $('#recipeOutput').hide();
                    $("#favoriteOutput").empty();
                    $('#favoriteOutput').show();
                    // CODE TO CALL FAVORITES TO POPULATE FROM FIREBASE
                    outputFavorite()
                });
            }
        }
    } else {
        // No user is signed in.
        signOutFunction()
        document.getElementById("login-page").style.display = "block"
    }
});

// ON CLICK FUNCTIONS AREA
// ON CLICK FUNCTIONS AREA
// ON CLICK FUNCTIONS AREA
// ON CLICK FUNCTIONS AREA
// ON CLICK FUNCTIONS AREA

// On Page Load app and hide elements
$(document).ready(function() {
    $('#searchBar').hide();
    $('#recipeButton').hide();
    $('#recipeOutput').hide();
    $('#favoriteOutput').hide();
    $('#invalid-user').hide();
});

// Click button to push to firebase
$(document).on('click', '.favorite-class', function() {
    // Logs buttons id
    let id = $(this).attr('id')
    // Extracts button's id number
    let partials = id.split('h')
    // Logs buttons position
    let pos = partials[1]
    console.log(pos)
    // Pushes data to firebase based on position
    database.ref().push(recipeArray[pos])
})

// Delete from database -- added feature


//Login onclick delegated function  
$('#sign-in').on('click', function(event) {
    event.preventDefault()
    $('#email').empty()
    var userEmail = document.getElementById('email-field').value
    var userPW = document.getElementById('pw-field').value
    if(userEmail.includes("@")) {
    }
    else{console.log("invalid email - must include an '@' ")}  //update console log error to write to HTML
    
    var suffixArr = ['.com','.org','.gov','.edu']

    for(var i = 0; i<= suffixArr.length ;i++){
        if(userEmail.substr(-4) == suffixArr[i]){
            break;
        }
        else{ 
            console.log("invalid email, must contain a valid suffix") //update console log error to write to HTML
        break
        }
    }
    console.log(userEmail + " " + userPW)
    firebase.auth().signInWithEmailAndPassword(userEmail, userPW).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code - " + errorCode)
        console.log("Error Message - " + errorMessage)
        $('#invalid-user').show();
    });
});

//Create New Account onclick delegated function
$('#create-acct').on('click', function(event) {
    event.preventDefault()
    $('#email').empty()
    console.log('create acct - on click working')
    var userEmail = document.getElementById('email-field').value
    var userPW = document.getElementById('pw-field').value
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPW).catch(function(error) {
        if(userEmail.includes("@")) {
        }
        else{console.log("invalid email - must include an '@' ")}  //update console log error to write to HTML
        
        var suffixArr = ['.com','.org','.gov','.edu']
    
        for(var i = 0; i<= suffixArr.length ;i++){
            if(userEmail.substr(-4) == suffixArr[i]){
                break;
            }
            else{ 
                console.log("invalid email, must contain a valid suffix") //update console log error to write to HTML
            break
            }
        }
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code - " + errorCode)
        console.log("Error Message - " + errorMessage)
    });
});

//User sign-out (need to create sign-out button and change to delegated event handler)
$('#login').on('click', function(event) {
    event.preventDefault()
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        signOutFunction()
        document.getElementById('login').innerText = `Login`
        document.getElementById('welcome').innerText = ``
    }).catch(function(error) {
        // An error happened.
    });
});

// STAND ALONE FUNCTIONS AREA
// STAND ALONE FUNCTIONS AREA
// STAND ALONE FUNCTIONS AREA
// STAND ALONE FUNCTIONS AREA

// Sign out hide elements
function signOutFunction() {
    $('#searchBar').hide();
    $('#recipeButton').hide();
    $('#recipeOutput').hide();
    $('#favoriteOutput').hide();
    $('#home').hide();
    $('#favorite').hide();
    $('#login').hide();
    $('#home1').hide();
    $('#favorite1').hide();
    $('#login1').hide();
    $('#invalid-user').hide();
}
