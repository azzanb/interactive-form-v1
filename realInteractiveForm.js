											//---------SET FOCUS--------//

//First, tag the form in order to work manipulate the elements inside
const form = document.querySelector('form');


//Set focus on the first field when page loads with .focus()
document.getElementById('name').focus();


								//-------------------"OTHER" TEXT FIELD-------------------//
const title = document.getElementById('title');
const firstField = form[0];

//When "Other" on the drop-down menu is clicked, open a text field
title.addEventListener('change', (e) => {
const other = document.createElement('input');
	if(e.target.value === "other"){
		other.type = "text";
		other.id = "other-title";
		other.placeholder = "Your Job Role";
		firstField.appendChild(other);
	}
	if(e.target.value !== "other"){
		firstField.removeChild(firstField.children[7]);
	}
});


//----EXTRA CREDIT: Provide real-time error message
//Write a name, delete the name, and the name label will change with a message  
$('#name').bind('input propertychange', function(){
	const space = $('#name').val();
	const nameChange =$('#name').prev();
	if($(nameChange).html() === "Name: PLEASE ENTER"){
		$(nameChange).html($(nameChange).html().replace(/(Name: PLEASE ENTER)/g, "Name:"));
	}
	if( $('#name').val() === ""){
		$(nameChange).html($(nameChange).html().replace(/(Name:)/g, "Name: PLEASE ENTER"));
		$(nameChange).css({color: "#203590", fontWeight:"bold", fontSize: "20px"});
	}
});


					//---------------------------MATCHING T-SHIRT AND COLORS-----------------------------//
const colors = $('#color').children();
const design = $('#design');
const colorLabel = $('#colors-js-puns label');

//----EXTRA CREDIT: Hide color label and select menu until a design is selected----//
colorLabel.hide();
$('#color').hide();

//This event listener will match the colors with their respective design of choice
//I created two loops, one for the first three colors, the other for the last three colors
$(design).on("change", () => {
	colorLabel.show(); // show after choosing design
	$('#color').show(); //show after choosing design
	if(design.val() === "heart js"){
		for(let i = 3; i < colors.length; i++){
			$(colors).prop("selected", false);
			$(colors[i]).html($(colors[i]).html().replace(/\(I ♥ JS shirt only\)/g, ""));
			$(colors[i]).show();
			colors.slice(0, 3).hide();
		}
	}
	if(design.val() === "js puns"){
		for(let i = 0; i < 3; i++){
			$(colors).prop("selected", false);
			$(colors[i]).html($(colors[i]).html().replace(/\(JS Puns shirt only\)/g, ""));
			$(colors[i]).show();
			colors.slice(3).hide();
		}
	}
});


					//---------------------------REGISTER FOR ACTIVITIES---------------------------//

const activities = document.querySelector('.activities');
const input = activities.getElementsByTagName('input');
const label = activities.getElementsByTagName('label');
const p = document.createElement("p");
activities.appendChild(p);

activities.addEventListener('change', (e) => {
// 1) Create a money total at the bottom of the list of activities
	let total = 0;
	for(let i = 0; i < input.length; i++){
		if(input[i].checked){
			const labelText = input[i].parentNode.textContent;
			let dollars = Number(labelText.slice(-3));
			total = Number(total) + dollars;					
		}

// 2) Make sure days and times don't conflict. Create the necessary variables to complete this task
	const tuesPm = $('label:contains("Tuesday 1pm-4pm") input');
	const notTuesPm = $('label:contains("Tuesday 1pm-4pm")').has('input:not(:checked)');
	const yesTuesPm = $('label:contains("Tuesday 1pm-4pm")').has('input:checked');

	const tuesAm = $('label:contains("Tuesday 9am-12pm") input');
	const notTuesAm = $('label:contains("Tuesday 9am-12pm")').has('input:not(:checked)'); //not checked
	const yesTuesAm = $('label:contains("Tuesday 9am-12pm")').has('input:checked');

//This function takes 3 parameters, for checking and unchecking
	let noConflict = (notCheck, normal, yesCheck) => {
		if(!normal[1].checked){
				$(notCheck).css("textDecoration", "none");
				$(normal[1]).removeAttr("disabled");
			}
			if(!normal[0].checked){
				$(notCheck).css("textDecoration", "none");
				$(normal[0]).removeAttr("disabled");
			}
			if(normal[0].checked){
				$(normal[1]).attr("checked", false);
				$(normal[1]).attr("disabled", "disabled");
				$(notCheck).css("textDecoration", "line-through");
				$(yesCheck).css("textDecoration", "none");
			}
			if(normal[1].checked){
				$(normal[0]).attr("checked", false);
				$(normal[0]).attr("disabled", "disabled");
				$(notCheck).css("textDecoration", "line-through");
				$(yesCheck).css("textDecoration", "none");
			}
		};
		//Call the noConflict function
		noConflict(notTuesPm, tuesPm, yesTuesPm);
		noConflict(notTuesAm, tuesAm, yesTuesAm);
	}

//Show how much is totaled
	p.textContent = "Total: $" + Number(total);
	p.style.color = "blue";
	return total;
});


							    //--------------------PAYMENT INFO---------------------//

