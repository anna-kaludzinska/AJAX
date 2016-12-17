"use strict";

$(function () {

	$("#pobierzDane").click(function () {
		$.getJSON("http://echo.jsontest.com/Imie/Ania/Nazwisko/Kaludzinska/Miasto/Krakow", function (data) {
			console.log(data);
		});
	});
});