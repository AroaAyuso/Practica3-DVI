window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim, Audio") // Load any needed modules
    .setup({width:800, height:600})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch()                            // Add in touch support (for the UI)
    .enableSound();

    Q.loadTMX("level.tmx", function() {
        Q.stageScene("level1");
        Q.state.reset();
    });

    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        var player = stage.insert(new Q.Mario({x : 210, y : 535}));
        stage.add("viewport").follow(player, {x: true});
        stage.viewport.offsetX = -200;

        stage.insert(new Q.Goomba({x : 400, y : 400}));
    });

    Q.Sprite.extend("Mario", {
        init: function(p) {
            this._super(p, {
                //sprite: "mario_small",
                sheet: "marioR",
                jumpSpeed: -525,
                speed: 300,
            });
            this.add('2d, platformerControls');
            this.on("hit.sprite",function(collision){});
        },

        step: function(dt) {
            if(this.p.y > 590) {
                this.p.x = 210;
                this.p.y = 535;
            }
            if(this.p.x < 210) {
                this.p.x = 210;
            }
        
            if(this.p.vy > 600) { this.p.vy = 600; }
            
          }
        
    });

    Q.Sprite.extend("Goomba", {
        init: function(p) {
            this._super(p, {
                sheet: "goomba",
                gravity: 0.5
            });
            this.add("2d");

            this.on("bump.left, bump.right, bump.bottom", function(colision) {
                if(colision.obj.isA("Player")) {
                    collision.obj.destroy();
                }
            });
            /*this.on("bump.top", function(colision) {
                if(colision.obj.isA("Player")) {
                    this.destroy();
                }
            });*/
        }
    });

    Q.load(["mario_small.png", "mario_small.json",
            "goomba.png", "goomba.json"
        ], function() {
        Q.compileSheets("mario_small.png", "mario_small.json",
            "goomba.png", "goomba.json");
    });

});