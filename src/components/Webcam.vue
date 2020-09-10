<template>
  <div class="booth">
    <video id="video" width="400" height="300"></video>
    <a href="#" id="capture" class = booth-capture-button>Capturar Foto</a>
    <canvas id="canvas" width="400" height="300"></canvas>
    <img id="photo" src="http://placekitten.com/g/400/300" alt="Foto de ti">
  </div>
</template>
<style>
.booth {
    width:400px;
    background-color: #ccc;
    border:10px solid #ddd;
    margin:0 auto;
}

.booth-capture-button  {
    display:block;
    margin:10px 0;
    padding: 10px 20px;
    background-color: cornflowerblue;
    color: #fff;
    text-align: center;
    text-decoration: none;
}
#canvas {
    display: none;
}
</style>
<script>
export default {
    data () {
      return {
        dialog: false,
        dialog2: false,
      }
    },
    created: function () {

  },
  mounted:function (){
    this.sdsa()
  },
    methods: {
    sdsa(){
      var video = document.getElementById('video'),
     canvas = document.getElementById('canvas'),
     context = canvas.getContext('2d'),
     photo = document.getElementById('photo'),
     localstream,
     vendorUrl = window.URL || window.webkitURL;
     navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
     navigator.getMedia({
       video: true,
       audio: false
       }, function(stream){
         video.srcObject = stream;
         localstream = stream;
         video.play();
         }, function(error){
           // An error occured
           // error.code
          });
      document.getElementById('capture').addEventListener('click', function(){
        context.drawImage(video, 0, 0, 400, 300);
        photo.setAttribute('src', canvas.toDataURL('image/png'));
        video.pause();
        video.src = "";
        localstream.getTracks()[0].stop();
    });

    }
    }
  }
</script>
