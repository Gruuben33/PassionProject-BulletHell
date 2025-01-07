// Misc. variables
let mainTextSize = 30
let highScore = 0
let newHighScore = false
let lastScore = 0
let currentScore = 0
let now
let lastTimeScore = 0
let millisecondsSinceLastTimeScore
let player1Lives = 3

// Misc. functions
function resetPlayers() {
	player1Calculations()
}

function resetScore() {
		currentScore = 0
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	background('grey')
	rectMode(CENTER)

	playerSelectCalculations()
	menuCalculations()
	player1Calculations()
	gameOverCalculations()
}

function draw() {
	clear()
	textAlign(CENTER)
	textSize(mainTextSize)
	handleState()
}

function mouseClicked() {
	// Select 1 player
	if (mouseX <= select1X + selectCircleR && mouseX >= select1X - selectCircleR && mouseY <= select1Y + selectCircleR && mouseY >= select1Y - selectCircleR && currentState == selectState) {
		changeState(player1Play)
	}

	// Select 2 players
	if (mouseX <= select2X + selectCircleR && mouseX >= select2X - selectCircleR && mouseY <= select2Y + selectCircleR && mouseY >= select2Y - selectCircleR && currentState == selectState) {
		changeState(player2Play)
	}

	// Select menu
	if (mouseX <= menuButtonX + menuButtonClickSize && mouseX >= menuButtonX - menuButtonClickSize && mouseY <= menuButtonY + menuButtonClickSize && mouseY >= menuButtonY - menuButtonClickSize) {
		if (currentState != menuState) {
			changeState(menuState)
		} else if (currentState == menuState) {
			changeStateBackward()
		}
	}

	// Select projectile speed buttons in menu
	if (mouseX <= menuPlusButtonX + menuBoardButtonClickSize && mouseX >= menuPlusButtonX - menuBoardButtonClickSize && mouseY <= menuSpeedButtonY + menuBoardButtonClickSize && mouseY >= menuSpeedButtonY - menuBoardButtonClickSize && currentState == menuState) {
		projectileSpeedMultiplier += 1
	} else if (mouseX <= menuMinusButtonX + menuBoardButtonClickSize && mouseX >= menuMinusButtonX - menuBoardButtonClickSize && mouseY <= menuSpeedButtonY + menuBoardButtonClickSize && mouseY >= menuSpeedButtonY - menuBoardButtonClickSize && projectileSpeedMultiplier > 1 && currentState == menuState) {
		projectileSpeedMultiplier -= 1
	}

	// Select projectile size buttons in menu
	if (mouseX <= menuPlusButtonX + menuBoardButtonClickSize && mouseX >= menuPlusButtonX - menuBoardButtonClickSize && mouseY <= menuSizeButtonY + menuBoardButtonClickSize && mouseY >= menuSizeButtonY - menuBoardButtonClickSize && currentState == menuState) {
		projectileSizeMultiplier += 1
	} else if (mouseX <= menuMinusButtonX + menuBoardButtonClickSize && mouseX >= menuMinusButtonX - menuBoardButtonClickSize && mouseY <= menuSizeButtonY + menuBoardButtonClickSize && mouseY >= menuSizeButtonY - menuBoardButtonClickSize && projectileSizeMultiplier > 1 && currentState == menuState) {
		projectileSizeMultiplier -= 1
	}

	// Select state in menu
	if (mouseX <= textColumn2 + menuBoardButtonClickSize && mouseX >= textColumn2 - menuBoardButtonClickSize && mouseY <= menuSelectPlayerButtonY + menuBoardButtonClickSize && mouseY >= menuSelectPlayerButtonY - menuBoardButtonClickSize && currentState == menuState) {
		changeState(selectState)
	} else if (mouseX <= menuSelect1PlayerButtonX + menuBoardButtonClickSize && mouseX >= menuSelect1PlayerButtonX - menuBoardButtonClickSize && mouseY <= menuSelect1PlayerButtonY + menuBoardButtonClickSize && mouseY >= menuSelect1PlayerButtonY - menuBoardButtonClickSize && currentState == menuState) {
		changeState(player1Play)
	} else if (mouseX <= menuSelect2PlayerButtonX + menuBoardButtonClickSize && mouseX >= menuSelect2PlayerButtonX - menuBoardButtonClickSize && mouseY <= menuSelect2PlayerButtonY + menuBoardButtonClickSize && mouseY >= menuSelect2PlayerButtonY - menuBoardButtonClickSize && currentState == menuState) {
		changeState(player2Play)
	}

	// Select retry button in 'game over'
	if (mouseX <= textX + retryButtonClickWidth && mouseX >= textX - retryButtonClickWidth && mouseY <= retryButtonY + retryButtonClickHeight && mouseY >= retryButtonY - retryButtonClickHeight && currentState == gameOverState) {
		changeState(player1Play)
	}

	// Select player select button in 'game over'
	if (mouseX <= textX + playerSelectButtonClickWidth && mouseX >= textX - playerSelectButtonClickWidth && mouseY <= playerSelectButtonY + playerSelectButtonClickHeight && mouseY >= playerSelectButtonY - playerSelectButtonClickHeight && currentState == gameOverState) {
		changeState(selectState)
	}
}

