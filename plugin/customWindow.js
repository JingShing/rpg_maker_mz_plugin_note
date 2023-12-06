//=============================================================================
// RPG Maker MZ - Custom Log Window
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays text in log.
 * @author JingShing
 *
 * @help CustomLogWindow.js
 *
 * # command set
 * ## ui open and close
 * open ui:
 * SceneManager._scene.custom_ui_open()
 * close ui:
 * SceneManager._scene.custom_ui_close()
 * 
 * ## exp command
 * edit exp you want to give:
 * Window_Custom_Exp.exp_get_value = exp_you_want_to_give;
 * give exp:
 * Window_Custom_Exp.gainExp(Window_Custom_Exp.exp_get_value);
 * 
 * ## distance to goal
 * edit goal distance:
 * Window_Custom_Steps.goal_range = distance;
 * detect if is to goal:
 * Window_Custom_Steps.is_goal()
 * 
 * ## Log
 * Window_Custom_Log.add_new_text("log test")
 */

// this is helping coding test with cache error
Bitmap.prototype._startLoading = function() {
    this._image = new Image();
    this._image.onload = this._onLoad.bind(this);
    this._image.onerror = this._onError.bind(this);
    this._destroyCanvas();
    this._loadingState = "loading";
    if (Utils.hasEncryptedImages()) {
        this._startDecrypting();
    } else {
        this._image.src = this._url;
        // fixed browser refresh image display error problem
        // this problem happens using vscode
        // if (this._image.width > 0) {
        //     this._image.onload = null;
        //     this._onLoad();
        // }
    }
};

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

// gold window
function Window_Custom_Gold() {
    this.initialize(...arguments);
}

Window_Custom_Gold.prototype = Object.create(Window_Base.prototype);
Window_Custom_Gold.prototype.constructor = Window_Custom_Gold;

Window_Custom_Gold.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.opacity = 0;
    this.refresh();
};

Window_Custom_Gold.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Gold.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Gold.prototype.refresh = function() {
    this.contents.clear();
    x = 0;
    y = 0;
    this.drawText(`G: ${this.value()}`, x, y, 200);
};

Window_Custom_Gold.prototype.value = function() {
    return $gameParty.gold();
};

Window_Custom_Gold.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Custom_Gold.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// Bag
function Window_Custom_Bag() {
    this.initialize(...arguments);
}

Window_Custom_Bag.prototype = Object.create(Window_Base.prototype);
Window_Custom_Bag.prototype.constructor = Window_Custom_Bag;

Window_Custom_Bag.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.opacity = 0;
    this.refresh();
};

Window_Custom_Bag.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Bag.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Bag.prototype.refresh = function() {
    this.contents.clear();
    x = 0;
    y = 0;
    this.drawText(`BAG: ${this.value()}/${this.max_value()}`, x, y, 200);
};

Window_Custom_Bag.prototype.max_value = function() {
    return 10;
};

Window_Custom_Bag.prototype.value = function() {
    return 0;
};

Window_Custom_Bag.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// hp
function Window_Custom_Hp() {
    this.initialize(...arguments);
}

Window_Custom_Hp.prototype = Object.create(Window_Base.prototype);
Window_Custom_Hp.prototype.constructor = Window_Custom_Hp;

Window_Custom_Hp.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.opacity = 0;
    Window_Custom_Hp.last_hp = this.value();
    this.refresh();
};

Window_Custom_Hp.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Hp.prototype.colSpacing = function() {
    return 0;
};

var now_hp = 0;
Window_Custom_Hp.prototype.refresh = function() {
    // get hurt exp
    now_hp = this.value();
    this.contents.clear();
    x = 0;
    y = 0;
    this.drawText(`HP: ${now_hp}/${this.max_value()}`, x, y, 200);
    // Window_Custom_Hp.last_hp = now_hp;
};

Window_Custom_Hp.prototype.max_value = function() {
    return $gameActors._data[1].mhp;
};

