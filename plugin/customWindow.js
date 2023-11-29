function Window_Custom() {
    this.initialize(...arguments);
}

Window_Custom.prototype = Object.create(Window_Selectable.prototype);
Window_Custom.prototype.constructor = Window_Custom;

Window_Custom.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_Custom.prototype.colSpacing = function() {
    return 0;
};

Window_Custom.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    // this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
    this.drawText(`G: ${this.value()}`, -30, 10, 240, 'right');
};

Window_Custom.prototype.value = function() {
    return $gameParty.gold();
};

Window_Custom.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Custom.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

const map_long_scene_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    map_long_scene_start.call(this);

    this.custom_window_instance = new Window_Custom(new Rectangle(0, 0, 240, 69));
    this.addChild(this.custom_window_instance);
};

// Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
//     const unitWidth = Math.min(80, this.textWidth(unit));
//     this.resetTextColor();
//     this.drawText(value, x, y, width - unitWidth - 6, "right");
//     this.changeTextColor(ColorManager.systemColor());
//     this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
// };