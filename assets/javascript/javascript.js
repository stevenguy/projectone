var recipeArray = [];
var i = recipeArray.length

console.log(recipeArray)

var index = 1


$(document).on('click', '#search' + index, function() {
    database.ref().push(recipeArray[i])
    console.log('check')
    console.log('#search' + index)
})

$('#newRecipe').on('click', function(event) {
    event.preventDefault()
    $('#recipeOutput').empty()
    recipes = $("#autocomplete-input").val().trim()
    recipeDisplay()
});

var config = {
    //api key
    apiKey: "AIzaSyAbRbiP02AIlIqtd1dt_o4oVqIEZQ_649Q",
    //authorize domain
    authDomain: "recipes-7858e.firebaseapp.com",
    //Database URL
    databaseURL: "https://recipes-7858e.firebaseio.com/",
    storageBucket: "recipes-7858e.appspot.com"
  };

firebase.initializeApp(config);

var database = firebase.database();


// Recipe API Call Function
function recipeDisplay (){

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
            // Setting up Materialize Div Classes
            var recipeDiv = $('<div class="card">')
            var title = $('<div class="card-content">')
            var imageCard = $('<div class="card-image">')
            var cardAction = $('<div class="card-action">')
            var cardID = 'search' + index
            var recipeImage = results[i].image_url
            var favorite = $("<button id='" + cardID + "' class='halfway-fab btn-floating pink'><i class='material-icons'>favorite</i></a>")
            // Appending Recipe Image to Materialize Div
            imageCard.append($('<img>').attr("src", recipeImage))
            imageCard.attr('data-image',results[i].image_url)
            imageCard.append(favorite)
            // Appending Recipe Title & Source to Materialize Div
            title.append($('<h6><br>').append(results[i].title))
            title.append($('<p><br>').text('By: '+ results[i].publisher))
            title.attr('data-title', results[i].title)
            // Appending Recipe Links to Materialize Div
            cardAction.append($('<span>').html("<a href='" + results[i].f2f_url + "'>More Details</a>"))
            cardAction.append($('<span>').html("<a href='" + results[i].f2f_url + "'>View Ingredients</a><br>"))
            cardAction.attr('data-link', results[i].f2f_url)
            // Appending All Elements to Main Materialize Card Div
            index++
            recipeDiv.append(imageCard)
            recipeDiv.append(title)
            recipeDiv.append(cardAction)

            // Appending Materialize Card Div to HTML

            var recipesObj = {
                id: cardID,
                image: recipeImage,
                title: results[i].title,
                publisher: results[i].publisher,
                link: results[i].f2f_url,
                details: results[i].f2f_url,
                ingredient: results[i].f2f_url
            }

            recipeArray.push(recipesObj);

            $('#recipeOutput').append(recipeDiv)

            // $(document).on('click', '#search' + index, function() {
            //         database.ref().push(recipeArray[i])
            //         console.log('check')
            // })
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
            // Setting up Materialize Div Classes
            var cardID = 'search' + index
            var recipeDiv = $('<div class="card">')
            var title = $('<div class="card-content">')
            var imageCard = $('<div class="card-image">')
            var cardAction = $('<div class="card-action">')
            var favorite = $("<button id='" + cardID + "' class='halfway-fab btn-floating pink'><i class='material-icons'>favorite</i></a>")
            // Appending Recipe Image to Materialize Div
            var recipeImage = results[i].recipe.image
            imageCard.append($('<img>').attr("src", recipeImage))
            imageCard.attr('data-image',results[i].recipe.image)
            imageCard.append(favorite)
            // Appending Recipe Title & Source to Materialize Div
            title.append($('<h6><br>').text(results[i].recipe.label))
            title.append($('<p><br>').text('By: '+ results[i].recipe.source))
            title.attr('data-title', results[i].recipe.label)
            // Appending Recipe Links to Materialize Div
            cardAction.append($('<span>').html("<a href='" + results[i].recipe.url + "'>More Details</a>"))
            cardAction.append($('<span>').html("<a href='" + results[i].recipe.url + "'>View Ingredients</a><br>"))
            cardAction.attr('data-link', results[i].recipe.url)
            // Appending All Elements to Main Materialize Card Div
            index++
            recipeDiv.append(imageCard)
            recipeDiv.append(title)
            recipeDiv.append(cardAction)


            var recipesObj = {
                id: cardID,
                image: recipeImage,
                title: results[i].recipe.label,
                publisher: results[i].recipe.source,
                link: results[i].recipe.url,
                details: results[i].recipe.url,
                ingredient: results[i].recipe.url
            }

            recipeArray.push(recipesObj)

            $('#recipeOutput').append(recipeDiv)
        }
        
    })
}
recipeDisplay()



function outputFavorite() {

    database.ref().on("child_added", function(childSnapshot) {

        console.log(childSnapshot.val());

        var fbID = childSnapshot.val().id //
        var fbImage = childSnapshot.val().image //
        var fbTitle = childSnapshot.val().title //
        var fbLink = childSnapshot.val().link //
        var fbDetails = childSnapshot.val().details //  
        var fbIngredients = childSnapshot.val().ingredient //
        var fbSource = childSnapshot.val().publisher //
        var recipefbDiv = $('<div class="card">')
        var titlefbCard = $('<div class="card-content">')
        var imagefbCard = $('<div class="card-image">')
        var cardfbAction = $('<div class="card-action">')
        var fbfavorite = $("<button id='" + fbID + "' class='halfway-fab btn-floating pink'><i class='material-icons'>favorite</i></a>")
        // append image from fb
        imagefbCard.append($('<img>').attr("src", fbImage))
        imagefbCard.attr('data-image',fbImage)
        imagefbCard.append(fbfavorite)
        // Appending Recipe Title & Source from fb to dv
        titlefbCard.append($('<h6><br>').text(fbTitle))
        titlefbCard.append($('<p><br>').text('By: '+ fbSource))
        titlefbCard.attr('data-title', fbTitle)
        // Appending Recipe Links to Materialize Div
        cardfbAction.append($('<span>').html("<a href='" + fbDetails + "'>More Details</a>"))
        cardfbAction.append($('<span>').html("<a href='" + fbIngredients + "'>View Ingredients</a><br>"))
        cardfbAction.attr('data-link', fbLink)
        // Appending All Elements to Main Materialize Card Div
        recipefbDiv.append(imagefbCard)
        recipefbDiv.append(titlefbCard)
        recipefbDiv.append(cardfbAction)

        $("#favoriteOutput").append(recipefbDiv);
    });
}
outputFavorite()

function menuNav () {
    // Switch back to home page
    $('#home').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').show();
        $('#recipeButton').show();
        $('#recipeOutput').show();
        $('#favoriteOutput').hide();
    });
    $('#home1').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').show();
        $('#recipeButton').show();
        $('#recipeOutput').show();
        $('#favoriteOutput').hide();
    });
    // Switch back to favorite page
    $('#favorite').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').hide();
        $('#recipeButton').hide();
        $('#recipeOutput').hide();
        $("#favoriteOutput").empty();
        $('#favoriteOutput').show();
        // CODE TO CALL FAVORITES TO POPULATE FROM FIREBASE
        outputFavorite()
    });
    $('#favorite1').on('click', function(event) {
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
menuNav()


