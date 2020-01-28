
/*----------------------------------------------
Full stack javascript Techdegree
Unit 5 - Interactive Form
Author : Cedric Kervadec
-----------------------------------------------*/



/*----------------------------------------------
Variables declaration and definition
-----------------------------------------------*/

//************ Name fielset *********************
//Selecting the name input.
const name = document.getElementById("name");
//Focus on name input at page loading
name.focus();

//************ Global functions *******************
//Not displaying an element selected by its Id
const displayNone = (elementId) => {
  const element = document.getElementById(elementId);
  element.style.display = "none";
  return element;
};

//************ Email fielset *********************
//Selecting the email input
const email = document.getElementById('mail');

//************ Title fieldset *******************
//Selecting title list
const title = document.getElementById('title');
//Selecting and hiding "other title" input field
const otherTitle = displayNone('other-title');

//************ T-shirt fieldset *******************
//Selecting the T-shirt design list
const design = document.getElementById('design');
//Selecting and hiding the T-shirt color list
const colorSelection = displayNone('color');
//Selectin the T-shirt color list label
const colorLabel = document.getElementById('colors-js-puns').children[0];
//Hiding the T-shirt color list label by default
colorLabel.style.display = "none";
 //Selecting the theme selection message
const noTheme = document.getElementById('no-theme');
//Setting padding top of noTheme message for styling purpose
noTheme.style.paddingTop = "32px";

//************ Activities fieldset *******************
//Selecting the activities fieldset
const activities = document.getElementsByClassName('activities')[0];
//Setting the total cost to 0 by default
let totalCost = 0;
//Creating element to print the total cost of activities
const totalPrint = document.createElement('h2');
//Giving the cost element the cost ID for CSS styling
totalPrint.id = "cost";
//Selecting the collection of activities checkboxes
const activitiesBoxes = activities.querySelectorAll('input');

//************ Payment method fieldset *******************
//Selecting the payment list
const payment = document.getElementById('payment');
//Selecting the credit card div
const creditCard = document.getElementById('credit-card');
//Selecting the paypal message
const paypal = displayNone('paypal');
//Selecting the bitcoin message
const bitcoin = displayNone('bitcoin');

//Selecting the credit card number input
const ccNumber = document.getElementById('cc-num');
//Selecting the ZIP code input
const zipCode = document.getElementById('zip');
//Selecting the CVV input
const cvv = document.getElementById('cvv');
//Creating a regular expression for credit card number
const ccRegEx = /^([0-9]{13,16})$/;
//Creating a regular expression for ZIP code
const zipRegEx = /^([0-9]{5})$/;
//Creating a regular expression for CVV
const cvvRegEx = /^([0-9]{3})$/;

//************ Submit button *******************
//Selecting the submit button
const button = document.getElementsByTagName('button')[0];

/*----------------------------------------------
Functions declaration and definition
-----------------------------------------------*/

//************ T-shirt color management *******************
//hideOption to hide T-shirt color options
const hideOption = (option) => {
  const selector = "option[value=\"" + option + "\"]";
  const optionToHide = document.querySelector(selector);
  optionToHide.hidden = true;
  return optionToHide;
}
//hideOption to show T-shirt color options
const seeOption = (option) => {
  const selector = "option[value=\"" + option + "\"]";
  const optionToSee = document.querySelector(selector);
  optionToSee.hidden = false;
  return optionToSee;
}

