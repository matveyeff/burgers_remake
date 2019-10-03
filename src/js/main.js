var hamburger = document.getElementById('mobile');
var open = document.getElementById('nav');
var style = open.style;

hamburger.addEventListener('click', function() {
	style.display = 'flex';
	hamburger.style.display = 'none';
})

var team = document.getElementsByClassName('accordeon__item');

for (var i = 0; i < team.length; i++) {
	team[i].addEventListener('click', function(e) {
		e.preventDefault();
		if (!(this.classList.contains('accordeon__item_active'))) {
			for (var i = 0; i < team.length; i++) {
				team[i].classList.remove('accordeon__item_active');
			}
			this.classList.add('accordeon__item_active');
		}
		else if (this.classList.contains('accordeon__item_active')) {
			for (var i = 0; i < team.length; i++) {
				team[i].classList.remove('accordeon__item_active');
			}
		}
	})
}