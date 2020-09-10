<template>
<form class="dropzone">
    <!-- Not displayed, just for Dropzone's `dictDefaultMessage` option -->
    <div id="dropzone-message" style="display: none">
      <span class="dropzone-title">Drop files here or click to select</span>
      <span class="dropzone-info">You can upload multiple files at once</span>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import Dropzone from 'dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
Dropzone.autoDiscover = false
export default {
  name: 'dropzone',
  data () {
      return {
        baseurl:'https://aux.muca.live/',
        sheet: false,
        dialog2: false,
      }
    },
  mounted () {
    const vm = this
    let options = {
      // The URL will be changed for each new file being processing
      url: '/',
      // Since we're going to do a `PUT` upload to S3 directly
      method: 'put',
      addRemoveLinks:true,
      // Hijack the xhr.send since Dropzone always upload file by using formData
      // ref: https://github.com/danialfarid/ng-file-upload/issues/743
      sending (file, xhr) {
        let _send = xhr.send
        xhr.send = () => {
          _send.call(xhr, file)
        }
      },
      // Upload one file at a time since we're using the S3 pre-signed URL scenario
      parallelUploads: 1,
      uploadMultiple: false,
      // Content-Type should be included, otherwise you'll get a signature
      // mismatch error from S3. We're going to update this for each file.
      header: '',
      // Customize the wording
      dictDefaultMessage: document.querySelector('#dropzone-message').innerHTML,
      // We're going to process each file manually (see `accept` below)
      autoProcessQueue: false,
      // Here we request a signed upload URL when a file being accepted
      accept (file, done) {
        vm.getSignedURL(file)
          .then((url) => {
            file.uploadURL = url
            done()
            // Manually process each file
            setTimeout(() => vm.dropzone.processFile(file))
          })
          .catch((err) => {
            done('Failed to get an S3 signed upload URL', err)
          })
      }
    }
    // Instantiate Dropzone
    this.dropzone = new Dropzone(this.$el, options)
    // Set signed upload URL for each file
    vm.dropzone.on('processing', (file) => {
      vm.dropzone.options.url = file.uploadURL
      vm.$emit("vdropzone-processing", file);
    });
    this.dropzone.on("addedfiles", function(files) {
      vm.$emit("vdropzone-files-added", files);
    });
     this.dropzone.on("success", function(file, response) {
       
       var res = file.uploadURL.split("?");
       var name=res[0].split(".com/")
       var getrekognition=vm.getrekognition(name[1])
      vm.$emit("vdropzone-success", file, response);
    });
  },
  methods: {
     manuallyAddFile: function(file, fileUrl) {
      file.manuallyAdded = true;
      this.dropzone.emit("addedfile", file);
      let containsImageFileType = false;
      if (
        fileUrl.indexOf(".svg") > -1 ||
        fileUrl.indexOf(".png") > -1 ||
        fileUrl.indexOf(".jpg") > -1 ||
        fileUrl.indexOf(".jpeg") > -1 ||
        fileUrl.indexOf(".gif") > -1 ||
        fileUrl.indexOf(".webp") > -1
      )
        containsImageFileType = true;
      if (
        this.dropzone.options.createImageThumbnails &&
        containsImageFileType &&
        file.size <= this.dropzone.options.maxThumbnailFilesize * 1024 * 1024
      ) {
        fileUrl && this.dropzone.emit("thumbnail", file, fileUrl);
        var thumbnails = file.previewElement.querySelectorAll(
          "[data-dz-thumbnail]"
        );
        for (var i = 0; i < thumbnails.length; i++) {
          thumbnails[i].style.width =
            this.dropzoneSettings.thumbnailWidth + "px";
          thumbnails[i].style.height =
            this.dropzoneSettings.thumbnailHeight + "px";
          thumbnails[i].style["object-fit"] = "contain";
        }
      }
      /*this.dropzone.emit("complete", file);
      if (this.dropzone.options.maxFiles) this.dropzone.options.maxFiles--;
      this.dropzone.files.push(file);
      this.$emit("vdropzone-file-added-manually", file);*/
    },
    addFile: function(file) {
      return this.dropzone.addFile(file);
    },
    getSignedURL(file) {
      let payload = { 
        filePath: (Date.now())+file.name,
        contentType: file.type
        }
      let options = {
            headers: { 
                
                'content-type': 'application/json',
            },
          };
        return axios.post(this.baseurl+'aws/getSignedUrl', payload)
          .then((res) => {
            return Promise.resolve(res.data.body || '/')
          })
          .catch((err) => {
            console.error(err)
            return Promise.reject('/')
          })
      },
      getrekognition (file) {
        let self=this;
      let payload = { 
        key: file
        }
      let options = {
            headers: { 
                
                'content-type': 'application/json',
            },
          };
        return axios.post(this.baseurl+'aws/rekognition ', payload)
          .then((res) => {
            self.$emit( "getrekognition", res.data);

            return Promise.resolve(res.data|| '/')
          })
          .catch((err) => {
            console.error(err)
            return Promise.reject('/')
          })
      }
  }
}
</script>
