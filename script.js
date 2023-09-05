const itemList = document.querySelector('#itemList');
const summaryList = document.querySelector('#summary');
const total = document.querySelector('#total');
const Offer = new Map();
const Summary = new Array();
const SummaryQuantities = new Map();

addFoodItem("Brownie",["butter","dark chocolate","eggs","sugar","flour","salt","hazelnuts"],88,90,"brownie",false);
addFoodItem("Cheesecake",["sol", "pieprz"],90,130,"cheesecake",false);
addFoodItem("Truskawkowe",["sol", "pieprz"],188,190,"truskawkowe",false);
addFoodItem("Lemon Tart",["sol", "pieprz", "nuts"],88,90,"brownie",false);
addFoodItem("Macaroons",["ground almonds","powdered sugar","egg white","sugar","water","food colouring"],88,90,"brownie",false);
addDrinkItem("Hazelnut Latte",["sol", "pieprz", "nuts"],10,250,"hazelnut_latte",false);
addDrinkItem("Hazelnut Latte",["sol", "pieprz", "nuts"],15,500,"hazelnut_latte",false);
addDrinkItem("Espresso",[],8,35,"espresso",true);
addDrinkItem("Espresso Lungo",["20 grams medium-ground coffee","water","sugar to taste"],10,110,"espresso_lungo",true);
addDrinkItem("Latte",[],10,110,"espresso_lungo",true);
addDrinkItem("Cappuccino",[],10,110,"espresso_lungo",true);
addDrinkItem("Americano",[],10,110,"espresso_lungo",true);
addDrinkItem("Doppio",[],10,110,"espresso_lungo",true);
addDrinkItem("Mocha",[],10,110,"espresso_lungo",true);
addDrinkItem("Ristretto",[],10,110,"espresso_lungo",true);
addDrinkItem("Flat White",[],10,110,"espresso_lungo",true);
addDrinkItem("Affogato",[],10,110,"espresso_lungo",true);
addDrinkItem("Irish",[],10,110,"espresso_lungo",true);

itemList.innerHTML = writeAllOffers();
refreshOfferView();
refreshSummaryView();

function FoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten) {
	this.name = name;
	this.ingredients = ingredients;
	this.pricePerKilogram = pricePerKilogram;
	this.pieceWeight = pieceWeight;
	this.price = Math.round((pieceWeight/1000)*pricePerKilogram);
	this.imgId = imgId;
	this.image = '<img src="images/'+imgId+'.jpg">';
	this.allergensAlert = allergensAlert(ingredients);
	this.gluten = gluten;
}

function DrinkItem(name, ingredients, price, volume, imgId,gluten) {
	this.name = name;
	this.ingredients = ingredients;
	this.price = price;
	this.volume = volume;
	this.imgId = imgId;
	this.image = '<img src="images/'+imgId+'.jpg">';
	this.allergensAlert = allergensAlert(ingredients);
	this.gluten = gluten;
}

function allergensAlert(ingredients) {
	if(ingredients.includes('hazelnuts') || ingredients.includes('ground almonds')) {
		return  "CONTAINS NUTS";
	}
	else return "";
}

function writeAllOffers() {
	let offerList = '';
	for(let offerId of Offer.keys()) {
		offerList += writeOffer(offerId);
	}
	return offerList +'<div style="clear: both;"></div>';	
}

function writeOffer(offerId) {
    let offerDescription ='<div class="offer">';
	offerDescription += '<span data-offerid="'+offerId+'" class="ingredientsLink">ingredients</span>';
	offerDescription += '<span data-offerid="'+offerId+'" class="ingredientsList"><span data-offerid="'+offerId+'" class="closeIngredients">x</span>'+Offer.get(offerId).ingredients.join(", ")+ '<span class="allergensAlert">'+Offer.get(offerId).allergensAlert+'</span></span>';	 
	if(Offer.get(offerId).name)  offerDescription += '<span class="name">'+Offer.get(offerId).name+'</span>'; 
	if(Offer.get(offerId).pricePerKilogram) offerDescription += '<span class="pricePerKilogram">Price per Kilogram: '+Offer.get(offerId).pricePerKilogram+' zł</span>';
	if(Offer.get(offerId).pieceWeight) offerDescription += '<span class="pieceWeight">Weight: '+Offer.get(offerId).pieceWeight+' g</span>';
	if(Offer.get(offerId).price) offerDescription += '<span class="price">Price: '+Offer.get(offerId).price+' zł</span>';
	if(Offer.get(offerId).volume) offerDescription += '<span class="volume">Volume: '+Offer.get(offerId).volume+' ml</span>';
	offerDescription += '<div class="image-container"><div class="image">' + Offer.get(offerId).image + '</div></div>';
	if(Offer.get(offerId).gluten) offerDescription += '<div class="gluten"><img src="images/gluten_free.jpg"></div>';
	offerDescription += '<span data-offerid="'+offerId+'"class="select">Dodaj</span>';
	offerDescription += '</div>';
	return offerDescription;
}

function addFoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten) {
	let newOfferId = 'Item'+(Offer.size+1);
	Offer.set(newOfferId,new FoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten));
}

