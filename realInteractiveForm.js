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
//I decided to change the label text if the input name was deleted. 

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

//Match the chosen t-shirt design with its corresponding avaliable colors
const colors = $('#color').children();
const design = $('#design');
const colorLabel = $('#colors-js-puns label');

//----EXTRA CREDIT: Hide color label and select menu until a design is selected----//
colorLabel.hide();
$('#color').hide();

//This event listener will match the colors with their respective design of choice
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
	let noConflict = (eleA, eleB, eleC) => {
		if(!eleB[1].checked){
				$(eleA).css("textDecoration", "none");
				$(eleB[1]).removeAttr("disabled");
			}
			if(!eleB[0].checked){
				$(eleA).css("textDecoration", "none");
				$(eleB[0]).removeAttr("disabled");
			}
			if(eleB[0].checked){
				$(eleB[1]).attr("checked", false);
				$(eleB[1]).attr("disabled", "disabled");
				$(eleA).css("textDecoration", "line-through");
				$(eleC).css("textDecoration", "none");
			}
			
			if(eleB[1].checked){
				$(eleB[0]).attr("checked", false);
				$(eleB[0]).attr("disabled", "disabled");
				$(eleA).css("textDecoration", "line-through");
				$(eleC).css("textDecoration", "none");
			}
		};
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

//Set max length for zip and cvv numbers
$('#zip').attr('maxlength', 5);
$('#cvv').attr('maxlength', 3);

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


							//---------------------VALIDATIONS (unfinished)----------------------//

const button = document.querySelector('button');
const name = document.getElementById('name');


//Email validation
function emailVal(){
     	const mail = document.getElementById('mail');
     	const mailVal = mail.value;
        at = mailVal.indexOf("@");
        dot = mailVal.lastIndexOf(".");    
        if (at < 1 || dot - at < 2  || at === -1){
          $(mail[0]).css({border: "10px solid red"});
           alert("Please enter a valid email!");
           return false;
        }
         return( true );
}

//Registered Activities validation
function inputVal(){
	let howMany = $('input:checked').length;
	if(howMany === 0){
		alert("AT LEAST 1 activity must be checked!");
	}
} 

//Card info validation 
const cardVal = (ele, value) => {
	if( Number(ele.val().length) < value ){
	alert("Card No.: 13-15 digits, Zip Code: 5 digits!, CVV: 3 digits!");
	return false;
	}
};

	
//Click event listener to fire off validations
button.addEventListener('click', () => {
	if(name.value === ""){
		alert("Basic Info: Name is empty!");
	}
	emailVal();
	inputVal();
	
//----EXTRA CREDIT: Program information based on error when form is submitted
	if( Number($('#cc-num').val().length) > 15){
		alert("Credit Card no. has " + (Number($('#cc-num').val().length) - 15) + " digits more than the range: 13-15 digits!" );
	}

	cardVal($('#cvv'), 3);
	cardVal($('#zip'), 5);
	cardVal($('#cc-num'), 13);
});
