// Hamburger Menu

var hamburger = document.getElementById('hamburger');
var open = document.getElementById('nav');
var style = open.style;

hamburger.addEventListener('click', function() {
	style.display = 'flex';
	hamburger.style.display = 'none';
	crossicon.style.display = 'flex';
})

var crossicon = document.getElementById('cross');

crossicon.addEventListener('click', function() {
	crossicon.style.display = 'none';
	style.display = 'none';
	hamburger.style.display = 'flex';
	document.getElementById('header').style.position = '';
})

// Team Accordeon

var accordeonItemTeam = document.getElementsByClassName('accordeon__item');

for (var i = 0; i < accordeonItemTeam.length; i++) {
	accordeonItemTeam[i].addEventListener('click', function(e) {
		e.preventDefault();
		if (!(this.classList.contains('accordeon__item_active'))) {
			for (var i = 0; i < accordeonItemTeam.length; i++) {
				accordeonItemTeam[i].classList.remove('accordeon__item_active');
			}
			this.classList.add('accordeon__item_active');
		}
		else if (this.classList.contains('accordeon__item_active')) {
			for (var i = 0; i < accordeonItemTeam.length; i++) {
				accordeonItemTeam[i].classList.remove('accordeon__item_active');
			}
		}
	})
}

// Menu Accordeon

var acc = document.getElementsByClassName('menu-acc__item');

for (var i = 0; i < acc.length; i++) {
	acc[i].addEventListener('click', function(e) {
		e.preventDefault();
		if (!(this.classList.contains('menu-acc__item_active'))) {
			for (var i = 0; i < acc.length; i++) {
				acc[i].classList.remove('menu-acc__item_active');
			}
			this.classList.add('menu-acc__item_active');
		}
		else if (this.classList.contains('menu-acc__item_active')) {
			for (var i = 0; i < acc.length; i++) {
				acc[i].classList.remove('menu-acc__item_active');
			}
		}
	})
}