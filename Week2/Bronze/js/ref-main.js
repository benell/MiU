// Author: Brian Enell
// Project: MiU
// Project Date: 0912

//Wait for the DOM to become ready.
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	};
	
	//Variable Defaults
	var radioValue,
		checkValue,
		errorMsg = $('errors');
	
	//Toggle Controls Function
	function toggleControls(n){
		switch(n){
			case "on":
				$('buffForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addBuff').style.display = "inline";
				break;
			case "off":
				$('buffForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addBuff').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				$('buffForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addBuff').style.display = "none";
				$('items').style.display = "none";
				break;
		};
	};
	
	//Find value of selected Radio Button.
	function getSelectedRadio(){
		console.log("Ran getSelectedRadio function");
		var radios = document.forms[0].prereq;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				radioValue = radios[i].value;
			};
		};
	};
	
	//Find value of Checkbox
	function getCheckboxValue(){
		if($('buffTouch').checked){
			checkValue = $('buffTouch').value;
		} else {
			checkValue = "No";
		};
	};
	
	//Store Data Function
	function storeData(key){
	console.log("storeData has run");
		var id;
		if(!key){
			id		= Math.floor(Math.random()*100000001); //Creating an ID number allows you to create multiple saves
		}else{
			id = key;
		};
		
		//gather up all our form field values and store them in an object.
		//Object properties contain an array that has the form label and the input values.
		//getSelectedRadio(); //Sets the variable that is used in the object
		getCheckboxValue(); //Same for checkbox
		var item				= {}; //Create the Object
			item.name			= ["Buff Name:", $('buffName').value]; //Assign it values based on the elements in the form using the getElementById function.
			item.rounds			= ["Rounds:", $('buffRounds').value];
			item.type			= ["Buff Type:", $('buffType').value];//.value is the attribute that we use to store the user input.
			item.tohit			= ["To Hit:", $('buffToHit').value];
			item.damage			= ["Damage:", $('buffDamage').value];
			item.ac 			= ["AC:", $('buffAC').value];
			item.touch/*chkbox*/= ["To Touch:", checkValue];
			item.fortitude		= ["Fortitude:", $('buffFortitutde').value];
			item.reflex			= ["Reflex:", $('buffReflex').value];
			item.will			= ["Will:", $('buffWill').value];
			item.strength		= ["Strength:", $('buffStrength').value];
			item.dexterity		= ["Desxterity:", $('buffDexterity').value];
			item.constitution	= ["Constitution:", $('buffConstitution').value];
			item.intelligence	= ["Intelligence:", $('buffIntelligence').value];
			item.wisdom			= ["Wisdom:", $('buffWisdom').value];
			item.charisma		= ["Charisma:", $('buffCharisma').value];
			item.circle			= ["Circle:", $('buffCircle').value];
			item.description	= ["Description:", $('description').value];
			item.active			= ["Active:", checkValue];
	
		//Save data into Local Storage; Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Buff Saved!");
	};
	
	//Validate Function
	function validate(e){
		console.log("Validate function is runnning");
		//define the elements we check
		var getName = $('buffName');
		var getDescription = $('description');
//		var getEmail = $('email');
		
		//reset error messages
		errorMsg.innerHTML = "";
		
		//Create array for mass display of error messages
		var messageAry = [];
		
		//Group Validation
		if(getName.value === ""){
			var nameError = "Please enter a name for the buff.";
			getName.style.border = "1px solid red";
			messageAry.push(nameError);
		}else{
			getName.style.border = "1px solid green";	
		};
		
		if(getDescription.value === ""){
			var descriptionError = "Please enter a description.";
			getDescription.style.border = "1px solid red";
			messageAry.push(descriptionError);
		}else {
			getDescription.style.border = "1px solid green";
		};
		
/*
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1ps solid red";
			messageAry.push(emailError);
		};
		
*/
		//If there were errors, display them
		//requires that an HTML element exist in page already <ul id="errors"></ul>
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errorMsg.appendChild(txt);
			};
			e.preventDefault();
			console.log("Line 153 messed you up");
			return false;
		}else{
			//Store data if no errors
			storeData(this.key);
		};
	};
	
	//Get Style class, to color the saved items by dropdown class
	function getStyleClass(c){
		if (c === "Untyped") {
			return "untyped";
		}else if(c === "Enhancement") {
			return "enhancement";
		}else if(c === "Morale") {
			return "morale";
		}else if(c === "Deflection") {
			return "deflection";
		}else{
			return "buffer";
		};
	};
	
	//Get style image
	function getImage(makeSubList, c){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		newImg.setAttribute("src", "images/" + c + ".png");
		imageLi.appendChild(newImg);
	};
	
	
	// GetData Function: Write data from local storage to the browser
	// This is an old function, display data is used to display items on the main page 1208312123
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage, so default data was added.");
			autoFillData();
		};
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		makeList.setAttribute("class", "mainList");
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value); //Converts the string in local storage back to an object
			var makeSubList = document.createElement('ul');
