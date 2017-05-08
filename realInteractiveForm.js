//---------SET FOCUS--------//

//First, tag the form in order to work manipulate the elements inside
const form = document.querySelector('form');

//Set focus on the first field when page loads with .focus()
document.getElementById('name').focus();


//------------"OTHER" TEXT FIELD-----------//

//When "Other" on the drop-down menu is clicked, open a text field
const title = document.getElementById('title');
const firstField = form[0];
title.addEventListener('change', (e) => {
	if(e.target.value === "other"){
		const other = document.createElement('input');
		other.type = "text";
		other.id = "other-title";
		other.placeholder = "Your Job Role";
		firstField.appendChild(other);
	}
});


//---------------------------MATCHING T-SHIRT AND COLORS (unfinished) -----------------------------//

//Match the chosen t-shirt design with its corresponding avaliable colors
const colors = $('#color').children();
const design = $('#design');
// console.log($(colors[0]).attr("selected", false));


$(design).on("change", () => {
	
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



//------------------------REGISTER FOR ACTIVITIES---------------------------//

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

// 2) Make sure days and times don't conflict. I created two functions for the AM and PM. 
	//What is a better "cleanup" solution than what I have now?
			function noConflictPm(){
				const tuesPm = $('label:contains("Tuesday 1pm-4pm") input');
				const notTuesPm = $('label:contains("Tuesday 1pm-4pm")').has('input:not(:checked)');
				const yesTuesPm = $('label:contains("Tuesday 1pm-4pm")').has('input:checked');

				if(!tuesPm[1].checked){
					$(notTuesPm).css("textDecoration", "none");
					$(tuesPm[1]).removeAttr("disabled");
				}
				if(!tuesPm[0].checked){
					$(notTuesPm).css("textDecoration", "none");
					$(tuesPm[0]).removeAttr("disabled");
				}
				if(tuesPm[0].checked){
					$(tuesPm[1]).attr("checked", false);
					$(tuesPm[1]).attr("disabled", "disabled");
					$(notTuesPm).css("textDecoration", "line-through");
					$(yesTuesPm).css("textDecoration", "none");
				}
				
				if(tuesPm[1].checked){
					$(tuesPm[0]).attr("checked", false);
					$(tuesPm[0]).attr("disabled", "disabled");
					$(notTuesPm).css("textDecoration", "line-through");
					$(yesTuesPm).css("textDecoration", "none");
				}
				
			}
			function noConflictAm(){
				const tuesAm = $('label:contains("Tuesday 9am-12pm") input');
				const notTuesAm = $('label:contains("Tuesday 9am-12pm")').has('input:not(:checked)'); //not checked
				const yesTuesAm = $('label:contains("Tuesday 9am-12pm")').has('input:checked');

				if(!tuesAm[1].checked){
					$(notTuesAm).css("textDecoration", "none");
					$(tuesAm[1]).removeAttr("disabled");
				}
				if(!tuesAm[0].checked){
					$(notTuesAm).css("textDecoration", "none");
					$(tuesAm[0]).removeAttr("disabled");
				}
				if(tuesAm[0].checked){
					$(tuesAm[1]).attr("checked", false);
					$(tuesAm[1]).attr("disabled", "disabled");
					$(notTuesAm).css("textDecoration", "line-through");
					$(yesTuesAm).css("textDecoration", "none");
				}
				
				if(tuesAm[1].checked){
					$(tuesAm[0]).attr("checked", false);
					$(tuesAm[0]).attr("disabled", "disabled");
					$(notTuesAm).css("textDecoration", "line-through");
					$(yesTuesAm).css("textDecoration", "none");
				}
			}
			noConflictPm();
			noConflictAm();
	}

//Show how much is totaled
	p.textContent = "Total: $" + Number(total);
	p.style.color = "blue";
	return total;
});




//---------------PAYMENT INFO (unfinished) ----------------//

const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const fieldset = credit.parentNode.children;
const paypalDiv = fieldset[4];
const bitcoinDiv = fieldset[5]; 

$('#payment option[1]').attr("selected", true);


//Things are repeating here, so create a function
payment.addEventListener('change', (e) => {
	if(e.target.value === "paypal"){
		credit.style.display = 'none';
		bitcoinDiv.style.display = 'none';
		paypalDiv.style.display = 'block';

	}
	if(e.target.value === "credit card"){
		paypalDiv.style.display = 'none';
		bitcoinDiv.style.display = 'none';
		credit.style.display = 'block';
	}
	if(e.target.value === "bitcoin"){
		bitcoinDiv.style.display = 'block';
		credit.style.display = 'none';
		paypalDiv.style.display = 'none';
	}
	if(e.target.value === "select_method"){
		bitcoinDiv.style.display = 'block';
		credit.style.display = 'block';
		paypalDiv.style.display = 'block';
	}
});




//----------------VALIDATIONS (unfinished) ----------------//

const button = document.querySelector('button');
const name = document.getElementById('name');

//Email validation
function emailVal(){
     	const mail = document.getElementById('mail');
     	const mailVal = mail.value;
        at = mailVal.indexOf("@");
        dot = mailVal.lastIndexOf(".");    
        if (at < 1 || dot - at < 2  || at === -1){
           alert("Please enter a valid email!");
           return false;
        }
         return( true );
}

//Registered Activities validation
function inputVal(){
		let howMany = $('input:checked').length;
		if(howMany === 0){
			alert("Registered Activities must be checked!");
		}
} 

//Card info validation ----- NEED HELP
$('#cc-num').attr('minlength', '13');
$('#cc-num').attr('maxlength', '16');
$('#zip').attr('maxlength', '5');
$('#zip').attr('minlength', '5');
$('#cvv').attr('maxlength', '3');
$('#cvv').attr('minlength','3');

function cardVal(value, min, max){
	if(parseInt(value) < min || isNaN(parseInt(value))){
		alert("Card Info Incorrect");
        return 0; 
	}
	if(max === min){
		return 20;
	}
    else return value;
}
	
//Click event listener to fire off validations
button.addEventListener('click', () => {
	if(name.value === ""){
		alert("Basic Info: Name is empty!");
	}
	emailVal();
	inputVal();
	cardVal($('#cc-num').value, 13, 16);
	cardVal($('#zip').value, 5, 5);
	cardVal($('#cvv').value, 3, 3);
	
});





//Current tasks: Set focus on card info 









