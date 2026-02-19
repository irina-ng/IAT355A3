<!--

To use the website, through scrolling up and down. To see the two SVG, click on visualization on the top right of the navbar. To go back to the home page of Irina's profile, click on home.


Citations

DM sans font:
https://fonts.google.com/specimen/DM+Sans

nav bar
https://www.w3schools.com/css/css_navbar.asp

SVG waves
https://www.youtube.com/watch?v=debPZs45m44

Responsive SVG
https://12daysofweb.dev/2023/responsive-svgs/ 

function waveCreator()
{ const svgWidth = window.innerWidth;
const svgHeight = 400;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

svg.setAttribute("width", svgWidth);
svg.setAttribute("height", svgHeight);
const frequency = 0.008;
const amplitude = 50;
const phase = 4;
let pathData = M 0 ${svgHeight / 2};
for (let x = 0; x < svgWidth; x++) {
const y = amplitude * Math.sin(frequency * x + phase) + svgHeight / 2;
pathData += L ${x} ${y}; }
path.setAttribute("d", pathData);
path.setAttribute("fill", "blue");
path.setAttribute("stroke", "black");
path.setAttribute("stroke-width", 2);

svg.appendChild(path);
const waveContainer = document.getElementById("wave-container");
waveContainer.appendChild(svg); }
waveCreator();


ChatGPT
Prompt: have the frequency of the wave change when scrolling

let wavePath;       // reference to the wave path
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

// SCROLL EVENT → changes frequency
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = scrollTop / maxScroll;

  const minFreq = 0.002;
  const maxFreq = 0.02;

  const dynamicFrequency = minFreq + scrollProgress * (maxFreq - minFreq);

  drawWave(dynamicFrequency);
});

Changing colour of the shape using JS: 
https://stackoverflow.com/questions/58148188/random-color-on-mouse-hover

ChatGPT
Prompt: how to add text into centered circle of SVG

      <text x="860" y="480" text-anchor="middle" dominant-baseline="middle" font-size="24" fill="black">
    Oppo </text>

-->
