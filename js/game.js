

setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"bg1.png",
	startBtn:"tombolStart.png",
	cover:"cover.jpg",
	playBtn:"btn-play.png",
	maxBtn:"maxBtn.png",
	minBtn:"minBtn.png",
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall:"Fall.png",
	hit:"Hit.png",
    terrain:"Terrain.png",
	bg:"Gray.png",
	item:"Bananas.png",
	musuhidle:"enemy1Idle.png",
	musuhrun:"enemy1Run.png",
	musuhhit:"enemy1Hit.png",
	Flag:"flag.png",
	item2:"Apple.png",
   enemyidle:"ayamidle.png",
   enemyrun:"ayamrun.png",
   enemyhit:"ayamhit.png",
   Doblejump:"doblejump.png",
   slimeidle:"sidle.png",
   slimerun:"sidle.png",
   slimehit:"shit.png"
  
}
//file suara yang dipakai dalam game
var suara = {
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen(){	
	hapusLayar("#67d2d6");
	tampilkanGambar(dataGambar.logo, 600, 250);
	var startBtn = tombol(dataGambar.startBtn, 600, 350);
	if (tekan(startBtn)){
		jalankan(halamanCover);
	}
}
function halamanCover(){
	hapusLayar("#9c9695");
	gambarFull(dataGambar.cover);
	var playBtn = tombol(dataGambar.playBtn, 1100, 500);
	if (tekan(playBtn) || game.spasi){
		if (game.aktif) {
			//mulai game dengan menambahkan transisi
			game.status = "mulai";
			game.level = 1;
			game.score = 0;
			game.warnaTransisi = "#8f8f8f";
			transisi("out", setAwal);
		}
	}	
	resizeBtn(1150,50);
	efekTransisi();
}


function setAwal(){
	game.aktif = true;
	game.hero = setSprite(dataGambar.idle,32,32);
	game.hero.animDiam = dataGambar.idle;
	game.hero.animJalan = dataGambar.run;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	game.skalaSprite = 2;	
	//setPlatform(map_1, dataGambar.tileset, 32, game.hero);
	setPlatform(this["map_"+game.level], dataGambar.terrain, 32, game.hero);
	game.gameOver = ulangiPermainan;
	//set item
	setPlatformItem(1, dataGambar.item);
	setPlatformItem(2, dataGambar.item2);
	//set musuh
	var musuh1 = {};
	musuh1.animDiam = dataGambar.musuhidle;
	musuh1.animJalan = dataGambar.musuhrun;
	musuh1.animMati = dataGambar.musuhhit;
	setPlatformEnemy(1, musuh1);
	var musuh1 = {};
	musuh1.animDiam = dataGambar.enemyidle;
	musuh1.animJalan = dataGambar.enemyrun;
	musuh1.animMati = dataGambar.enemyhit;
	setPlatformEnemy(2, musuh1);
	
	//set trigger
	setPlatformTrigger(1, dataGambar.Flag);
	if (game.status == "mulai"){
		game.status = "main";
		mulaiPermainan();
	}
}

function mulaiPermainan(){
	jalankan(gameLoop);
	transisi("in");
}

function ulangiPermainan(){	
	setAwal();	
	game.aktif = true;
	jalankan(gameLoop);
}

function gameLoop(){
	hapusLayar("#9c9695");
	if (game.kanan){
		gerakLevel(game.hero, 3, 0);
	}else if (game.kiri){				
		gerakLevel(game.hero, -3, 0);
	}
	if (game.atas){
		gerakLevel(game.hero, 0, -10);
	}
		
	latar(dataGambar.bg, 0, 0.5);
	buatLevel();
	cekItem();
	teks(game.score, 40, 60, "Calibri-bold-20pt-left-biru");
	efekTransisi();
}

function cekItem(){
	if (game.itemID > 0){
		tambahScore(10*game.itemID);
		game.itemID = 0;
	}
	if (game.musuhID != 0){
		tambahScore(25);
		game.musuhID = 0;
	}
	if (game.triggerID == 1){
		game.triggerID = 0;
		game.aktif = false;
		transisi("out", naikLevel);		
	}
}

function naikLevel(){
	game.level++;
	if (game.level>=4){
		transisi("in");
		jalankan(halamanCover);
	}else{
		game.status = "mulai";
		setAwal();
	}
}

