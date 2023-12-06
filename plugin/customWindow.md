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
