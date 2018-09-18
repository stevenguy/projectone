//Declare recipes
var recipes = ['Pho', 'Falafel', 'Tacos', 'Chow Mein', 'Spaghetti', 'Fettucini', 'Curry', 'Fried Chicken']

// movie buttons giphy function giphy buttons movie function
function giphyButtons(){
    $('#giphyButton').empty()
    for (var i = 0; i < recipes.length; i++){
        var buttons = $('<button>')
        buttons.attr('data-name', recipes[i])
        buttons.addClass('btn btn-outline-dark btn-lg')
        buttons.text(recipes[i])
        buttons.css('margin-left', '5px')
        buttons.css('margin-bottom', '5px')
        $('#giphyButton').prepend(buttons)
    }
    $('#reset').on('click', function(){
        location.reload()
    })
}
giphyButtons()

// "regulators mount up" function
function recipeDisplay (){

    $('button').on('click', function() {
        $('#giphyOutput').empty()
        var recipes = $(this).attr('data-name')
        var queryURL = "https://www.food2fork.com/api/search?key=b6ba5a04e7601145d1bb74c118bab4c1&q=" + recipes
        var queryURL2 = "https://api.edamam.com/search?q=" + recipes + "&app_id=49ceef25&app_key=a00b5a04f3402c7a3d485e7febff6958"

        $.ajax({
            dataType: "json",
            url: queryURL,
            method: "GET",
        })
        .then(function(response) {
            var results = response.recipes
            console.log(response)
            for (var i = 0; i < results.length; i++) {
                var recipeDiv = $('<div class="card mb-3">')
                var title = $('<h5>').text(results[i].title)
                var publisher = $('<h6>').text(results[i].publisher)
                var rating = $('<p>').text('Recipe Rating: ' + results[i].social_rank)
                var image = $('<img>').attr("src", results[i].image_url)
                var link = $('<img>').wrap("<a href='" + results[i].f2f_url + "'>")
                image.addClass('image')
                recipeDiv.addClass('card mb-3')
                recipeDiv.addClass('card-body')
                image.attr('src', results[i].image_url)
                image.attr('data-image',results[i].image_url)
                title.attr('data-title', results[i].title)
                publisher.attr('data-publisher', results[i].publisher)
                rating.attr('data-rating', results[i].social_rank)
                recipeDiv.append(image)
                recipeDiv.append(title)
                recipeDiv.append(publisher)
                recipeDiv.append(rating)
                recipeDiv.append(link)
                $('#giphyOutput').append(recipeDiv)
            }
        })
    
        $.ajax({
            dataType: "json",
            url: queryURL2,
            method: "GET",
        })
        .then(function(response) {
            var results = response.hits;
            console.log(response)
            for (var i = 0; i < results.length; i++) {
                var recipeDiv = $('<div class="card mb-3">')
                var title = $('<h5>').text(results[i].recipe.label)
                var publisher = $('<h6>').text(results[i].recipe.source)
                var image = $('<img>').attr("src", results[i].recipe.image)
                var link = $('<img>').wrap("<a href='" + results[i].recipe.uri + "'>")
                image.addClass('image')
                recipeDiv.addClass('card mb-3')
                recipeDiv.addClass('card-body')
                image.attr('src', results[i].recipe.image)
                image.attr('data-image',results[i].recipe.image)
                title.attr('data-title', results[i].recipe.label)
                publisher.attr('data-publisher', results[i].recipe.source)
                recipeDiv.append(image)
                recipeDiv.append(title)
                recipeDiv.append(publisher)
                recipeDiv.append(link)
                $('#giphyOutput').append(recipeDiv)
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

// "netflix has every movie i don't want to watch" function
function addRecipe () {

    $('#addMovie').on('click', function(event) {
        event.preventDefault()
        var movie = $('#movie-add').val().trim()
        if (movie == '') {
            $('#empty-movie').text('Please add recipes')
            return false
        }
        recipes.push(movie)
        giphyButtons()
        recipeDisplay()
    });
}
addRecipe()