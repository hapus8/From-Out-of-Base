//画面のサイズ指定
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

window.addEventListener('load', init);

var canvas;
var ctx;

function init() {
    console.log("init");
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
    /*ryuno: 元ソース
  var delta = 0;
  if (lastTimestamp !== null) {
    delta = (timestamp -+ lastTimestamp) / 1000;
  }
  lastTimestamp = timestamp;

  requestAnimationFrame(update);

  //毎フレーム１ずつ
  mikanX += a * delta;
  if(mikanX > 700 || mikanX < -5)
  {
    a = a* -1;
}*/
    // ryuno: メインプロセス

    // マウス情報のアップデート
    mouse.Process();

    // シーンのアップデート
    var input = game_scene.Process();
    if(input !== null){
        game_scene = input;
    }

    render.DrawRender();
}

//みかん箱の表示X軸座標位置
var mikanX = 0;
var a = 100;

var lastTimestamp = null;

function render() {
    // ryuno: レンダラスタック
    console.log("render process");
    this.stack = new RenderStack();

    // 自己参照
    let self = this;

    // 描画関数
    this.DrawRender = function(){
        // 全体をクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 描画
        self.stack.Draw();
    };


    // 背景を表示
    //ctx.drawImage(Asset.images.back, 0, 0);
    // みかん箱を表示
    //ctx.drawImage(Asset.images.box, mikanX, 400);
}

var Asset = {};

// アセットの定義
Asset.assets = [
  { type: 'image', name: 'back', src: 'assets/back.png' },
  { type: 'image', name: 'box', src: 'assets/box.png' },
  { type: 'image', name: 'button_flame_0', src: 'assets/Title/button_flame_0.png' },
  { type: 'image', name: 'button_flame_1', src: 'assets/Title/button_flame_1.png' }
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



// ryuno: マウスイベントを設定
class Mouse {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.input = {left: false, right: false};
    }

    Process(){
        let input_x;
        let input_y;
        document.body.addEventListener( "click", function( e ) {
        	// マウス位置を取得する
        	input_x = e.pageX ;	// X座標
        	input_y = e.pageY ;	// Y座標
        } );
        this.x = input_x;
        this.y = input_y;
    }
}
var mouse = new Mouse();    // マウスのインスタンス

// Sceneオブジェクト
var game_scene = new TitleScene();


// ryuno: renderのラッパ
class RenderStack{
    constructor(){
        this.stack = new Array(0);
    }
    // 描画オブジェクトの追加
    Add(_asset, _x, _y){
        this.stack.push({asset: _asset, x: _x, y: _y});
    }

    // 描画(描画時にスタック情報は破棄される)
    Draw(){
        // スタックされてなかった場合は終了
        if(this.stack.length === 0){
            return;
        }

        // スタック内のオブジェクトを描画する
        for(let i = 0; i < this.stack.length; i++){
            ctx.drawImage(this.stack[i].asset, this.stack[i].x, this.stack[i].y);
        }

        // スタックの破棄
        this.stack = new Array(0);
    }
}
