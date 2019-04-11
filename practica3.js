window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim") // Load any needed modules
    .setup({width:800, height:600, scaleToFit: true}) // Add a canvas element onto the page
    .controls()                        // Add in default controls (keyboard, buttons)
    .touch();                          // Add in touch support (for the UI)

    Q.loadTMX("level.tmx", function() {
        Q.stageScene("level1");
        //Q.state.reset();
    });

    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        var player = stage.insert(new Q.Mario());
        stage.add("viewport").follow(player, {x: true});
        stage.viewport.offsetX = -100;
    });

    Q.Sprite.extend("Mario", {
        init: function(p) {
            this._super(p, {
                //sprite: "mario_small",
                sheet: "marioR",
                jumpSpeed: -400,
                speed: 300,
                x : 400,
                y : 100
            });
            this.add('2d, platformerControls');
            this.on("hit.sprite",function(collision){});
        },

        step: function(dt) {
            if(this.p.y > 600) {
                this.p.y = 600;
            }
            if(this.p.x < 400) {
                this.p.x = 400;
            }
        
            if(this.p.vy > 600) { this.p.vy = 600; }
            
          }
        
    });

    Q.load(["mario_small.png", "mario_small.json"], function() {
        Q.compileSheets("mario_small.png", "mario_small.json");
    });

});