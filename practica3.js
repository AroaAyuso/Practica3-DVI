window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim, Audio") // Load any needed modules
    .setup({width:800, height:600})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch()                            // Add in touch support (for the UI)
    .enableSound();

    Q.loadTMX("level.tmx", function() {
        Q.stageScene("level1");
        //Q.stageScene("mainTitle");

        Q.state.reset({coins: 0});
        //Q.stageScene("mainTitle");
    });

    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        var player = stage.insert(new Q.Mario({x : 210, y : 535}));
        stage.add("viewport").follow(player, {x: true});
        stage.viewport.offsetX = -200;
        

        stage.insert(new Q.Goomba({x : 950, y : 535}));
        stage.insert(new Q.Goomba({x : 910, y : 535}));
        stage.insert(new Q.Goomba({x : 700, y : 535}));
        stage.insert(new Q.Goomba({x : 1200, y : 535}));
        stage.insert(new Q.Goomba({x : 1300, y : 535}));

        //stage.insert(new Q.Bloopa({x : 850}));
        //stage.insert(new Q.Bloopa({x : 950, y: 450}));
        //stage.insert(new Q.Bloopa({x : 1050}));

        stage.insert(new Q.Princess({x: 600}));
        stage.insert(new Q.Coin({x: 500, y: 300}));

    });

    Q.scene('endGame',function(stage) {
        var container = stage.insert(new Q.UI.Container({
          x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        }));
        var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",label: "Play Again" }))         
        var label = container.insert(new Q.UI.Text({x:0, y: -10 - button.p.h, label: stage.options.label }));
        button.on("click",function() {
            Q.clearStages();
            Q.stageScene('level1');
            Q.stageScene("hud",1);
        });
        
        container.fit(20);
    });

    Q.scene('mainTitle',function(stage) {
        var button = new Q.UI.Button({ x: Q.width, y: Q.height, asset : "mainTitle.png" });
        stage.insert(button);
        //var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",label: "Start Game" }))         
        button.on("click",function() {
            Q.clearStages();
            Q.stageScene('level1');
            Q.stageScene("hud",1);
        });
        Q.input.on("confirm", function(){
			Q.clearStages();
            Q.stageScene('level1');
            Q.stageScene("hud",1);
		});

    });

    Q.UI.Text.extend("Coins_count", {
        init: function(p) {
            this._super(p, {
                label: "Coins: " + Q.state.get("coins"),
                color: "white",
                x: -130,
                y: -600
            });
            Q.state.on("change.coins", this, "update_coin");
        },
        update_coin: function(coins) {
            this.p.label = "Coins: " + coins;
        }
    });

    Q.scene("hud", function(stage) {
        /** Primero, voy a crear un "Container" que contendrá los labels. */
        var container = stage.insert(new Q.UI.Container({
            x: Q.width,
            y: Q.height,
            fill: "white"
        }));

        container.insert(new Q.Coins_count());
        stage.insert(container);
    });


    Q.Sprite.extend("Mario", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_mario",
                sheet: "marioR",
                jumpSpeed: -650,
                speed: 200,
                gravity: 1.5,
                saltando: false,
                level: 0, //Nivel de desarrollo de Mario: pequeño = 0, grande = 1, fuego = 2, invencible = 3
                muerto: false
            });

            this.add('2d, platformerControls, animation');

            this.on("muerte_t", this, "muerte");

            this.on("hit.sprite",function(collision){
                /*if(collision.obj.isA("Princess")) {
                    Q.stageScene("endGame",1, { label: "You Won!" }); 
                    this.destroy();
                  }
                */
            });

            this.on("bump.bottom", function(collision) {
                if(collision.obj.isA("Goomba")) {
                    if(Q.inputs['up']) {
                        this.p.vy = -500;
                    }
                    else {
                        this.p.vy = -300;
                    }
                }
            });
        },

        step: function(dt) {
            direccion = "";

            //Cogemos la dirección de Mario para usarla con las animaciones
            if(this.p.direction == 'right')
                direccion = "derecha";
            else
                direccion = "izquierda";

            //Animaciones
            if(this.p.landed < 0 && !this.p.saltando) {
                this.play("saltando_" + direccion);
            }
            else {
                if (this.p.vx != 0 || this.p.vy != 0)
                    this.play("corriendo_" + direccion);
                else
                    this.play("quieto_" + direccion);
            }

            //Matamos a Mario cuando se cae del escenario
            if(this.p.y > 590 && !this.muerto) {
                this.muerteAux();
            }
            //Para que no se salga del borde izquierdo
            if(this.p.x < 210) {
                this.p.x = 210;
            }
            
        },

        muerteAux: function(p) {
            if(this.p.level == 0 || this.p.y > 590) {
                this.muerto = true;
                this.p.vy = -500;
                this.p.collisionMask = Q.SPRITE_NONE;
                this.play("muerte", 1);
            }
        },
        
        muerte: function(p) {
            this.destroy();
        }

    });

    Q.Sprite.extend("Goomba", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_goomba",
                sheet: "goomba",
                vx: -75
            });

            this.add('2d, aiBounce, animation');

            this.on("muerte_t", this, "muerte");

            this.on("bump.left, bump.right, bump.bottom", function(collision) {
                if(collision.obj.isA("Mario")) {
                    Q.stageScene("endGame",1, { label: "You Died" });
                    collision.obj.muerteAux();
                    //collision.obj.destroy();
                    this.p.vx = -this.p.vx;
                }
            });
            this.on("bump.top", function(collision) {
                if(collision.obj.isA("Mario")) {
                    this.play("muerte", 1);
                }
            });
        },

        step: function(dt) {
            this.play("andar");
        },

        muerte: function(p) {
            this.destroy();
        }
    });

    Q.Sprite.extend("Bloopa", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_bloopa",
                sheet: "bloopa",
                gravity: 0.4,
                vy: 0,
            });
            this.add("2d, animation");
            this.on("muerte", this, "muerte");

            this.on("bump.left,bump.right,bump.bottom",function(collision) {
            this.add('2d, animation');
            
            this.on("bump.left, bump.right, bump.bottom", function(collision) {
                if(collision.obj.isA("Mario")) { 
                  Q.stageScene("endGame",1, { label: "You Died" }); 
                  collision.obj.destroy();
                }
              });
          
           this.on("bump.top",function(collision) {
            this.on("bump.top", function(collision) {
                if(collision.obj.isA("Mario")) { 
                   this.play("muerte", 1)
                }
            });

            this.on("bump.bottom",this, "jump");
           
        },

        jump: function(dt) {
            this.p.vy=-300;
        },
        step: function(dt){
            
           if (this.p.vy < 0) this.play("bajar");
           else this.play("subir");
        },
        muerte: function(p){
            this.destroy();
        }
    
    });

    Q.Sprite.extend("Princess",{
        init: function(p) {
			this._super(p, {
            asset: "princess.png",
            sensor: true,
			y: 520
		});
			this.on("hit", this, "sensor");
		},

		sensor: function(collision){
			if(collision.obj.isA("Mario")){
                Q.stageScene("endGame",1, { label: "You Win" }); 
                collision.obj.destroy(); // Se elimina Mario
                this.destroy(); // Se elimina Peach
			}
		}

    });


    Q.Sprite.extend("Coin", {
        init: function(p) {
            this._super(p, {
                sprite: "coin_animacion",
                sheet: "coin"
            });
            this.add("tween, animation");
            this.on("hit", this, "hit");
            this.play("brillo");
        },
        hit: function(collision){
            if(collision.obj.isA("Mario")){ 
                Q.state.inc('coin', 1);
                this.destroy();
			}
        }
    });


    Q.animations("bloopa", {
        subir:{frames: [0], rate: 1/3, loop: true},
        bajar:{frames: [1], rate: 1/3, loop: true},
        muerte:{frames: [2], rate: 1/10, loop: false, trigger:"muerte"}
    });
    Q.animations("coin_animacion",{
        brillo :{frames: [0,1,2], rate: 1/3, loop: true}
    });


        step: function(dt) {
           if (this.p.vy < 0)
                this.play("subir");
           else
                this.play("bajar");
        }
        
    });

    Q.animations("animaciones_mario", {
        quieto_derecha: {frames: [0], loop: false},
        quieto_izquierda: {frames: [14], loop: false},
        corriendo_derecha: {frames: [1, 2, 3], rate: 1/13, loop: true},
        corriendo_izquierda: {frames: [15, 16, 17], rate: 1/13, loop: true},
        saltando_derecha: {frames: [4], loop: true},
        saltando_izquierda: {frames: [18], loop: true},
        muerte: {frames: [12], rate: 3, loop: false, trigger: "muerte_t"}
    })

    Q.animations("animaciones_goomba", {
        andar: {frames: [0, 1], rate: 1/6, loop: true},
        muerte: {frames: [2], rate: 1/10, loop: false, trigger: "muerte_t"}
    });

    Q.animations("animaciones_bloopa", {
        subir: {frames: [0], rate: 1/3, loop: true},
        bajar: {frames: [1], rate: 1/3, loop: true},
        muerto :{frames: [2], rate: 1/4, loop: false}
    });

    Q.load(["mario_small.png", "mario_small.json",
            "goomba.png", "goomba.json",
            "bloopa.png", "bloopa.json",
            "princess.png",
            "coin.png","coin.json"
        ], function() {
        Q.compileSheets("mario_small.png", "mario_small.json");
        Q.compileSheets("goomba.png", "goomba.json");
        Q.compileSheets("bloopa.png", "bloopa.json");
        Q.compileSheets("princess.png");
        Q.compileSheets("coin.png","coin.json");

       // Q.compileSheets("princess.png","princess.json");
    });

});