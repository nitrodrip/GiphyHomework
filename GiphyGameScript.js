$(document).ready(function () {
  var cars = ["K5 Blazer", "Z28 Camaro", "Dodge Cummins", "Toyota Tacoma"];


	// function to make buttons and add to page
  	function populateButtons(arrayToUse) {
    $("#car-buttons").empty();
    
		//Go through car array and dynamically create elements with button classes and append to the document
    	for (var i = 0; i < cars.length; i++) {
		  var a = $("<button>");
		  	// Added a class
			a.addClass("car"); 
		  	a.addClass("btn btn-primary btn-xs");
		  
			// Added a data-attribute
			a.attr("data-name", cars[i]); 
			a.attr("src", $(this).data("animate"));
		  	a.attr("data-state"), $(this).attr("data-state", "animate");
		  	
			// Provided the initial button text
			a.text(cars[i]); 
		  
			// Added the button to the HTML
			$("#car-buttons").append(a); 
    }
  }
	//Populates buttons for cars
  populateButtons(cars);

  $(document).on("click", ".car", function () {
    $("#cars").empty();
    $(".car").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=27iU0pnwhBKp99Mkdx0L69n1GGbZjDoR&limit=10";

	  //ajax Get to grab animation
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {

      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var carDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating:" + rating);
        var still = results[i].images.fixed_height_still.url;
        var animated = results[i].images.fixed_height.url;

        var carImage = $("<img>");
        carImage.attr("src", still);


        carImage.attr("data-still", still);
        carImage.attr("data-animate", animated);
        carImage.attr("data-state", "still");
        carImage.addClass("car-image");

        carDiv.append(p);
        carDiv.append(carImage);

        $("#cars").append(carDiv);
      }

      $(document).on("click", ".car-image", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
          $(this).attr("src", $(this).data("animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
      })
    })
  })

  $("#add-car").on("click", function (e) {
    e.preventDefault();
    var userInput = $("input").val();
    console.log(userInput);
    cars.push(userInput);
    console.log(cars);
    populateButtons(cars);
    $("#car-input").val("");
  })

});



