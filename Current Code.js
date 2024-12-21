function setup() {
	createCanvas(windowWidth, windowHeight)
	background('grey')
	textAlign(CENTER)
	rectMode(CENTER)

	// Select screen positions
	select1X = windowWidth / 3
	select1Y = windowHeight / 2
	select2X = windowWidth / 1.5
	select2Y = windowHeight / 2
	selectTextY = select1Y + selectTextSize / 3
	
	// Menu screen positions
	menuBoardX = windowWidth / 2
	menuBoardY = windowHeight / 2
	
	// Menu screen sizes
	menuBoardWidth = windowWidth / 2
	menuBoardHeight = windowHeight - 50
}

function draw() {
	clear()
	handleState()
}

function mouseClicked() {
	if (mouseX <= select1X + selectCircleR && mouseX >= select1X - selectCircleR && mouseY <= select1Y + selectCircleR && mouseY >= select1Y - selectCircleR) {
		playerCount = 1
		currentState = player1Play
	}
	if (mouseX <= select2X + selectCircleR && mouseX >= select2X - selectCircleR && mouseY <= select2Y + selectCircleR && mouseY >= select2Y - selectCircleR) {
		playerCount = 2
	}
	if (mouseX <= menuButtonX + menuButtonSize && mouseX >= menuButtonX - menuButtonSize && mouseY <= menuButtonY + menuButtonSize && mouseY >= menuButtonY - menuButtonSize) {
		if (currentState != menuState) {
			previousState = currentState
			currentState = menuState
		} 
		else if (currentState == menuState) {
			currentState = previousState
		}
	}
}

// States
let selectState = 0
let menuState = 1
let player1Play = 2
let currentState = selectState
let previousState = selectState

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

// Menu button shape sizes
let menuButtonSize = 100

// Menu screen shape positions
let menuBoardX
let menuBoardY

// Menu screen shape sizes
let menuBoardWidth = 600
let menuBoardHeight


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
	rect(menuBoardX, menuBoardY, menuBoardWidth, menuBoardHeight)
}

// Positions of player buttons
let select1X
let select1Y
let select2X
let select2Y

// Object sizes
let selectCircleR = 100
let selectCircleD = selectCircleR * 2
let selectTextSize = 30

// Y position of the player text
let selectTextY

// Amount of players in the game
let playerCount = 0

function drawSelectScreen() {
			noStroke()
			fill('rgb(122,254,255)')
			circle(select1X, select1Y, selectCircleD)
			fill('black')
			textSize(selectTextSize)
			text('1 Player', select1X, selectTextY)
			fill('rgb(122,254,255)')
			circle(select2X, select2Y, selectCircleD)
			fill('black')
			text('2 Players', select2X, selectTextY)
			text(`The player count is ${playerCount}`, windowWidth / 2, windowHeight / 2)
}
