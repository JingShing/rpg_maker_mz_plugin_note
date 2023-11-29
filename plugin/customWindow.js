// gold window
function Window_Custom_Gold() {
    this.initialize(...arguments);
}

Window_Custom_Gold.prototype = Object.create(Window_Base.prototype);
Window_Custom_Gold.prototype.constructor = Window_Custom_Gold;

Window_Custom_Gold.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
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
    // x = this.x;
    // y = this.y;
    x = 0;
    y = 0;
    // this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
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

//



// map scene start
const map_long_scene_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    map_long_scene_start.call(this);


    // gold window
    x = 500;
    y = 10;
    this.custom_money_window_instance = new Window_Custom_Gold(new Rectangle(x, y, 200, 69, 1));
    // this.custom_money_window_instance2 = new Window_Custom_Gold(new Rectangle(x, y, 200, 69, 1));
    // this.addChild(this.custom_money_window_instance2);
    this.addChild(this.custom_money_window_instance);
};

// Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
//     const unitWidth = Math.min(80, this.textWidth(unit));
//     this.resetTextColor();
//     this.drawText(value, x, y, width - unitWidth - 6, "right");
//     this.changeTextColor(ColorManager.systemColor());
//     this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
// };