//************ Activities schedule management *******************
//Function to manage scheduling conflict between activities and total cost
const manageActivities = (checkbox) => {
  if (checkbox.checked) {
    totalCost += parseInt(checkbox.dataset.cost);
    //Checking for scheduling conflict with other activities
    for (let i = 0; i <  activitiesBoxes.length; i += 1) {
      if (activitiesBoxes[i].getAttribute("data-day-and-time") === checkbox.getAttribute("data-day-and-time")) {
        activitiesBoxes[i].disabled = true;
        activitiesBoxes[i].parentNode.className = "conflict";
      }
    }
  } else {
    totalCost -= parseInt(checkbox.dataset.cost);
    //Undoing conflict display when activitiy is unchecked
    for (let i = 0; i < activitiesBoxes.length; i += 1) {
      if (activitiesBoxes[i].getAttribute("data-day-and-time") === checkbox.getAttribute("data-day-and-time")) {
        activitiesBoxes[i].disabled = false;
        activitiesBoxes[i].parentNode.className = "";
      }
    }
  }
  checkbox.disabled = false;
  checkbox.parentNode.className = "";
};

//************ Form validation management *******************
//alert prints the alert message and style the input field
const alert = (element, string) => {
  const selector = "#" +element.id + "+p.alert";
  const alertMessage = document.createElement('p');
  alertMessage.className = "alert";
  alertMessage.textContent = string;
  element.className = "alert";
  if (element.parentNode.querySelector(selector) == null) {
    element.after(alertMessage);
  }
};
//unAlert remove the alert message and undo the alert styling of input field
const unAlert = (element) => {
  const selector = "#" +element.id + "+p.alert";
  element.className = "";
  if (element.parentNode.querySelector(selector)) {
    element.parentNode.removeChild(element.parentNode.querySelector(selector));
  }
};
//checkName checks the name input validity, returns false and prints alert if name is not valid and true if it is.
const checkName = (nameInput) => {
  let validInput = false;
  if (nameInput.value == "") {
    alert(nameInput, "A name is required.");
    validInput = false;
  } else {
    unAlert(nameInput);
    validInput = true;
  }
  return validInput;
};
//checkEmail checks the email input validity, returns false and prints alert if email is not valid and true if it is
const checkEmail = (emailInput) => {
  //General Email Regex (RFC 5322 Official Standard)
  const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  let validInput = false;
  if (emailRegEx.test(emailInput.value)) {
    unAlert(emailInput);
    validInput = true;
  } else {
    alert(emailInput, "This is not a valid email address.");
    validInput = false;
  }
  return validInput;
};
/*checkCode checks the code (card number, ZIP code or CVV) input validity, returns false and prints alert
depending on error type  if code is not valid and true if it is*/
const checkCode = (code, codeRegEx, input, minLength) => {
  //Setting validity to false
  let validInput = false;
  //Removing existing alert if there is one
  if (input.parentNode.querySelector('#' + input.id + '+p.alert')) {
    input.parentNode.removeChild(input.parentNode.querySelector('#' + input.id + '+p.alert'));
  }
  //Alert on empty input filed
  if (input.value === "") {
    alert(input, code + " is required.");
    validInput = false;
  //Alert on length of code (too short)
  } else if (input.value.length < minLength) {
    alert(input, code + " must contain at least " + minLength + " digits.");
    validInput = false;
  //Alert on code not containing only digits
  } else if (codeRegEx.test(input.value) === false) {
    alert(input, code + " must only contain digits.");
    validInput = false;
  //Code is valid
  } else {
    unAlert(input);
    validInput = true;
  }
  return validInput;
};

/*----------------------------------------------
Events handler
-----------------------------------------------*/
//Name input event listener
name.addEventListener('keyup', (e) => {
  checkName(e.target);
});
name.addEventListener('focusout', (e) => {
  checkName(e.target);
});

//Email event listener
email.addEventListener('keyup', (e) => {
  checkEmail(e.target);
});

//Title input event listener
title.addEventListener('change', () => {
  if (title.value === 'other') {
    otherTitle.style.display = "";
  } else {
    otherTitle.style.display = "none";
  }
});

