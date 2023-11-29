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

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createStatusWindow();
};

Scene_Map.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
    this.createButtons();

    // test gold
    // $gameParty._gold
    this.createGoldWindow();
};

Scene_Message.prototype.createGoldWindow = function() {
    // const rect = this.goldWindowRect();
    // this._goldWindow = new Window_Gold(rect);
    // this._goldWindow = new Window_Gold(new Rectangle(970, -90, 200, 69, 1));
    this._goldWindow = new Window_Gold(new Rectangle(970, -90, 200, 69, 1));
    // this._goldWindow.openness = 0;
    // this._goldWindow.x = 930;
    // this._goldWindow.y = -100;
    this.addWindow(this._goldWindow);
};

Scene_Message.prototype.createAllWindows = function() {
    this.createMessageWindow();
    this.createScrollTextWindow();
    this.createGoldWindow();
    this.createNameBoxWindow();
    this.createChoiceListWindow();
    this.createNumberInputWindow();
    this.createEventItemWindow();
    this.associateWindows();
};

Scene_Map.prototype.createAllWindows = function() {
    this.createMapNameWindow();
    Scene_Message.prototype.createAllWindows.call(this);
};

// overwrite
const Scene_Map_prototype_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    Scene_Map_prototype_update.call(this);

    // add gold window refresh
    this._goldWindow.refresh();
};