function addDrinkItem(name, ingredients, price, volume, imgId,gluten) {
	let newOfferId = 'Item'+(Offer.size+1);
	Offer.set(newOfferId,new DrinkItem(name, ingredients, price, volume, imgId,gluten));
}

function deleteSelectedItem(selectedItemIndex) {
	SummaryQuantities.delete(JSON.stringify(Summary.at(selectedItemIndex)));
	Summary.splice(selectedItemIndex,1);
}

function addSelectedItemDelete() {
	const deleteLinks = document.querySelectorAll('.selectedDelete');
	for(let deleteLink of deleteLinks) {
		deleteLink.addEventListener('click', function() {
			deleteSelectedItem(this.dataset.selectedItemIndex);
			refreshSummaryView();
		});
	}
}

function writeSelectedItems() {
	let offerList = '';
	for(i=0; i<Summary.length; i++) {
		offerList += writeSelectedItem(i);
	}
	// return offerList +'<div style="clear: both;"></div>';		
	return '<span class="summaryHeader">My Order</span>' +offerList;
}

function writeSelectedItem(selectedItemIndex) {
    let offerDescription ='<div class="offerSummary">';
	if(Summary.at(selectedItemIndex).name)  offerDescription += '<span class="summary name-summary">'+Summary.at(selectedItemIndex).name+'</span>'; 
	if(Summary.at(selectedItemIndex).pieceWeight) offerDescription += '<span class="summary pieceWeight-summary"> '+Summary.at(selectedItemIndex).pieceWeight+' g</span>';
	if(Summary.at(selectedItemIndex).volume)  offerDescription += '<span class="summary volume-summary"> '+Summary.at(selectedItemIndex).volume+' ml</span>'; 
	offerDescription += '<span data-selected-item-index="'+selectedItemIndex+'"class="selectedDelete"><i class="icon-trash-empty"></i></span>';
	offerDescription += '<span class="summary quantity-box"><span data-selected-item-index="'+selectedItemIndex+'" class="quantityMinus quantity"> - </span><span class="quantity quantityNumber">'+SummaryQuantities.get(JSON.stringify(Summary.at(selectedItemIndex)))+'</span><span data-selected-item-index="'+selectedItemIndex+'" class="quantityPlus quantity"> + </span></span>';
	if(Summary.at(selectedItemIndex).price)  offerDescription += '<span class="summary price-summary"> '+Summary.at(selectedItemIndex).price*SummaryQuantities.get(JSON.stringify(Summary.at(selectedItemIndex)))+' zł</span>'; 
    offerDescription += '</div>';
	return offerDescription;
}

function addSelectedItemAdd() {
	const selectedLinks = document.querySelectorAll('.select');
	selectedLinks.forEach((selectedLink) => {
		selectedLink.addEventListener('click', function() {
            let quantity = SummaryQuantities.get(JSON.stringify(Offer.get(this.dataset.offerid)));
			if(quantity<20 || quantity==undefined) {
				let object ="";
				if (Offer.get(this.dataset.offerid) instanceof FoodItem) {
					let name = Offer.get(this.dataset.offerid).name;
					let ingredients = Offer.get(this.dataset.offerid).ingredients;
					let pricePerKilogram = Offer.get(this.dataset.offerid).pricePerKilogram;
					let pieceWeight = Offer.get(this.dataset.offerid).pieceWeight;
					let imgId = Offer.get(this.dataset.offerid).imgId;
					let gluten = Offer.get(this.dataset.offerid).gluten;
						
					object= new FoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten);
				}
				else {
					let name = Offer.get(this.dataset.offerid).name;
					let ingredients = Offer.get(this.dataset.offerid).ingredients;
					let price = Offer.get(this.dataset.offerid).price;
					let volume = Offer.get(this.dataset.offerid).volume;
					let imgId = Offer.get(this.dataset.offerid).imgId;
					let gluten = Offer.get(this.dataset.offerid).gluten;

					object = new DrinkItem(name, ingredients, price, volume, imgId,gluten);					
				}						
				if(!SummaryQuantities.has(JSON.stringify(object))) {
					Summary.push(object);
					SummaryQuantities.set(JSON.stringify(object),1);
				}
				else {
					SummaryQuantities.set(JSON.stringify(object), SummaryQuantities.get(JSON.stringify(object))+1);
				}
				refreshSummaryView();																					
			} 
		});
	});			
}

