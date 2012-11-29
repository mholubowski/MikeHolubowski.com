// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

//----------------- Projects


function replaceProject(linkTarget) {
	// $('#projectArea').hide(500, function(){ 

	$('#projectArea').animate({right: '100%'},500, function(){ 

		$('#projectArea').load(linkTarget + ' ' + '#projectArea');
		$('#projectArea').animate({right: '0%'},1000, null);
		urlSwap(linkTarget);
		});
	
}

function goBack(linkTarget) {
	// $('#projectArea').hide(500, function(){ 
		console.log('level2');

	$('#projectArea').animate({right: '100%'},500, function(){ 

		$('#projectArea').load(linkTarget + ' ' + '#projectArea');
		$('#projectArea').animate({right: '0%'},1000, null);
		urlSwap(linkTarget);
		});
	
}

function replaceMain(linkTarget) {
	$('#mainArea').hide(500, function(){ 
		$('#mainArea').load(linkTarget + ' ' + '#mainArea');
		$('#mainArea').animate({right: '0%'});
		urlSwap(linkTarget);
		});
	
}

function urlSwap(linkTarget){
	history.pushState(null, null, linkTarget);
}


$(document).ready(function(){

  //***** THIS ~~~~~~~~~~~~~~

	$('#projects a').on("click", function(e){
		e.preventDefault();
		replaceProject($(this).attr('href'));
	 })

	// $('#goBack').on("click", function(e){
	// 	console.log('level1');
	// 	goBack($(this).attr('href'));
	// 	e.preventDefault();
	//  })

	// $('h1.h1-header a').on("click", function(e){
	// 	e.preventDefault();
	// 	replaceProject($(this).attr('href'));
	//  })

	// $('#links a').on("click", function(e){
	// 	e.preventDefault();
	// 	replaceMain($(this).attr('href'));
	//  })

  //***** THIS ~~~~~~~~~~~~~~~







	// $(window).bind("popstate", function(){
	// 	if (document.referrer.substr(-8) == 'projects'){
	// 	replace(location.pathname);
	// 	}
	// })





	// $('x').on("click", function() {
	// 			console.log('level1');
	// 		var linkTarget = ($(this).attr('href'));
	// 			console.log(linkTarget);
	// 		$("#projectArea").hide(500, function(){ 
	// 				history.pushState(null, null, linkTarget);
	// 				console.log('level2');
	// 			$("#projectArea").load(linkTarget + ' #projectArea');
	// 				console.log('level3');
	// 			$("#projectArea").show(1000);});

	// 	return false;
	// });

	// $('x').on("click", function() {
	// 	console.log('level1')
		
	// 	console.log('level2')
	// })


	// $(window).bind("popstate", function() { 
	// 	// window.history.back(); 
	// 	urlLocation = location.href.substr(-8);
	// 	urlReferrer = document.referrer
	// 	console.log("current:" + urlLocation);
	// 	console.log("referrer:" + urlReferrer);
	// 	console.log(urlReferrer.substr(-8));

	// 	console.log( urlLocation == 'projects'					);
	// 	console.log( urlReferrer.indexOf('projects/') == -1    );
	// 	console.log( urlLocation == urlReferrer.substr(-8)     );

	// 	if (urlLocation == 'projects' && urlReferrer.indexOf('projects/') == -1 && urlLocation == urlReferrer.substr(-8))
	// 		{
	// 		console.log('yes');
	// 		replace('projects');
	// 		}
	// 	else {
	// 		console.log('else');
	// 		}

	// 		}
		
	// );
	
	// $(window).bind("popstate", function(){
	// 	console.log(location.href.substr(-8));
	// 	console.log(document.referrer);
	// 	t = 0;
	// 	if (location.href.substr(-8) == 'projects' && t < 1)
	// 	{
	// 	window.location = location.href;
	// 	t++;
	// 	}
	// })

 });


// Note: preventDefault




// $("li").click(function(){
// 	console.log('link click')}
// )

// $("li").click(testtest()); 

// function testtest() {
// 	  alert("Handler for .click() called.");
// 	}

 

// function loader(){

// 	$("#projectArea").hide('slow', function() {
//     $("#projectArea").show('slow');
//   });
// }
