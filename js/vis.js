console.log("vis.js is connected");

// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./data/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

      // VISUAL #1
  const vlSpec = vl
  .markBar()
  .data(data)
  
.encode(
  vl.y().fieldN("Genre"),
  vl.x().fieldN("Platform"),
  vl.color().fieldN("Platform"),
  vl.color().fieldQ("Global_Sales").scale({ domain: [0, 1] })
)
 .title({
    text: 'Global Sales of Genres Across Platforms',
  })
    .width("container")
    .height(400)
    .toSpec();

      // VISUAL #2
  const vlSpec2 = vl
.markLine()
  .data(data)
  .encode(
    vl.x().fieldT("Year").title("Year"),
    vl.y().aggregate("sum").fieldQ("Global_Sales").title("Total Global Sales"),
    vl.color().fieldN("Platform").title("Platform")
  )
  .title("Global Video Game Sales Over Time by Platform")
    .width("container")
    .height(400)
    .toSpec();

        // VISUAL #3
  const vlSpec3 = 
  vl.layer(
  [
    vl.markLine({color: "blue"}).data(data)
      .encode(
        vl.x().fieldN("Platform").title("Platform"),
        vl.y().aggregate("sum").fieldQ("NA_Sales").title("Total Sales"),
      ),
    vl.markLine({color: "green"}).data(data)
      .encode(
        vl.x().fieldN("Platform"),
        vl.y().aggregate("sum").fieldQ("EU_Sales"),
      ),
    vl.markLine({color: "red"}).data(data)
      .encode(
        vl.x().fieldN("Platform"),
        vl.y().aggregate("sum").fieldQ("JP_Sales"),
      ),
    vl.markLine({color: "orange"}).data(data)
      .encode(
        vl.x().fieldN("Platform"),
        vl.y().aggregate("sum").fieldQ("Other_Sales"),
      )
  ]
)
  
  .title("Regional Sales by Platform")
  .width("container")
  .height(400)
  .toSpec();


    // VISUAL #4
const vlSpec4 = vl
 .markCircle()
  .data(data)
  .encode(
    vl.x().fieldT("Year").title("Year"),
    vl.y().fieldN("Platform").title("Platform"),
    vl.size().aggregate("sum").fieldQ("Global_Sales").title("Total Sales"),
    vl.color().fieldN("Platform")
  )
  .title("Platform Life Cycles: Sales (Circle Size = Sales)")
    .width("container")
    .height(400)
    .toSpec();

        // VISUAL #4
const vlSpec5 = vl
    .markCircle()
  .data(data)
  .encode(
    vl.y().fieldN("Genre").title("Genre"),            // X-axis = Genre
    vl.x().fieldN("Platform").title("Platform"),     // Y-axis = Platform
    vl.size().aggregate("sum").fieldQ("Global_Sales").title("Total Sales"), // Circle size = sales
    vl.color().fieldN("Platform").title("Platform")  // Color = Platform
  )
  .title("Platform Contribution to Each Genre (Circle Size = Sales)")
  .width("container")
    .height(400)
    .toSpec();




  render("#view", vlSpec);
  render("#view2", vlSpec2);
  render("#view3", vlSpec3);
    render("#view4", vlSpec4);
  render("#view5", vlSpec5);
  render("#view6", vlSpec6);
  render("#view7", vlSpec7);
    render("#view8", vlSpec8);

});



async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}




// OLD CODE

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