const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const fieldset = credit.parentNode.children;
const paypalDiv = fieldset[4];
const bitcoinDiv = fieldset[5]; 

//Hide bitcoin and paypal info. Show credit card info by default
$('#credit-card').nextAll().hide();

//Set max length for card info fields
$('#zip').attr('maxlength', 5);
$('#cvv').attr('maxlength', 3);
$('#cc-num').attr('maxlength', 16);
//$('#cc-num').attr('minlength', 13);

//Display payment option based on selected option
const paymentField = (string, eleA, eleB, eleC) => {
	payment.addEventListener('change', (e) => {
		if(e.target.value === string){
			eleA.style.display = 'none';
			eleB.style.display = 'none';
			eleC.style.display = 'block';
		}
	});
};

paymentField("paypal", credit, bitcoinDiv, paypalDiv);
paymentField("credit card", paypalDiv, bitcoinDiv, credit);
paymentField("bitcoin", credit, paypalDiv, bitcoinDiv);


						       	//---------------------VALIDATIONS----------------------//

//Name validation
const nameVal = () => {
	const name = document.getElementById('name');
	if(name.value === ""){
		$('input#name').css({border: "5px solid #203590"});
		name.placeholder = "Please Enter";
		return false;
	}
	else{return true;}
};

//Email validation
const emailVal = () => {
	const mail = document.getElementById('mail');
 	const mailVal = mail.value;
    at = mailVal.indexOf("@");
    dot = mailVal.lastIndexOf(".");    
    if (at < 1 || dot - at < 2  || at === -1){
    	$('input#mail').css({border: "5px solid #203590"}); //create CSS border when email input is incorrect
        mail.placeholder = "Please Enter";
        return false;
    }
    else{return true;}
};

//Registered Activities validation
const inputVal = () => {
	let howMany = $('input:checked').length;
	if(howMany === 0){
		alert("AT LEAST 1 activity must be checked!");
		return false;
	}
	else{return true;}
};

//Card validations that prevent users from submitting if info is wrong
const ccNumVal = () => {
	if( (Number($('#cc-num').val().length)) < 13){
		$('#cc-num').attr("placeholder", "13-16 Digits")
		$('#cc-num').css({border: "5px solid #203590"});
		return false;
	}
	else{return true;}
};
const cvvVal = () => {
	if((Number($('#cvv').val().length)) < 3){
		$('#cvv').attr("placeholder", "3 Digits")
		$('#cvv').css({border: "10px solid #203590"});
		return false;
	}
	else{return true;}
};
const zipVal = () => {
	if( (Number($('#zip').val().length)) < 5){
		$('#zip').attr("placeholder", "5 Digits")
		$('#zip').css({border: "10px solid #203590"});
		return false;
	}
	else{return true;}
};

//Submit form and check for errors through vaidation functions coded above
$('form').submit((e) => {
//Check name
	if(nameVal() === false || $(name).val() === ""){
		e.preventDefault();
	}
//Check email
	else if(emailVal() === false || $(mail).val() === ""){
		e.preventDefault();
	}
//Check Registered checkboxes
	else if(inputVal() === false){
		e.preventDefault(); 
	}
//If no payment is selected, alert
	else if(($('#payment')[0].selectedIndex) === 0){
		alert("Please select form of payment!");
		e.preventDefault();
	}
//Check Credit Card info
	else if(($('#payment')[0].selectedIndex) === 1){
		if($('#cc-num').val().length < 13){
			//-----EXTRA CREDIT: Error presented on CC Num based on what was typed in, if less than 13 digits, computer will compute how many less than necessary
			alert("Need " + Number(13 - (Number($('#cc-num').val().length))) + " more digits: 13-16 digits!" );
			e.preventDefault();
		}
		else if(ccNumVal() === false){
			e.preventDefault();
		}
		else if(zipVal() === false || $('#zip').val() === "" || cvvVal() === false || $('#cvv').val() === ""){
			e.preventDefault();
		}
	}	
});

//After errors are corrected, form submits!