//T-shirt design event listener
design.addEventListener('change', () => {
  colorLabel.style.display = "";
  colorSelection.style.display = "";
  if (design.value === 'js puns') {
    colorSelection.value = "default";
    noTheme.style.display = "none";
    seeOption('cornflowerblue');
    seeOption('darkslategrey');
    seeOption('gold');
    hideOption('tomato');
    hideOption('steelblue');
    hideOption('dimgrey');
  } else if (design.value === 'heart js'){
    colorSelection.value = "default";
    noTheme.style.display = "none";
    seeOption('tomato');
    seeOption('steelblue');
    seeOption('dimgrey');
    hideOption('cornflowerblue');
    hideOption('darkslategrey');
    hideOption('gold');
  } else {
    colorLabel.style.display = "none";
    colorSelection.style.display = "none";
    noTheme.style.display = "";
  }
});

//Activities event listener
activities.addEventListener('change', (e) => {
  if (e.target.type = "checkbox") {
    manageActivities(e.target);
    //If at least one activity is selected, print the cost
    if(totalCost > 0) {
      totalPrint.textContent = "Total = $" + totalCost;
      //If there is a cost, then the alert message can be removed, if there is one
      if(activities.querySelector('.alert')) {
        activities.removeChild(activities.querySelector('.alert'));
      }
      activities.appendChild(totalPrint);3
    //Of no activity is selected, remove the cost print
    } else {
      if(activities.querySelector('#cost')) {
        activities.removeChild(activities.querySelector('#cost'));
      }
    }
  }
});

//Payment choice and credit card payment method event listener
payment.addEventListener('change', () => {
  if(payment.value == "credit card") {
    creditCard.style.display = "";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (payment.value == "paypal") {
    creditCard.style.display = "none";
    paypal.style.display = "";
    bitcoin.style.display = "none";
  } else {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "";
  }
});
if (payment.value === "credit card") {
  ccNumber.addEventListener('focusout', () => {
    checkCode("Credit card number", ccRegEx, ccNumber, 13);
  });
  ccNumber.addEventListener('keyup', () => {
    checkCode("Credit card number", ccRegEx, ccNumber, 13);
  });
  zipCode.addEventListener('focusout', () => {
    checkCode("Zip code", zipRegEx, zipCode, 5);
  });
  zipCode.addEventListener('keyup', () => {
    checkCode("Zip code", zipRegEx, zipCode, 5);
  });
  cvv.addEventListener('focusout', () => {
    checkCode("CVV", cvvRegEx, cvv, 3);
  });
  cvv.addEventListener('keyup', () => {
    checkCode("CVV", cvvRegEx, cvv, 3);
  });
}

/***** Submit button event listener ******
The if statements are in an order so that the focus is set to the error that is the higher ine form*/
button.addEventListener('click', (e) => {
  //Checking the credit card inputs
  if(payment.value === "credit card") {
    if (checkCode("CVV", cvvRegEx, cvv, 3) === false) {
      e.preventDefault();
      checkCode("CVV", cvvRegEx, cvv, 3);
      cvv.focus();
    }
    if (checkCode("Zip code", zipRegEx, zipCode, 5) === false) {
      e.preventDefault();
      checkCode("Zip code", zipRegEx, zipCode, 5)
      zipCode.focus();
    }
    if (checkCode("Credit card number", ccRegEx, ccNumber, 13) === false) {
      e.preventDefault();
      checkCode("Credit card number", ccRegEx, ccNumber, 13);
      ccNumber.focus();
    }
  }
  //Checking the activities
  if (document.getElementById('cost') === null) {
    e.preventDefault();
    const activityAlert = document.createElement('p');
    activityAlert.textContent = "Please select an activity. ";
    activityAlert.className = "alert";
    if (activities.querySelector('.alert') === null) {
      activities.appendChild(activityAlert);
    }
    activities.scrollIntoView();
  }
  //Checking the email
  if (checkEmail(email) === false) {
    e.preventDefault()
    checkEmail(email);
    email.focus();
  }
  //Checking the name
  if (checkName(name) === false) {
    e.preventDefault()
    checkName(name);
    name.focus();
  }
});
