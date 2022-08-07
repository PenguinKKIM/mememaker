const canvas = document.querySelector( "canvas" );

const ctx = canvas.getContext( "2d" );

const lineWidth = document.querySelector( "#line-width" );

const modeBtn = document.querySelector( "#mode-btn" );
const destoryBtn = document.querySelector( "#destory-btn" );
const eraserBtn = document.querySelector( "#eraser-btn" );

const fileInput = document.querySelector( "#img-file" );

const fontSize = document.querySelector ( "#font-size" );
const textInput = document.querySelector ( "#input-text" );

const textModeBtn = document.querySelector( "#text-mode-btn" );

const SaveBtn = document.querySelector( "#save-btn" );

const color = document.querySelector( "#color" );
const colorOptions = Array.from(
    document.getElementsByClassName( "color-option" )
  );

const CANVAS_WIDTH = 855;
const CANVAS_HEIGHT = 700;


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;
let isChange = false;




function onMove(e){
    if(isPainting){
        ctx.lineTo( e.offsetX, e.offsetY );
        ctx.stroke( );
        return;
    }
    ctx.beginPath( );
    ctx.moveTo( e.offsetX, e.offsetY );
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
}

function onCanvasClick() {
    if (isFilling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);


function onLineWidthChange(e){
    ctx.lineWidth = e.target.value;
}

lineWidth.addEventListener("change", onLineWidthChange);

function onColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

color.addEventListener("change", onColorChange)

function onColorClick(e){
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

colorOptions.forEach(color => color.addEventListener("click", onColorClick))

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function ondestoryClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
} 



modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener("click", ondestoryClick);
eraserBtn.addEventListener("click", onEraserClick);


function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

fileInput.addEventListener("change", onFileChange);

function onFontSizeChange(e){
  ctx.fontSize = e.target.value;
}

fontSize.addEventListener("change", onFontSizeChange);

function onDoubleClick(e) {
  
  const text = textInput.value;
  const fSize = fontSize.value;
  if(text !== "" && isChange === true){
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = `${fSize}rem MabinogiClassicR`; 
  ctx.fillText(text, e.offsetX, e.offsetY);
  ctx.restore();
  } else if(text !== "" && isChange === false) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${fSize}rem MabinogiClassicR`; 
    ctx.strokeText(text, e.offsetX, e.offsetY);
    ctx.restore();
  }
}

function onFontStyleMode()
{
  if (isChange) {
    isChange = false;
    textModeBtn.innerText = "Fill text";
  } else {
    isChange = true;
    textModeBtn.innerText = "Stroke Text";    
  }
}

textModeBtn.addEventListener("click", onFontStyleMode);
canvas.addEventListener("dblclick", onDoubleClick);








function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing,png";
  a.click();
}

SaveBtn.addEventListener("click", onSaveClick);