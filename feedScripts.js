//console.log( localStorage.getItem("accessToken"));
$(document).ready(function() {

	 $("#videoPanel").click(function(){
		var isExpanded = $('#collapse1').attr("aria-expanded");	 
			if(isExpanded){
				$("#videoId").get(0).pause();
			}
			else{
				$("#videoId").get(0).play();
			}
	});
	 
	var accessTokenFeed=localStorage.getItem("accessToken")
	$.ajax({
		type: "GET",
	    url: "https://graph.facebook.com/me?fields=feed{type,source,link,message,story,full_picture,description},id,name,hometown,birthday,email,gender,interested_in,education,movies&access_token=" + accessTokenFeed,
	    dataType: "json",
	    beforeSend: function(){
			    	
		    				$("html").addClass("loaderCss");
			    	},
	    success: function(response){
	    	console.log(response);

	    	$("html").removeClass("loaderCss");
	    	//one- video feed
	    	if(response.hasOwnProperty("feed")){
	    		for(i=0; i<response.feed.data.length; i++){
					if(response.feed.data[i].type == "video"){
						$("#feedOneTitle").html(response.feed.data[i].message);
						$("video").attr("src",response.feed.data[i].source);
						$("#feedOnePanelBody").html(response.feed.data[i].story);

						$(".feedNoData").css("display","none");
						$(".embed-responsive-16by9").show();
						$("#feedOnePanelBody").show();
						break;
						}
					else{
						$("#feedOneTitle").html("No message available for this video!");
					}
					
				}
				//two-image feed
				for(j=0; j<response.feed.data.length; j++){
					if(response.feed.data[j].type == "photo"){
						$("#feedTwoTitle").html(response.feed.data[j].story);
						$("#feedTwoImage").attr("src",response.feed.data[j].full_picture);
						$("#feedTwoPanelBody").html(response.feed.data[j].description);

						$(".feedNoData").css("display","none");
						$("#feedTwoImage").show();
						$("#feedTwoPanelBody").show();
						break;
						}
					else{
						$("#feedTwoTitle").html("No title available for this photo!");
					}
					
				}
				//three- status update
				for(k=0; k<response.feed.data.length; k++){
					if(response.feed.data[k].type == "status"){
						$("#feedThreeTitle").html(response.feed.data[k].message);
						$("#messageBody").html(response.feed.data[k].message);
						$("#storyBody").html(response.feed.data[k].story);
						$(".feedNoData").css("display","none");
						$("#showThreeBody").show();
						break;
						}
					else{
						$("#feedThreeTitle").html("No message available for this status update!");
					}
					
				}
				//four- link update
				for(l=0; l<response.feed.data.length; l++){
					if(response.feed.data[l].type == "link"){
						$("#feedFourTitle").html(response.feed.data[l].story);
						$(".linkPanelBody").html(response.feed.data[l].description);
						$("#feed4Image").attr("src", response.feed.data[l].full_picture);
						$("#feed4Image").show();
						$(".feedNoData").css("display","none");
						break;
						}
					else{
						$("#feedFourTitle").html("No message available for this link!");
					}
					
				}
				localStorage.setItem("accessToken",""); /*imp*/

			}
			else{
				$("#feedOneTitle").html("No feed available!");
				$("#feedTwoTitle").html("No feed available!");
			}
	    	
	    },
	    error: function(error){
	    	$("html").removeClass("loaderCss");
	    	$("#myModalFeeds").modal(); 
				    	errorVal();

				    	function errorVal(){
				    		$("#feedsErrorModalBody").text(error.responseJSON.error.message + " Please go to Profile page and enter valid access token for feeds.");
				    	}
	    	console.log("error");

	    }

		});//end of ready function
});
