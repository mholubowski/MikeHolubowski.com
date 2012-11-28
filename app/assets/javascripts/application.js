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
// $(document).ready(function() {
//     // load initial content
//     var $target = $("#projectArea");
//     $target.load('/projects/outfit #projectArea', function(){
//         registerlinks($target);
//     });

// });

// function loadpage(target, link) {
//     target.load(link.attr("href"), function(){
//         registerlinks($target);
//     });
// }

// function registerlinks(content) {

//     content.find("a").click(function() {
//         loadpage(content, $(this));
//         return false;
//     });
// }




function replace(linkTarget) {
	var $target = $("#projectArea");
	$("#projectArea").hide(500, function(){ 
		$target.load(linkTarget + ' #projectArea');
		$("#projectArea").show(1000);
		console.log('click');});
	
	// loader();
}

$(document).ready(function(){
	

	$('s').on("click", function() {
				console.log('level1');
			var linkTarget = ($(this).attr('href'));
				console.log(linkTarget);
			$("#projectArea").hide(500, function(){ 
					history.pushState(null, null, linkTarget);
					console.log('level2');
				$("#projectArea").load(linkTarget + ' #projectArea');
					console.log('level3');
				$("#projectArea").show(1000);});

		return false;
	});

	$('x').on("click", function() {
		console.log('level1')
		
		console.log('level2')
	})



	
 });



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