/* 			makeSubList.setAttribute("class", "buffer"); */
/* 			console.log(obj); */
			var styleClass = obj.type[1];
			console.log(styleClass);
			makeSubList.setAttribute("class", getStyleClass(styleClass));
			getImage(makeSubList, styleClass);
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				if (obj[n][1] !== 0){
					var makeSubLi = document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
				};
			};
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete links for each item in local storage
		};
	};
	//displayData: Write the local storage data to the appropriate list on index screen.
	function displayData(){
		var actList = $('activeList');
		var inaList = $('inactiveList');
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			var key = localStorage.key(i); //because this is in a for loop, i represents the iteration of the loop that we are in.
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value); //Converts the string in local storage back to an object
			var makeSubList = document.createElement('ul');
			var styleClass = obj.type[1];
			var activeOrNot = obj.active[1];
			if (activeOrNot === "Yes"){
				actList.appendChild(makeLi);
			}else{
				inaList.appendChild(makeLi);
			};
			console.log(styleClass);
			makeSubList.setAttribute("class", getStyleClass(styleClass));
			getImage(makeSubList, styleClass);
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				if (obj[n][1] != 0){
					var makeSubLi = document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
				};
			};
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete links for each item in local storage
		};
	}
	
	
	//Auto Populate Local Storage
	function autoFillData(){
		console.log("Function: autoFillData, has run");
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};
	
	function checkBeforeLoad(){
		if(localStorage.length === 0){
			alert("There is no data in local storage, so default data was added.");
			autoFillData();
			displayData();
		}else{
			alert("Local Storage data already exists. Please clear data first.");
			clearLocal();
		};
	};
	
	//Edit Item Function
	function editItem(){
		
		//Grab the Data for our item from local storage
		var value = localStorage.getItem(this.key);
		console.log("This is the value of value = localStorage.getItem(this.key):" + " " + value);
		var item = JSON.parse(value);
		console.log("This is the value of item: " + item);
		toggleControls("off");
		//populate the form fields with the current localStorage values.
		$('buffName').value = item.name[1];
		$('buffRounds').value = item.rounds[1];
		$('buffType').value = item.type[1];
		$('buffToHit').value = item.tohit[1];
		$('buffDamage').value = item.damage[1];
		$('buffAC').value = item.ac[1];
		$('buffTouch').value = item.touch[1];
		$('buffFortitude').value = item.fortitude[1];
		$('buffReflex').value = item.reflex[1];
		$('buffWill').value = item.will[1];
		$('buffStrength').value = item.strength[1];
		$('buffDexterity').value = item.dexterity[1];
		$('buffConstitution').value = item.constitution[1];
		$('buffIntelligence').value = item.intelligence[1];
		$('buffWisdom').value = item.wisdom[1];
		$('buffCharisma').value = item.charisma[1];
		$('buffCircle').value = item.circle[1];
		$('description').value = item.description[1];
		$('buffActive').value = item.active[1];
		//repeat format for items to fill
		
		
		//remove the initial listener from the event
		save.removeEventListener("click", storeData);
		//Change Submit button Value to Edit Button
		$('submit').value = "Save Edit";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit event so we can se that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	};
	
	//Delete Item Function	
	function deleteItem(){
		var ask = confirm("Are you sure want to remove this buff?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Buff removed.");
			window.location.reload();
		}else{
			alert("No changes made.");
		};
	};
	
	//Make item links function
	function makeItemLinks(key, linksLi){
		//Edit single item link
		var editLink = document.createElement('a');
		editLink.href = "additem.html";
		editLink.key = key;
		var editText = "Edit Buff";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Remove Buff";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};
	
	//Clear Local Storage
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var reply = confirm("Clear Local Storage Data?")
			if (reply === true){
				localStorage.clear();
				alert("Data Cleared.");
				window.location.reload();
				return false;
			}else{
				return false;
			};
		};
	};
	

	//Set Link & Submit Click Events
	var loadPreData = $('loadPresetsButton');
	loadPreData.addEventListener("click", checkBeforeLoad)
	var displayLink =$('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
	var addBuffLink =$('addBuff');
	addBuffLink.addEventListener("click",toggleControls);
	
});