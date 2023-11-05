console.log('bubbleChart.js loaded')
const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

// Data arrays for GDP per capita and life expectancy
// Data arrays for GDP per capita and life expectancy
var gdpPerCapita = [25000, 13200, 13000, 4000, 8000, 16000, 32000, 64000]
var lifeExpectancy = [20, 30, 70, 75, 80, 85, 90, 95]

// Define the axes and their labels
var xAxisLabel = 'GDP per Capita'
var yAxisLabel = 'Life Expectancy'

// Set the minimum and maximum values for the axes
var xMin = 0
var xMax = Math.max(...gdpPerCapita)
var yMin = 0
var yMax = Math.max(...lifeExpectancy)

// Function to convert data to canvas coordinates
function dataToCanvas(x, y) {
    var xScale = (canvas.width - 100) / (xMax - xMin)
    var yScale = (canvas.height - 100) / (yMax - yMin)

    var canvasX = Math.floor((x - xMin) * xScale) + 50
    var canvasY = canvas.height - (Math.floor((y - yMin) * yScale) + 50)

    return { x: canvasX, y: canvasY }
}

// Draw axes and labels
context.fillStyle = 'black'

// X-axis
context.fillRect(50, canvas.height - 50, canvas.width - 100, 2)
context.fillText(xAxisLabel, canvas.width / 2 - 40, canvas.height - 10)

// Y-axis
context.fillRect(50, 50, 2, canvas.height - 100)
context.fillText(yAxisLabel, 10, canvas.height / 2)

// Draw ticks and labels on X-axis
for (var i = xMin; i <= xMax; i += 10000) {
    var tickPos = dataToCanvas(i, 0)
    context.fillRect(tickPos.x, canvas.height - 50, 2, 10)
    context.fillText(i, tickPos.x - 10, canvas.height - 30)
}

// Draw ticks and labels on Y-axis
for (var i = yMin; i <= yMax; i += 10) {
    var tickPos = dataToCanvas(0, i)
    context.fillRect(50, tickPos.y, 10, 2)
    context.fillText(i, 10, tickPos.y + 5)
}

// Draw data points as circles
context.fillStyle = 'blue'
for (var i = 0; i < gdpPerCapita.length; i++) {
    var point = dataToCanvas(gdpPerCapita[i], lifeExpectancy[i])
    context.beginPath()
    context.arc(point.x, point.y, 90, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
}
