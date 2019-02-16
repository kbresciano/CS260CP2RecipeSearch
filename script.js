
document.getElementById("recipeSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  // Reads user input
  const value = document.getElementById("recipeInput").value;
  if (value === "")
    return;
  console.log(value);
  const ingredientValue = document.getElementById("ingredientInput").value;

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let urlTemp = "http://www.recipepuppy.com/api/?"
  if (ingredientValue != "")
    urlTemp += "i=" + ingredientValue + "&";
  urlTemp += "q=" + value;

  const url = proxyurl + urlTemp

  fetch(url)
	.then(function(response) {
		return response.json();
	}).then(function(json) {
		let results = "";
      results += '<div id="recipeResults"><h2> Results for "' + value + '"</h2>\n';
      if (json.results.length > 0)
        results += "<p id='resultsHelper'>Click recipe name to see full recipe</p>\n<hr>\n"
      else
        results += "<p id='resultsHelper'>Sorry, we couldn't find anything</p>\n"
      for (let i=0; i < json.results.length; i++) {
        if (i != 0)
          results += "<hr>\n"
	      results += '<div id = "recipe">\n<h3><a href="' + json.results[i].href + '">' + json.results[i].title + '</a></h3>\n';
        results += '<img src="' + json.results[i].thumbnail + '"/>\n'
        results += '<p>Ingredients: ' + json.results[i].ingredients + '</p>\n'
      }
      results += "\n</div>";
      document.getElementById("recipeResults").innerHTML = results;
	});
});
