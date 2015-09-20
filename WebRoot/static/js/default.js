/* By Philipp Lenssen, bomomo.com */

var app = new App();
var misc = new MiscLibrary();

window.onload = init;

function init() {
    app.init();
    app.intervalID = setInterval(run, app.intervalMS);
}

function run() {
    app.handleRageMode();
    for (var i in app.sprites) {
        app.sprites[i].move();
        var neighborIndex = i == 0 ? app.maxSprites - 1 : i - 1;
        app.sprites[i].handleType(app.sprites[neighborIndex], i, app.sprites[0]);
    }
    app.draw();
}

function handleMouseMoved(e) {
    var x = 0, y = 0;
    if (!e) var e = window.event;
    if (e.layerX) {
        x = e.layerX;
        y = e.layerY;
    }
    else {
        x = e.x;
        y = e.y;
    }
    if (x && y) {
        app.lastCursorX = app.cursorX;
        app.lastCursorY = app.cursorY;
        app.cursorX = x;
        app.cursorY = y;
    }
}

function handleMouseDown(e) {
    app.cursorActive = true;
    for (var i in app.sprites) {
        app.sprites[i].initedAfterCursorActive = false;
    }
}

function handleMouseUp(e) {
    app.cursorActive = false;
    if (app.timeout == 0) {
        app.timeout = setTimeout('switchSubmode()', 300);
    }
    for (var i in app.sprites) {
        app.sprites[i].initedAfterCursorInactive = false;
    }
}

function switchSubmode() {
    app.submode = app.submode == 1 ? 2 : 1;
    app.timeout = 0;
}

function handleMouseIn(e) {
    app.cursorIn = true;
}

function handleMouseOut(e) {
    app.cursorIn = false;
    app.cursorActive = false;
}

function showMenuHover() {
    if (app.hasSaveTypes) {
        showMenu();
    }
}

function showMenu() {
    if (app.hasSaveTypes) {
        if (app.menuTimeout != 0) {
            clearTimeout(app.menuTimeout);
        }
        misc.showElm('menu');
    }
    else {
        showAbout();
    }
}

function closeMenuDelay() {
    if (app.hasSaveTypes) {
        if (app.menuTimeout != 0) {
            clearTimeout(app.menuTimeout);
        }
        app.menuTimeout = setTimeout('closeMenu()', 300);
    }
}

function overMenu() {
    if (app.menuTimeout != 0) {
        clearTimeout(app.menuTimeout);
        app.menuTimeout = 0;
    }
}

function closeMenu() {
    misc.hideElm('menu');
    app.menuTimeout = 0;
}

function buttonClicked(n) {
    app.submode = 1;
    app.type = n;
    app.resetSprites();
    app.rageMode = false;
    app.rageAmount = 0;

    for (var i = 1; i <= app.maxSpriteTypes; i++) {
        var elm = document.getElementById('button' + i);
        if (i == n) {
            elm.style.borderLeft = '2px solid #777';
            elm.style.borderTop = '2px solid #777';
            elm.style.borderRight = '2px solid #fff';
            elm.style.borderBottom = '2px solid #fff';
            elm.style.backgroundColor = 'rgb(255,255,0)';
        }
        else {
            elm.style.borderLeft = '2px solid #fff';
            elm.style.borderTop = '2px solid #fff';
            elm.style.borderRight = '2px solid #777';
            elm.style.borderBottom = '2px solid #777';
            elm.style.backgroundColor = 'rgb(198,198,198)';
        }
    }
}

function buttonOver(n) {
    var elm = document.getElementById('button' + n);
    elm.style.backgroundColor = app.type == n ? 'rgb(0,255,255)' : 'rgb(255,255,0)';
}

function buttonOut(n) {
    var elm = document.getElementById('button' + n);
    elm.style.backgroundColor = app.type == n ? 'rgb(255,255,0)' : 'rgb(198,198,198)';
}

function canSave() {
    return app.canCanvas && !!(app.canvasBackground.toDataURL);
}

function saveCanvas() {
    if ( canSave() ) {
        if (app.hasSaveTypes) {
            app.canvasForegroundContext.fillStyle = 'rgb(255,255,255)';
            app.canvasForegroundContext.fillRect(0, 0, app.canvasWidth, app.canvasHeight);
            app.canvasForegroundContext.drawImage(app.canvasBackground, 0, 0);
        
            // Chrome ignores parameter, uses PNG
            var data = app.canvasForeground.toDataURL('image/jpeg');
            var elmInput = document.getElementById('canvasData');
            elmInput.value = data;
            var elmForm = document.getElementById('mainForm');
            elmForm.submit();
        }
        else {
            saveCanvasHi();
        }
    }
    else {
        showSavingSorry();
    }
}

function saveCanvasHi() {
    if ( canSave() ) {
        var data = app.canvasBackground.toDataURL();
        if (app.hasSaveTypes) {
            data = data.replace(/data:image\/png/i, 'data:application/foobar');
            document.location.href = data;
        }
        else {
            var win = window.open(data);
        }
    }
    else {
        showSavingSorry();
    }
}

function showSavingSorry() {
    alert('Sorry, saving only works in the Firefox browser at the moment...');
}

function newCanvas() {
    app.clearBack();
    app.resetSprites();
    app.submode = 1;
    app.rageMode = false;
    app.rageAmount = 0;
}

function showAbout() {
    misc.showElm('about');
    closeMenu();
}

function hideAbout() {
    misc.hideElm('about');
}


/**** App follows ****/

function App() {
    var i = 1;

    this.pressed = false;
    this.cursorX = 0;
    this.cursorY = 0;
    this.lastCursorX = 0;
    this.lastCursorY = 0;
    this.cursorIn = false;
    this.cursorActive = false;
    this.intervalMS = 10; // 40;
    this.intervalID = null;
    this.sprites = new Array();
    this.fullCircle = Math.PI * 2;
    this.canvasWidth = 541;
    this.canvasHeight = 615;
    this.canvasBackground = null;
    this.canvasBackgroundContext = null;
    this.canvasForeground = null;
    this.canvasForegroundContext = null;
    this.maxSprites = 7;
    this.submode = 1;
    this.timeout = 0;
    this.menuTimeout = 0;
    this.colors = new Array();
    this.canCanvas = false;
    this.hasSaveTypes = false;

    this.rageMode = false;
    this.rageAmount = 0;
    this.rageModeCounter = 0;
    this.rageModeJustActivated = false;
    this.rageModeJustInactivated = false;

    this.enumHunter = i++;
    this.enumBouncer = i++;
    this.enumEraser = i++;
    this.enumRobot = i++;
    this.enumCircleHunter = i++;
    this.enumCircle = i++;
    this.enumCrosshatch = i++;
    this.enumBubble = i++;
    this.enumCurve = i++;
    this.enumComet = i++;
    this.enumPendulum = i++;
    this.enumLines = i++;
    this.enumGrid = i++;
    this.enumSpray = i++;
    this.enumLineSpray = i++;
    this.enumMatrix = i++;
    this.enumFollower = i++;
    this.enumRectangler = i++;
    this.enumSprinkler = i++;
    this.enumShaper = i++;

    this.maxSpriteTypes = i - 1;

    this.indexRed = 0;
    this.indexGreen = 1;
    this.indexBlue = 2;
    this.paletteMax = 256;

    this.type = 1;

    this.enumDrawInk = i++;
    this.enumShow = i++;

    this.teleported = false;
}

App.prototype.init = function() {
    var isIE = navigator.appName.indexOf('Microsoft') != -1;
    app.canCanvas = !isIE;
    app.type = 1;
    this.initCanvas();
    this.initColors();
    this.initSprites();
    app.hasSaveTypes = this.getHasSaveTypes();
    if ( !canSave() ) { misc.hideElm('toolbarButtonSave'); }
}

App.prototype.getHasSaveTypes = function() {
    var targetType = 'image/jpeg';
    var data = app.canvasForeground.toDataURL(targetType);
    return data.indexOf(targetType) >= 1;
}

App.prototype.resetSprites = function() {
    app.sprites = new Array();
    app.initSprites();
}

App.prototype.initSprites = function() {
    for (i = 0; i < app.maxSprites; i++) {
        this.sprites[i] = new Sprite();
        this.sprites[i].type = app.type;
    }
}

App.prototype.inCanvasWithPadding = function(x, y) {
    var padding = 30;
    return x >= padding && x <= this.canvasWidth - padding && y >= padding && y <= this.canvasHeight - padding;
}

App.prototype.draw = function() {
    this.canvasForegroundContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (var i in this.sprites) {
        var neighborIndex = i == 0 ? this.maxSprites - 1 : i - 1;
        this.sprites[i].draw(this.canvasBackgroundContext, this.enumDrawInk, this.sprites[neighborIndex], i);
        this.sprites[i].draw(this.canvasForegroundContext, this.enumShow, this.sprites[neighborIndex], i);
    }
    /// this.canvasForegroundContext.flush();
}