// States
let selectState = 0
let menuState = 1
let player1Play = 2
let player2Play = 3
let gameOverState = 4
let currentState = selectState
let previousState = selectState
let newState
let pause = false

function changeState(newState) {
	previousState = currentState
	currentState = newState
	if (newState == menuState) {
		pause = true
	} 
	else if (newState != menuState){
		pause = false
		resetPlayers()
		resetScore()
		newHighScore = false
		movingShapes = []
		lastSpawnTime = 0
	}
}

function changeStateBackward() {
	currentState = previousState
	if (pause == true) {
		pause = false
	} else {
		resetPlayers()
		resetScore()
		movingShapes = []
		lastTimeSpawn = 0
	}
}

function handleState() {
	switch (currentState) {
		case selectState:
			drawMenuButton()
			drawSelectScreen()
			break
		case menuState:
			drawMenuButton()
			drawMenuScreen()
			break
		case player1Play:
			drawMenuButton()
			drawPlayer1Display()
			updatePlayer1Variables()
			drawPlayer1()
			player1Movement()
			updateTime()
			gameOverTest()
			updateShapes()
			break
		case player2Play:
			drawMenuButton()
			drawPlayer1Display()
			updatePlayer1Variables()
			drawPlayer1()
			player1Movement()
			updateTime()
			gameOverTest()
			updateShapes()
			break
		case gameOverState:
			drawMenuButton()
			gameOverDisplay()
	}
}

// Menu button shape positions
let point1X = 40
let point2X = 110
let line1Y = 40
let line2Y = 60
let line3Y = 80
let menuButtonX = point2X / 3.2 + point1X
let menuButtonY = line2Y

// Menu screen coordinates
let menuBoardX
let menuBoardY

// Menu screen shape sizes
let menuBoardWidth
let menuBoardHeight
let menuButtonSize = 90
let menuBoardButtonSize = 55

// Menu screen button coordinates
let menuPlusButtonX
let menuMinusButtonX
let menuSpeedButtonY
let menuSizeButtonY
let menuSelectPlayerButtonY
let menuSelect1PlayerButtonY
let menuSelect2PlayerButtonY

// Menu screen quadrant lines
let menuVerticalLineX
let menuVerticalLineY1
let menuVerticalLineY2
let menuHorizontalLineX1
let menuHorizontalLineX2
let menuHorizontalLineY

// Inside menu text
let textColumn1
let textColumn2
let textRow1
let textRow2
let textRow3
let textRow4
let textRow5
let textRow6
let textColumn2Left
let textColumn2Right
let menuPlusButtonTextY
let menuSelectPlayerTextY
let menuSelect1PlayerTextY
let menuSelect2PlayerTextY

// Menu screen options
let projectileSpeedMultiplier = 1
let projectileSizeMultiplier = 1

