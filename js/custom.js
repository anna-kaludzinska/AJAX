"use strict";

function ajax(options) {
	
	options = {
		type: options.type || "POST",
		url: options.url || "",
		onComplete: options.onComplete || function() {},
		onError: options.onError || function() {},
		onSuccess: options.onSuccess || function() {},
		dataType: options.dataType || "text"
	};
	
	function httpSuccess(httpRequest) {
		//przechwytywanie wyjatkow; domyslnie bledy wyrzuca do konsoli, ale moge to zmienic
		try {
			return (httpRequest.status >= 200 && httpRequest.status <300 ||
			 httpRequest.status == 304 ||
			 navigator.userAgent.indexOf("Safari") >= 0 && typeof
			 httpRequest.status == "undefined")
		} catch (e) {
			return false;
		}
	}
	
	var httpReq = new XMLHttpRequest();
	
	httpReq.open(options.type, options.url, true);
	
	
	httpReq.onreadystatechange = function () {

		// jesli stan dokumentu został zmieniony -> httpReq.readyState
		//0: połączenie nie nawiązanie
		//1: połączenie nawiązane
		//2: żądanie odebrane
		//3: przetwarzanie
		//4: dane zwrócone i gotowe do użycia.
		if (httpReq.readyState == 4) {

			if (httpSuccess(httpReq.status)) {

				/*alert (httpReq.responseText);*/

				options.onSuccess(httpReq.responseText);

				httpReq = null;
			} else {
				options.onError(httpReq.statusText);
			}
		}
	}
	
	httpReq.send();
	
}
	

function pobierzDane(event) {
	event.preventDefault();
	
	ajax({
		type: "GET",
		url: "http://echo.jsontest.com/Imie/Ania/Nazwisko/Kaludzinska/Miasto/Krakow",
		onError: function(msg) {
			console.log(msg);
		},
		onSuccess: function(response) {
	//		console.log(response);
			
			var jsonObj = JSON.parse(response);
			
			console.log(jsonObj);
		},
	});
}
	
	