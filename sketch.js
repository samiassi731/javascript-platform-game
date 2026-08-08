/*

Finished Game Part 7

*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var collectables;
var trees_x;
var treePos_y;
var canyons;
var cloudsPos_y;
var clouds_x;
var mountains_x;
var mountainsPos_y;
var cameraPosX;
var gameScore;
var flagpole;
var lives;
var snowflakes = [];
var birds = [];
var fallingBirds = [];
var platforms;
var jumpSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //sound loaded
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
	lives = 3;
	
    startGame();
}

function draw()
{

	//DRAWING CODE//

	background(100,155,255); //fill the sky blue
	drawSnow();
	drawBirds();
	drawFallingBirds();

	//keeps the character centred on screen as the world scrolls
	cameraPosX = gameChar_x - width/2;

	noStroke();
	fill(240, 248, 255);
	rect(0, floorPos_y, width, height - floorPos_y); 
	//draw some snowy ground

	// subtle ridge on top of snow grass
    fill(200, 220, 235);
    rect(0, floorPos_y , width, 6);

	push();
    translate(-cameraPosX,0);

    drawMountains();
    drawTrees(); 
	drawClouds();

	for(var i = 0; i < platforms.length; i++)
		{
			platforms[i].draw();
		}
    
	//drawing the canyon
	for(var i = 0; i < canyons.length; i++)
    {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
    }

	//drawing the collectable 
	for(var i = 0; i < collectables.length; i++)
    {
    if(collectables[i].isFound == false)
        {
        drawCollectable(collectables[i]);
        checkCollectable(collectables[i]);
        }
    }

	noStroke();

	//the game character
	if(isLeft && isFalling)
	{
	//jumping-left character
	
	//body
    
	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-45,20,20);

	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-23,30,30)

	//eyes

  	fill(0); 
	ellipse(gameChar_x,gameChar_y-48,3,3,); 
	ellipse(gameChar_x-4,gameChar_y-48,3,3);

	//carrot nose
 
	fill(255, 140, 0); // 
	triangle(gameChar_x -6, gameChar_y - 45,gameChar_x +1 ,gameChar_y - 46,gameChar_x +1, gameChar_y - 43);
    
	//black buttons in belly

	fill(50);
	ellipse(gameChar_x,gameChar_y-32,3,3); 
	ellipse(gameChar_x,gameChar_y-26,3,3);
	ellipse(gameChar_x,gameChar_y-20,3,3);

	//smile

    stroke(0);
	strokeWeight(1);
    line(gameChar_x-4,gameChar_y-42,gameChar_x+2,gameChar_y-42);

	//stick arms
	stroke(120,80,40); //brown sticks
	strokeWeight(1);

	//right arm
	line(gameChar_x + 12,gameChar_y -33,gameChar_x+20, gameChar_y-43); 
	line(gameChar_x+18,gameChar_y-39,gameChar_x+23,gameChar_y-38);
	line(gameChar_x+18,gameChar_y-39,gameChar_x+15,gameChar_y-44);

	//left arm
	line(gameChar_x - 12,gameChar_y -33,gameChar_x-20, gameChar_y-43); 
	line(gameChar_x-18,gameChar_y-39,gameChar_x-23,gameChar_y-38);
	line(gameChar_x-18,gameChar_y-39,gameChar_x-15,gameChar_y-44);


	}
	else if(isRight && isFalling)
	{
    
	//snowman jumping-right code
		
	//body
    fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-45,20,20);

	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-23,30,30)

	//eyes

    fill(0); 
	ellipse(gameChar_x,gameChar_y-48,3,3,); 
	ellipse(gameChar_x+4,gameChar_y-48,3,3);

	//carrot nose

	fill(255, 140, 0); // 
	triangle(gameChar_x -1 ,gameChar_y - 46,gameChar_x + 6, gameChar_y - 45,gameChar_x - 1, gameChar_y - 43);
    
	//black buttons in belly

	fill(50);
	ellipse(gameChar_x,gameChar_y-32,3,3); 
	ellipse(gameChar_x,gameChar_y-26,3,3);
	ellipse(gameChar_x,gameChar_y-20,3,3);

	//smile

	stroke(0);
	strokeWeight(1);
    line(gameChar_x-2,gameChar_y-42,gameChar_x+4,gameChar_y-42); 


	//stick arms
	stroke(120,80,40); //brown sticks
	strokeWeight(1);

	//right arm
	line(gameChar_x + 12,gameChar_y -33,gameChar_x+20, gameChar_y-43); 
	line(gameChar_x+18,gameChar_y-39,gameChar_x+23,gameChar_y-38);
	line(gameChar_x+18,gameChar_y-39,gameChar_x+15,gameChar_y-44);

	//left arm
	line(gameChar_x - 12,gameChar_y -33,gameChar_x-20, gameChar_y-43); 
	line(gameChar_x-18,gameChar_y-39,gameChar_x-23,gameChar_y-38);
	line(gameChar_x-18,gameChar_y-39,gameChar_x-15,gameChar_y-44);

	}
	else if(isLeft)
	{

	// snowman character turned left

    //body
    fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-35,20,20);

	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-13,30,30)

	//eyes

	fill(0); 
	ellipse(gameChar_x,gameChar_y-38,3,3,); 
	ellipse(gameChar_x-4,gameChar_y-38,3,3);

	//carrot nose

	fill(255, 140, 0); // 
	triangle(gameChar_x -6, gameChar_y - 35,gameChar_x +1 ,gameChar_y - 35,gameChar_x +1, gameChar_y - 33);
    
	//black buttons in belly

	fill(50);
	ellipse(gameChar_x,gameChar_y-22,3,3); 
	ellipse(gameChar_x,gameChar_y-16,3,3);
	ellipse(gameChar_x,gameChar_y-10,3,3);


	//smile

    stroke(0);
	strokeWeight(1);
    line(gameChar_x-4,gameChar_y-32,gameChar_x+2,gameChar_y-32);


	//stick arms
	stroke(120,80,40); //brown sticks
	strokeWeight(1);

	//right arm
	line(gameChar_x + 12,gameChar_y -23,gameChar_x+20, gameChar_y-33); 
	line(gameChar_x+18,gameChar_y-29,gameChar_x+23,gameChar_y-28);
	line(gameChar_x+18,gameChar_y-29,gameChar_x+15,gameChar_y-34);

	//left arm
	line(gameChar_x - 12,gameChar_y -23,gameChar_x-20, gameChar_y-33); 
	line(gameChar_x-18,gameChar_y-29,gameChar_x-23,gameChar_y-28);
	line(gameChar_x-18,gameChar_y-29,gameChar_x-15,gameChar_y-34);

	}
	else if(isRight)
	{
		
	// snowman character turning right

    //body
    fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-35,20,20);

	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-13,30,30)

	//eyes

	fill(0); 
	ellipse(gameChar_x,gameChar_y-38,3,3,); 
	ellipse(gameChar_x+4,gameChar_y-38,3,3);

	//carrot nose

	fill(255, 140, 0); // 
	triangle(gameChar_x -1 ,gameChar_y - 36,gameChar_x + 6, gameChar_y - 35,gameChar_x - 1, gameChar_y - 33);
    
	//black buttons in belly

	fill(50);
	ellipse(gameChar_x,gameChar_y-22,3,3); 
	ellipse(gameChar_x,gameChar_y-16,3,3);
	ellipse(gameChar_x,gameChar_y-10,3,3);


	//smile

	stroke(0);
	strokeWeight(1);
    line(gameChar_x-2,gameChar_y-32,gameChar_x+4,gameChar_y-32); 


	//stick arms
	stroke(120,80,40); //brown sticks
	strokeWeight(1);

	//right arm
	line(gameChar_x + 12,gameChar_y -23,gameChar_x+20, gameChar_y-33); 
	line(gameChar_x+18,gameChar_y-29,gameChar_x+23,gameChar_y-28);
	line(gameChar_x+18,gameChar_y-29,gameChar_x+15,gameChar_y-34);

	//left arm
	line(gameChar_x - 12,gameChar_y -23,gameChar_x-20, gameChar_y-33); 
	line(gameChar_x-18,gameChar_y-29,gameChar_x-23,gameChar_y-28);
	line(gameChar_x-18,gameChar_y-29,gameChar_x-15,gameChar_y-34);

	}
	else if(isFalling || isPlummeting)
	{
	
	//snowman jumping facing forwards code
	
	//body
    fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-45,20,20);

	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-23,30,30)

	//eyes

	fill(0); 
	ellipse(gameChar_x-4,gameChar_y-48,3,3,); 
	ellipse(gameChar_x+4,gameChar_y-48,3,3);

	//carrot nose

	fill(255, 140, 0); // 
	triangle(gameChar_x -1 ,gameChar_y - 46,gameChar_x + 6, gameChar_y - 45,gameChar_x - 1, gameChar_y - 43);
    
	//black buttons in belly

	fill(50);
	ellipse(gameChar_x,gameChar_y-32,3,3); 
	ellipse(gameChar_x,gameChar_y-26,3,3);
	ellipse(gameChar_x,gameChar_y-20,3,3);

	//smile

	stroke(0);
	strokeWeight(1);
    line(gameChar_x-3,gameChar_y-42,gameChar_x+3,gameChar_y-42); 


	//stick arms
	stroke(120,80,40); //brown sticks
	strokeWeight(1);

	//right arm
	line(gameChar_x + 12,gameChar_y -33,gameChar_x+20, gameChar_y-43); 
	line(gameChar_x+18,gameChar_y-39,gameChar_x+23,gameChar_y-38);
	line(gameChar_x+18,gameChar_y-39,gameChar_x+15,gameChar_y-44);

	//left arm
	line(gameChar_x - 12,gameChar_y -33,gameChar_x-20, gameChar_y-43); 
	line(gameChar_x-18,gameChar_y-39,gameChar_x-23,gameChar_y-38);
	line(gameChar_x-18,gameChar_y-39,gameChar_x-15,gameChar_y-44);

	}
	else
	{
		
	//snowman standing front facing code

    //body
    fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-35,20,20);

	fill(245,245,245); 
	ellipse(gameChar_x,gameChar_y-13,30,30)

	//eyes

	fill(0); 
	ellipse(gameChar_x-4,gameChar_y-38,3,3,); 
	ellipse(gameChar_x+4,gameChar_y-38,3,3);

	//carrot nose

	fill(255, 140, 0); // 
	triangle(gameChar_x -1 ,gameChar_y - 36,gameChar_x + 6, gameChar_y - 35,gameChar_x - 1, gameChar_y - 33);
    
	//black buttons in belly

	fill(50);
	ellipse(gameChar_x,gameChar_y-22,3,3); 
	ellipse(gameChar_x,gameChar_y-16,3,3);
	ellipse(gameChar_x,gameChar_y-10,3,3);


	//smile

	stroke(0);
	strokeWeight(1);
    line(gameChar_x-3,gameChar_y-32,gameChar_x+3,gameChar_y-32); 


	//stick arms
	stroke(120,80,40); //brown sticks
	strokeWeight(1);

	//right arm
	line(gameChar_x + 12,gameChar_y -23,gameChar_x+20, gameChar_y-33); 
	line(gameChar_x+18,gameChar_y-29,gameChar_x+23,gameChar_y-28);
	line(gameChar_x+18,gameChar_y-29,gameChar_x+15,gameChar_y-34);

	//left arm
	line(gameChar_x - 12,gameChar_y -23,gameChar_x-20, gameChar_y-33); 
	line(gameChar_x-18,gameChar_y-29,gameChar_x-23,gameChar_y-28);
	line(gameChar_x-18,gameChar_y-29,gameChar_x-15,gameChar_y-34);
	}

	drawFlagpole();
	
	//pop() resets the coordinate system
    pop();

	// draw the score goes up when character takes collectables
	fill(255);
	noStroke();
	textSize(20);
	text("Score:" + gameScore, 20,20);
	
	// draw lives (snowflakes)

    for(var i = 0; i < lives; i++)
    {
    var x = 900 + i * 35;
    var y = 30;

    stroke(255);
    strokeWeight(2);

    // main cross snowflake
    line(x - 10,
		 y, x + 10, y);
    line(x, y - 10, x, y + 10);

    // diagonal cross snowflake
    line(x - 7, y - 7, x + 7, y + 7);
    line(x - 7, y + 7, x + 7, y - 7);

    // small centre dot snowflake
    noStroke();
    fill(255);
    ellipse(x, y, 4, 4);
    }

	// GAME OVER
    if(lives < 1)
    {
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text("Game Over", width/2, height/2);
    return;
    }

    // LEVEL COMPLETE
    if(flagpole.isReached)
    {
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text("Level Complete", width/2, height/2);
    return;
    }

	///////////INTERACTION CODE//////////
	//conditional statements to move the game character below here

	//controls speed of left
	if(isLeft == true)
	{
		gameChar_x -= 4;
	}
	//controls speed of right
	if(isRight == true)
	{
		gameChar_x += 4;
	}
	//fall speed
	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for(var i = 0; i < platforms.length; i++)
		{
			if(platforms[i].checkContact(gameChar_x, gameChar_y))
			{
				isContact = true;
				isFalling = false;
				break;
			}
		}
		if(isContact == false)
		{		
		gameChar_y += 3;
		isFalling = true;
		}
	}
	else
	{
		isFalling = false;
	}
    
	if(flagpole.isReached == false)
	{
	checkFlagpole();
	}

	checkPlayerDie();
	
}


function keyPressed()
{
	// STOP interaction if game ended
    if(lives < 1 || flagpole.isReached == true)
    {
        return;
    }

	// if statements to control the animation of the character when keys are pressed

	// when key is pressed variable/state is true
	if(isPlummeting ==  false)
		{
		if(keyCode == 65)
	{
		isLeft = true;
	}
	//
	if(keyCode == 68)
	{
		isRight = true;
	}
	// 'w' key pressed falling is true
	if (keyCode == 87 && isFalling == false)
	{
	//controls how high jump is
    gameChar_y -= 90;
    isFalling = true;
    jumpSound.play();
    }	
	}
}

function keyReleased()
{

	// when key is released movement variable/state is false (stops movement)
	if (keyCode == 65)
	{
		isLeft = false;

	}
	else if(keyCode == 68)
	{
		isRight = false;

	}
}

function drawClouds() 
{
    for(var i = 0; i < clouds_x.length; i++)
	{
	//clouds
    fill(240,240,240);
    ellipse(
		clouds_x[i],
		cloudsPos_y,
		100,
		100
	    );
	ellipse(
		clouds_x[i] + 40,
		cloudsPos_y,
		100,
	    70
	    );
	ellipse(
		clouds_x[i] - 40,
		cloudsPos_y,
		100,
		70
	    );
	}
}

function drawMountains() 
{
    for(var i = 0; i < mountains_x.length; i++)
	{
	//mountains
	strokeWeight(0);
	fill(235,248,242);
	
	triangle(
        mountains_x[i],
		mountainsPos_y - 120,
        mountains_x[i] + 200,
		floorPos_y,
        mountains_x[i] - 200,
		floorPos_y
        );

	triangle(
        mountains_x[i] + 140,
		mountainsPos_y + 20,
        mountains_x[i] + 260,
		floorPos_y,
        mountains_x[i] + 40,
		floorPos_y
        );
	
	triangle(
        mountains_x[i] - 140,
		mountainsPos_y + 10,
        mountains_x[i] - 40,
		floorPos_y,
        mountains_x[i] - 260,
		floorPos_y
        );

	fill(190,205,220);
	// extra triangle inside for colour triangle
	triangle(
        mountains_x[i],
		mountainsPos_y - 120,
        mountains_x[i] + 100,
		floorPos_y,
        mountains_x[i] - 200,
		floorPos_y
        );  
	}
}

function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
	{
	    //tree
	    strokeWeight(2);
	    fill(85, 60, 45);
        rect(trees_x[i], treePos_y - 150, 60, 150);
	
	    //tree leaves top, middle, bottom
	    noStroke();
	    fill(80, 125, 115);
        triangle
		(
			trees_x[i] - 40,
			treePos_y - 180,
			trees_x[i] + 100, 
			treePos_y - 180, 
			trees_x[i] + 30, 
			treePos_y - 260
		);
	    triangle
		(
			trees_x[i] - 40,
			treePos_y - 140,
			trees_x[i] + 100,
			treePos_y - 140,
			trees_x[i] + 30,
			treePos_y - 220
		);
	    triangle
		(
			trees_x[i] - 40,
			treePos_y - 100,
			trees_x[i] + 100,
			treePos_y - 100,
			trees_x[i] + 30,
			treePos_y - 180
		);
    }
}


function drawCollectable(t_collectable) 
{
if(t_collectable.isFound ==  false)
	{
    
	noStroke();
	fill(170,210,235,255);
	rect(
	    t_collectable.x_pos-t_collectable.size/2,
	    t_collectable.y_pos - t_collectable.size/2,
	    t_collectable.size,t_collectable.size
        );
	stroke(255);
	strokeWeight(2);
	line(
		t_collectable.x_pos,
		t_collectable.y_pos - t_collectable.size/2,
		t_collectable.x_pos,
		t_collectable.y_pos + t_collectable.size/2
        );
	line(
	    t_collectable.x_pos - t_collectable.size/2,
	    t_collectable.y_pos,
	    t_collectable.x_pos + t_collectable.size/2,
	    t_collectable.y_pos
        );
	}
}

function drawCanyon(t_canyon) 
{
	fill(135, 170, 210);
	rect(t_canyon.x_pos,t_canyon.y_pos,t_canyon.width,t_canyon.height);
}


function checkCollectable(t_collectable)
{
    if(t_collectable.isFound == false &&
       dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20)
    {
        t_collectable.isFound = true;
        gameScore += 1;
    }
}

function checkCanyon(t_canyon)
{
	// if character is above canyon/ground, starts falling
	if(gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
		{
		isPlummeting = true;
		}
    // If plummets, keeps falling
    if(isPlummeting == true) 
		{
		gameChar_y += 5;
		}
}

function drawFlagpole()
{
	push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);

    fill(255, 0, 0);
    noStroke();

    if(flagpole.isReached == true)
    {
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    }
    else
    {
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    }
	
	pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);

    if(d < 15)
    {
        flagpole.isReached = true;
    }
}

function startGame() 
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;

	trees_x = [-800,-700,-600,-300,-200,-100,120,420,700,900,1300,1950,2050,2150];
	treePos_y = floorPos_y;

	clouds_x = [30,350,600,850,];
	cloudsPos_y = 100;

	mountains_x = [-700,-450,-300,-150,300,550,60,850,1200,1400,1800,2000,2300];
	mountainsPos_y = 200;

	cameraPosX = 0;
	
	collectables = [
	{x_pos: 570, y_pos: floorPos_y - 202, size: 25, isFound: false},  
    {x_pos: 730, y_pos: 420, size: 25, isFound: false},  
    {x_pos: -230, y_pos: 420, size: 25, isFound: false},
    {x_pos: 1250, y_pos: 420, size: 25, isFound: false},
    {x_pos: 400, y_pos: 420, size: 25, isFound: false}
    ];

	canyons = [
	{x_pos: -500,  y_pos: floorPos_y, width: 200, height: 150},
    {x_pos: 200,  y_pos: floorPos_y, width: 100, height: 150},  // original canyon
    {x_pos: 1000,  y_pos: floorPos_y, width: 240, height: 150},  // wider canyon
    {x_pos: 1400, y_pos: floorPos_y, width: 570, height: 150},     
    ];

	platforms = [];

    // middlecollectable platform
    platforms.push(createPlatforms(580,floorPos_y - 70,100));
	platforms.push(createPlatforms(550,floorPos_y - 190,100));

	//first right canyon platforms
	platforms.push(createPlatforms(700,floorPos_y - 140,100));
	platforms.push(createPlatforms(900,floorPos_y - 70,100));

	platforms.push(createPlatforms(1000, floorPos_y - 140, 100));
   
	//right canyon platforms
    platforms.push(createPlatforms(1250, floorPos_y - 140, 100));

	platforms.push(createPlatforms(1300, floorPos_y - 70, 100));
	
	platforms.push(createPlatforms(1380, floorPos_y - 210, 100));

    platforms.push(createPlatforms(1600, floorPos_y - 40, 40));

	platforms.push(createPlatforms(1750, floorPos_y - 20, 40));

	platforms.push(createPlatforms(1920, floorPos_y - 10, 40));

    gameScore = 0;

	flagpole = {isReached: false, x_pos: 2100};

	snowflakes = [];

    for(var i = 0; i < 100; i++)
    {
    snowflakes.push(
		{
        x: random(width),
        y: random(-height, height),
        size: random(2, 5),
        speed: random(0.5, 2)
        });
    } 
    
	//5 additional birds are added after each death
    for(var i = 0; i < 5; i++)
    {
    birds.push(
		{
        x: random(width),
        y: random(50, 200),
        speed: random(0.5, 1.5)
        });
    }

}

function checkPlayerDie()
{
    if(gameChar_y > height)
    {
        lives -= 1;
		createFallingBirds();

        if(lives > 0)
        {
            startGame();
        }
    }
}

function drawSnow()
{
    fill(200, 230, 255);  //icy blue
    noStroke();

    for(var i = 0; i < snowflakes.length; i++)
    {
        ellipse
		(
            snowflakes[i].x,
            snowflakes[i].y,
            snowflakes[i].size
        );

        // move downward
        snowflakes[i].y += snowflakes[i].speed;

        // small sideways drift
        snowflakes[i].x += random(-0.3, 0.3);

        // reset when off screen
        if(snowflakes[i].y > height)
        {
            snowflakes[i].y = random(-20, -5);
            snowflakes[i].x = random(width);
        }
    }
}


function drawBirds()
{
    stroke(70, 80, 100);
    strokeWeight(2);
    noFill();

    for(var i = 0; i < birds.length; i++)
    {
        var x = birds[i].x;
        var y = birds[i].y;

        //simple flying V shape
        line(x - 6, y, x, y - 4);
        line(x, y - 4, x + 6, y);

        //move bird slowly
        birds[i].x += birds[i].speed;

        // reset when off screen
        if(birds[i].x > width + 20)
        {
            birds[i].x = -20;
            birds[i].y = random(50, 200);
        }
    }
}

function createFallingBirds()
{
    fallingBirds = [];

    for(var i = 0; i < 3; i++)
    {
        fallingBirds.push({
            x: random(width),
            y: random(50, 200),
            speedY: random(3, 6)
        });
    }
}

function drawFallingBirds()
{
    stroke(70, 80, 100);
    strokeWeight(2);
    noFill();

    for(var i = fallingBirds.length - 1; i >= 0; i--)
    {
        var x = fallingBirds[i].x;
        var y = fallingBirds[i].y;

        line(x - 6, y - 4, x, y);
        line(x, y, x + 6, y - 4);

        fallingBirds[i].y += fallingBirds[i].speedY;

        if(fallingBirds[i].y > height + 20)
        {
        fallingBirds.splice(i, 1);
        }
    }
}

function createPlatforms(x, y, length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function()
        {
			noStroke();
            fill(180,220,255);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function(gc_x, gc_y)
        {
            if(gc_x > this.x && gc_x < this.x + this.length)
            {
				var d = this.y - gc_y
				if(d >= 0 && d < 8)
					{
						return true;
					}
            }
			return false;
        }
    };
    return p;
}

