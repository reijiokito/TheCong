nextPageToken="";

function appendIteam(item) {
    for (let i = 0; i < 10; i++) {  //Display 10 available results
        if (item[i] == null) {
            $("#result-list").append("<h3>No more results!</h3>");
            break;
        } else {
            //The content of one Item
            $("#result-list").append(` 
                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item[i].id.videoId}" target="_self">
                <img src="${item[i].snippet.thumbnails.high.url}" alt="">
                <div class="info">
                    <h2 class="title">${item[i].snippet.title}</h2>
                    <p class="description">${item[i].snippet.description}</p>                    
                </div>
            </a>
        `);
        }
    }
}

$(document).ready(function () {// Get input from keyword and display results for screen
    $("#search").on("submit", function (event) {
        event.preventDefault();
        $("#result-list").empty();
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + $("#keyword").val() + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pagetoken=' + nextPageToken,  
            type: 'GET',
            success: function (body) {
                console.log(body);
                appendIteam(body.items);
                nextPageToken = body.nextPageToken;
            },
            error:function(body){
                if(body.error){
                    console.log("Error searching!");
                }
            }
        });
    });
    $(window).scroll(function () {  //lengthen innerHeight to contant orthers results  src: thought from Vu Duc Thang.
        if (($(window).innerHeight() + $(window).scrollTop()) >= $("#result-list").height()) {
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + $("#keyword").val() + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pagetoken=' + nextPageToken,
                type: 'GET',
                success: function (body) {                    
                    console.log(body);
                    appendIteam(body.items);

                },
                error:function(body){
                    if(body.error){
                        console.log("Error searching!!");
                    }
                }
            });
        }
    });
});