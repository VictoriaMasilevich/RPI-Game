let showback = document.getElementById('settings-window');
var reset = document.getElementById('start');
var container = document.getElementById('Container');
var resetback = document.getElementById('back');
let choose = document.getElementById('backcards');
let card = document.getElementById('CardsShift');
let time = document.getElementById('timer');



    var handleShowBack = function (event) {
        event.preventDefault();
        if (showback.style.display == "block")
        {
			showback.style.display = "none";
			choose.style.display = "none";
			container.style.display = "flex";
			resetback.style.display = "block";
            reset.style.display = "none";
            card.style.display = "none";
            time.style.display = "block";
        }
    };

    reset.addEventListener('click', handleShowBack);

    var handleShowFront = function (event) {
        event.preventDefault();
        if (showback.style.display == "none")
        {
			showback.style.display = "block";
			choose.style.display = "block";
			container.style.display = "none";
			resetback.style.display = "none";
            reset.style.display = "block";
        };
        var cardSleeve = url.substring(url.indexOf('#') + 1); 
        card.style.display = 'none';
    };

    resetback.addEventListener('click', handleShowFront);
    
    var handleShowShifts = function(event)
    {
        event.preventDefault();
        if(card.style.display == 'block') {
            card.style.display = 'none';
        }
        else 
            card.style.display = 'block';
    };

    choose.addEventListener('click', handleShowShifts);
