步數
BUFF

優化：
LOG->圖層、戰鬥

log 右下移動

ui 關閉、ui 開啟

SceneManager

大部分都畫在這
SceneManager._scene

升級射精動畫

$gamePlayer.isMoving()


# 字體自訂JS
// font manager
const font_manager_start = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
    font_manager_start.call(this);
    // const advanced = $dataSystem.advanced;
    // FontManager.load("rmmz-mainfont", advanced.mainFontFilename);

    // need to put font into fonts folder
    // ttf, woff, otf
    var custom_font_name = "custom_font.ttf";
    FontManager.load("custom_font", custom_font_name);
};

// custom font
this.contents.fontFace = "custom_font";

# 指令集
## ui 關閉開啟
開啟 ui
SceneManager._scene.custom_ui_open()
關閉 ui
SceneManager._scene.custom_ui_close()

## exp經驗值
Window_Custom_Exp.exp_get_value = 要給的經驗值數量;
Window_Custom_Exp.gainExp(Window_Custom_Exp.exp_get_value);

## 距離
改距離
Window_Custom_Steps.goal_range = 距離;
判斷有沒有到達目標
Window_Custom_Steps.is_goal()

## Log
Window_Custom_Log.add_new_text("log記錄")
