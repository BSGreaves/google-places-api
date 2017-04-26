$(document).ready(function(){

const apiKey = "";

	$("body").on("click", "li", (e) => {
		loadPlaces(e.target.innerHTML).then(data => {
			printResults(data.results);
		}).catch((error) => {
			console.log(error);
		});
	});

	$("body").on("click", ".place", (e) => {
		loadDetails(e.target.id).then(data => {
			printDetails(data.result);
		}).catch((error) => {
			console.log(error);
		});
	});

	const loadDetails = (placeID) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${apiKey}`)
				.done((data) => resolve(data))
				.fail((error) => reject(error));
		});
	};

	const loadPlaces = (dropdownType) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/
				json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}`)
				.done((data) => resolve(data))
				.fail((error) => reject(error));
		});
	};

	const printResults = (results) => {
		$("#placesOutput").html(results.map(result => {
			return (`<a href="#"><h4 class="place" id="${result.place_id}">${result.name}</h4></a>`);
		}));
	};

	const printDetails = (result) => {
		console.log(result);
		let ops = ""; //outputstring
		ops += `<h3>${result.name}</h3>`;
		ops += `<h5>${result.adr_address}</h5>`;
		$("#detailsOutput").html(ops);
	};
});