Window_Custom_Hp.prototype.value = function() {
    return $gameActors._data[1]._hp;
};

Window_Custom_Hp.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// level
function Window_Custom_Level() {
    this.initialize(...arguments);
}

Window_Custom_Level.prototype = Object.create(Window_Base.prototype);
Window_Custom_Level.prototype.constructor = Window_Custom_Level;

Window_Custom_Level.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.opacity = 0;
    this.refresh();
};

Window_Custom_Level.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Level.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Level.prototype.refresh = function() {
    this.contents.clear();
    x = 0;
    y = 60;
    this.contents.fontSize = 60;
    this.drawText(`${this.value()}/${this.max_value()}`, x, y, 200);
};

Window_Custom_Level.prototype.max_value = function() {
    return $gameActors._data[1].maxLevel();
};

Window_Custom_Level.prototype.value = function() {
    return $gameActors._data[1].level;
};

Window_Custom_Level.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// EXP
// give exp
// Window_Custom_Exp.gainExp(Window_Custom_Exp.exp_get_value);
// exp value
// Window_Custom_Exp.exp_get_value = exp_value;
function Window_Custom_Exp() {
    this.initialize(...arguments);
}

Window_Custom_Exp.prototype = Object.create(Window_Base.prototype);
Window_Custom_Exp.prototype.constructor = Window_Custom_Exp;
Window_Custom_Exp.exp_get_value = 10;
Window_Custom_Exp.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.opacity = 0;
    this.refresh();
};

Window_Custom_Exp.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Exp.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Exp.prototype.refresh = function() {
    this.contents.clear();
    x = 0;
    y = 0;
    this.drawText(`Exp: ${this.value()}/${this.max_value()}`, x, y, 200);
};

Window_Custom_Exp.prototype.max_value = function() {
    return $gameActors._data[1].expForLevel($gameActors._data[1].level+1);
};

Window_Custom_Exp.prototype.value = function() {
    // return $gameActors._data[1]._exp[$gameActors._data[1].level];
    return $gameActors._data[1]._exp[1];
};

Window_Custom_Exp.prototype.open = function(){
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

Window_Custom_Exp.gainExp = function(exp){
    $gameActors._data[1].gainExp(exp);
}

// status window
function Window_Custom_Status() {
    this.initialize(...arguments);
}

Window_Custom_Status.prototype = Object.create(Window_Base.prototype);
Window_Custom_Status.prototype.constructor = Window_Custom_Status;

Window_Custom_Status.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.opacity = 0;
    this.refresh();
};

Window_Custom_Status.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Status.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Status.prototype.refresh = function() {
    this.contents.clear();
    x = 0;
    y = 0;
    text_interval = 45;
    this.drawText(`STR: ${this.str()}`, x, y, 200);
    this.drawText(`AGI: ${this.agi()}`, x, y+text_interval*1, 200);
    this.drawText(`VIT: ${this.vit()}`, x, y+text_interval*2, 200);
    this.drawText(`LUK: ${this.luk()}`, x, y+text_interval*3, 200);
    this.drawText(`OVARY: ${this.ovary()}`, x, y+text_interval*4, 200);
};

Window_Custom_Status.prototype.str = function() {
    return $gameActors._data[1].atk;
};
Window_Custom_Status.prototype.agi = function() {
    return $gameActors._data[1].agi;
};
Window_Custom_Status.prototype.vit = function() {
    return $gameActors._data[1].def;
};
Window_Custom_Status.prototype.luk = function() {
    return $gameActors._data[1].luk;
};
Window_Custom_Status.prototype.ovary = function() {
    return $gameActors._data[1].maxLevel();
};

Window_Custom_Status.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// steps window
function Window_Custom_Steps() {
    this.initialize(...arguments);
}

Window_Custom_Steps.prototype = Object.create(Window_Base.prototype);
Window_Custom_Steps.prototype.constructor = Window_Custom_Steps;

