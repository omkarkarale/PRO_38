class Game {
    constructor(){};

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",(data)=>{
            gameState = data.val(); 
        }) 
    } 
    update(state){ 
        database.ref('/').update({
            gameState: state });
    } 

    async start(){ 
        if(gameState === 0){
            player = new Player(); 
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount(); 
            }
            form = new Form();
            form.display(); 
        } 
        p1 = createSprite(100, 100);
        p1.addImage(p1Img);
        p1.scale=0.25;
        // car1.scale = 1.5;
        p2 = createSprite(100, 300);
        p2.addImage(p2Img);
        p2.scale=0.25;
        p = [p1, p2];
    } 

    play(){
        form.hide();
        background(bg);
        image(track,displayWidth/8*7,50,displayWidth*5,displayHeight-250);
        // textSize(30);
        // text("Game Start", 120, 100);
        Player.getPlayerInfo();
        if(allPlayers !== undefined){
            // var displayPosition = 130;
            var index = 0;
            var x;
            var y=-50;
            for(var plr in allPlayers){
                index  = index+  1;
                x = displayWidth + allPlayers[plr].distance;
                y = y+  350;
                p[index - 1].x = x;
                p[index - 1].y = y;
                if(index === player.index){
                    camera.position.x = p[index - 1].x;
                    camera.position.y = displayHeight/2;
                }
                // if(plr === "player" + player.index)
                //     fill("red");
                // else
                //     fill(0);

                // // displayPosition += 20;
                // textSize(15);
                // text(allPlayers[plr].name + "- " + allPlayers[plr].distance, 120, displayPosition);
            }
        }
        if(keyDown(RIGHT_ARROW) && player.index !== null){
            player.distance += 50;
            player.update();
        }
        drawSprites();
    }
    end(){
        console.log("Game Ended");
        game.update(2);
    }
}