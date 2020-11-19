var img_layer, img_ctx,
  cnv_layer, cnv_ctx,
  tmp_layer,tmp_ctx,
  prevX,prevY,
  currX,currY;
var tool="rect";
var lineWidth=5;
var draw_flag=false;

let processor = {
    doLoad: function() {
      img_layer = document.getElementById("img_layer");
      cnv_layer = document.getElementById("canvas_layer");
      tmp_layer=document.getElementById("tmp_layer")
      img_ctx = img_layer.getContext("2d");
      cnv_ctx = cnv_layer.getContext("2d");
      tmp_ctx=tmp_layer.getContext("2d");
      this.elImage = document.getElementById("userUploadedImage");

      this.elImage.addEventListener("change", (evt)=>{
          const image = evt.target.files[0];
          const targetImage = new Image();
          targetImage.addEventListener("load",(evt)=>{
            ratio=targetImage.height/targetImage.width;
            if(ratio>(400/550)){
              img_ctx.drawImage(targetImage,0,0,400/ratio,400)
            }else{
              img_ctx.drawImage(targetImage,0,0,550,550*ratio);
            }
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
  currX = e.layerX;
  currY = e.layerY;
  prevX=currX;
  prevY=currY;
  img_ctx.save()
}
function doDraw(e){
  if(draw_flag){
    switch(tool){
      case "brush":
        prevX = currX;
        prevY = currY;
        currX = e.layerX;
        currY = e.layerY;
        drawLine();
        break;
      case "rect":
        tmp_ctx.clearRect(prevX,prevY,currX-prevX,currY-prevY);
        currX=e.layerX;
        currY=e.layerY;
        tmp_ctx.fillStyle="white"
        tmp_ctx.fillRect(prevX,prevY,currX-prevX,currY-prevY);
        break;
    }
  }
}
function endDraw(e){
  draw_flag=false;
  img_ctx.drawImage(tmp_layer,0,0);
  tmp_ctx.clearRect(0,0,tmp_layer.width,tmp_layer.height);
}
function drawLine() {
  tmp_ctx.beginPath();
  tmp_ctx.moveTo(prevX, prevY);
  tmp_ctx.lineTo(currX, currY);
  tmp_ctx.strokeStyle = "white";
  tmp_ctx.lineWidth = lineWidth;
  tmp_ctx.lineCap = "round";
  tmp_ctx.stroke();
  tmp_ctx.closePath();
}


//어플리케이션 시작
$(function () {
  processor.doLoad();
});