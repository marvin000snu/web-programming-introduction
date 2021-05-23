// draw.js

/**
 * This is a list of colors according to the result of the vote.
 * You can change it anytime!
 */
export const colorSet = {
  agree: "#219edb",
  disagree: "#e10d0d",
  abstention: "#bebebe",
  absence: "#5e5e5e",
};

export const koreanStatusValue = {
  agree: "찬성",
  disagree: "반대",
  abstention: "기권",
  absence: "불참",
};

/**
 * Returns the voting results graphically.
 * @param {number} start Graph start point.
 * @param {number} end Graph end point.
 * @param {string} color Graph color to be hightlighted.
 * @returns {HTMLCanvasElement} Graph
 */
export const createVoteResultCanvas = (start, end, color) => {
  // Graph background color.
  const backgroundColor = "#5e5e5e";

  // Graph width.
  const graphWidth = 200;

  // Graph height.
  const graphHeight = 150;

  // Pixel size
  const pixelSize = 10;

  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = graphWidth;
  canvas.height = graphHeight;

  const drawStart = ((start - 1) % 20) * 10;
  const drawEnd = ((end - 1) % 20) * 10 + pixelSize;
  const startY = Math.floor((start - 1) / 20) * 10;
  const endY = Math.floor((end - 1) / 20) * 10;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, graphWidth, graphHeight);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(drawStart, startY);
  ctx.lineTo(graphWidth, startY);
  ctx.lineTo(graphWidth, endY);
  ctx.lineTo(drawEnd, endY);
  ctx.lineTo(drawEnd, endY + pixelSize);
  ctx.lineTo(0, endY + pixelSize);
  ctx.lineTo(0, startY + pixelSize);
  ctx.lineTo(drawStart, startY + pixelSize);
  ctx.closePath();
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fill();

  return canvas;
};
