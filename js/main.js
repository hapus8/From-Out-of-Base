//画面のサイズ指定
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

window.addEventListener('load', init);

var canvas;
var ctx;

function init() {
  canvas = document.getElementById('maincanvas');
  ctx = canvas.getContext('2d');

  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;

  Asset.loadAssets(function() {
   // アセットがすべて読み込み終わったら、
   // ゲームの更新処理を始めるようにする
   requestAnimationFrame(update);
 });
}

function update(timestamp) {
  var delta = 0;
  if (lastTimestamp != null) {
    delta = (timestamp -+ lastTimestamp) / 1000;
  }
  lastTimestamp = timestamp;

  requestAnimationFrame(update);

  //毎フレーム１ずつ
  mikanX += a * delta;
  if(mikanX > 700 || mikanX < -5)
  {
    a = a* -1
  }

  render();
}

//みかん箱の表示X軸座標位置
var mikanX = 0;
var a = 100;

var lastTimestamp = null;

function render() {
  // 全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景を表示
  ctx.drawImage(Asset.images['back'], 0, 0);

  // みかん箱を表示
  ctx.drawImage(Asset.images['box'], mikanX, 400);
}

var Asset = {};

// アセットの定義
Asset.assets = [
  { type: 'image', name: 'back', src: 'assets/back.png' },
  { type: 'image', name: 'box', src: 'assets/box.png' }
];

// 読み込んだ画像
Asset.images = {};

// アセットの読み込み
Asset.loadAssets = function(onComplete) {
  var total = Asset.assets.length; // アセットの合計数
  var loadCount = 0; // 読み込み完了したアセット数

  // アセットが読み込み終わった時に呼ばれるコールバック関数
  var onLoad = function() {
    loadCount++; // 読み込み完了数を1つ足す
    if (loadCount >= total) {
      // すべてのアセットの読み込みが終わった
      onComplete();
    }
  };

  // すべてのアセットを読み込む
  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

// 画像の読み込み
Asset._loadImage = function(asset, onLoad) {
  var image = new Image();
  image.src = asset.src;
  image.onload = onLoad;
  Asset.images[asset.name] = image;
};
