var reset = document.getElementById('start');

function StartGame(event){
	event.preventDefault();
    
	let OurCards =
    [
        {'sel':'1','picture':'images/1.jpg'},
        {'sel':'2','picture':'images/2.jpg'},
        {'sel':'3','picture':'images/3.jpg'},
        {'sel':'4','picture':'images/4.jpg'},
        {'sel':'5','picture':'images/5.jpg'},
        {'sel':'6','picture':'images/6.jpg'},
        {'sel':'7','picture':'images/7.jpg'},
        {'sel':'8','picture':'images/8.jpg'},
        {'sel':'9','picture':'images/9.jpg'},
        {'sel':'10','picture':'images/10.jpg'},
        {'sel':'11','picture':'images/11.jpg'},
        {'sel':'12','picture':'images/12.jpg'}
    ];
	let FirstCard = '';
	let SecondCard = '';

	let selectLevel = document.getElementById("level").valueOf();
	let selectOption = selectLevel.options[selectLevel.selectedIndex].value;
    /*ВЫБИРАЕМ УРОВЕНЬ*/
    
	let selectOptionValue = selectOption.split('x');
	let rows = Number(selectOptionValue[0]);
	let columns = Number(selectOptionValue[1]);
	let url = window.location.toString();
    
    /*ВЫБИРАЕМ РУБАШКУ*/
 	let cardSelected = url.substring(url.indexOf('#') + 1);
    
    /*НОВЫЙ МАССИВ КАРТОЧЕК В ЗАВИСИМОСТИ ОТ УРОВНЯ ИГРЫ*/
	let tempArray = OurCards.concat(OurCards);
	let lengthNewArr = rows * columns;
	let shuffleArray = new Array(lengthNewArr);
	for(let j = 0; j < lengthNewArr/2; j++)
	{
		shuffleArray[j] = tempArray[j];
		shuffleArray[j+(lengthNewArr/2)] = tempArray[j+(tempArray.length/2)];
	}
    
    /*ПЕРЕТАСОВКА КАРТОЧЕК*/
	function shuffleCards(arr) {
	  let currentIndex = arr.length, temporaryValue, randomIndex;
	  while (currentIndex !== 0) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = arr[currentIndex];
	    arr[currentIndex] = arr[randomIndex];
	    arr[randomIndex] = temporaryValue;
	  }
	  return arr;
	};
    
	shuffleCards(shuffleArray);
    /*Число оставшихся карт*/
	let count = 0;
	let NumCards = 0;
	let previousTarget = null;
	let MemoryCard = document.getElementById('Container');
	let grid = document.createElement('section');
	grid.setAttribute('class','GridCards');
	switch(selectLevel.selectedIndex)
	{
		case 0:
			grid.style.width = 50 + "%";
			grid.style.height = 70 + "%";
			count = 10;
		break;
		case 1:
			grid.style.width = 60 + "%";
			grid.style.height = 80 + "%";
			grid.style.paddingLeft = 260 + "px";
			grid.style.paddingTop = 60 + "px";
			count = 18;
		break;
		case 2:
			grid.style.width = 75 + "%";
			grid.style.height = 90 + "%";
			grid.style.paddingLeft = 200 + "px";
			grid.style.paddingTop = 40 + "px";
			count = 24;
		break;
	}

	for(let i = 0; i < shuffleArray.length; i++ )
	{
      /*СОЗДАЕМ ЛИСТ КАРТОЧЕК С ИДЕНТИФИКАТОРАМИ*/
	  let pictureCard = document.createElement('div');
	  pictureCard.classList.add('pictureCard');
	  pictureCard.dataset.sel = shuffleArray[i].sel;

      /*СОЗДАЕМ РУБАШКУ И КАРТИНКУ*/
	  let frontpictureCard = document.createElement('div');
	  frontpictureCard.classList.add('front');
	  if(cardSelected == "first")
	  	frontpictureCard.classList.add('front-1');
	  else if(cardSelected == "second")
	  	frontpictureCard.classList.add('front-2');
	  else if (cardSelected == "third")
	  	frontpictureCard.classList.add('front-3');
	  let backpictureCard = document.createElement('div');
	  backpictureCard.classList.add('back');
	  backpictureCard.style.backgroundImage = `url(${shuffleArray[i].picture})`;

	  /*ДОБАВЛЯЕМ РУБАШКУ И КАРТИНКУ КАРТОЧКЕ И ЗАНОСИМ ЕЕ В секцию GRID*/
	  grid.appendChild(pictureCard);
	  pictureCard.appendChild(frontpictureCard);
	  pictureCard.appendChild(backpictureCard);

	}
    
	MemoryCard.appendChild(grid);

    let mistakes = 0;
	let attempts = 0;
    
    /*ПРОВЕРКА НА ОКОНЧАНИЕ ИГРЫ*/
	var matchCard = function match() {
  		let selectedCard = document.querySelectorAll('.selected');
  		selectedCard.forEach(function (card) {
    		card.classList.add('match');
    		count--;
    		if(count === 0){
    			attempts++;
    			mistakes = Math.floor(mistakes/2);
  				setTimeout(window.alert("Поздравляем!" + "\nЧисло попыток: " + attempts + "\nЧисло ошибок: " + mistakes + "\nВаш счет: " + (attempts - mistakes)), 3000);
    		}
  		});
	};

    /*ВЕРНУТЬ КАРТЫ(ПОВЕРНУТЬ РУБАШКОЙ ВВЕРХ)*/
	var deleteCard = function deletecards(){
		previousTarget = null;
		FirstCard = '';
		SecondCard = '';
		NumCards = 0;
		let selectedCard = document.querySelectorAll('.selected');
		attempts++;
  		selectedCard.forEach(function (card) {
    		card.classList.remove('selected');
  		});
	};

    /*ОБРАБОТЧИК НАЖАТИЯ НА КАРТОЧКУ*/
	grid.addEventListener('click', function(event){
		let clicked = event.target;
		if (clicked.tagsel === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    	return;
  	}
  	if (NumCards < 2)
  	{
  		NumCards++;
  		if (NumCards === 1)
  		{	
  			FirstCard = clicked.parentNode.dataset.sel;
  			clicked.parentNode.classList.add('selected');
  		} else {
  			SecondCard = clicked.parentNode.dataset.sel;
  			clicked.parentNode.classList.add('selected');
  		};
  		if(FirstCard && SecondCard){
  			if(FirstCard === SecondCard){
  				setTimeout(matchCard,900);
  			}
  			setTimeout(deleteCard,900);
  			mistakes++;
  		}
  		previousTarget = clicked;
  	}
	});

	let resetback = document.getElementById('back');
    /*ОЧИСТКА*/
	function DeleteGridCards (event)
	{
		let parent = document.getElementById('Container');
  		parent.removeChild(parent.firstChild);
	};
	resetback.addEventListener('click',DeleteGridCards);


};
reset.addEventListener('click',StartGame);
