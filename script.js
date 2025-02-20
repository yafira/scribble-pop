const canvas = document.getElementById('drawingCanvas')
const ctx = canvas.getContext('2d')
let currentPen = 'watercolor'
let isDrawing = false
let lastX = 0
let lastY = 0
let sprayHistory = []

// set canvas size
function resizeCanvas() {
	const container = document.querySelector('.container')
	canvas.width = container.offsetWidth
	canvas.height = container.offsetHeight
}

resizeCanvas()
window.addEventListener('resize', resizeCanvas)

// Get canvas position relative to viewport
function getCanvasPosition() {
	const rect = canvas.getBoundingClientRect()
	return {
		left: rect.left,
		top: rect.top,
	}
}

// pen selection
function setPen(pen) {
	currentPen = pen
	document.querySelectorAll('.tool-btn').forEach((btn) => {
		btn.classList.remove('active')
	})
	event.target.closest('.tool-btn').classList.add('active')
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	sprayHistory = []
}

// drawing functions for each pen type
const pens = {
	watercolor: {
		draw(x, y) {
			ctx.globalAlpha = 0.1
			for (let i = 0; i < 3; i++) {
				ctx.beginPath()
				ctx.arc(
					x + Math.random() * 10 - 5,
					y + Math.random() * 10 - 5,
					20 + Math.random() * 10,
					0,
					Math.PI * 2
				)
				ctx.fillStyle = '#c5b7f7'
				ctx.fill()
			}
			ctx.globalAlpha = 1
		},
	},
	stamp: {
		draw(x, y) {
			const stamps = [
				'🌸',
				'⭐',
				'💖',
				'🦋',
				'⚙️',
				'⚡️',
				'🔋',
				'🍬',
				'🍥',
				'꩜',
				'🥐',
				'🔮',
				'🍵',
				'🌐',
				'🍰',
				'🪼',
				'🌝',
				'☁️',
				'🏁',
				'💾',
				'💿',
				'👾',
				'🔧',
				'📟',
			]
			ctx.font = '70px serif'
			ctx.fillText(
				stamps[Math.floor(Math.random() * stamps.length)],
				x - 15,
				y + 15
			)
		},
	},
	acrylic: {
		draw(x, y) {
			// main thick paint stroke
			ctx.lineWidth = 25
			ctx.lineCap = 'round'
			ctx.lineJoin = 'round'

			// create base stroke with varying opacity
			ctx.globalAlpha = 0.8
			ctx.strokeStyle = '#ff66aa'
			ctx.beginPath()
			ctx.moveTo(lastX, lastY)
			ctx.lineTo(x, y)
			ctx.stroke()

			// add paint texture layers
			for (let i = 0; i < 3; i++) {
				// thick paint edges
				ctx.globalAlpha = 0.4
				ctx.lineWidth = 20 - i * 5
				ctx.beginPath()
				ctx.moveTo(
					lastX + Math.random() * 15 - 7.5,
					lastY + Math.random() * 15 - 7.5
				)
				ctx.lineTo(x + Math.random() * 15 - 7.5, y + Math.random() * 15 - 7.5)
				ctx.strokeStyle = '#ff88bb'
				ctx.stroke()

				// paint buildup effect
				ctx.globalAlpha = 0.2
				ctx.lineWidth = 8
				ctx.beginPath()
				const controlX = (lastX + x) / 2 + Math.random() * 40 - 20
				const controlY = (lastY + y) / 2 + Math.random() * 40 - 20
				ctx.moveTo(lastX, lastY)
				ctx.quadraticCurveTo(controlX, controlY, x, y)
				ctx.strokeStyle = '#FF92C1'
				ctx.stroke()
			}

			// add paint splotches
			if (Math.random() < 0.3) {
				ctx.globalAlpha = 0.15
				ctx.beginPath()
				ctx.arc(
					x + Math.random() * 20 - 10,
					y + Math.random() * 20 - 10,
					Math.random() * 15 + 5,
					0,
					Math.PI * 2
				)
				ctx.fillStyle = '#ff66aa'
				ctx.fill()
			}

			ctx.globalAlpha = 1
		},
	},
	pen: {
		draw(x, y) {
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.lineCap = 'round'
			ctx.lineJoin = 'round'
			ctx.strokeStyle = '#000000'
			ctx.moveTo(lastX, lastY)
			ctx.lineTo(x, y)
			ctx.stroke()
		},
	},
	crayon: {
		draw(x, y) {
			ctx.lineWidth = 10
			ctx.lineCap = 'round'
			ctx.strokeStyle = '#3ad4c4'

			for (let i = 0; i < 12; i++) {
				ctx.beginPath()
				ctx.moveTo(lastX + Math.random() * 8 - 4, lastY + Math.random() * 8 - 4)
				ctx.lineTo(x + Math.random() * 8 - 4, y + Math.random() * 8 - 4)
				ctx.globalAlpha = 0.5
				ctx.stroke()
			}
			ctx.globalAlpha = 1
		},
	},
	spray: {
		draw(x, y) {
			const sprayColor = '#ff3366'
			sprayHistory.push({ x, y, time: Date.now() })

			// increased base values for thicker spray
			const density = 120
			const baseRadius = 35
			const pressure = Math.min(
				(Date.now() - sprayHistory[sprayHistory.length - 1].time) / 1000,
				1
			)
			const radius = baseRadius + pressure * 15

			// create gradient for more realistic spray
			const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
			gradient.addColorStop(0, sprayColor)
			gradient.addColorStop(0.5, sprayColor)
			gradient.addColorStop(1, 'rgba(255, 51, 102, 0)')

			// spray particles with varying opacity and larger size
			for (let i = 0; i < density; i++) {
				const angle = Math.random() * Math.PI * 2
				const r = Math.pow(Math.random(), 1.7) * radius

				const sprayX = x + r * Math.cos(angle)
				const sprayY = y + r * Math.sin(angle)

				const distanceFromCenter = Math.sqrt(
					Math.pow(sprayX - x, 2) + Math.pow(sprayY - y, 2)
				)
				const opacity = Math.max(0.2, 1 - distanceFromCenter / radius)

				ctx.globalAlpha = opacity * 0.4
				ctx.fillStyle = sprayColor
				ctx.beginPath()
				ctx.arc(sprayX, sprayY, Math.random() * 3 + 1, 0, Math.PI * 2)
				ctx.fill()
			}

			// core spray center for more opacity
			for (let i = 0; i < density / 3; i++) {
				const angle = Math.random() * Math.PI * 2
				const r = Math.pow(Math.random(), 2) * (radius * 0.5)

				const sprayX = x + r * Math.cos(angle)
				const sprayY = y + r * Math.sin(angle)

				ctx.globalAlpha = 0.5
				ctx.fillStyle = sprayColor
				ctx.beginPath()
				ctx.arc(sprayX, sprayY, Math.random() * 4 + 2, 0, Math.PI * 2)
				ctx.fill()
			}

			// add paint drips
			if (Math.random() < 0.1 && sprayHistory.length > 5) {
				const dripStart = sprayHistory[sprayHistory.length - 5]
				ctx.beginPath()
				ctx.moveTo(dripStart.x, dripStart.y)

				let currentY = dripStart.y
				let currentX = dripStart.x
				const dripLength = Math.random() * 60 + 30

				ctx.lineWidth = Math.random() * 4 + 2
				ctx.strokeStyle = sprayColor
				ctx.globalAlpha = 0.4

				for (let i = 0; i < dripLength; i++) {
					currentY += 1
					currentX += Math.random() * 2 - 1
					ctx.lineTo(currentX, currentY)
				}

				ctx.stroke()
			}

			// cleanup old history
			if (sprayHistory.length > 50) {
				sprayHistory = sprayHistory.slice(-50)
			}

			ctx.globalAlpha = 1
		},
	},
}

// Update drawing coordinates
function getDrawingCoordinates(e) {
	const rect = canvas.getBoundingClientRect()
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top,
	}
}

// event handlers
function startDrawing(e) {
	isDrawing = true
	const coords = getDrawingCoordinates(e)
	lastX = coords.x
	lastY = coords.y
}

function draw(e) {
	if (!isDrawing) return
	const coords = getDrawingCoordinates(e)

	pens[currentPen].draw(coords.x, coords.y)
	lastX = coords.x
	lastY = coords.y
}

function stopDrawing() {
	isDrawing = false
}

// event listeners
canvas.addEventListener('pointerdown', startDrawing)
canvas.addEventListener('pointermove', draw)
canvas.addEventListener('pointerup', stopDrawing)
canvas.addEventListener('pointerout', stopDrawing)
