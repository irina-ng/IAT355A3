console.log("vis.js is connected");

let wavePath;       
let svgWidth;
let svgHeight = 400;

const amplitude = 50;
const phase = 4;

function drawWave(frequency) {
  let pathData = `M 0 ${svgHeight / 2}`;

  for (let x = 0; x < svgWidth; x++) {
    const y = amplitude * Math.sin(frequency * x + phase) + svgHeight / 2;
    pathData += ` L ${x} ${y}`;
  }

  wavePath.setAttribute("d", pathData);
}

function waveCreator() {
  svgWidth = window.innerWidth;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  wavePath = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);

  wavePath.setAttribute("fill", "none"); 
  wavePath.setAttribute("stroke", "black");
  wavePath.setAttribute("stroke-width", 2);

  svg.appendChild(wavePath);

  document.getElementById("wave-container").appendChild(svg);

  drawWave(0.008); 
}

waveCreator();

// the mouse SCROLLS that changes frequency of the wave
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = scrollTop / maxScroll;

  const minFreq = 0.002;
  const maxFreq = 0.02;

  const dynamicFrequency = minFreq + scrollProgress * (maxFreq - minFreq);

  drawWave(dynamicFrequency);
});
