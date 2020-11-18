let processor = {
    doLoad: function() {
      this.inpaint_canvas = document.getElementById("canvas");
      this.inpaint_ctx = this.inpaint_canvas.getContext("2d");
      this.elImage = document.getElementById("userUploadedImage");

      this.elImage.addEventListener("change", (evt)=>{
          const image = evt.target.files[0];
          const targetImage = new Image();
          targetImage.addEventListener("load",(evt)=>{
            this.inpaint_ctx.drawImage(targetImage,0,0,550,400);
          });
          targetImage.src=window.URL.createObjectURL(image);
          $('button').show();
      })
    },
  
  };

//어플리케이션 시작
$(function () {
  processor.doLoad();
});