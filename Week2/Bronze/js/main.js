$('#home').on('pageinit', function(){
	//code needed for home page goes here
	var searchControl = $('.searchButton');
	searchControl.live('click', toggleSearch);
	function toggleSearch () {
		$('.ui-listview-filter').fadeToggle("slow", "linear");	
	};
	
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#formId');
		    myForm.validate({
				invalidHandler: function(form, validator) {
				},
				submitHandler: function() {
					var data = myForm.serializeArray();
					storeData(data);
				}
			});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

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
			item.buffGame		= ["Buff Game", $('buffGame').value];
			item.active			= ["Active:", checkValue];
	
		//Save data into Local Storage; Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Buff Saved!");
			
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