App.prototype.handleRageMode = function() {
    var rageReachedAt = 200;
    var rageMax = 2000;
    var antiRage = 15;
    var rageCounterStart = 400;

    this.rageModeJustActivated = false;
    this.rageModeJustInactivated = false;

    if (app.cursorIn) {
        if ( app.inCanvasWithPadding(this.lastCursorX, this.lastCursorY) && app.inCanvasWithPadding(this.cursorY, this.cursorY) ) {
            this.rageAmount += misc.getDistance(this.lastCursorX, this.lastCursorY, this.cursorX, this.cursorY);
        }
    }
    this.rageAmount -= antiRage;
    if (this.rageAmount < 0) {
        this.rageAmount = 0;
    }
    else if (this.rageAmount >= rageMax) {
        this.rageAmount = rageMax;
    }

    if (!this.rageMode && this.rageAmount >= rageReachedAt) {
        this.rageMode = true;
        this.rageModeCounter = rageCounterStart;
        this.rageAmount = 0;
        this.rageModeJustActivated = true;
    }

    if (this.rageMode) {
        this.rageAmount = 0;
        this.rageModeCounter--;
        if (this.rageModeCounter <= 0) {
            this.rageMode = false;
            this.rageModeJustInactivated = true;
        }
        // misc.debug('Rage mode!');
    }
    else {
        // misc.debug('[' + Math.floor(this.rageAmount) + ']');
    }
}

App.prototype.initColors = function() {
    var i = 0;
    var colorsMax = 15;
    for (i = 0; i < colorsMax; i++) {
        this.colors[i] = new Array();
    }

    i = 0;
    this.colors[i][this.indexRed] = 250; this.colors[i][this.indexGreen] = 0; this.colors[i][this.indexBlue] = 0; i++;
    this.colors[i][this.indexRed] = 250; this.colors[i][this.indexGreen] = 100; this.colors[i][this.indexBlue] = 0; i++;
    this.colors[i][this.indexRed] = 250; this.colors[i][this.indexGreen] = 250; this.colors[i][this.indexBlue] = 0; i++;
    this.colors[i][this.indexRed] = 0; this.colors[i][this.indexGreen] = 250; this.colors[i][this.indexBlue] = 0; i++;
    this.colors[i][this.indexRed] = 0; this.colors[i][this.indexGreen] = 150; this.colors[i][this.indexBlue] = 50; i++;
    this.colors[i][this.indexRed] = 0; this.colors[i][this.indexGreen] = 50; this.colors[i][this.indexBlue] = 150; i++;
    this.colors[i][this.indexRed] = 100; this.colors[i][this.indexGreen] = 150; this.colors[i][this.indexBlue] = 250; i++;
    this.colors[i][this.indexRed] = 0; this.colors[i][this.indexGreen] = 200; this.colors[i][this.indexBlue] = 250; i++;
    this.colors[i][this.indexRed] = 100; this.colors[i][this.indexGreen] = 50; this.colors[i][this.indexBlue] = 0; i++;
    this.colors[i][this.indexRed] = 150; this.colors[i][this.indexGreen] = 0; this.colors[i][this.indexBlue] = 200; i++;
    this.colors[i][this.indexRed] = 250; this.colors[i][this.indexGreen] = 50; this.colors[i][this.indexBlue] = 150; i++;
    this.colors[i][this.indexRed] = 250; this.colors[i][this.indexGreen] = 150; this.colors[i][this.indexBlue] = 150; i++;
    this.colors[i][this.indexRed] = 200; this.colors[i][this.indexGreen] = 150; this.colors[i][this.indexBlue] = 50; i++;
    this.colors[i][this.indexRed] = 200; this.colors[i][this.indexGreen] = 250; this.colors[i][this.indexBlue] = 100; i++;
    this.colors[i][this.indexRed] = 124; this.colors[i][this.indexGreen] = 124; this.colors[i][this.indexBlue] = 124; i++;
}

App.prototype.initCanvas = function() {
    this.canvasBackground = document.getElementById('canvasBackground');
    this.canvasBackgroundContext = this.canvasBackground.getContext('2d');

    this.canvasForeground = document.getElementById('canvasForeground');
    this.canvasForegroundContext = this.canvasForeground.getContext('2d');

    this.canvasBackground.width = this.canvasWidth;
    this.canvasBackground.height = this.canvasHeight;
    this.canvasForeground.width = this.canvasWidth;
    this.canvasForeground.height = this.canvasHeight;
    this.clearBack();
    this.drawBackground();
}

App.prototype.drawBackground = function() {
    var img = new Image();
/*    img.onload = function() {
        app.canvasBackgroundContext.drawImage(img, 0, 0);
    }*/
    img.src = '/static/images/t-prototype.jpg';
    app.canvasBackgroundContext.drawImage(img, 0, 0);
}

App.prototype.pendulum = function(centerX, centerY, radius, aoi, completionRatio) {
    // this function with thanks to PiXELWiT at
    // http://www.pixelwit.com/blog/2008/01/21/swing-pendulum-arc/

    var easedOneToNegOne = Math.cos(completionRatio * 2 * Math.PI);
    var aoiRadians = aoi * 2 * Math.PI;
    var currentRotation = easedOneToNegOne * aoiRadians;
    var x = centerX + Math.sin(currentRotation) * radius;
    var y = centerY + Math.cos(currentRotation) * radius;
    return {x:x, y:y};
}

App.prototype.mixColors = function(r1, g1, b1, r2, g2, b2, factor) {
    var colResult = new Array();
    var negative = (this.paletteMax - 1) - factor;

    colResult[this.indexRed] = Math.ceil( (r1 * factor + r2 * negative) / this.paletteMax );
    colResult[this.indexGreen] = Math.ceil( (g1 * factor + g2 * negative) / this.paletteMax );
    colResult[this.indexBlue] = Math.ceil( (b1 * factor + b2 * negative) / this.paletteMax );

    return colResult;
}

App.prototype.toGridX = function(v, gridSize) {
    if (!gridSize) { gridSize = 15; }
    if (v > 0 && v < this.canvasWidth) {
        v = Math.floor(v / gridSize) * gridSize;
    }
    return v;
}

App.prototype.toGridY = function(v, gridSize) {
    if (!gridSize) { gridSize = 15; }
    if (v > 0 && v < this.canvasHeight) {
        v = Math.floor(v / gridSize) * gridSize;
    }
    return v;
}