Window_Custom_Steps.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    // remove outline and background
    this.steps = 0;
    this.opacity = 0;
    this.refresh();
};

Window_Custom_Steps.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Steps.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Steps.last_steps = 0;
Window_Custom_Steps.goal_range = 100;
Window_Custom_Steps.step_rate = 1;
Window_Custom_Steps.is_step = function(now_step){
    var step_diff = now_step - Window_Custom_Steps.last_steps;
    if(step_diff>0){
        return true;
    }
    return false;
}
// distance to goal
Window_Custom_Steps.is_goal = function(){
    if(Window_Custom_Steps.goal_range<=0){
        return true;
    }
    return false;
}
Window_Custom_Steps.prototype.refresh = function() {
    this.contents.clear();
    // step exp
    var now_step = this.value();
    // var gain_exp = now_step - Window_Custom_Steps.last_steps;
    if(Window_Custom_Steps.is_step(now_step)){
        $gameActors._data[1].gainExp(Window_Custom_Exp.exp_get_value);
        Window_Custom_Steps.goal_range-=Window_Custom_Steps.step_rate;
    }
    x = 0;
    y = 0;
    // this.drawText(`STEPS: ${now_step}`, x, y, 200);
    this.drawText(`Goal: ${Window_Custom_Steps.goal_range}m`, x, y, 200);
    Window_Custom_Steps.last_steps = now_step;
};

Window_Custom_Steps.prototype.value = function(){
    return $gameParty._steps;
}

Window_Custom_Steps.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// battle log edit
// SceneManager._scene._logWindow.addText(`受傷得到 ${Window_Custom_Exp.exp_get_value} exp`);
// Window_BattleLog.prototype.refresh = function() {
//     now_hp = $gameActors._data[1]._hp;
//     if($gameParty.inBattle() && Window_Custom_Hp.last_hp > now_hp){
//         $gameActors._data[1].gainExp(Window_Custom_Exp.exp_get_value);
//         this.addText(`受傷得到 ${Window_Custom_Exp.exp_get_value} exp`);
//         Window_Custom_Hp.last_hp = $gameActors._data[1]._hp;
//         wait();
//     }

//     this.drawBackground();
//     this.contents.clear();
//     for (let i = 0; i < this._lines.length; i++) {
//         this.drawLineText(i);
//     }
// };


// log
var custom_log_lines = []
function Window_Custom_Log() {
    this.initialize(...arguments);
}

Window_Custom_Log.prototype = Object.create(Window_Base.prototype);
Window_Custom_Log.prototype.constructor = Window_Custom_Log;

Window_Custom_Log.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.lines_len = 7;
    // custom_log_lines = ["test", "AAAAAAA", "BBBBBBB", "CCCCCC", "DDDDDD", "EEEEEE", "FFFFFF"];
    // remove outline and background
    // this.opacity = 0;
    this.refresh();
};

Window_Custom_Log.prototype.update = function(rect) {
    Window_Base.prototype.update.call(this, rect);
    this.refresh();
};

Window_Custom_Log.prototype.colSpacing = function() {
    return 0;
};

Window_Custom_Log.prototype.refresh = function() {
    this.contents.clear();
    x = 0;
    y = 0;
    interval = 30;
    this.contents.paintOpacity = 255;
    // custom font
    // this.contents.fontFace = "custom_font";
    for(const i in  custom_log_lines){
        if (i<this.lines_len){
            this.drawText(custom_log_lines[i], x, y+170-interval*i, 200);
            this.contents.paintOpacity -= 30;
            // if(i==1)this.contents.textColor = "red";
        }
    }
};

Window_Custom_Log.add_new_text = function(new_text) {
    custom_log_lines.splice(0, 0, new_text);
    while(custom_log_lines.length>this.lines_len){
        custom_log_lines.pop();
    }
    // console.log(custom_log_lines);
}

Window_Custom_Log.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

