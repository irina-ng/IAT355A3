console.log("main.js is connected");

let circles = document.querySelectorAll(".circles svg circle");

function getColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

circles.forEach((circle) => {
  const originalFill = circle.getAttribute("fill");

  circle.addEventListener("mouseover", () => {
    circle.setAttribute("fill", getColor());
  });

  circle.addEventListener("mouseout", () => {
    circle.setAttribute("fill", getColor());
  });
});
