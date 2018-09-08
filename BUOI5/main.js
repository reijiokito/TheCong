var nextPageToken="";
var isLoading = false;

function appendIteam(item) {
    for (let i = 0; i < 10; i++) {  //Display 10 available results
        if(item[i].id.kind == "youtube#video"){ // only display video
        if (item[i] == null) {
            $("#result-list").append("<h3>No more results!</h3>");
            $(".lds-ring").css("opacity: 1;");
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
}

$(document).ready(function () {// Get input from keyword and display results for screen
    $("#search").on("input", function (event) { //submit
        event.preventDefault();
        // $("#result-list").html('');
        $("#result-list").empty();// Remove all child nodes of the set of matched elements from the DOM.
        let keyWord = $("#keyword").val();

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' + keyWord + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pagetoken=' + nextPageToken,  
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
        inLoading = true;
    });
    $(window).scroll(function () {  //lengthen innerHeight to contant orthers results  
        if ($(document).height() - ($(window).height() + $(window).scrollTop()) < 300) {
            if(!isLoading){
                isloading = true;
                let keyWord = $("#keyword").val();
                $.ajax({
                    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' + keyWord + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pagetoken=' + nextPageToken,
                    type: 'GET',
                    success: function (body) {                    
                        console.log(body);
                        appendIteam(body.items);
                        isLoading = false; 
    
                    },
                    error:function(body){
                        if(body.error){
                            console.log("Error searching!!");
                        }
                    }
                });                 
            }


            isLoading = false;
        }
    });
    promiseFunction(kwyword,pageToken)
    .then((respond) => {
        console.log(respond);
    })
    .catch((error) => {
        console.log(error);
    });
});

var promiseFunction = function(keyword,pageToken){
    return new Promise((resolve,reject) =>{
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' + keyWord + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pagetoken=' + nextPageToken,
            type: 'GET',
            success: function (respond) {                                    
                resolve(respond);

            },
            error:function(err){
                
                    reject(err)
                
            }
        }); 
    });
}



// async function batdaungaymoi(){
//     await danhrang();
//     await ruamat();
//     await dihoc();

// }


//debounce , throat
//loader
//foreach(item, index, items)
//var ideos = respond.items.fillter(item => item.id.kind == "youtube#video")
//var ideos = respond.items.fillter(function(item){
//  return item.id.kind == "youtube#video"; 
//});
//var a = [2,4,5];
// var b = a.map(item =< item*2);


//ajax chinh la 1 promise