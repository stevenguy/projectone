//Declare recipes
var recipes = ['Pho', 'Falafel', 'Tacos', 'Chow Mein', 'Spaghetti', 'Fettucini', 'Curry', 'Fried Chicken']

// Recipe Buttons Setup Function
function recipeButtons(){
    $('#recipeButton').empty()
    for (var i = 0; i < recipes.length; i++){
        var buttons = $('<button>')
        buttons.attr('data-name', recipes[i])
        buttons.addClass('waves-effect waves-light btn')
        buttons.text(recipes[i])
        buttons.css('margin-left', '5px')
        buttons.css('margin-bottom', '5px')
        $('#recipeButton').prepend(buttons)
    }
}
recipeButtons()

// Recipe API Call Function
function recipeDisplay (){

    $('button').on('click', function() {
        $('#recipeOutput').empty()
        var recipes = $(this).attr('data-name')
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
        //         var recipeDiv = $('<div class="card">')
        //         var title = $('<span>').text(results[i].title)
        //         var publisher = $('<h6>').text(results[i].publisher)
        //         var image = $('<img>').attr("src", results[i].image_url)
        //         var link = $('<img>').wrap("<a href='" + results[i].f2f_url + "'>")
        //         var details = $('<span>').wrap(results[i].f2f_url)
        //         var ingredients = $('<span>').wrap(results[i].title)
        //         recipeDiv.addClass('card-title')
        //         recipeDiv.addClass('card-content') 
        //         recipeDiv.addClass('card-action')
        //         image.addClass('card-image')
        //         image.attr('src', results[i].image_url)
        //         image.attr('data-image',results[i].image_url)
        //         title.attr('data-title', results[i].title)
        //         details.attr('data-detail', results[i].f2f_url)
        //         ingredients.attr('data-ingredients', results[i].f2f_url)
        //         publisher.attr('data-publisher', results[i].publisher)
        //         recipeDiv.append(image)
        //         recipeDiv.append(title)
        //         recipeDiv.append(publisher)
        //         recipeDiv.append(link)
        //         $('#recipeOutput').append(recipeDiv)
        //     }
                // Setting up Materialize Div Classes
                var recipeDiv = $('<div class="card">')
                var title = $('<div class="card-content">')
                var imageCard = $('<div class="card-image">')
                var cardAction = $('<div class="card-action">')
                var favorite = $('<a href="#" class="halfway-fab btn-floating pink"><i class="material-icons">favorite</i></a>')
                // Appending Recipe Image to Materialize Div
                imageCard.append($('<img>').attr("src", results[i].image_url))
                imageCard.attr('data-image',results[i].image_url)
                imageCard.css('max-height', 'auto')
                imageCard.css('max-width', 'auto')
                imageCard.css('padding', '30px')
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
                recipeDiv.append(imageCard)
                recipeDiv.append(title)
                recipeDiv.append(cardAction)
                // Appending Materialize Card Div to HTML
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
                // Setting up Materialize Div Classes
                var recipeDiv = $('<div class="card">')
                var title = $('<div class="card-content">')
                var imageCard = $('<div class="card-image">')
                var cardAction = $('<div class="card-action">')
                var favorite = $('<a href="#" class="halfway-fab btn-floating pink"><i class="material-icons">favorite</i></a>')
                // Appending Recipe Image to Materialize Div
                imageCard.append($('<img>').attr("src", results[i].recipe.image))
                imageCard.attr('data-image',results[i].recipe.image)
                imageCard.css('max-height', 'auto')
                imageCard.css('max-width', 'auto')
                imageCard.css('padding', '30px')
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
                recipeDiv.append(imageCard)
                recipeDiv.append(title)
                recipeDiv.append(cardAction)
                // Appending Materialize Card Div to HTML
                $('#recipeOutput').append(recipeDiv)
            }
        })
    });
    // $(document).on('click', '#images', function(){
    //     var state = $(this).attr('data-state')
    //     if ( state == 'still'){
    //         $(this).attr('src', $(this).data('move'))
    //         $(this).attr('data-state', 'move')
    //     } else {
    //         $(this).attr('src', $(this).data('still'))
    //         $(this).attr('data-state', 'still')
    //     }
    // }); 
}
recipeDisplay()

// Add Recipe Search function
function addRecipe () {

    $('#newRecipe').on('click', function(event) {
        event.preventDefault()
        var recipeAdd = $('#autocomplete-input').val().trim()
        if (recipeAdd == '') {
            $('#empty-recipe').text('Please add recipes')
            return false
        }
        recipes.push(recipeAdd)
        recipeButtons()
        recipeDisplay()
    });
}
addRecipe()

function menuNav () {
    // Switch back to home page
    $('#home').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').show();
        $('#recipeButton').show();
        $('#recipeOutput').show();
        $('#favoriteOutput').hide();
        recipeButtons()
        recipeDisplay()
    });
    // Switch back to favorite page
    $('#favorite').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').hide();
        $('#recipeButton').hide();
        $('#recipeOutput').hide();
        $('#favoriteOutput').show();
        // CODE TO CALL FAVORITES TO POPULATE FROM FIREBASE

    });
} 
menuNav()

function mobileNav () {
    // Switch back to home page
    $('#home1').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').show();
        $('#recipeButton').show();
        $('#recipeOutput').show();
        $('#favoriteOutput').hide();
        recipeButtons()
        recipeDisplay()
    });
    // Switch back to favorite page
    $('#favorite1').on('click', function(event) {
        event.preventDefault()
        $('#searchBar').hide();
        $('#recipeButton').hide();
        $('#recipeOutput').hide();
        $('#favoriteOutput').show();
        // CODE TO CALL FAVORITES TO POPULATE FROM FIREBASE

    });
} 
mobileNav()