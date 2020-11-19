var canvas, ctx,
  tmp_layer,tmp_ctx,
  prevX,prevY,
  currX,currY;
var tool="rect";
var lineWidth=5;
var draw_flag=false;

let processor = {
    doLoad: function() {
      canvas = document.getElementById("canvas");
      tmp_layer=document.getElementById("tmp_layer")
      ctx = canvas.getContext("2d");
      tmp_ctx=tmp_layer.getContext("2d");
      this.elImage = document.getElementById("userUploadedImage");

      this.elImage.addEventListener("change", (evt)=>{
          const image = evt.target.files[0];
          const targetImage = new Image();
          targetImage.addEventListener("load",(evt)=>{
            ctx.drawImage(targetImage,0,0,550,400);
          });
          targetImage.src=window.URL.createObjectURL(image);
          $('button').show();
      })
    },
  };

function startDrawing(){
  tmp_layer.addEventListener("mousemove",doDraw);
  tmp_layer.addEventListener("mousedown",initDraw);
  tmp_layer.addEventListener("mouseup",endDraw);
  tmp_layer.addEventListener("mouseout",endDraw);
}


function initDraw(e){
  draw_flag=true;
  currX = e.clientX - canvas.offsetLeft;
  currY = e.clientY - canvas.offsetTop;
  prevX=currX;
  prevY=currY;
  ctx.save()
}
function doDraw(e){
  if(draw_flag){
    switch(tool){
      case "brush":
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        drawLine();
        break;
      case "rect":
        tmp_ctx.clearRect(prevX,prevY,currX-prevX,currY-prevY);
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        tmp_ctx.fillStyle="rgb(255,255,255,1)";
        tmp_ctx.fillRect(prevX,prevY,currX-prevX,currY-prevY);
        break;
    }
  }
}
function endDraw(e){
  draw_flag=false;
  ctx.drawImage(tmp_layer,0,0);
  tmp_ctx.clearRect(0,0,tmp_layer.width,tmp_layer.height);
}
function drawLine() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = "white";
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}


//어플리케이션 시작
$(function () {
  processor.doLoad();
});