function menuCalculations() {
	// Menu screen positions
	menuBoardX = windowWidth / 2
	menuBoardY = windowHeight / 2

	// Menu screen sizes
	menuBoardWidth = windowWidth / 2
	menuBoardHeight = windowHeight - 50

	// Menu top half button positions
	menuPlusButtonX = menuBoardX + menuBoardWidth / 2.5
	menuMinusButtonX = menuBoardX + menuBoardWidth / 8
	menuSpeedButtonY = menuBoardY - menuBoardHeight / 4.5
	menuSizeButtonY = menuBoardY - menuBoardHeight / 15

	// Top half button text
	menuSpeedButtonTextY = menuSpeedButtonY + mainTextSize / 3
	menuSizeButtonTextY = menuSizeButtonY + mainTextSize / 3

	// Menu text positions
	textColumn1 = menuBoardX - menuBoardWidth / 4
	textColumn2 = menuBoardX + menuBoardWidth / 4
	textRow1 = menuBoardY - menuBoardHeight / 2.5
	textRow2 = menuBoardY - menuBoardHeight / 3.5
	textRow3 = menuBoardY - menuBoardHeight / 8
	textRow4 = menuBoardY + menuBoardHeight / 9
	textRow5 = menuBoardY + menuBoardHeight / 4.3
	textRow6 = menuBoardY + menuBoardHeight / 2.6
	textColumn2Left = textColumn2 - textColumn2 / 10
	textColumn2Right = textColumn2 + textColumn2 / 10

	// Menu bottom half button positions
	menuSelectPlayerButtonY = textRow5 + textRow5 / 13
	menuSelect1PlayerButtonX = textColumn2 - textColumn2 / 10
	menuSelect1PlayerButtonY = textRow6 + textRow5 / 13
	menuSelect2PlayerButtonX = textColumn2 + textColumn2 / 10
	menuSelect2PlayerButtonY = textRow6 + textRow5 / 13

	// Bottom half button text
	menuSelectPlayerTextY = menuSelectPlayerButtonY + mainTextSize / 3
	menuSelect1PlayerTextY = menuSelect1PlayerButtonY + mainTextSize / 3
	menuSelect2PlayerTextY = menuSelect2PlayerButtonY + mainTextSize / 3

	// Menu quadrant line coordinates
	menuVerticalLineX = menuBoardX
	menuVerticalLineY1 = menuBoardY - menuBoardHeight / 2
	menuVerticalLineY2 = menuBoardY + menuBoardHeight / 2
	menuHorizontalLineX1 = menuBoardX - menuBoardWidth / 2
	menuHorizontalLineX2 = menuBoardX + menuBoardWidth / 2
	menuHorizontalLineY = menuBoardY

	// Button interaction sizes
	menuButtonClickSize = menuButtonSize / 2
	menuBoardButtonClickSize = menuBoardButtonSize / 2
}

function drawMenuButton() {
	noFill()
	stroke('white')
	strokeWeight(5)
	line(point1X, line1Y, point2X, line1Y)
	line(point1X, line2Y, point2X, line2Y)
	line(point1X, line3Y, point2X, line3Y)
	square(menuButtonX, menuButtonY, menuButtonSize)
}

function drawMenuScreen() {
	fill('black')
	strokeWeight(5)
	rect(menuBoardX, menuBoardY, menuBoardWidth, menuBoardHeight)
	line(menuVerticalLineX, menuVerticalLineY1, menuVerticalLineX, menuVerticalLineY2)
	line(menuHorizontalLineX1, menuHorizontalLineY, menuHorizontalLineX2, menuHorizontalLineY)

	// Top left menu quadrant
	fill('white')
	noStroke()
	text('Controls', textColumn1, textRow1)
	text('Player 1 moves with ↑←→↓', textColumn1, textRow2)
	text('Player 2 moves with WASD', textColumn1, textRow3)

	// Top right menu quadrant
	text('Options', textColumn2, textRow1)
	text(`Current projectile speed = ${projectileSpeedMultiplier}`, textColumn2, textRow2)
	square(menuPlusButtonX, menuSpeedButtonY, menuBoardButtonSize)
	square(menuMinusButtonX, menuSpeedButtonY, menuBoardButtonSize)
	fill('black')
	text('+1', menuPlusButtonX, menuSpeedButtonTextY)
	text('-1', menuMinusButtonX, menuSpeedButtonTextY)
	fill('white')
	text(`Current projectile size = ${projectileSizeMultiplier}`, textColumn2, textRow3)
	square(menuPlusButtonX, menuSizeButtonY, menuBoardButtonSize)
	square(menuMinusButtonX, menuSizeButtonY, menuBoardButtonSize)
	fill('black')
	text('+1', menuPlusButtonX, menuSizeButtonTextY)
	text('-1', menuMinusButtonX, menuSizeButtonTextY)

	// Bottom left menu quadrant
	fill('white')
	text('Score', textColumn1, textRow4)
	text(`Your high score = ${highScore}`, textColumn1, textRow5)
	text(`Your latest score = ${lastScore}`, textColumn1, textRow6)

	// Bottom right menu quadrant
	text('Set State', textColumn2, textRow4)
	text('Player select', textColumn2, textRow5)
	text('Single player', textColumn2Left, textRow6)
	text('Co-op play', textColumn2Right, textRow6)
	fill('white')
	square(textColumn2, menuSelectPlayerButtonY, menuBoardButtonSize)
	square(menuSelect1PlayerButtonX, menuSelect1PlayerButtonY, menuBoardButtonSize)
	square(menuSelect2PlayerButtonX, menuSelect2PlayerButtonY, menuBoardButtonSize)
	fill('black')
	text('Go!', textColumn2, menuSelectPlayerTextY)
	text('Go!', menuSelect1PlayerButtonX, menuSelect1PlayerTextY)
	text('Go!', menuSelect2PlayerButtonX, menuSelect2PlayerTextY)
}