// map scene start
const map_long_scene_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    map_long_scene_start.call(this);

    // gold window
    gold_window_x = 1360;
    gold_window_y = 60;
    this.custom_money_window_instance = new Window_Custom_Gold(new Rectangle(gold_window_x, gold_window_y, 200, 69, 1));
    this.addChild(this.custom_money_window_instance);
    // bag window
    bag_window_x = 1060;
    bag_window_y = 60;
    this.custom_bag_window_instance = new Window_Custom_Bag(new Rectangle(bag_window_x, bag_window_y, 200, 69, 1));
    this.addChild(this.custom_bag_window_instance);
    // hp window
    bag_window_x = 760;
    bag_window_y = 60;
    this.custom_hp_window_instance = new Window_Custom_Hp(new Rectangle(bag_window_x, bag_window_y, 200, 69, 1));
    this.addChild(this.custom_hp_window_instance);
    // level window
    bag_window_x = 460;
    bag_window_y = 0;
    this.custom_level_window_instance = new Window_Custom_Level(new Rectangle(bag_window_x, bag_window_y, 500, 169, 1));
    this.addChild(this.custom_level_window_instance);
    // exp window
    bag_window_x = 460;
    bag_window_y = 150;
    this.custom_exp_window_instance = new Window_Custom_Exp(new Rectangle(bag_window_x, bag_window_y, 400, 69, 1));
    this.addChild(this.custom_exp_window_instance);
    // status window
    bag_window_x = 790;
    bag_window_y = 650;
    this.custom_status_window_instance = new Window_Custom_Status(new Rectangle(bag_window_x, bag_window_y, 180, 240, 1));
    this.addChild(this.custom_status_window_instance);
    // steps window
    bag_window_x = 760;
    bag_window_y = 150;
    this.custom_steps_window_instance = new Window_Custom_Steps(new Rectangle(bag_window_x, bag_window_y, 180, 240, 1));
    this.addChild(this.custom_steps_window_instance);
    // log window
    log_x = 1250;
    log_y = 670;
    this.custom_log_window_instance = new Window_Custom_Log(new Rectangle(log_x, log_y, 350, 230, 1));
    this.addChild(this.custom_log_window_instance);
};
// close ui
// SceneManager._scene.custom_ui_open()
Scene_Map.prototype.custom_ui_close = function() {
    var ui_view_value = 0;
    this.custom_money_window_instance.alpha = ui_view_value;
    this.custom_bag_window_instance.alpha = ui_view_value;
    this.custom_hp_window_instance.alpha = ui_view_value;
    this.custom_level_window_instance.alpha = ui_view_value;
    this.custom_exp_window_instance.alpha = ui_view_value;
    this.custom_status_window_instance.alpha = ui_view_value;
    this.custom_steps_window_instance.alpha = ui_view_value;
    this.custom_steps_window_instance.alpha = ui_view_value;
    this.custom_log_window_instance.alpha = ui_view_value;
}
// open ui
// SceneManager._scene.custom_ui_close()
Scene_Map.prototype.custom_ui_open = function() {
    var ui_view_value = 1;
    this.custom_money_window_instance.alpha = ui_view_value;
    this.custom_bag_window_instance.alpha = ui_view_value;
    this.custom_hp_window_instance.alpha = ui_view_value;
    this.custom_level_window_instance.alpha = ui_view_value;
    this.custom_exp_window_instance.alpha = ui_view_value;
    this.custom_status_window_instance.alpha = ui_view_value;
    this.custom_steps_window_instance.alpha = ui_view_value;
    this.custom_steps_window_instance.alpha = ui_view_value;
    this.custom_log_window_instance.alpha = ui_view_value;
}
// Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
//     const unitWidth = Math.min(80, this.textWidth(unit));
//     this.resetTextColor();
//     this.drawText(value, x, y, width - unitWidth - 6, "right");
//     this.changeTextColor(ColorManager.systemColor());
//     this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
// };

// $gameActors._data[1].maxLevel()
// $gameActors._data[1]._level
