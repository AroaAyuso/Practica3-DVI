window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim, Audio") // Load any needed modules
    .setup({width:800, height:600})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch()                            // Add in touch support (for the UI)
    .enableSound();                     // Permite activar el sonido

    // CARGA
    Q.loadTMX("level.tmx, level2.tmx", function() {
        Q.state.reset({punct: 0, coins: 0, lives : 3});
        Q.stageScene("mainTitle");
    });

    // NIVEL 1
    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        var player = stage.insert(new Q.Mario({x : 210, y : 535}));
        stage.add("viewport").follow(player, {x: true});
        stage.viewport.offsetX = -200;
        Q.audio.stop();
		Q.audio.play('music_main.mp3',{ loop: true });
/*
        stage.insert(new Q.Goomba({x : 700, y : 535}));
        stage.insert(new Q.Goomba({x : 1300, y : 535}));
        stage.insert(new Q.Goomba({x : 1450, y : 535}));
        stage.insert(new Q.Goomba({x : 1500, y : 535}));
        stage.insert(new Q.Bloopa({x : 2600, y : 535}));
        stage.insert(new Q.Bloopa({x : 2700, y : 535}));
        stage.insert(new Q.Bloopa({x : 2950, y : 535}));
        stage.insert(new Q.Goomba({x : 3100, y : 535}));
        stage.insert(new Q.Goomba({x : 3150, y : 535}));
        stage.insert(new Q.Goomba({x : 3200, y : 535}));
        stage.insert(new Q.Goomba({x : 3250, y : 535}));
        stage.insert(new Q.Goomba({x : 3300, y : 535}));
        stage.insert(new Q.Goomba({x : 3350, y : 535}));
        stage.insert(new Q.Goomba({x : 3400, y : 535}));
        stage.insert(new Q.Goomba({x : 3450, y : 535}));
        stage.insert(new Q.Goomba({x : 3500, y : 535}));
        stage.insert(new Q.Goomba({x : 3600, y : 535}));
        stage.insert(new Q.Goomba({x : 3800, y : 535}));
        stage.insert(new Q.Goomba({x : 3900, y : 535}));
        stage.insert(new Q.Goomba({x : 4000, y : 535}));
        stage.insert(new Q.Goomba({x : 4100, y : 535}));
        stage.insert(new Q.Goomba({x : 4200, y : 535}));
        stage.insert(new Q.Goomba({x : 4300, y : 535}));
        stage.insert(new Q.Goomba({x : 4400, y : 535}));
        stage.insert(new Q.Bloopa({x : 4750, y : 535}));
*/
        //  Bloques con moneda
        stage.insert(new Q.Question({x: 380, y: 425}));
        stage.insert(new Q.Question({x: 527, y: 425}));
        stage.insert(new Q.Question({x: 595, y: 425}));
        stage.insert(new Q.Question({x: 561, y: 300}));
        stage.insert(new Q.Question({x: 2479, y: 425}));
        stage.insert(new Q.Question({x: 2516, y: 425}));

        stage.insert(new Q.Question({x: 3404, y: 425}));
        stage.insert(new Q.Question({x: 3540, y: 425}));
        stage.insert(new Q.Question({x: 3676, y: 425}));

        stage.insert(new Q.Question({x: 3472, y: 289}));
        stage.insert(new Q.Question({x: 3608, y: 289}));

        stage.insert(new Q.Question({x: 4200, y: 289}));
        stage.insert(new Q.Question({x: 4235, y: 289}));

        stage.insert(new Q.Question({x: 5642, y: 425}));
        
        // Monedas
        stage.insert(new Q.Coin({x: 867, y: 391}));
        stage.insert(new Q.Coin({x: 935, y: 391}));
        stage.insert(new Q.Coin({x: 1003, y: 391}));

        stage.insert(new Q.Coin({x: 1173, y: 357}));
        stage.insert(new Q.Coin({x: 1241, y: 357}));
        stage.insert(new Q.Coin({x: 1309, y: 357}));

        stage.insert(new Q.Coin({x: 1513, y: 357}));
        stage.insert(new Q.Coin({x: 1581, y: 357}));
        stage.insert(new Q.Coin({x: 1649, y: 357}));

        stage.insert(new Q.Coin({x: 2567, y: 255}));
        stage.insert(new Q.Coin({x: 2601, y: 255}));
        stage.insert(new Q.Coin({x: 2635, y: 255}));
        stage.insert(new Q.Coin({x: 2669, y: 255}));
        stage.insert(new Q.Coin({x: 2703, y: 255}));
        stage.insert(new Q.Coin({x: 2737, y: 255}));

        stage.insert(new Q.Coin({x: 3927, y: 255}));
        stage.insert(new Q.Coin({x: 3961, y: 255}));
        stage.insert(new Q.Coin({x: 3995, y: 255}));

        stage.insert(new Q.Coin({x: 4539, y: 289}));
        stage.insert(new Q.Coin({x: 4505, y: 289}));

        stage.insert(new Q.Coin({x: 5049, y: 289}));
        stage.insert(new Q.Coin({x: 5015, y: 289}));

        stage.insert(new Q.Coin({x: 5661, y: 391}));
        stage.insert(new Q.Coin({x: 5559, y: 391}));
        stage.insert(new Q.Coin({x: 5593, y: 391}));
        stage.insert(new Q.Coin({x: 5627, y: 391}));

        stage.insert(new Q.Princess({x: 6500, y: 520}));


    });

    Q.scene("level2", function(stage){
        Q.stageTMX("level2.tmx", stage);
        var player = stage.insert(new Q.Mario({x : 210, y : 535}));
        stage.add("viewport").follow(player, {x: true});
        stage.viewport.offsetX = -200;
        Q.audio.stop();
        Q.audio.play('music_main.mp3',{ loop: true });
        
        stage.insert(new Q.Goomba({x : 800, y : 535}));
        stage.insert(new Q.Goomba({x : 850, y : 535}));
        stage.insert(new Q.Bloopa({x : 748, y : 300}));
        stage.insert(new Q.Bloopa({x : 1564, y : 300}));
        stage.insert(new Q.Bloopa({x : 1666, y : 300}));
        stage.insert(new Q.Bloopa({x : 1768, y : 300}));
    });

    // PANTALLA DE FIN DE JUEGO
    Q.scene('endGame',function(stage) {
        var container = stage.insert(new Q.UI.Container({ x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"}));
        if(Q.state.get("lives") == 0 || Q.state.get("level") == 2){
            var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",label: "Play Again" }));         
            var label = container.insert(new Q.UI.Text({x:0, y: -10 - button.p.h, label: stage.options.label }));
        }
        else {
            var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",label: "Next Level" }));       
            var label = container.insert(new Q.UI.Text({x:0, y: -10 - button.p.h, label: stage.options.label }));
        }

        button.on("click",function() {
            Q.clearStages();
            if (Q.state.get("lives") == 0|| Q.state.get("level") > 3){
                Q.state.reset({punct: 0, coins: 0,lives : 3, level: 1});
                Q.stageScene('level1');
                Q.stageScene("hud",1);
            }
            else{
                level = "level" + Q.state.get("level");
				Q.stageScene(level);
				Q.stageScene("hud",1);
            }
        });
        
        container.fit(20);
    });

    // PANTALLA PRINCIPAL
    Q.scene('mainTitle',function(stage) {
        var button = new Q.UI.Button({x: Q.width/2, y: Q.height/2, asset : "splash_screen.jpg"});
        stage.insert(button);
        Q.state.reset({punct: 0, coins: 0, lives: 3, level: 1});
        button.on("click",function() {
            Q.clearStages();
            Q.stageScene('level1');
            Q.stageScene("hud",1);
        });
    });

    Q.UI.Text.extend("Punctuation_count", {
        init: function(p) {
            this._super(p, {
                label: "Punct: " + Q.state.get("punct"),
                color: "white",
                x: -680,
                y: -600
            });
            Q.state.on("change.punct", this, "update_punct");
        },
        update_punct: function(punct) {
            this.p.label = "Punct: " + punct;
        }
    });

    // CONTADOR DE MONEDAS
    Q.UI.Text.extend("Coins_count", {
        init: function(p) {
            this._super(p, {
                label: "Coins: " + Q.state.get("coins"),
                color: "white",
                x: -200,
                y: -600
            });
            Q.state.on("change.coins", this, "update_coin");
        },
        update_coin: function(coins) {
            this.p.label = "Coins: " + coins;
        }
    });

    // CONTADOR DE VIDAS
    Q.UI.Text.extend("Lives_count", {
        init: function(p) {
            this._super(p, {
                label: "Lives: " + Q.state.get("lives"),
                color: "white",
                x: -60,
                y: -600
            });
            Q.state.on("change.lives", this, "update_live");
        },
        update_live: function(lives) {
            this.p.label = "Lives: " + lives;
        }
    });

    // HUD
    Q.scene("hud", function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width,
            y: Q.height,
            fill: "white"
        }));

        container.insert(new Q.Punctuation_count());
        container.insert(new Q.Coins_count());
        container.insert(new Q.Lives_count());
        stage.insert(container);
        
    });

    // MARIO
    Q.Sprite.extend("Mario", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_mario",
                sheet: "marioR",
                jumpSpeed: -650,
                speed: 220,
                gravity: 1.5,
                level: 0, //Nivel de desarrollo de Mario: pequeño = 0, grande = 1, fuego = 2, invencible = 3
                muerto: false
            });

            this.add('2d, platformerControls, animation');

            this.on("muerte_t", this, "muerte");

            this.on("bump.bottom", function(collision) {
                if(collision.obj.isA("Goomba") && !this.p.muerto) {
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
            if(this.p.landed < 0) {
                this.play("saltando_" + direccion);
            }
            else {
                if (this.p.vx != 0 && this.p.speed <= 220)
                    this.play("corriendo_" + direccion);
                else if (this.p.vx != 0 && this.p.speed > 220)
                    this.play("corriendo_rapido_" + direccion);
                else
                    this.play("quieto_" + direccion);
            }

            if(Q.inputs['fire'] && (Q.inputs['left'] || Q.inputs['right'])) {
                this.p.speed += 5;
                if(this.p.speed > 320) 
                    this.p.speed = 320;
            }
            else {
                this.p.speed -= 5;
                if(this.p.speed < 220) 
                    this.p.speed = 220;
            }

            //Matamos a Mario cuando se cae del escenario
            if(this.p.y > 590 && !this.p.muerto) {
                this.muerteAux();
            }
            //Para que no se salga del borde izquierdo
            if(this.p.x < 210) {
                this.p.x = 210;
            }
            
        },

        muerteAux: function(p) {
                if((this.p.level == 0 || this.p.y > 590) && !this.p.muerto) {
                    this.p.muerto = true;
                    Q.state.dec("lives", 1);
                    this.p.vy = -500;
                    this.p.collisionMask = Q.SPRITE_NONE;
                    Q.audio.stop();
		            Q.audio.play('music_die.mp3',{ loop: false });
                    this.play("muerte", 4); //Hacemos que desaparezca a los dos segundos para evitar situaciones no deseadas
                }      
        },
        
        muerte: function(p) {
            this.destroy();
            if(Q.state.get("lives") == 0)
                Q.stageScene("endGame",1, { label: "You Died" });
            else {
                level = "level" + Q.state.get("level");
                Q.clearStages();
                Q.stageScene(level);
                Q.stageScene("hud", 1);
            }
        }

    });

    // GOOMBA
    Q.Sprite.extend("Goomba", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_goomba",
                sheet: "goomba",
                vx: -75
            });

            this.add('2d, aiBounce, animation, DefaultEnemy');
        },

        step: function(dt) {
            this.play("andar");
        },
        musica: function(dt){
           // Q.audio.play('squish_enemy.mp3',{ loop: false });
        }

    });

    // BLOOPA
    Q.Sprite.extend("Bloopa", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_bloopa",
                sheet: "bloopa",
                gravity: 0.4,
                vy: 0,
            });
            this.add('2d, animation, DefaultEnemy');

            this.on("bump.bottom",this, "jump");
           
        },

        jump: function(dt) {
            this.p.vy=-300;
        },

        step: function(dt){
            if (this.p.vy < 0)
                this.play("bajar");
            else
                this.play("subir");
        }    
    });

    // PRINCESA PEACH
    Q.Sprite.extend("Princess",{
        init: function(p) {
			this._super(p, {
            asset: "princess.png",
            sensor: true
		});
			this.on("hit", this, "sensor");
		},

		sensor: function(collision){
			if(collision.obj.isA("Mario")){
                Q.audio.stop();
                Q.audio.play('music_level_complete.mp3',{ loop: false });
                Q.stageScene("endGame",1,{label: "LEVEL " + Q.state.get("level") + " WON!"});
				Q.state.inc("level", 1);
                collision.obj.destroy(); // Se elimina Mario
                this.destroy(); // Se elimina Peach
			}
		}

    });

    // MONEDA
    Q.Sprite.extend("Coin", {
        init: function(p) {
            this._super(p, {
                sprite: "animacion_coin",
                sheet: "coin",
                sensor: true,
                cogida: false
            });
            this.add("tween, animation");
            this.on("hit", this, "hit");
            this.play("brillo");
        },
        hit: function(collision){
            if(collision.obj.isA("Mario") && !this.cogida){ 
                Q.state.inc('coins', 1);
                Q.state.inc('punct', 100);
		        Q.audio.play('coin.mp3',{ loop: false });
                this.cogida = true;
                this.animate(
                    {y: this.p.y-50}, 0.3, Q.Easing.Linear, 
                    { callback: function(){ this.destroy() } });
                if(Q.state.get('coins') == 100) {
                    Q.state.inc('lives', 1);
                    Q.state.dec('coins', 100);
                }

			}
        }
    });


    Q.Sprite.extend("Question",{
        init: function(p) {
            this._super(p, {
                asset: "18.gif",
                abierta: false,
                gravity: 0
            });
            this.add("2d");
            this.on("bump.bottom", this, "hit");
        },
        hit: function(collision){
            if(!this.p.abierta){
                Q.state.inc('coins', 1);
                Q.state.inc('punct', 100);
		        Q.audio.play('coin.mp3',{ loop: false });
                this.p.asset = "17.gif";
                this.p.abierta = true;
			}
        }
    });

    // DEFAULT_ENEMY
    Q.component("DefaultEnemy", {
        added: function(p) {
            this.entity.on("muerte_t", this.entity, "muerte");

            this.entity.on("bump.left, bump.right, bump.bottom", function(collision) {
                if(collision.obj.isA("Mario")) {
                    collision.obj.muerteAux();
                }
            });

            this.entity.on("bump.top", function(collision) {
                if(collision.obj.isA("Mario") && !collision.obj.p.muerto) { // no se elimina enemigo pero sigue colisionando
                    if(Q.inputs['up']) {
                        collision.obj.p.vy = -500;
                    }
                    else {
                        collision.obj.p.vy = -300;
                    }
                    Q.state.inc('punct', 1000);
                    Q.audio.play('kill_enemy.mp3',{ loop: false });
                    this.play("muerte", 1);                   
                }
            });
        },

        extend: {

            step: function(p) {
                if(this.p.y > 590 || this.p.x < 0)
                    this.destroy();
            },

            muerte: function(p) {
                this.destroy();
            }
        }
    });

    // ANIMACIONES DEL BLOOPA
    Q.animations("animaciones_bloopa", {
        subir:{frames: [0], rate: 1/3, loop: true},
        bajar:{frames: [1], rate: 1/3, loop: true},
        muerte:{frames: [2], rate: 1/10, loop: false, trigger:"muerte_t"}
    });

    //ANIMACIONES DE LA MONEDA
    Q.animations("animacion_coin",{
        brillo :{frames: [0,1,2], rate: 1/3, loop: true}
    });

    // ANIMACIONES DE MARIO
    Q.animations("animaciones_mario", {
        quieto_derecha: {frames: [0], loop: false},
        quieto_izquierda: {frames: [14], loop: false},
        corriendo_derecha: {frames: [1, 2, 3], rate: 1/13, loop: true},
        corriendo_izquierda: {frames: [15, 16, 17], rate: 1/13, loop: true},
        corriendo_rapido_derecha: {frames: [1, 2, 3], rate: 1/18, loop: true},
        corriendo_rapido_izquierda: {frames: [15, 16, 17], rate: 1/18, loop: true},
        saltando_derecha: {frames: [4], loop: true},
        saltando_izquierda: {frames: [18], loop: true},
        muerte: {frames: [12], rate: 1.2, loop: false, trigger: "muerte_t"}
    })

    // ANIMACIONES DEL GOOMBA
    Q.animations("animaciones_goomba", {
        andar: {frames: [0, 1], rate: 1/6, loop: true},
        muerte: {frames: [2], rate: 1/10, loop: false, trigger: "muerte_t"}
    });

    // CARGA Y COMPILADO DE ARCHIVOS
    Q.load(["mario_small.png", "mario_small.json",
            "goomba.png", "goomba.json",
            "bloopa.png", "bloopa.json",
            "princess.png",
            "coin.png","coin.json",
            "mainTitle.png", "splash_screen.jpg",
            "music_main.mp3", "music_die.mp3", "coin.mp3",
            "music_level_complete.mp3", "kill_enemy.mp3",
            "18.gif", "17.gif"
        ], function() {
        Q.compileSheets("mario_small.png", "mario_small.json");
        Q.compileSheets("goomba.png", "goomba.json");
        Q.compileSheets("bloopa.png", "bloopa.json");
        Q.compileSheets("coin.png","coin.json");

    });

});