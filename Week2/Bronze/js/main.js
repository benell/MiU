$('#home').on('pageinit', function(){
	//code needed for home page goes here
	var searchControl = $('.searchButton');
	searchControl.live('click', toggleSearch);
	function toggleSearch () {
		$('.ui-listview-filter').fadeToggle("slow", "linear");	
	};
	
	
	var getData = function(){
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var makeListAButton = document.createElement('a')
			var linksLi = document.createElement('li');
			var key = localStorage.key(i); //because this is in a for loop, i represents the iteration of the loop that we are in.
			var value = localStorage.getItem(key);
			var theBuff = JSON.parse(value); //Converts the string in local storage back to an object
			var makeSubListUl = document.createElement('ul');
			var buffGame = theBuff.buffGame[1];
			makeLi.appendChild(makeListAButton);
			makeListAButton.appendChild(makeSubListUl);
			makeSubListUl.attr('data-content-theme','d');
			for(var n in theBuff){
				if (theBuff[n][1] != 0){
					var makeSubLi = document.createElement('li');
					makeSubListUl.appendChild(makeSubLi);
					var optSubText = theBuff[n][0]+" "+theBuff[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubListUl.appendChild(linksLi);
				};
			};
			makeItemLinks(localStorage.key(i), linksLi, makeListAButton); //Create edit and delete links for each item in local storage
		};
	};
	
	function makeItemLinks(key, linksLi, makeListAButton){
		//Edit single item link
		var editLink = makeListAButton;
		editLink.href = "#addItem";
		editLink.key = key;
		editLink.addEventListener("click", editItem);
		/*
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		*/
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		deleteLink.attr('data-split-icon','delete');
		deleteLink.addEventListener("click", deleteItem);
		linksLi.appendChild(deleteLink);
	};
	
	getData()
});	
		
$('#addItem').on('pageinit', function(){

console.log("addItem loaded.");
//This function grabs the value of the checkbox for the storeData function.
function getCheckboxValue(){
	if($('buffTouch').checked){
		checkValue = $('buffTouch').value;
	} else {
		checkValue = "No";
	};
};

$('#buffForm').submit(storeData);

var storeData = function(data){
	console.log("storeData has run");
		var id;
		if(!data){
			id		= Math.floor(Math.random()*100000001); //Creating an ID number allows you to create multiple saves
		}else{
			id = data;
		};
		
		//gather up all our form field values and store them in an object.
		//Object properties contain an array that has the form label and the input values.
		//getSelectedRadio(); //Sets the variable that is used in the object
		getCheckboxValue(); //Same for checkbox
		var item				= {}; //Create the Object
			item.name			= ["Buff Name:", $('#buffName').val()]; //Assign it values based on the elements in the form using the getElementById function.
			item.rounds			= ["Rounds:", $('#buffRounds').val()];
			item.type			= ["Buff Type:", $('#buffType').val()];//.val() is the JQM API Attribute that we use to store the user input.
			item.tohit			= ["To Hit:", $('#buffToHit').val()];
			item.damage			= ["Damage:", $('#buffDamage').val()];
			item.ac 			= ["AC:", $('#buffAC').val()];
			item.touch/*chkbox*/= ["To Touch:", checkValue];
			item.fortitude		= ["Fortitude:", $('#buffFortitutde').val()];
			item.reflex			= ["Reflex:", $('#buffReflex').val()];
			item.will			= ["Will:", $('#buffWill').val()];
			item.strength		= ["Strength:", $('#buffStrength').val()];
			item.dexterity		= ["Desxterity:", $('#buffDexterity').val()];
			item.constitution	= ["Constitution:", $('#buffConstitution').val()];
			item.intelligence	= ["Intelligence:", $('#buffIntelligence').val()];
			item.wisdom			= ["Wisdom:", $('#buffWisdom').val()];
			item.charisma		= ["Charisma:", $('#buffCharisma').val()];
			item.circle			= ["Circle:", $('#buffCircle').val()];
			item.buffGame		= ["Buff Game", $('#buffGame').val()];
			item.active			= ["Active:", checkValue];
	
		//Save data into Local Storage; Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Buff Saved!");
			
};

/*
		var myForm = $('#buffForm');
		    myForm.validate({
				invalidHandler: function(form, validator) {
				},
				submitHandler: function() {
					var data = myForm.serializeArray();
					storeData(data);
				}
			});
*/

	//any other code needed for addItem page goes here
;
	
});//End of addItem pageinit

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	console.log("Function: autoFillData, has run");
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	};
};

var getData = function(){
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = document.createElement('li');
		var makeListAButton = document.createElement('a')
		var linksLi = document.createElement('li');
		var key = localStorage.key(i); //because this is in a for loop, i represents the iteration of the loop that we are in.
		var value = localStorage.getItem(key);
		var theBuff = JSON.parse(value); //Converts the string in local storage back to an object
		var makeSubListUl = document.createElement('ul');
		var buffGame = theBuff.buffGame[1];
		makeLi.appendChild(makeListAButton);
		makeListAButton.appendChild(makeSubListUl);
		makeSubListUl.attr('data-content-theme','d');
		for(var n in theBuff){
			if (theBuff[n][1] != 0){
				var makeSubLi = document.createElement('li');
				makeSubListUl.appendChild(makeSubLi);
				var optSubText = theBuff[n][0]+" "+theBuff[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubListUl.appendChild(linksLi);
			};
		};
		makeItemLinks(localStorage.key(i), linksLi, makeListAButton); //Create edit and delete links for each item in local storage
	};
};


var	deleteItem = function (){
	var ask = confirm("Are you sure want to remove this buff?");
	if(ask){
		localStorage.removeItem(this.key);
		alert("Buff removed.");
		window.location.reload();
	}else{
		alert("No changes made.");
	};			
};

					
var clearLocal = function(){
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


