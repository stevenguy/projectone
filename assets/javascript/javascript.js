//Declare movies
var movies = ['Avator', 'Goodfellas', 'Godfather', 'Gladiator', 'Titanic', 'Jaws', 'Alien', 'Scream', 'Rocky', 'Scarface', '300', 'Sublime', 'Narcos', 'Supergirl', 'The Flash', 'Avengers', 'Rey', 'Obie Won', 'Legolas', 'Harry Potter']

// movie buttons giphy function giphy buttons movie function
function giphyButtons(){
    $('#giphyButton').empty()
    for (var i = 0; i < movies.length; i++){
        var buttons = $('<button>')
        buttons.attr('data-name', movies[i])
        buttons.addClass('btn btn-outline-dark btn-lg')
        buttons.text(movies[i])
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
function giphyDisplay (){

    $('button').on('click', function() {
        $('#giphyOutput').empty()
        var movies = $(this).attr('data-name')
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=cs4PVT1eJv2z6QFcoC65bvXM28sSVZqA&limit=10"

        $.ajax({
        url: queryURL,
        method: 'GET'
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var giphyDiv = $('<div>')
                var giphyRating = results[i].rating
                var movieImage = $('<img>')
                var rating = $('<p>').text('Giphy Rating: ' + giphyRating)
                movieImage.css('height', '150px')
                movieImage.css('width', '200px')
                movieImage.css('padding', '5px')
                movieImage.attr('src', results[i].images.fixed_height_still.url)
                movieImage.attr('data-still',results[i].images.fixed_height_still.url)
                movieImage.attr('data-move',results[i].images.fixed_height.url)
                movieImage.attr('data-state', 'still')
                movieImage.attr('id', 'images')
                giphyDiv.append(rating)
                giphyDiv.append(movieImage)
                $('#giphyOutput').append(giphyDiv)
            }
        });
    });
    $(document).on('click', '#images', function(){
        var state = $(this).attr('data-state')
        if ( state == 'still'){
            $(this).attr('src', $(this).data('move'))
            $(this).attr('data-state', 'move')
        } else {
            $(this).attr('src', $(this).data('still'))
            $(this).attr('data-state', 'still')
        }
    });
}
giphyDisplay()

// "netflix has every movie i don't want to watch" function
function addMovie () {

    $('#addMovie').on('click', function(event) {
        event.preventDefault()
        var movie = $('#movie-add').val().trim()
        if (movie == '') {
            $('#empty-movie').text('Please add movie')
            return false
        }
        movies.push(movie)
        giphyButtons()
        giphyDisplay()
    });
}
addMovie()