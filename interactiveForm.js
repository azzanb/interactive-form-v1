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

//---------------MATCHING T-SHIRT AND COLORS------------//

// //Match the chosen t-shirt design with its corresponding avaliable colors
// const shirt = document.querySelector('.shirt');

// const options = document.querySelector('#color');

// design.addEventListener('change', (e) => {
// 	const design = document.querySelector('#design');
// 	// const color = document.querySelector('#colors-js-puns');

// 	const hide = document.getElementsByClassName('hide');
	
// 	for (let i = 0; i < options.length; i++){
// 		options[i].classList.add("hide");
		
// 		if(options[i].className === "hide"){
// 			options[i].style.display = "none";
// 		}
// 		if(e.target.value === "heart js"){
// 			if(i >= 3){
// 				options[i].classList.remove("hide");
// 				options[i].style.display = "block";

// 			}
// 		}
// 		if(e.target.value === "js puns"){
// 			if(i <= 2){
// 				options[i].classList.remove("hide");
// 				options[i].style.display = "block";

// 			}
// 		}
		
// 	}
// });



// var sibling = $('.activities').find('legend').next();

// console.log(sibling);
//----------------REGISTER FOR ACTIVITIES--------------//

const activities = document.querySelector('.activities');
const input = activities.getElementsByTagName('input');
const label = activities.getElementsByTagName('label');
const p = document.createElement("p");
activities.appendChild(p);


activities.addEventListener('change', (e) => {

// 1) Create a money total at the bottom of the list of 
	let total = 0;

	for(let i = 0; i < input.length; i++){
		if(input[i].checked){
			const labelText = input[i].parentNode.textContent;
			let dollars = Number(labelText.slice(-3));
			total = Number(total) + dollars;				
		
//------------Conflicting time and dates-----------//
			const labelTues = labelText.match(/Tuesday 9am-12pm/g);
			const parent = input[i].parentNode.parentNode;
			const fieldText = parent.children;
			

			const checked = $('.activities label input:checked').parent().parent();
			const realChecked = checked.find('label').find($('input:checked'));
			const tuesPm = $(".activities label:contains('Tuesday 1pm-4pm')");
			const tuesAm = $(".activities label:contains('Tuesday 9am-12pm')");
			
			if(realChecked.text().contains(tuesPm)){
				console.log("Good");
			}
			
			//console.log(checked);
		}
	}
	p.textContent = "Total: $" + Number(total);
	return total;
});




//---------------PAYMENT INFO----------------//

const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const fieldset = credit.parentNode.children;
const paypalDiv = fieldset[4];
const bitcoinDiv = fieldset[5]; 


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




//----------------VALIDATIONS----------------//

const button = document.querySelector('button');
const name = document.getElementById('name');

function emailVal(){
     	const mail = document.getElementById('mail');
     	const mailVal = mail.value;
        atpos = mailVal.indexOf("@");
        dotpos = mailVal.lastIndexOf(".");    
        if (atpos < 1 || dotpos - atpos < 2  || atpos === -1){
           alert("Please enter a valid email!");
           return false;
        }
         return( true );
}

function inputVal(){
		let howMany = $('input:checked').length;
		if(howMany === 0){
			alert("Registered Activities must be checked!");
		}
} 
$('#cc-num').attr('minlength', '13');
$('#cc-num').attr('maxlength', '16');
$('#zip').attr('maxlength', '5');
$('#zip').attr('minlength', '5');
$('#cvv').attr('maxlength', '3');
$('#cvv').attr('minlength','3');


function cardVal(value, min, max){
	if(parseInt(value) < min || isNaN(parseInt(value))){
		alert("First Incorrect");
        return 0; 
	}
	if(max === min){
		return 20;
	}
    else return value;
}
	

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



// var siblings = [];
// 		    function getSiblings(elem) {
// 			    var sibling = elem.find('legend').next(); //first label
// 			    for(;sibling; sibling = $(sibling).next() ) 
// 			       if($(sibling).nodeType == 1 && sibling != elem ){
// 			          siblings.push(sibling);
// 			       }
// 	    		return siblings;
// 			}
// 			console.log(getSiblings( $('.activities') ));