// Positions of player buttons
let select1X
let select1Y
let select2X
let select2Y

// Object sizes
let selectCircleR = 100
let selectCircleD = selectCircleR * 2

// Y position of the player text
let selectTextY

// Amount of players in the game
let playerCount = 0

function playerSelectCalculations() {
	// Select screen positions
	select1X = windowWidth / 3
	select1Y = windowHeight / 2
	select2X = windowWidth / 1.5
	select2Y = windowHeight / 2
	selectTextY = select1Y + mainTextSize / 3
}

function drawSelectScreen() {
	noStroke()
	fill('skyblue')
	circle(select1X, select1Y, selectCircleD)
	fill('black')
	text('1 Player', select1X, selectTextY)
	fill('skyblue')
	circle(select2X, select2Y, selectCircleD)
	fill('black')
	text('2 Players', select2X, selectTextY)
	text('Select the amount of players', windowWidth / 2, windowHeight / 20)
}

// Player 1 variables
let player1X
let player1Y
let playerSize = 50
let player1XSpeed = 0
let player1YSpeed = 0
let player1Speed = 5
let playerInteractionSize
let player1LeftSide
let player1RightSide
let player1BottomSide
let player1topSide
let playerScoreX = 40
let playerScoreY
let playerLivesX
let player1LivesY

function player1Calculations() {
	player1X = windowWidth / 2
	player1Y = windowHeight / 2
	playerInteractionSize = playerSize / 2
	playerScoreY = windowHeight - 60
	playerHighScoreY = windowHeight - 30
	playerLivesX = windowWidth - 40
	player1LivesY = windowHeight / 15
}

function drawPlayer1() {
	fill('skyblue')
	noStroke()
	square(player1X, player1Y, playerSize)
}

function player1Movement() {
	// Keys: ↑ & ↓
	if (player1YSpeed != 0) {
		player1YSpeed = 0
	}
	if (keyIsDown(38) && player1TopSide > 0) {
		player1YSpeed += player1Speed
	}
	if (keyIsDown(40) && player1BottomSide < windowHeight) {
		player1YSpeed += -player1Speed
	}
	// Keys: ← & →
	if (player1XSpeed != 0) {
		player1XSpeed = 0
	}
	if (keyIsDown(37) && player1LeftSide > 0) {
		player1XSpeed += 5
	}
	if (keyIsDown(39) && player1RightSide < windowWidth) {
		player1XSpeed += -5
	}
}

function updatePlayer1Variables() {
	player1X -= player1XSpeed
	player1Y -= player1YSpeed
	player1LeftSide = player1X - playerInteractionSize
	player1RightSide = player1X + playerInteractionSize
	player1BottomSide = player1Y + playerInteractionSize
	player1TopSide = player1Y - playerInteractionSize
	lastScore = currentScore
}

function drawPlayer1Display() {
	noStroke()
	fill('white')
	textAlign(LEFT)
	text(`Score: ${currentScore}`, playerScoreX, playerScoreY)
	text(`High Score: ${highScore}`, playerScoreX, playerHighScoreY)
	textAlign(RIGHT)
	text(`P1 Lives: ${player1Lives}`, playerLivesX, player1LivesY)
}

