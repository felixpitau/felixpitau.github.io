var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x222222});
var renderer = app.renderer;
var view = app.view;
var stage = app.stage;

var width = window.innerWidth,
 		height = window.innerHeight;

var stars = [];
var starCount = 0;

var centerPiece;

function onLoadResize() {
  //centerPiece.style.top = "calc(50vh - " + (centerPiece.offsetHeight / 2) + "px)";
	stage.removeChildren();

	stars = [];
	starCount = Math.floor((window.innerWidth * window.innerHeight) / 4000);

	for (var i = 0; i < starCount; i++) {
		var star = new PIXI.Graphics();
		star.lineStyle(0);
		star.beginFill(0xFFFFFF, (Math.random() * 0.8) + 0.2);
		star.drawCircle(0, 0, 10);
		star.endFill();
		var scale = 0.08 + (Math.random() * 0.11);
		star.scale.x = scale;
		star.scale.y = scale;
		star.x = Math.floor(Math.random() * width);
		star.y = Math.floor(Math.random() * height);
		stars.push(star);
		stage.addChild(star);
	}
}

function onOneSecond() {
  //document.body.removeAttribute('class');
}

function setView(viewName) {
  var viewItems = document.querySelectorAll('.view');
  var navItems = document.querySelectorAll('nav .item');
  viewItems.forEach( (val) => {
    val.classList.add('view-away');
  });
  navItems.forEach( (val) => {
    val.classList.remove('active');
  });
  document.querySelector('nav .item.item-' + viewName).classList.add('active');
  document.querySelector('.view.view-' + viewName).classList.remove('view-away');
}

app.ticker.add(function(delta) {
	for (var i = 0; i < stars.length; i++) {
		var star = stars[i];
		star.y += (star.scale.x * 3.2) - 0.4;
		star.alpha = 0.5 + (Math.random() * 0.5);
		if (star.y > height + 10) {
			star.y = -10;
		}
		if (star.y < -10) {
			star.y = height + 10;
		}
	}
});

window.onload = function() {
	//document.body.appendChild(view);
  document.querySelector('section.start').appendChild(view);
  //centerPiece = document.getElementById('center-piece');

  //document.querySelector('nav .item.item-about').addEventListener('click', () => {setView('about')});
  //document.querySelector('nav .item.item-work').addEventListener('click', () => {setView('work')});
  //document.querySelector('nav .item.item-contact').addEventListener('click', () => {setView('contact')});

	onLoadResize();
  setTimeout(onOneSecond, 900);
};

window.onresize = function () {
	width = window.innerWidth;
	height = window.innerHeight;
	view.width = width;
	view.height = height;
	renderer.view.style.width = width + 'px';
	renderer.view.style.height = height + 'px';
  renderer.resize(width, height);
	onLoadResize();
};