function refreshOfferView() {
	addSelectedItemAdd();	
	const selectedLinks = document.querySelectorAll('.select');
	selectedLinks.forEach((selectedLink) => {
		if(SummaryQuantities.get(JSON.stringify(Offer.get(selectedLink.dataset.offerid))) >19) {
			selectedLink.style.backgroundColor = "#e2dbd1";
			selectedLink.style.cursor = "default";
		} 
	});
	const ingredientsLinks = document.querySelectorAll('.ingredientsLink');
	for(let ingredientsLink of ingredientsLinks) {
		ingredientsLink.addEventListener('click', function() {
			showIngredients(this.dataset.offerid);
			ingredientsLink.style.cursor = 'default';
			ingredientsLink.style.backgroundColor = '';			
			ingredientsLink.addEventListener('mouseover', function() {
				ingredientsLink.style.backgroundColor = '';
			});
		});		
		ingredientsLink.addEventListener('mouseover', function() {
			ingredientsLink.style.background = 'rgba(148, 112, 98, .4)';
		});
		ingredientsLink.addEventListener('mouseout', function() {
			ingredientsLink.style.backgroundColor = '';
		});
	}	
	const closeIngredientsButtons = document.querySelectorAll('.closeIngredients');
	for(let button of closeIngredientsButtons) {
		button.addEventListener('click', function() {
			closeIngredients(this.dataset.offerid);
			button.style.cursor = 'pointer';
			for(let ingredientsLink of ingredientsLinks) {	
				if(this.dataset.offerid == ingredientsLink.dataset.offerid) {		
					ingredientsLink.style.cursor = "";			
				}			
			}
		});
	}
}

function refreshSummaryView() {
	summaryList.innerHTML = writeSelectedItems();	
	addSelectedItemDelete();
	writeTotalPrice();
	quantityPlus();
	quantityMinus();
	const quantityMinuses = document.querySelectorAll('.quantityMinus');
	quantityMinuses.forEach((quantityMinus) => {
		if(SummaryQuantities.get(JSON.stringify(Summary.at(quantityMinus.dataset.selectedItemIndex))) < 2) {
			quantityMinus.style.backgroundColor = "#e2dbd1";
			quantityMinus.style.cursor = "default";
		}
	});
	const quantityPluses = document.querySelectorAll('.quantityPlus');
	quantityPluses.forEach((quantityPlus) => {
		if(SummaryQuantities.get(JSON.stringify(Summary.at(quantityPlus.dataset.selectedItemIndex))) >19) {
			quantityPlus.style.backgroundColor = "#e2dbd1";
			quantityPlus.style.cursor = "default";
		}
	});
	const selectedLinks = document.querySelectorAll('.select');
	selectedLinks.forEach((selectedLink) => {
		let quantity = SummaryQuantities.get(JSON.stringify(Offer.get(selectedLink.dataset.offerid)));
		if(quantity>19) {
			selectedLink.style.backgroundColor = "#757575";
			selectedLink.style.cursor = "default";
			selectedLink.innerHTML = quantity;
		} 
		else if(quantity>1 && quantity<20) {
			selectedLink.style.backgroundColor = "#2c2c2c";
			selectedLink.style.cursor = "";
			selectedLink.innerHTML = quantity;
		}
		else if(quantity==1) {
			selectedLink.style.backgroundColor = "#2c2c2c";
			selectedLink.style.cursor = "";
			selectedLink.innerHTML = quantity;			
		}
		else {
			selectedLink.style.backgroundColor = "";
			selectedLink.style.cursor = "";	
			selectedLink.innerHTML = "Add";			
		}
	});
}

function writeTotalPrice() {
	let totalprice = 0;
	Summary.forEach((element) => totalprice += element.price * SummaryQuantities.get(JSON.stringify(element)));
	total.innerHTML =  '<span class="summary total">Total <b>'+ totalprice+' zł</b></span><span class="summary order">Checkout</span>';
}

function quantityPlus() {
	const pluses = document.querySelectorAll('.quantityPlus');		
	for(let plus of pluses) {
		plus.addEventListener('click', function() {
			let object = Summary.at(this.dataset.selectedItemIndex);
			let key = JSON.stringify(object);
			let quantity= SummaryQuantities.get(key);
			if(quantity <20) {
			SummaryQuantities.set(key, quantity+1);
			refreshSummaryView();
			}			
		});
	}
}

function quantityMinus() {
	const minuses = document.querySelectorAll('.quantityMinus');	
	for(let minus of minuses) {
		minus.addEventListener('click', function() {
			let object = Summary.at(this.dataset.selectedItemIndex);
			let key = JSON.stringify(object);
			let quantity= SummaryQuantities.get(key);
			if(quantity>1) {
				SummaryQuantities.set(key, quantity-1);
				refreshSummaryView();
			}
			else {
			}
		});
	}
}

function showIngredients(offerid) {
	const ingredientsLists =  document.querySelectorAll('.ingredientsList');
	for(let ingredientsList of ingredientsLists) {
		if(ingredientsList.dataset.offerid == offerid) {
			ingredientsList.style.display ="block";
		}
	}
}

function closeIngredients(offerid) {
	const ingredientsLists =  document.querySelectorAll('.ingredientsList');
	for(let ingredientsList of ingredientsLists) {
		if(ingredientsList.dataset.offerid == offerid) {		
			ingredientsList.style.display ="none";
		}
	}
	const ingredientsLinks = document.querySelectorAll('.ingredientsLink');
	for(let ingredientsLink of ingredientsLinks) {	
		ingredientsLink.addEventListener('mouseover', function() {
			ingredientsLink.style.background = 'rgba(148, 112, 98, .4)';
		});	
		ingredientsLink.addEventListener('mouseout', function() {
			ingredientsLink.style.backgroundColor = '';
		});
	}
}