function gameOverTest() {
	if (keyIsDown(32)) {
		changeState(gameOverState)
	}
}

function updateTime() {
	now = millis()
	millisecondsSinceLastTimeScore = now - lastTimeScore
	if (millisecondsSinceLastTimeScore > 10) {
		currentScore += 1
		lastTimeScore = now
	}
}

// Text positions (newHighScore X Y, yourScore X Y, yourHighScore X Y)
let textX
let newHighScoreTextY
let scoreWasTextY
let highScoreIsTextY

// Retry button Y W H && Back to player select Y W H
let retryButtonY
let retryButtonWidth
let retryButtonHeight
let playerSelectButtonY
let playerSelectButtonWidth
let playerSelectButtonHeight

// Set mouse interaction size for buttons
let retryButtonClickWidth
let retryButtonClickHeight
let playerSelectButtonClickWidth
let playerSelectButtonClickHeight

// Retry button text X Y && back to player select text X Y
let retryTextY
let playerSelectTextY

function gameOverCalculations() {
	// Text positions (newHighScore X Y, yourScore X Y, yourHighScore X Y)
	textX = windowWidth / 2
	newHighScoreTextY = windowHeight / 5
	scoreWasTextY = windowHeight / 3
	highScoreTextIsY = windowHeight / 2 - mainTextSize

	// Retry button Y W H && Back to player select Y W H
	retryButtonY = windowHeight / 1.5 - mainTextSize * 2
	retryButtonWidth = windowWidth / 10
	retryButtonHeight = windowHeight / 13
	playerSelectButtonY = windowHeight / 1.4 + mainTextSize * 2
	playerSelectButtonWidth = windowWidth / 4
	playerSelectButtonHeight = windowHeight / 13

	// Retry button text X Y && back to player select text X Y
	retryTextY = retryButtonY + mainTextSize / 2.5
	playerSelectTextY = playerSelectButtonY + mainTextSize / 2.5

	// Set mouse interaction size for buttons
	retryButtonClickWidth = retryButtonWidth / 2
	retryButtonClickHeight = retryButtonHeight / 2
	playerSelectButtonClickWidth = playerSelectButtonWidth / 2
	playerSelectButtonClickHeight = playerSelectButtonHeight / 2
}

function gameOverDisplay() {
	noStroke()
	fill('white')

	// Check for high score
	if (lastScore > highScore) {
		highScore = lastScore
		newHighScore = true
	}
	if (newHighScore == true) {
		fill('lightgreen')
		text('New High Score!', textX, newHighScoreTextY)
	} else if (newHighScore == false) {
		fill('white')
	}

	// Tell you your score
	text(`Your Score was ${lastScore}`, textX, scoreWasTextY)
	text(`Your High Score is ${highScore}`, textX, highScoreTextIsY)

	// Retry and player select buttons w/ text
	rect(textX, retryButtonY, retryButtonWidth, retryButtonHeight)
	rect(textX, playerSelectButtonY, playerSelectButtonWidth, playerSelectButtonHeight)
	fill('black')
	text('Retry', textX, retryTextY)
	text('Back to Player Select', textX, playerSelectTextY)
}

// class spawning variables
let movingShapes = []; // Array to hold all the shapes
let spawnRate = 60; // Frames between spawning new shapes (1 shape every 60 frames)
let lastSpawnTime = 0;

class MovingShape {
  constructor() {
    // Random initial position
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    
    // Random speed and direction
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.size = random(30, 60); // Random size between 30 and 60
    
    // Random color for each shape
    this.color = color(random(255), random(255), random(255));
  }
  
  update() {
    // Move the shape by its velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    // If the shape goes off-screen, we remove it later
    if (this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight) {
      return true; // Indicates this shape should be removed
    }
    return false;
  }
  
  display() {
    // Draw the shape with its color
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function updateShapes() {
  let now = millis();
  // Spawn a new shape at random intervals
  if (now - lastSpawnTime > spawnRate) {
    movingShapes.push(new MovingShape());
    lastSpawnTime = now;
  }

  // Update and display the shapes, removing those that go off-screen
  for (let i = movingShapes.length - 1; i >= 0; i--) {
    let shape = movingShapes[i];
    if (shape.update()) {
      movingShapes.splice(i, 1); // Remove the shape if it goes off-screen
    } else {
      shape.display();
    }
  }
}
