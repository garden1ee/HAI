var image_file, iamge,
  img_width,img_height,
  img_layer, img_ctx,
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
          image_file = evt.target.files[0];
          image = new Image();
          image.addEventListener("load",(evt)=>{
            ratio=image.height/image.width;
            if(ratio>(400/550)){
              img_width=400/ratio;
              img_height=400;
            }else{
              img_width=550;
              img_height=550*ratio;
            }
            img_ctx.drawImage(image,0,0,img_width,img_height);
          });
          image.src=window.URL.createObjectURL(image_file);
          $('#nextBtn').show();
      })
    },
  };

function startDrawing(){
  tmp_layer.addEventListener("mousemove",doDraw);
  tmp_layer.addEventListener("mousedown",initDraw);
  tmp_layer.addEventListener("mouseup",endDraw);
  tmp_layer.addEventListener("mouseout",endDraw);
}
function convertToBinaryMap(){
  const ctx=cnv_ctx;

  var imgData=ctx.getImageData(0,0,img_width,img_height);
  var data=imgData.data;
  console.log(imgData.width,imgData.height);
  var ret=[], a;
  for(var i=0;i<imgData.height;i++){
    a=[]
    for(var j=0;j<imgData.width;j++){
      index=(i*imgData.width + j)*4;
      if(data[index +3]!= 0){
        a[j]=1;
      }else{
        a[j]=0;
      }
    }
    ret[i]=a;
  }
  return ret;
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
  cnv_ctx.drawImage(tmp_layer,0,0);
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

function recrec() {
  tool="rect";
  document.getElementById("brushBtn").disabled=false;
  document.getElementById("rectBtn").disabled=true;  
}
function brusrush() {
  tool="brush";
  document.getElementById("rectBtn").disabled=false;
  document.getElementById("brushBtn").disabled=true;
}

//어플리케이션 시작
$(function () {
  processor.doLoad();
});