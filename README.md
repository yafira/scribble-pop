# ✏️ Scribble Pop: My Pencil Case

A playful, expressive digital drawing tool built with HTML5 Canvas, inspired by early digital art software, glitch aesthetics, and the joy of creative chaos.
 
---

## 🌟 Overview

**Scribble Pop** is a browser-based "digital pencil case"—a fullscreen drawing environment featuring six unique pens that evoke different emotional tones and visual styles. This project explores spontaneity, imperfection, and the joy of making marks in an unpredictable digital space.

Rather than a structured UI with sliders and buttons, Scribble Pop invites you to draw directly on the canvas using gestures. It works with mouse, touch, or stylus input.

## ✨ Features

Each pen in Scribble Pop offers a distinct drawing experience:

| Pen        | Description |
|------------|-------------|
| ✿ **Watercolor** | Soft and dreamy. Layered transparent strokes with subtle randomness. |
| ✿ **Stamp** | Playful. Random emojis (🌸 ⚡ 🔮) scatter joyfully across your canvas. |
| ✿ **Acrylic** | Bold and textured. Simulates thick paint and energetic strokes. |
| ✿ **Pen** | Classic and precise. Clean lines for more controlled drawing. |
| ✿ **Crayon** | Rough and nostalgic. Irregular lines full of childhood charm. |
| ✿ **Spray Paint** | Dynamic and rebellious. Simulates graffiti drips and gradient sprays. |

## 🧠 Inspirations

- **Kid Pix (1994):** A chaotic drawing tool for kids that celebrated accidents and surprises.
- **Electric Zine Maker (2018):** A glitchy, hand-crafted tool for zine-making and digital expression.
- **Kristen Roos' _paint: a timeline_**: A media history tracing the evolution of digital paint tools and interfaces.

## ⚙️ Technical Highlights

- Built with **JavaScript**, using a **full-screen HTML5 `<canvas>`**.
- Supports `pointer`, `mouse`, and `touch` input:
  ```js
  canvas.addEventListener('pointerdown', startDrawing);
  canvas.addEventListener('pointermove', draw);
  canvas.addEventListener('pointerup', stopDrawing);


# example of the water brush logic
<code>
const pens = {
  watercolor: {
    draw(x, y) {
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
          x + Math.random() * 10 - 5,
          y + Math.random() * 10 - 5,
          20 + Math.random() * 10,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#c5b7f7';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },
  },
};
</code>

# 🎨 Themes Explored
- Surprise vs. Control: Some tools allow precision; others embrace randomness.
- Playfulness vs. Frustration: Imperfect tools invite creativity through constraint.
- Digital Rituals: The act of drawing becomes a gesture-based performance.

# 💡 Future Directions
- More generative or animated brush effects.
- Expand emotional range of pens.
- Incorporate saving/sharing features or zine templates.
- Responsive UI for mobile + accessibility improvements.

### 🎨 [Try it Here!!](https://scribble-pop.netlify.app/)  
