window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim") // Load any needed modules
    .setup({width:800, height:600, scaleToFit: true}) // Add a canvas element onto the page
    .controls()                        // Add in default controls (keyboard, buttons)
    .touch();                          // Add in touch support (for the UI)

    Q.loadTMX("level.tmx", function() {
        //Q.compileSheets("tiles.png"); //Comentar o descomentar esta linea no afecta al resultado
        Q.stageScene("level1");
    });

    Q.scene("level1",function(stage) {
        Q.stageTMX("level.tmx",stage);
        stage.add("viewport"); //Falta por hacer lo de 150, 380, que no sé cómo *********************
    });

});