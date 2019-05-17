$(document).ready(function(){
	Stripe.setPublishableKey("pk_test_t24W682VNxTN7ytv8qcuTjV0");
	var show_error, stripeResponseHandler, submitHandler;

	//get params from url
	function GetUrlParameter(sParam){
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split("&");
		for( var i = 0 ; i < sURLVariables.length; i++){

			var sParameterName = sURLVariables[i].split("=");
			if(sParameterName[0] == sParam){
				return sParameterName[1];
			}

		}
	};

//handle the submit

	submitHandler = function(event){
		var $form = $(event.target);
		$form.find('input[type=submit]').prop('disabled',true);

		if (Stripe){
			Stripe.card.createToken($form, stripeResponseHandler)
		}else{
			show_error("Failed to load creadit card processing functionality");
		}
		return false;
	};

//handle drop down changing
	var handlePlanChange = function(plan_type,form){
		var $form = $(".cc_form");

		if (plan_type == undefined) {
			plan_type = $('#tenant_plan :selected').val();
		}

		if (plan_type == "premium") {
			$('[data-stripe]').prop('required', true);
			$form.off('submit');
			$form.on('submit', submitHandler);
			$('[data-stripe]').show();
		}else {
			$('[data-stripe]').hide();
			$form.off('submit');
			$('[data-stripe]').removeProp('required');
		}

	};

//setup plan change event listener #tenant_id listener in form
	$("#tenant_plan").on('change', function(){
		handlePlanChange($('#tenant_plan :selected').val(), ".cc_form");
	});

//call plan change so set correctly in drop down page loads
	handlePlanChange(GetUrlParameter('plan'), ".cc_form");

//handle token & remove credit field
	stripeResponseHandler = function(status, response){
		var token, $form;
		$form = $('.cc_form');

		if (response.error) {
			console.log(response.error.message);
			show_error(response.error.message);
			$form.find('input[type=submit]').prop("disabled", true);
		}else {
			token = response.id;
			$("#hiddenToken").get(0).value = token;
			$("[data-stripe=number]").remove();
			$("[data-stripe=cvv]").remove();
			$("[data-stripe=exp-year]").remove();
			$("[data-stripe=exp-month]").remove();
			$("[data-stripe=label]").remove();
			$form.get(0).submit();
		}
		return false;
	};


// show error

	show_error = function(message){
		if($("#flash-messages").size() < 1){
			$('div.container.main div:first').prepend("<div id='flash-messages'></div>");
		}

		$("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
		$('.alert').delay(5000).fadeOut(3000);
		return false;
	};


	//initiate submit listerner for any form withn cc_form
	$('.cc_form').on('submit', submitHandler);
});