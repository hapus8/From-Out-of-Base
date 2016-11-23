// タイトルの処理を司るTitleSceneクラス

class TitleScene {
    // コンストラクタ
    constructor(){
        // ボタンの初期値
        this.button = new Array(3);
        const LOC_X = SCREEN_WIDTH - 200;
        const LOC_Y = 40;
        const WIDTH = 120;
        const HEIGHT = 48;
        const INTERVAL = 24;
        for(let i = 0; i < this.button.length; i++){
            this.button[i] = {x: LOC_X, y: LOC_Y + (HEIGHT + INTERVAL) * i, width: WIDTH, height: HEIGHT, on_flag: false, click_flag: false};
        }
    }

    // メソッド
    Process(){
        // 背景の描画
        //ctx.drawImage(Asset.images.back, 0, 0);
        render.stack.Add(Asset.images.back, 0, 0);

        // ボタンプロセス
        for(let i = 0; i < this.button.length; i++){
            // ボタンの処理
            if(this.button[i].x < mouse.x && mouse.x < this.button[i].x + this.button[i].width &&
                this.button[i].y < mouse.y && mouse.y < this.button[i].y + this.button[i].height){
                    this.button[i].on_flag = true;
                    this.button[i].clicked_flag = mouse.input.click_flag === true;
            }else{
                this.button[i].on_flag = false;
                this.button[i].clicked_flag = false;
            }

            // ボタンの描画
            if(this.button[i].on_flag === false){
                //ctx.drawImage(Asset.images.button_flame_0, this.button[i].x, this.button[i].y);
                render.stack.Add(Asset.images.button_flame_0, this.button[i].x, this.button[i].y);
            }else{
                render.stack.Add(Asset.images.button_flame_1, this.button[i].x, this.button[i].y);
            }
        }

        return null;
    }
}
