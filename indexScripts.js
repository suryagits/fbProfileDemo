$(document).ready(function() {
	
	$(".tokenSubmitButton").click(function(){

		var accessToken=$("#fbInputToken").val();
		//console.log(accessToken);
		if (typeof(Storage) !== "undefined") {
    		localStorage.setItem("accessToken", accessToken);
			console.log("storage success");
		} else {
		    console.log("storage failed");
		}


		if(accessToken == null || accessToken == '') {
			$("#emptyValErrorModal").modal(); 
		}
		else {
			$.ajax({
			    type: "GET",
			    url: "https://graph.facebook.com/me?fields=id,name,hometown,birthday,email,gender,interested_in,education,movies&access_token=" + accessToken,
			    dataType: "json",
			    beforeSend: function(){
			    	
		    				$("html").addClass("loaderCss");
			    	},
			    success: function(response){

			    		$(".noData").hide();
			    		window.location = $('#aboutMeLink').attr('href');
		    			$("html").removeClass("loaderCss");
		    			//console.log(response);	
			    		
			    		if(response != null || response != "")
		    		{
						//username
						if(response.hasOwnProperty("name")){
							$("#userName").html(response.name);
						}
						else{
							$("#userName").html("No Data retrieved");
						}
						//hometown
						if(response.hasOwnProperty("hometown") && response.hometown.hasOwnProperty("name")){
							$("#userCity").html(response.hometown.name);
						}
						else{
							$("#userCity").html("No Data retrieved");
						}
						//email
						if(response.hasOwnProperty("email")){
							$("#userEmail").html(response.email);
						}
						else{
							$("#userEmail").html("No Data retrieved");
						}
						//birthday
						if(response.hasOwnProperty("birthday")){
							$("#userDob").html(response.birthday);
						}
						else{
							$("#userDob").html("No Data retrieved");
						}
						//gender
						if(response.hasOwnProperty("gender")){
							$("#userGender").html(response.gender);
						}
						else{
							$("#userGender").html("No Data retrieved");
						}
						//interested in
						if(response.hasOwnProperty("interested_in")){
							//console.log(response.interested_in.length);
							for(i in response.interested_in)
								if(i == response.interested_in.length-1)//if interested in multiple genders,put a coma ',' in-between 
									$("#userInterestedIn").html(response.interested_in[i]);
								else
									$("#userInterestedIn").html(response.interested_in[i] + " , ");
						}
						else{
							$("#userInterestedIn").html("No Data retrieved");
						}
						//education
						if(response.hasOwnProperty("education")){
							for(i in response.education){
								if(response.education[i].type == "High School"){
									$("#userSchoolInstitute").html(response.education[i].school.name);
								}
								else if(response.education[i].type == "College"){
									$("#userCollegeInstitute").html(response.education[i].school.name)
									for(j in response.education[i].concentration){
										if(response.education[i].concentration[j].hasOwnProperty("name")){
											$("#userSpecialization").html(response.education[i].concentration[0].name);
										}
									}
								}
								else{
									$("#userSchoolInstitute").html("No Data retrieved");
									$("#userCollegeInstitute").html("No Data retrieved");
									$("#userSpecialization").html("No Data retrieved");
								}
							}
							
						}
						else{
									$("#userSchoolInstitute").html("No Data retrieved");
									$("#userCollegeInstitute").html("No Data retrieved");
									$("#userSpecialization").html("No Data retrieved");
								}
						//movies
						if(response.hasOwnProperty("movies")){
							var arr=new Array();
							for(i=0;i<5; i++){
								arr.push(response.movies.data[i].name);
								//console.log(arr[i]);
							}
							$("#movOne").html(arr[0]);
							$("#movTwo").html(arr[1]);
							$("#movThree").html(arr[2]);
							$("#movFour").html(arr[3]);
						}
						else{
							$("#movOne").html("No Data retrieved");
							$("#movTwo").html("No Data retrieved");
							$("#movThree").html("No Data retrieved");
							$("#movFour").html("No Data retrieved");

						}
						
					}
				},
			    error: function(error){

			    		console.log(error);
			    		$("#userName").html("");
						$("#userCity").html("");
						$("#userEmail").html("");
						$("#userDob").html("");
						$("#userGender").html("");
						$("#userSchoolInstitute").html("");
						$("#userCollegeInstitute").html("");
						$("#userSpecialization").html("");
						$("#movOne").html("");
						$("#movTwo").html("");
						$("#movThree").html("");
						$("#movFour").html("");
						$(".noData").show();

		    			$("html").removeClass("loaderCss");

				    	$("#myModal").modal(); 
				    	errorVal();

				    	function errorVal(){
				    		$("#errorModalBody").text(error.responseJSON.error.message);
				    	}
				    	
				    	console.log(error);
		        	}
			});
		}
		

	
	});

	
		
});//end of ready function


