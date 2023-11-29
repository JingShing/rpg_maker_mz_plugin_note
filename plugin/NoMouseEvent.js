/*:
 * @target MZ
 * @plugindesc Disable the touch menu
 * @author JingShing
 *
 * @help NoMouseEvent.js
 *
 * This script canceled the mouse and touch event. Also clear
 * three line menu.
 *
 * It does not provide plugin commands.
 */

// clear three line menu
Scene_Map.prototype.createButtons = function() { };

// disable touch and mouse event
TouchInput.initialize = function() {
    this.clear();
};
