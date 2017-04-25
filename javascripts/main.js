$(document).ready(function(){

const apiKey = "AIzaSyB7SFtRN28x-WefOlYZ6nfP0EZzOY7IOlo";

$("body").on("click", "li", (e) => {
	loadPlaces(e.target.innerHTML).then((data) => {
		$("#output").html(data.results.map(result => {
			return (`<h4>${result.name}</h4>`);
		}));
	}).catch((error) => {
		console.log(error);
	})
});

	const loadPlaces = (dropdownType) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/
				json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}
				`)
				.done((data) => resolve(data))
				.fail((error) => reject(error));
		});
	};
});