App.prototype.clearBack = function() {
    // this.canvasBackgroundContext.fillStyle = 'rgb(255,255,255)';
    // this.canvasBackgroundContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvasBackgroundContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}


/**** Sprite follows ****/

function Sprite() {
    this.x = Math.floor( app.canvasWidth / 2 + misc.getRandomInt(-50, 50) );
    this.y = Math.floor( app.canvasHeight / 2 + misc.getRandomInt(-50, 50) );
    this.radius = 2;
    this.speedX = 0;
    this.speedY = 0;
    this.speedMaxX = 4;
    this.speedMaxY = this.speedMaxX;
    this.speedStep = .3;

    this.originX = this.x;
    this.originY = this.y;

    this.targetX = null;
    this.targetY = null;

    this.oldX = this.x;
    this.oldY = this.y;

    this.speedStepX = null;
    this.speedStepY = null;

    this.offset = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetXbase = 0;
    this.offsetYbase = 0;
    this.offsetRadius = 0;
    this.counter = 0;

    this.type = 0;
    this.energy = 0;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.colorDirection = 1;

    this.opacity = 0;
    this.maxOpacity = .8;
    this.opacityStep = .02;

    this.inited = false;
    this.initedAfterCursorActive = false;
    this.initedAfterCursorInactive = false;
}

Sprite.prototype.move = function() {

    if (this.speedX > this.speedMaxX) {
        this.speedX = this.speedMaxX;
    }
    else if (this.speedX < -this.speedMaxX) {
        this.speedX = -this.speedMaxX;
    }

    if (this.speedY > this.speedMaxY) {
        this.speedY = this.speedMaxY;
    }
    else if (this.speedY < -this.speedMaxY) {
        this.speedY = -this.speedMaxY;
    }

    this.oldX = this.x;
    this.oldY = this.y;
    this.x += this.speedX;
    this.y += this.speedY;
}

Sprite.prototype.followTarget = function() {
    if (this.targetX != null && this.targetY != null) {
        if (this.speedStepX == null) { this.speedStepX = this.speedStep; }
        if (this.speedStepY == null) { this.speedStepY = this.speedStep; }

        if (this.x > this.targetX) {
            this.speedX -= this.speedStepX;
        }
        else if (this.x < this.targetX) {
            this.speedX += this.speedStepX;
        }

        if (this.y > this.targetY) {
            this.speedY -= this.speedStepY;
        }
        else if (this.y < this.targetY) {
            this.speedY += this.speedStepY;
        }
    }
}

Sprite.prototype.handleType = function(neighbor, spriteCounter, leadSprite) {
    this.teleported = false;
    switch (this.type) {

        case app.enumHunter:

            if (!this.inited) {
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxX = 2.5 + misc.getRandom(-.5, .5);
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .1;
                this.radius = 5;
                this.colorR = 100;
                this.colorG = 100;
                this.colorB = misc.getRandomInt(0, 255);
                this.maxOpacity = .6;
            }

            if (!this.initedAfterCursorActive) {
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = misc.getRandomInt(0, 255);
            }

            if (app.cursorIn && !app.rageMode) {
                this.radius = ( this.getCursorDistance() + .01 ) / 30;
                if (this.radius <= 2) { this.radius = 2; }
            }

            if (app.rageModeJustActivated) {
                this.colorR = 250;
                this.speedMaxX = 8;
                this.speedStep = .5;
                this.speedMaxY = this.speedMaxX;
                this.radius = 18;
            }
            else if (app.rageModeJustInactivated) {
                this.speedMaxX = 2.5 + misc.getRandom(-.5, .5);
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .1;
            }

            this.adjustOpacityToCursor();
            if (app.rageMode) {
                this.scrollBlue();
            }
            else {
                this.scrollRed();
            }
            this.follow(app.cursorX, app.cursorY);
            break;


        case app.enumBouncer:

            if (!this.inited) {
                this.doCenter();
                this.speedX = 0;
                this.speedY = misc.getRandomInt(-5, 5);
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .3;
                this.radius = 4;
                this.colorR = misc.getRandomInt(150, 250);
                this.colorG = misc.getRandomInt(100, 250);
                this.colorB = misc.getRandomInt(150, 250);
                this.maxOpacity = .2;
            }

            if (app.cursorIn) {
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                if (app.submode == 1) {
                    if (this.speedX == 0) {
                        this.speedX = misc.getRandomInt(-5, 5);
                        this.speedY = 0;
                    }
    
                    this.radius = 3 + Math.abs(this.speedY) * 2;
                    this.adjustOpacityToCursor();
                    this.scrollBlue();
                    if (app.cursorIn) {
                        this.x = app.toGridX(app.cursorX);
                    }
                    this.followY( app.toGridY(app.cursorY) );
                }
                else {
                    if (this.speedY == 0) {
                        this.speedX = 0;
                        this.speedY = misc.getRandomInt(-5, 5);
                    }
    
                    this.radius = 3 + Math.abs(this.speedX) * 2;
                    this.adjustOpacityToCursor();
                    this.scrollBlue();
                    if (app.cursorIn) {
                        this.y = app.toGridY(app.cursorY);
                    }
                    this.followX( app.toGridX(app.cursorX) );
                }
            }
            else {
                this.speedMaxX = 1;
                this.speedMaxY = this.speedMaxX;
                this.doRelax();
            }

            break;


        case app.enumEraser:

            if (!this.inited) {
                this.doCenter();
                this.speedX = misc.getRandomInt(-5, 5);
                this.speedY = misc.getRandomInt(-5, 5);
                this.speedMaxX = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .3;
                this.radius = 4;
                this.colorR = 255;
                this.colorG = 255;
                this.colorB = 255;
                this.maxOpacity = .3;
            }

            if (app.rageModeJustActivated) {
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .6;
                this.radius = 20;
                this.maxOpacity = .6;
            }
            else if (app.rageModeJustInactivated) {
                this.speedMaxX = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .3;
                this.radius = 4;
                this.maxOpacity = .3;
            }

            if (!app.rageMode) {
                this.radius = 2 + ( Math.abs(this.speedX) + Math.abs(this.speedY) );
            }

            this.adjustOpacityToCursor();
            this.follow(app.cursorX, app.cursorY);
            break;


        case app.enumRobot:

            if (app.rageMode) {
                if (app.rageModeJustActivated) {
                    this.doCenter();
                    this.speedX = 0;
                    this.speedY = 0;
                    this.speedMaxX = 2 + misc.getRandomInt(0, 1);
                    this.speedMaxY = this.speedMaxX;
                    this.speedStepX = misc.getRandomInt(1, 3);
                    if ( misc.chance(50) ) { this.speedStepX *= -1; }
                    this.speedStepY = misc.getRandomInt(1, 3);
                    if ( misc.chance(50) ) { this.speedStepY *= -1; }
    
                    this.offsetX = misc.getRandomInt(-6, 6);
                    this.offsetY = misc.getRandomInt(-6, 6);
                    this.radius = 3 + misc.getRandomInt(0, 4);
                    switch ( misc.getRandomInt(1, 4) ) {
                        case 1: case 2: case 3: this.setRGBSemiRandom(false, false, false); break;
                        case 4: this.setRGBRandom(); break;
                    }
                    this.maxOpacity = .9;
                }
    
                if (app.cursorActive) {
                    var distanceX = Math.abs(this.x - app.cursorX);
                    var distanceY = Math.abs(this.y - app.cursorY);
                    var limit = 80;
                    if (distanceX <= limit) {
                        if (this.x <= app.cursorX) {
                            this.x -= this.speedStepX;
                        }
                        else {
                            this.x += this.speedStepX;
                        }
                    }
    
                    if (distanceY <= limit) {
                        if (this.y <= app.cursorY) {
                            this.y -= this.speedStepY;
                        }
                        else {
                            this.y += this.speedStepY;
                        }
                    }
    
                    this.adjustOpacityToCursor();
                }
                else {
                    if ( misc.chance(5) ) {
                        this.offsetX = misc.getRandomInt(-6, 6);
                        this.offsetY = misc.getRandomInt(-6, 6);
                        switch ( misc.getRandomInt(1, 4) ) {
                            case 1: case 2: case 3: this.setRGBSemiRandom(false, false, false); break;
                            case 4: this.setRGBRandom(); break;
                        }
                    }
                    this.opacity = 0;
                    this.x = app.cursorX + this.offsetX;
                    this.y = app.cursorY + this.offsetY;
                }

            }
            else {

                if (!this.inited || app.rageModeJustInactivated) {
                    this.doCenter();
                    this.speedX = misc.getRandomInt(-5, 5);
                    this.speedY = misc.getRandomInt(-5, 5);
                    this.speedMaxX = 2 + misc.getRandomInt(-1, 2);
                    this.speedMaxY = this.speedMaxX;
                    this.speedStep = .3;
                    this.radius = 4;
                    this.colorR = misc.getRandomInt(100, 250);
                    this.colorG = misc.getRandomInt(100, 250);
                    this.colorB = misc.getRandomInt(100, 250);
                }
    
                var distanceX = Math.abs(this.x - app.cursorX);
                var distanceY = Math.abs(this.y - app.cursorY);
    
                if (distanceX > distanceY) {
                    this.speedY = 0;
                    if (distanceX >= 20) {
                        this.followX(app.cursorX);
                    }
                }
                else {
                    this.speedX = 0;
                    if (distanceY >= 20) {
                        this.followY(app.cursorY);
                    }
                }
    
                if (this.speedX < 0) {
                    this.colorR = 250;
                }
                else if (this.speedX > 0) {
                    this.colorB = 50;
                }
    
                if (this.speedY < 0) {
                    this.colorB = 250;
                }
                else if (this.speedY > 0) {
                    this.colorR = 50;
                }
    
                this.adjustOpacityToCursor();
            }
            break;


        case app.enumCircleHunter:

            if (!this.inited) {
                this.x = Math.floor( app.canvasWidth / 2 + misc.getRandomInt(-150, 150) );
                this.y = Math.floor( app.canvasHeight / 2 + misc.getRandomInt(-150, 150) );
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxY = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .3;
                this.radius = 5;
                this.maxOpacity = .2;
                this.opacityStep = .005;
            }

            var distance = ( this.getCursorDistance() + .01 );
            this.radius = 5 + ( 60 - misc.forceMax(distance, 60) );
            this.colorG = 200 + ( 55 - misc.forceMax(distance, 55) );
            if (distance <= 100 && app.cursorActive) {
                this.scrollRed();
                this.scrollBlue();
            }

            if (!this.initedAfterCursorActive) {
                this.colorR = 100 + misc.getRandomInt(0, 150);
                this.colorG = 200;
                this.colorB = misc.getRandomInt(0, 255);
            }

            if ( misc.chance(40) ) {
                this.follow(app.cursorX, app.cursorY);
            }

            this.keepInCanvas();
            this.adjustOpacityToCursor();
            this.followSimple(neighbor.x, neighbor.y);
            break;


        case app.enumCircle:

            if (!this.inited) {
                this.doCenter();
                this.speedX = 0;
                this.speedY = 0;
                this.speedMaxX = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 1;
                this.maxOpacity = .4;
                this.radius = 10 + misc.getRandomInt(10, 30);
                this.offsetRadius = 60;
            }

            if (!this.initedAfterCursorActive) {
                this.colorR = misc.getRandomInt(100, 240);
                this.colorG = misc.getRandomInt(100, 240);
                this.colorB = misc.getRandomInt(100, 240);
                this.counter = 0;
            }

            if (!this.initedAfterCursorInactive) {
                this.offsetRadius = 60;
            }

            if (app.cursorActive) {
                if (++this.counter >= 150) {
                    this.counter = 0;
                    this.offsetRadius = 110;
                }
            }

            if (app.cursorIn) {
                this.x = app.cursorX;
                this.y = app.cursorY;
            }
            this.scrollRed();
            this.scrollGreen();

            if (this.radius > 1) {
                this.radius -= this.speedStep;
            }
            else {
                this.radius = this.offsetRadius;
            }

            this.adjustOpacityToCursor();
            break;


        case app.enumCrosshatch:

            if (!this.inited) {
                this.doCenter();

                if ( misc.chance(50) ) {
                    this.speedX = 3 + misc.getRandom(0, 3);
                    this.speedY = 3 + misc.getRandom(0, 3);
                }
                else {
                    this.speedX = -( 3 + misc.getRandom(0, 3) );
                    this.speedY = 3 + misc.getRandom(0, 3);
                }

                this.speedMaxX = 10;
                this.speedMaxY = this.speedMaxY;
                this.speedStep = 2;
                this.offsetXbase = misc.getRandomInt(-15, 15);
                this.offsetYbase = misc.getRandomInt(-15, 15);
                this.radius = 3;

                this.offsetRadius = 20;
                this.offsetX = 0;
                this.offsetY = 0;

                if ( misc.chance(33) ) {
                    this.colorR = misc.getRandomInt(50, 200);
                    this.colorG = misc.getRandomInt(50, 200);
                    this.colorB = misc.getRandomInt(50, 200);
                }
                else {
                    this.setRGB(30, 30, 30);
                }
                this.maxOpacity = .3;
            }

            if (!this.initedAfterCursorActive) {
                this.originX = app.cursorX;
                this.originY = app.cursorY;
                this.radius = 3;
            }
            
            if (!this.initedAfterCursorInactive) {
                this.opacity = 0;
                this.radius = 3;
            }

            if (app.cursorIn) {
                this.radius = 3 + ( this.getCursorDistanceFromOrigin() + .01 ) / 10;

                if ( misc.getRandomInt(0, 1000) <= 5 ) {
                    this.offsetXbase = misc.getRandomInt(-15, 15);
                    this.offsetYbase = misc.getRandomInt(-15, 15);
                }

                if (app.cursorActive) {
                    this.offsetRadius += .4;
                    if (this.offsetRadius > 100) { this.offsetRadius = 100; }
                }
                else {
                    this.offsetRadius = 20;
                }

                this.crosshatch(this.offsetRadius);

                if (app.cursorActive) {
                    this.x = this.originX + this.offsetXbase + this.offsetX;
                    this.y = this.originY + this.offsetYbase + this.offsetY;
                }
                else {
                    this.x = app.cursorX + this.offsetXbase + this.offsetX;
                    this.y = app.cursorY + this.offsetYbase + this.offsetY;
                }
            }
            else {
                this.offsetRadius = 20;
                this.doRelax();
            }

            this.adjustOpacityToCursor();
            break;


        case app.enumBubble:

            if (!this.inited) {
                this.doCenter();

                var boost = misc.getRandom(0, 3);
                if ( misc.chance(50) ) {
                    this.speedX = 3 + boost;
                    this.speedY = 3 + boost;
                }
                else {
                    this.speedX = -(3 + boost);
                    this.speedY = 3 + boost;
                }

                this.speedMaxX = 10;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 2;
                this.offsetXbase = misc.getRandomInt(-15, 15);
                this.offsetYbase = misc.getRandomInt(-15, 15);
                this.radius = 5;
                this.colorR = misc.getRandomInt(50, 250);
                this.colorG = misc.getRandomInt(50, 250);
                this.colorB = misc.getRandomInt(50, 250);
                this.maxOpacity = .2;
                this.offsetRadius = 40;
            }

            if (app.rageModeJustActivated) {
                this.colorR = misc.getRandomInt(255, 255);
                this.colorG = misc.getRandomInt(255, 255);
                this.colorB = misc.getRandomInt(210, 255);
            }
            else if (app.rageModeJustInactivated) {
                this.colorR = misc.getRandomInt(50, 250);
                this.colorG = misc.getRandomInt(50, 250);
                this.colorB = misc.getRandomInt(50, 250);
            }

            if (app.cursorIn) {

                if ( !app.cursorActive && misc.chance(15) && !app.rageMode ) {
                    this.colorR = misc.getRandomInt(50, 250);
                    this.colorG = misc.getRandomInt(50, 250);
                    this.colorB = misc.getRandomInt(50, 250);
                }

                this.crosshatch(this.offsetRadius);

                if (app.submode == 1) {
                    this.radius = Math.abs(this.offsetX);
                }
                else {
                    this.radius = Math.abs(this.offsetRadius * 2 - ( Math.abs(this.offsetX) + Math.abs(this.offsetY) ) );
                }

                this.x = app.cursorX + this.offsetXbase + this.offsetX;
                this.y = app.cursorY + this.offsetYbase + this.offsetY;
            }
            else {
                this.doRelax();
            }

            this.adjustOpacityToCursor();
            break;


        case app.enumComet:

            if (!this.inited) {
                this.doCenter();
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxX = 1 + misc.getRandom(0, 2);
                this.speedMaxY = 1 + misc.getRandom(0, 2);
                this.speedStep = 1.5;
                this.offsetX = misc.getRandomInt(-30, 30);
                this.offsetY = misc.getRandomInt(-30, 30);
                this.offsetRadius = misc.getRandomInt(0, 10);
                this.radius = 5 + this.offsetRadius;
                switch ( misc.getRandomInt(1, 3) ) {
                    case 1: this.setRGBSemiRandom(true, true, false); break;
                    case 2: this.setRGBSemiRandom(true, false, true); break;
                    case 3: this.setRGBSemiRandom(false, true, true); break;
                }
                this.maxOpacity = .9;
            }

            if ( !this.initedAfterCursorActive && !app.rageMode) {
                if ( misc.chance(20) ) {
                    switch ( misc.getRandomInt(1, 3) ) {
                        case 1: this.setRGBSemiRandom(true, true, false); break;
                        case 2: this.setRGBSemiRandom(true, true, true); break;
                        case 3: this.setRGBSemiRandom(false, true, true); break;
                    }
                }
                this.speedMaxX = 3 + misc.getRandom(0, 4);
                this.speedMaxY = 3 + misc.getRandom(0, 4);
            }

            if (!this.initedAfterCursorInactive && !app.rageMode) {
                this.speedMaxX = 1 + misc.getRandom(0, 2);
                this.speedMaxY = 1 + misc.getRandom(0, 2);
            }

            if ( misc.getRandomInt(0, 1000) <= 5 ) {
                this.offsetX = misc.getRandomInt(-30, 30);
                this.offsetY = misc.getRandomInt(-30, 30);
            }

            if (app.cursorActive) {
                this.radius += .2;
                if (this.radius > 30) { this.radius = 30; }
            }
            else {
                this.radius = 5 + this.offsetRadius;
            }

            if (app.rageModeJustActivated) {
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.offsetRadius = misc.getRandomInt(10, 20);
                this.radius = 5 + this.offsetRadius;

                var offset = misc.getRandomInt(0, 80);
                var col1 = 30 + offset, col2 = 60 + offset, col3 = 170 + offset;
                if ( misc.chance(50) ) {
                    this.setRGB(col1, col2, col3);
                }
                else {
                    this.setRGB(col1, col3, col2);
                }
                this.maxOpacity = .3;
            }
            else if (app.rageModeJustInactivated) {
                this.speedMaxX = 1 + misc.getRandom(0, 2);
                this.speedMaxY = 1 + misc.getRandom(0, 2);
                this.offsetRadius = misc.getRandomInt(0, 10);
                this.radius = 5 + this.offsetRadius;

                switch ( misc.getRandomInt(1, 3) ) {
                    case 1: this.setRGBSemiRandom(true, true, false); break;
                    case 2: this.setRGBSemiRandom(true, false, true); break;
                    case 3: this.setRGBSemiRandom(false, true, true); break;
                }
                this.maxOpacity = .9;
            }

            if ( this.getCursorDistance() <= 125 ) {
                this.follow( app.toGridX(app.cursorX) + this.offsetX, app.toGridY(app.cursorY) + this.offsetY );
            }

            this.keepInCanvasWithMargin(40);
            this.adjustOpacityToCursor();
            break;


        case app.enumPendulum:

            if (!this.inited) {
                this.radius = 5 + spriteCounter / 3;
                this.colorR = 50 + 10 * spriteCounter;
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = 50 + 30 * spriteCounter;
                this.offsetRadius = 50 + 2 * spriteCounter;
                this.maxOpacity = .05 + spriteCounter / 20;

                this.speedStep = .003;
            }

            if (app.cursorActive) {
                if (this.offsetRadius <= 150) {
                    this.offsetRadius += .2;
                    this.radius += .1;
                }
            }
            else {
                var minRadius = 5 + spriteCounter / 3;
                var minOffsetRadius = 50 + 2 * spriteCounter;
                if (this.radius > minRadius) {
                    this.radius -= .2;
                }
                if (this.offsetRadius > minOffsetRadius) {
                    this.offsetRadius -= .4;
                }
            }

            this.counter += this.speedStep;
            if (this.counter == 1000) { this.counter = 0; }
            this.counter %= 1;
            var arc = 1;
            var point = app.pendulum(app.cursorX, app.cursorY, this.offsetRadius, arc, this.counter);

            this.x = point.x;
            this.y = point.y;

            this.scrollRed();
            this.adjustOpacityToCursor();
            break;


        case app.enumLines:

            if (!this.inited) {
                this.x = Math.floor( app.canvasWidth / 2 + misc.getRandomInt(-150, 150) );
                this.y = Math.floor( app.canvasHeight / 2 + misc.getRandomInt(-150, 150) );
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.radius = 5;
                this.speedMaxX = 6;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .3;
                this.colorR = misc.getRandomInt(40, 200);
                this.colorG = misc.getRandomInt(80, 255);
                this.colorB = misc.getRandomInt(0, 150);
                this.maxOpacity = .3;
            }

            if (spriteCounter == 0) {
                if (app.cursorIn) {
                    this.x = app.cursorX;
                    this.y = app.cursorY;
                }
                this.maxOpacity = 0;
            }
            else {
                this.followSimple(neighbor.x, neighbor.y);
            }

            if (app.rageModeJustActivated) {
                this.radius = 15;
                this.colorR = misc.getRandomInt(200, 255);
                this.colorG = misc.getRandomInt(200, 255);
                this.colorB = misc.getRandomInt(200, 255);
                this.maxOpacity = .6;
            }
            else if (app.rageModeJustInactivated) {
                this.radius = 5;
                this.colorR = misc.getRandomInt(40, 200);
                this.colorG = misc.getRandomInt(80, 255);
                this.colorB = misc.getRandomInt(0, 150);
                this.maxOpacity = .3;
            }

            this.keepInCanvasWithMargin(70); // 
            this.adjustOpacityToCursor();
            break;


        case app.enumGrid:

            if (!this.inited) {
                this.x = spriteCounter * (app.canvasWidth / app.maxSprites) + 50;
                this.y = misc.getRandomInt(50, app.canvasHeight - 50);
                this.speedX = 0;
                this.speedY = 10;
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .5;
                this.radius = 60 + misc.getRandomInt(0, 20);
                this.setRGB(150, 150, 150);
                this.opacityStep = .005;
                this.maxOpacity = .1;
            }

            if (app.submode == 1) {
                if (this.speedY == 0) {
                    this.speedX = 0;
                    this.speedY = 10;
                }
            }
            else {
                if (this.speedX == 0) {
                    this.speedX = 10;
                    this.speedY = 0;
                }
            }

            if (app.rageModeJustActivated) {
                this.speedMaxX = 25;
                this.speedMaxY = this.speedMaxX;
                this.radius = 140 + misc.getRandomInt(0, 20);
            }
            else if (app.rageModeJustInactivated) {
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.radius = 60 + misc.getRandomInt(0, 20);
            }

            if (app.cursorIn) {
                this.setColorFromPosition(app.cursorX, app.cursorY);
            }
            else {
                this.setRGB(150, 150, 150);
            }
            this.adjustOpacityToCursor();
            this.keepInCanvasAllowOverlap();
            break;


        case app.enumSpray:

            if (!this.inited) {
                this.doCenter();
                this.offsetRadius = 70;
                this.setCircleOffset();
                this.radius = misc.getRandomInt(2, 5);
                this.setRGBRandom();
                this.maxOpacity = .8;
            }

            if ( misc.chance(5) ) {
                this.setRGBRandom();
                this.setCircleOffset();
                var distance = Math.abs(this.offsetX) + Math.abs(this.offsetY);
                this.radius = (this.offsetRadius + 10 - distance) / 10;
            }

            if (app.cursorActive) {
                this.offsetRadius += 2;
                if (this.offsetRadius > 300) { this.offsetRadius = 300; }
            }
            else {
                this.offsetRadius = 70;
            }

            if (app.cursorIn) {
                this.x = app.cursorX - this.offsetX;
                this.y = app.cursorY - this.offsetY;
            }
            else {
                this.x = app.canvasWidth / 2 - this.offsetX;
                this.y = app.canvasHeight / 2 - this.offsetY;
            }

            this.adjustOpacityToCursor();
            break;


        case app.enumLineSpray:

            if (!this.inited) {
                this.doCenter();
                this.offsetRadius = 120;
                this.setCircleOffset();
                this.radius = misc.getRandomInt(7, 12);

                switch ( misc.getRandomInt(0, 3) ) {
                    case 0: this.setRGBSemiRandom(1, 1, 0); break;
                    case 1: this.setRGBSemiRandom(1, 0, 1); break;
                    case 2: this.setRGBSemiRandom(0, 1, 0); break;
                    case 3: this.setRGBSemiRandom(1, 0, 0); break;
                }
                this.maxOpacity = .7;
            }

            if ( misc.chance(5) ) {
                this.setCircleOffset();
                this.radius = misc.getRandomInt(2, 5);
            }

            if (app.cursorIn) {
                this.x = app.toGridX(app.cursorX) - this.offsetX;
                this.y = app.toGridY(app.cursorY) - this.offsetY;
            }
            else {
                this.x = app.canvasWidth / 2 - this.offsetX;
                this.y = app.canvasHeight / 2 - this.offsetY;
            }

            this.adjustOpacityToCursor();
            break;


        case app.enumMatrix:

            if (!this.inited) {
                this.speedX = 0;
                this.speedY = 0;
                this.speedMaxX = 4;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .2;
                this.radius = 8;
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = misc.getRandomInt(0, 255);
                this.opacityStep = 0.01;
                this.maxOpacity = .2;

                this.offsetX = 0;
                this.offsetY = 0;
                if (spriteCounter != 0) {
                    this.offsetX = -80;
                    this.offsetY = spriteCounter * 15;
                }
            }

            if (spriteCounter == 0) {
                this.follow(app.cursorX, app.cursorY);
            }
            else {
                var target = app.sprites[0];
                this.follow(target.x - this.offsetX, target.y - this.offsetY);
            }

            if (app.rageModeJustActivated) {
                this.radius = 20;
                this.speedMaxX = 15;
                this.speedMaxY = this.speedMaxX;
            }
            else if (app.rageModeJustInactivated) {
                this.radius = 8;
                this.speedMaxX = 4;
                this.speedMaxY = this.speedMaxX;
            }

            if ( this.opacity == 0 && misc.chance(10) ) {
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = misc.getRandomInt(0, 255);
            }

            this.adjustOpacityToCursor();
            this.scrollRed();
            break;


        case app.enumFollower:

            if (!this.inited) {
                this.doCenter();
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = .4;
                this.radius = 5;
                this.opacityStep = .005;
                this.maxOpacity = .2;

                if (spriteCounter == 0 || spriteCounter == app.maxSprites - 1) {
                    switch ( misc.getRandomInt(1, 6) ) {
                        case 1: this.setRGB(250, 20, 20); break;
                        case 2: this.setRGB(250, 250, 20); break;
                        case 3: this.setRGB(20, 250, 250); break;
                        case 4: this.setRGB(23, 247, 157); break;
                        case 5: this.setRGB(250, 211, 184); break;
                        case 6: this.setRGB(62, 163, 238); break;
                    }
                }
                else {
                    this.setRGB(20, 20, 20);
                }

                this.offsetX = misc.getRandomInt(-25, 25);
                this.offsetY = misc.getRandomInt(-25, 25);
            }

            if ( !this.initedAfterCursorActive && misc.chance(20) ) {
                if (spriteCounter == 0 || spriteCounter == app.maxSprites - 1) {
                    switch ( misc.getRandomInt(1, 6) ) {
                        case 1: this.setRGB(250, 20, 20); break;
                        case 2: this.setRGB(250, 250, 20); break;
                        case 3: this.setRGB(20, 250, 250); break;
                        case 4: this.setRGB(23, 247, 157); break;
                        case 5: this.setRGB(250, 211, 184); break;
                        case 6: this.setRGB(62, 163, 238); break;
                    }
                }
                else {
                    this.setRGB(20, 20, 20);
                }
            }

            if ( misc.chance(5) ) {
                this.offsetX = misc.getRandomInt(-35, 35);
                this.offsetY = misc.getRandomInt(-35, 35);
            }

            if (app.cursorActive) {
                this.radius += .5;
                if (this.radius > 30) { this.radius = 30; }
            }
            else {
                this.radius -= 1;
                if (this.radius < 5) { this.radius = 5; }
            }

            this.adjustOpacityToCursor();
            var targetX = app.toGridX(app.cursorX - this.offsetX, 90);
            var targetY = app.toGridY(app.cursorY - this.offsetY, 90);
            this.follow(targetX, targetY);

            var padding = 20;
            if (this.x >= app.cursorX - padding && this.x <= app.cursorX + padding) {
                this.speedX *= .5;
            }
            if (this.y >= app.cursorY - padding && this.y <= app.cursorY + padding) {
                this.speedY *= .5;
            }

            break;


        case app.enumCurve:

            if (!this.inited) {
                if (spriteCounter == 0) {
                    this.x = spriteCounter * (app.canvasWidth / app.maxSprites) + 50;
                    this.y = misc.getRandomInt(50, app.canvasHeight - 50);
                }
                else {
                    this.x = neighbor.x + 14;
                    this.y = neighbor.y;
                }
                this.speedX = 2;
                this.speedY = 0;
                this.speedMaxX = 3;
                this.speedMaxY = 3;
                this.speedStep = .2;
                this.radius = 5;
                this.maxOpacity = .3;
            }

            if (!this.initedAfterCursorActive) {
                this.originX = app.cursorX;
                this.originY = app.cursorY;
                if (spriteCounter == 0) {
                    this.setRGB( misc.getRandomInt(0, 200), misc.getRandomInt(0, 200), misc.getRandomInt(0, 200) );
                }
                else {
                    this.setRGB(neighbor.colorR - 10, neighbor.colorG + 20, neighbor.colorB + 40);
                }
            }

            if (!this.initedAfterCursorInactive) {
                this.opacity = 0;
            }

            if (app.submode == 1) {
                if (app.cursorActive) {
                    var strength = (this.originY - app.cursorY) / 2;
                    var bump = Math.abs( Math.sin( (this.x + this.originX / 2) / 50 ) * strength );
                    if (this.speedY < 0) {
                        this.y = this.originY - bump;
                    }
                    else {
                        this.y = this.originY + bump;
                    }
                }
                else if (app.cursorIn) {
                    this.follow(app.cursorX + spriteCounter * 14, app.cursorY);
                    if (spriteCounter != 0) {
                        this.x = leadSprite.x + spriteCounter * 14;
                        this.y = leadSprite.y;
                    }
                }
            }
            else {
                if (app.cursorActive) {
                    var strength = (this.originX - app.cursorX) / 2;
                    var bump = Math.abs( Math.sin( (this.y + this.originY / 2) / 50 ) * strength );
                    if (this.speedX < 0) {
                        this.x = this.originX - bump;
                    }
                    else {
                        this.x = this.originX + bump;
                    }
                }
                else if (app.cursorIn) {
                    this.follow(app.cursorX, app.cursorY + spriteCounter * 14);
                    if (spriteCounter != 0) {
                        this.x = leadSprite.x;
                        this.y = leadSprite.y + spriteCounter * 14;
                    }
                }
            }

            this.adjustOpacityToCursor();
            this.keepInCanvasByTeleport();
            break;


        case app.enumRectangler:

            var fuzziness = 70;
            if (!this.inited) {
                this.doCenter();
                if (spriteCounter == 0) {
                    var margin = 30;
                    this.x = misc.getRandomInt(margin, app.canvasWidth - margin * 2);
                    this.y = misc.getRandomInt(margin, app.canvasHeight - margin * 2);
                    this.speedX = 0; this.speedY = 0;
                    while (this.speedX == 0 && this.speedY == 0) {
                        this.speedX = misc.getRandom(-3, 3);
                        this.speedY = misc.getRandom(-3, 3);
                    }
                }
                else {
                    this.offsetX = misc.getRandomInt(-fuzziness, fuzziness);
                    this.offsetY = misc.getRandomInt(-fuzziness, fuzziness);
                }
                this.speedMaxX = 4;
                this.speedMaxY = this.speedMaxX;
                this.radius = 4;
                this.setRGBRandom();
                this.opacityStep = .001;
                this.maxOpacity = .25;
            }

            if (!this.initedAfterCursorInactive) {
                if (spriteCounter == 0) {
                    this.speedX = 0; this.speedY = 0;
                    while (this.speedX == 0 && this.speedY == 0) {
                        this.speedX = misc.getRandom(-3, 3);
                        this.speedY = misc.getRandom(-3, 3);
                    }
                }
                else if ( misc.chance(40) ) {
                    this.offsetX = misc.getRandomInt(-fuzziness, fuzziness);
                    this.offsetY = misc.getRandomInt(-fuzziness, fuzziness);
                }
                if ( misc.chance(15) ) {
                    this.setRGBRandom();
                }
            }

            if (app.rageModeJustActivated) {

                this.radius = 12;
                this.opacityStep = .1;
                this.maxOpacity = .89; // .9 causes problems (?!)

                if ( misc.chance(50) ) {
                    this.setRGBRandom();
                }
                else {
                    this.setRGBSemiRandom(true, true, true);
                }
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                this.speedX = 0; this.speedY = 0;
                while (this.speedX == 0 && this.speedY == 0) {
                    this.speedX = misc.getRandom(-3, 3);
                    this.speedY = misc.getRandom(-3, 3);
                }
            }
            else if (app.rageModeJustInactivated) {
                this.radius = 4;
                this.opacityStep = .001;
                this.maxOpacity = .25;
                if (this.opacity > this.maxOpacity) { this.opacity = this.maxOpacity; }
                this.speedMaxX = 4;
                this.speedMaxY = this.speedMaxX;
            }

            if (spriteCounter != 0) {
                this.x = leadSprite.x + this.offsetX;
                this.y = leadSprite.y + this.offsetY;
            }

            this.keepInCanvasWithMargin(50);
            this.adjustOpacityToCursor();
            break;


        case app.enumSprinkler:

            if (!this.inited) {
                this.doCenter();
                this.radius = 3;
                this.opacityStep = .06;
                this.setRGB(0,0,0);
            }

            if (!this.initedAfterCursorActive) {
                if ( this.getCursorDistance() <= 50 ) {
                    this.x = app.cursorX + misc.getRandomInt(-5, 5);
                    this.y = app.cursorY + misc.getRandomInt(-5, 5);
                    this.speedX = misc.getRandom(-5, 5);
                    this.speedY = misc.getRandom(-5, 5);
                }
            }

            if (!this.initedAfterCursorInactive && !app.rageMode) {
                if (spriteCounter == 0) {
                    this.radius = misc.getRandomInt(2, 6);
                }
                else {
                    this.radius = leadSprite.radius;
                }
            }

            if (app.rageModeJustActivated) {
                if (spriteCounter == 0) {
                    switch ( misc.getRandomInt(1, 3) ) {
                        case 1: this.setRGB(200,0,0); break;
                        case 2: this.setRGB(144,144,144); break;
                        case 3: this.setRGB(240,164,117); break;
                    }
                }
                else {
                    this.setRGBFromOtherSprite(leadSprite, 10);
                }

                this.radius = 10;
            }
            else if (app.rageModeJustInactivated) {
                this.setRGB(0,0,0);
                this.radius = misc.getRandomInt(2, 6);
            }

            if (app.cursorActive) {
                this.counter++;
                if (this.counter >= 200) {
                    this.speedX += misc.getRandom(-1, 1);
                    this.speedY += misc.getRandom(-1, 1);
                    this.counter = 200;
                }
            }
            else {
                this.follow(app.cursorX, app.cursorY);
                this.counter = 0;
            }

            this.keepInCanvasWithMargin(200);
            this.adjustOpacityToCursor();
            break;


        case app.enumShaper:

            if (!this.inited) {
                this.doCenter();
                this.radius = 6;
                this.offset = 40;
            }

            if (spriteCounter == 0) {
                if ( !this.initedAfterCursorInactive || misc.chance(2) ) {
                    this.targetX = misc.getRandomInt(0, app.canvasWidth);
                    this.targetY = misc.getRandomInt(0, app.canvasHeight);
                    this.speedX = 0;
                    this.speedY = 0;
                    this.speedMaxX = misc.getRandom(.1, 4);
                    this.speedMaxY = misc.getRandom(.1, 4);

                    this.speedStepX = misc.getRandom(.01, 2);
                    this.speedStepY = misc.getRandom(.01, 2);
                    this.maxOpacity = .9;
                    this.opacityStep = .2;
                    this.radius = 16;
                }
            }

            if (app.cursorIn) {
                this.setColorFromPosition(app.cursorX, app.cursorY);
            }
            else {
                this.setRGB(150, 150, 150);
            }

            if (app.rageMode) {
                if (++this.offset > 80) { this.offset = 80; }
            }
            else {
                if (--this.offset < 40) { this.offset = 40; }
            }

            switch ( Math.floor(spriteCounter) ) {
                case 0: this.followTarget(); break;
                case 1: this.x = leadSprite.x - this.offset; this.y = leadSprite.y - this.offset / 2; break;
                case 2: this.x = leadSprite.x; this.y = leadSprite.y - this.offset; break;
                case 3: this.x = leadSprite.x + this.offset; this.y = leadSprite.y - this.offset / 2; break;
                case 4: this.x = leadSprite.x + this.offset; this.y = leadSprite.y + this.offset / 2; break;
                case 5: this.x = leadSprite.x; this.y = leadSprite.y + this.offset; break;
                case 6: this.x = leadSprite.x - this.offset; this.y = leadSprite.y + this.offset / 2; break;
            }

            if (spriteCounter == 0) {
                this.keepInCanvasByTeleport();
            }
            
            this.adjustOpacityToCursor();
            break;

    }

    this.inited = true;
    this.initedAfterCursorActive = true;
    this.initedAfterCursorInactive = true;
}

Sprite.prototype.setRGBFromOtherSprite = function(other, fuzziness) {
    this.colorR = other.colorR + misc.getRandomInt(-fuzziness, fuzziness);
    this.colorG = other.colorG + misc.getRandomInt(-fuzziness, fuzziness);
    this.colorB = other.colorB + misc.getRandomInt(-fuzziness, fuzziness);
}

Sprite.prototype.keepInCanvasByTeleport = function() {
    var margin = this.radius * 2;
    if (this.x > app.canvasWidth + margin) {
        this.x = -margin;
        this.teleported = true;
    }
    else if (this.x < -margin) {
        this.x = app.canvasWidth + margin / 2;
        this.teleported = true;
    }

    if (this.y > app.canvasHeight + margin) {
        this.y = -margin;
        this.teleported = true;
    }
    else if (this.y < -margin) {
        this.y = app.canvasHeight + margin / 2;
        this.teleported = true;
    }
}

Sprite.prototype.setCircleOffset = function() {
    var v = misc.getRandomInt(0, this.offsetRadius);
    var vOther = Math.floor(v / 2);
    if ( misc.getRandomInt(0, 1) == 1 ) {
        this.offsetX = misc.getRandomInt(-v, v);
        this.offsetY = misc.getRandomInt(-vOther, vOther);
    }
    else {
        this.offsetX = misc.getRandomInt(-vOther, vOther);
        this.offsetY = misc.getRandomInt(-v, v);
    }
}

Sprite.prototype.setColorFromPosition = function(x, y) {
    var width = app.canvasWidth, height = app.canvasHeight / 15;

    var i = y / height;
    i = Math.ceil(i) - 1;

    if (app.colors[i]) {
        var r = app.colors[i][app.indexRed];
        var g = app.colors[i][app.indexGreen];
        var b = app.colors[i][app.indexBlue];
    
        var colResult = new Array();
        if (x < width / 2) { // mix with black
            var length = (width / 2) - x;
            var percentBlack = (length / (width / 2) ) * 100;
            var factor = app.paletteMax - ( percentBlack * (app.paletteMax / 100) );
            colResult = app.mixColors(r, g, b, 0, 0, 0, factor);
        }
        else if (x > width / 2) { // mix with white
            var length = Math.abs( (width / 2) - x );
            var percentWhite = (length / (width / 2) ) * 100;
            var factor = app.paletteMax - ( percentWhite * (app.paletteMax / 100) );
            colResult = app.mixColors(r, g, b, app.paletteMax - 1, app.paletteMax - 1, app.paletteMax - 1, factor);
        }
        else {
            colResult[app.indexRed] = r;
            colResult[app.indexGreen] = g;
            colResult[app.indexBlue] = b;
        }
    
        this.colorR = colResult[app.indexRed];
        this.colorG = colResult[app.indexGreen];
        this.colorB = colResult[app.indexBlue];
    }
}

Sprite.prototype.crosshatch = function(limit) {
    if (this.speedX > 0 && this.speedY > 0) {
        this.offsetX += this.speedStep;
        this.offsetY += this.speedStep;
        if (this.offsetX > limit) {
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }
    else if (this.speedX < 0 && this.speedY < 0) {
        this.offsetX -= this.speedStep;
        this.offsetY -= this.speedStep;
        if (this.offsetX < -limit) {
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }
    else if (this.speedX < 0 && this.speedY > 0) {
        this.offsetX -= this.speedStep;
        this.offsetY += this.speedStep;
        if (this.offsetX < -limit) {
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }
    else if (this.speedX > 0 && this.speedY < 0) {
        this.offsetX += this.speedStep;
        this.offsetY -= this.speedStep;
        if (this.offsetX > limit) {
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }

    if ( misc.getRandomInt(0, 1000) <= 5 ) {
        this.offsetXbase = misc.getRandomInt(-15, 15);
        this.offsetYbase = misc.getRandomInt(-15, 15);
        this.colorR = misc.getRandomInt(50, 200);
        this.colorG = misc.getRandomInt(50, 200);
        this.colorB = misc.getRandomInt(50, 200);
        this.opacity = 0;
    }
}

Sprite.prototype.scrollRed = function() {
    this.colorR += this.colorDirection;
    if (this.colorR <= 0 || this.colorR >= 255) {
        this.colorDirection *= -1;
    }
}

Sprite.prototype.scrollGreen = function() {
    this.colorG += this.colorDirection;
    if (this.colorG <= 0 || this.colorG >= 255) {
        this.colorDirection *= -1;
    }
}

Sprite.prototype.scrollBlue = function() {
    this.colorB += this.colorDirection;
    if (this.colorB <= 0 || this.colorB >= 255) {
        this.colorDirection *= -1;
    }
}

Sprite.prototype.getCursorDistance = function() {
    // oops, must use square root...
    var distanceX = Math.abs(app.cursorX - this.x);
    var distanceY = Math.abs(app.cursorY - this.y);
    return (distanceX + distanceY) / 2;
}

Sprite.prototype.getCursorDistanceFromOrigin = function() {
    // oops, must use square root...
    var distanceX = Math.abs(app.cursorX - this.originX);
    var distanceY = Math.abs(app.cursorY - this.originY);
    return (distanceX + distanceY) / 2;
}

Sprite.prototype.doCenter = function() {
    this.x = Math.floor( app.canvasWidth / 2 + misc.getRandomInt(-50, 50) );
    this.y = Math.floor( app.canvasHeight / 2 + misc.getRandomInt(-50, 50) );
}

Sprite.prototype.doRelax = function() {
    this.keepInCanvas();
}

Sprite.prototype.adjustOpacityToCursor = function() {
    if (app.cursorActive) {
        this.opacity += this.opacityStep;
        if (this.opacity > this.maxOpacity) { this.opacity = this.maxOpacity; }
    }
    else {
        this.opacity -= this.opacityStep;
        if (this.opacity < 0) { this.opacity = 0; }
    }
}

Sprite.prototype.follow = function(cursorX, cursorY) {
    var targetX, targetY;
    if (app.cursorIn) {
        targetX = cursorX;
        targetY = cursorY;
    }
    else {
        targetX = Math.floor( app.canvasWidth / 2 + misc.getRandomInt(-50, 50) );
        targetY = Math.floor( app.canvasHeight / 2 + misc.getRandomInt(-50, 50) );
    }

    if (this.x > targetX) {
        this.speedX -= this.speedStep;
        if (this.speedX < -this.speedMaxX) { this.speedX = -this.speedMaxX; }
    }
    else if (this.x < targetX) {
        this.speedX += this.speedStep;
        if (this.speedX > this.speedMaxX) { this.speedX = this.speedMaxX; }
    }

    if (this.y > targetY) {
        this.speedY -= this.speedStep;
        if (this.speedY < -this.speedMaxY) { this.speedY = -this.speedMaxY; }
    }
    else if (this.y < targetY) {
        this.speedY += this.speedStep;
        if (this.speedY > this.speedMaxY) { this.speedY = this.speedMaxY; }
    }
}

Sprite.prototype.followSimple = function(targetX, targetY) {
    if (this.x > targetX) {
        this.speedX -= this.speedStep;
        if (this.speedX < -this.speedMaxX) { this.speedX = -this.speedMaxX; }
    }
    else if (this.x < targetX) {
        this.speedX += this.speedStep;
        if (this.speedX > this.speedMaxX) { this.speedX = this.speedMaxX; }
    }

    if (this.y > targetY) {
        this.speedY -= this.speedStep;
        if (this.speedY < -this.speedMaxY) { this.speedY = -this.speedMaxY; }
    }
    else if (this.y < targetY) {
        this.speedY += this.speedStep;
        if (this.speedY > this.speedMaxY) { this.speed = this.speedMaxY; }
    }
}

Sprite.prototype.followX = function(cursorX) {
    var targetX;
    if (app.cursorIn) {
        targetX = cursorX;
    }
    else {
        targetX = Math.floor( app.canvasWidth / 2 + misc.getRandomInt(-50, 50) );
    }

    if (this.x > targetX) {
        this.speedX -= this.speedStep;
        if (this.speedX < -this.speedMaxX) { this.speedX = -this.speedMaxX; }
    }
    else if (this.x < targetX) {
        this.speedX += this.speedStep;
        if (this.speedX > this.speedMaxX) { this.speedX = this.speedMaxX; }
    }
}

Sprite.prototype.followY = function(cursorY) {
    var targetY;
    if (app.cursorIn) {
        targetY = cursorY;
    }
    else {
        targetY = Math.floor( app.canvasHeight / 2 + misc.getRandomInt(-50, 50) );
    }

    if (this.y > targetY) {
        this.speedY -= this.speedStep;
        if (this.speedY < -this.speedMaxY) { this.speedY = -this.speedMaxY; }
    }
    else if (this.y < targetY) {
        this.speedY += this.speedStep;
        if (this.speedY > this.speedMaxY) { this.speedY = this.speedMaxY; }
    }
}

Sprite.prototype.setRGB = function(r, g, b) {
    this.colorR = misc.forceMinMax(r, 0, 255);
    this.colorG = misc.forceMinMax(g, 0, 255);
    this.colorB = misc.forceMinMax(b, 0, 255);
}

Sprite.prototype.setRGBRandom = function() {
    this.colorR = misc.getRandomInt(0, 255);
    this.colorG = misc.getRandomInt(0, 255);
    this.colorB = misc.getRandomInt(0, 255);
}

Sprite.prototype.setRGBSemiRandom = function(highR, highG, highB) {
    this.colorR = highR ? misc.getRandomInt(200, 255) : misc.getRandomInt(50, 100);
    this.colorG = highG ? misc.getRandomInt(200, 255) : misc.getRandomInt(50, 100);
    this.colorB = highB ? misc.getRandomInt(200, 255) : misc.getRandomInt(50, 100);
}

Sprite.prototype.keepInCanvas = function() {
    if ( (this.speedX < 0 && this.x - this.radius <= 0) ||
            (this.speedX > 0 && this.x + this.radius >= app.canvasWidth) ) {
        this.speedX *= -1;
    }

    if ( (this.speedY < 0 && this.y - this.radius <= 0) ||
            (this.speedY > 0 && this.y + this.radius >= app.canvasHeight) ) {
        this.speedY *= -1;
    }
}

Sprite.prototype.keepInCanvasAllowOverlap = function() {
    if ( (this.speedX < 0 && this.x <= 0) ||
            (this.speedX > 0 && this.x >= app.canvasWidth) ) {
        this.speedX *= -1;
    }

    if ( (this.speedY < 0 && this.y <= 0) ||
            (this.speedY > 0 && this.y >= app.canvasHeight) ) {
        this.speedY *= -1;
    }
}

Sprite.prototype.keepInCanvasWithMargin = function(margin) {
    if ( (this.speedX < 0 && this.x <= -margin) ||
            (this.speedX > 0 && this.x >= app.canvasWidth + margin) ) {
        this.speedX *= -1;
    }

    if ( (this.speedY < 0 && this.y <= -margin) ||
            (this.speedY > 0 && this.y >= app.canvasHeight + margin) ) {
        this.speedY *= -1;
    }
}

Sprite.prototype.getRGBString = function(offset) {
    var r = this.colorR + offset;
    var g = this.colorG + offset;
    var b = this.colorB + offset;
    return misc.forceMinMax(r, 0, 255) + ',' + misc.forceMinMax(g, 0, 255) + ',' + misc.forceMinMax(b, 0, 255);
}

Sprite.prototype.draw = function(ctx, drawType, neighbor, spriteCounter) {
    // hack to avoid zero-line drawing
    var oldX = this.oldX, oldY = this.oldY;
    if (this.type != app.enumLineSpray) {
        if (oldX == this.x) { oldX++; }
        if (oldY == this.y) { oldY++; }
    }

    switch (this.type) {

        case app.enumCircle:

            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.stroke();
                ctx.closePath();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.05)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.4)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumCircleHunter:

            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';

                ctx.moveTo(this.x - this.radius, this.y - this.radius);
                ctx.lineTo(this.x + this.radius, this.y + this.radius);

                ctx.moveTo(this.x + this.radius, this.y - this.radius);
                ctx.lineTo(this.x - this.radius, this.y + this.radius);

                ctx.closePath();
                ctx.stroke();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.3)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.4)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumLineSpray:
            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.moveTo(oldX, oldY);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,.1)';
                ctx.moveTo(neighbor.x, neighbor.y);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.5)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.4)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;

        case app.enumMatrix:
            if (drawType == app.enumDrawInk) {
                if (spriteCounter != 0) {
                    var target = app.sprites[0];
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.closePath();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                    ctx.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                    ctx.fill();
                    ctx.closePath();
                }
            }
            else if (drawType == app.enumShow) {
                if (spriteCounter != 0) {
                    var target = app.sprites[0];
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,0,0,.3)';
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.closePath();
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.5)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.4)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumFollower:
            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.moveTo(oldX, oldY);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                ctx.fill();
                ctx.closePath();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.6)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.6)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumRectangler:
            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.moveTo(neighbor.x, neighbor.y);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,.1)';
                ctx.moveTo(neighbor.x, neighbor.y);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.5)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.4)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumLines:
            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.moveTo(neighbor.x, neighbor.y);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,.1)';
                ctx.moveTo(neighbor.x, neighbor.y);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.5)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.4)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumGrid:
            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                ctx.fill();
                ctx.closePath();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',.4)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.3)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumPendulum:

            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                ctx.fill();
                ctx.closePath();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.2)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.2)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;


        case app.enumHunter:
        case app.enumCurve:
        case app.enumSprinkler:

            if (drawType == app.enumDrawInk) {
                if ( !this.teleported && !( misc.getDistance(oldX, oldY, this.x, this.y) >= 50 ) ) {
                    ctx.beginPath();
                    ctx.lineWidth = this.radius;
                    ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                    ctx.moveTo(oldX, oldY);
                    ctx.lineTo(this.x, this.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.6)';
                ctx.arc( this.x, this.y, misc.forceMin(this.radius, 4), 0, app.fullCircle, true );
                ctx.strokeStyle = 'rgba(0,0,0,.6)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;

        case app.enumShaper:

            var otherX = Math.floor(spriteCounter) < app.maxSprites - 1 ? app.sprites[Math.floor(spriteCounter) + 1].x : app.sprites[1].x;
            var otherY = Math.floor(spriteCounter) < app.maxSprites - 1 ? app.sprites[Math.floor(spriteCounter) + 1].y : app.sprites[1].y;
            if (drawType == app.enumDrawInk) {
                if ( Math.floor(spriteCounter) >= 1 ) {
                    ctx.beginPath();
                    ctx.lineWidth = this.radius;
                    ctx.strokeStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                    ctx.moveTo(otherX, otherY);
                    ctx.lineTo(this.x, this.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',.4)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.3)';
                if ( Math.floor(spriteCounter) >= 1 ) {
                    ctx.moveTo(otherX, otherY);
                    ctx.lineTo(this.x, this.y);
                }
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;

        default:

            if (drawType == app.enumDrawInk) {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',' + this.opacity + ')';
                ctx.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                ctx.fill();
                ctx.closePath();
            }
            else if (drawType == app.enumShow) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255,255,255,.6)';
                ctx.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                ctx.strokeStyle = 'rgba(0,0,0,.6)';
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;
    }
}


/**** Misc. functions ****/

function MiscLibrary() {
}

MiscLibrary.prototype.getRandomInt = function(min, max) {
    return Math.floor( ( (max + 1 - min) * Math.random() ) + min );
}

MiscLibrary.prototype.getRandom = function(min, max) {
    return (max - min) * Math.random() + min;
}

MiscLibrary.prototype.chance = function(chanceInPercent) {
	return this.getRandom(0, 100) <= chanceInPercent;
}

MiscLibrary.prototype.showLayer = function(id) {
    var elm = document.getElementById(id);
    if (elm) {
        elm.style.display = 'block';
    }
}

MiscLibrary.prototype.hideLayer = function(id) {
    var elm = document.getElementById(id);
    if (elm) {
        elm.style.display = 'none';
    }
}

MiscLibrary.prototype.debug = function(s) {
    this.writeInLayer('debug', s);
}

MiscLibrary.prototype.debug2 = function(s) {
    this.writeInLayer('debug2', s);
}

MiscLibrary.prototype.writeInLayer = function(id, html) {
    var elm = document.getElementById(id);
    if (elm) {
        elm.innerHTML = html;
    }
}

MiscLibrary.prototype.forceMinMax = function(v, min, max) {
    if (v < min) {
        v = min;
    }
    else if (v > max) {
        v = max;
    }
    return v;
}

MiscLibrary.prototype.forceMin = function(v, min) {
    return v < min ? min : v;
}

MiscLibrary.prototype.forceMax = function(v, max) {
    return v > max ? max : v;
}

MiscLibrary.prototype.showElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.display = 'block'; }
}

MiscLibrary.prototype.hideElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.display = 'none'; }
}

MiscLibrary.prototype.getDistance = function(x1, y1, x2, y2) {
    var distanceX = x1 - x2;
    var distanceY = y1 - y2;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
