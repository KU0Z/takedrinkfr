<template>
  <v-container>
    <v-row class="text-center">
        <v-flex xs12>
        <v-progress-linear
            :value="currentProgressBar"
            class="my-0"
            height="3"
        >
        </v-progress-linear>
                <v-list>
                    <v-list-item>
                        
                            <v-img :src="musicPlaylisted[currentSong].Image" max-height="50" max-width="50" ></v-img>
                        
                        <v-list-item-content>
                        <v-list-item-title >{{ musicPlaylisted[currentSong].SongName}}</v-list-item-title>
                        <v-list-item-subtitle >{{ musicPlaylisted[currentSong].Autor}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <div class="currentTimeContainer" style="text-align:center">
                            <span class="currentTime">{{ currentTime | fancyTimeFormat }} /</span>
                            <span class="totalTime"> {{ trackDuration | fancyTimeFormat }}</span>
                            <!--<span style="color:black">({{ currentSong+1 }}/{{ musicPlaylisted.length }})</span>-->
                        </div>
                         <div class="playerButtons">
                        <v-icon :disabled="currentSong==0" v-on:click="prevSong()">mdi-rewind</v-icon>
                        <v-icon v-if="currentlyPlaying" v-on:click="playAudio()">mdi-pause</v-icon>
                        <v-icon v-else v-on:click="playAudio()">mdi-play</v-icon>
                        <v-icon :disabled="currentSong==musicPlaylisted.length-1" v-on:click="nextSong()">mdi-fast-forward</v-icon>
                        
                    </div>
                    </v-list-item>
                </v-list>
        </v-flex>
        
    </v-row>
  </v-container>
</template>


<script>
  import axios from 'axios';
  import { mapGetters } from "vuex";
  export default {
    data () {
      return {
      audio: "",
		imgLoaded: false,
		currentlyPlaying: false,
		currentlyStopped: false,
		currentTime: 0,
		checkingCurrentPositionInTrack: "",
		trackDuration: 0,
		currentProgressBar: 0,
		isPlaylistActive: false,
		currentSong: 0,
		debug: false,
		musicPlaylist: [],
		audioFile: "",
      }
    },
    created: function () {
		this.musicPlaylist=this.musicPlaylisted

  },
    mounted: function() {
		this.changeSong();
		this.audio.loop = false;
	},
	filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
	},
	methods: {
		togglePlaylist: function() {
			this.isPlaylistActive = !this.isPlaylistActive;
		},
		nextSong: function() {
			if (this.currentSong < this.musicPlaylisted.length - 1)
				this.changeSong(this.currentSong + 1);
		},
		prevSong: function() {
			if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
		},
		changeSong: function(index) {
			var wasPlaying = this.currentlyPlaying;
			this.imageLoaded = false;
			if (index !== undefined) {
				this.stopAudio();
				this.currentSong = index;
			}
			this.audioFile = this.musicPlaylisted[this.currentSong].Preview;
			this.audio = new Audio(this.audioFile);
			var localThis = this;
			this.audio.addEventListener("loadedmetadata", function() {
				localThis.trackDuration = Math.round(this.duration);
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playAudio();
			}
		},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		getCurrentSong: function(currentSong) {
			return this.musicPlaylisted[currentSong].Preview;
		},
		playAudio: function() {
			if (
				this.currentlyStopped == true &&
				this.currentSong + 1 == this.musicPlaylisted.length
			) {
				this.currentSong = 0;
				this.changeSong();
			}
			if (!this.currentlyPlaying) {
				this.getCurrentTimeEverySecond(true);
				this.currentlyPlaying = true;
				this.audio.play();
			} else {
				this.stopAudio();
			}
			this.currentlyStopped = false;
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			this.pausedMusic();
		},
		handleEnded: function() {
			if (this.currentSong + 1 == this.musicPlaylisted.length) {
				this.stopAudio();
				this.currentlyPlaying = false;
				this.currentlyStopped = true;
			} else {
				this.currentlyPlaying = false;
				this.currentSong++;
				this.changeSong();
				this.playAudio();
			}
		},
		onImageLoaded: function() {
			this.imgLoaded = true;
		},
		getCurrentTimeEverySecond: function(startStop) {
			var localThis = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					localThis.currentTime = localThis.audio.currentTime;
					localThis.currentProgressBar =
						localThis.audio.currentTime / localThis.trackDuration * 100;
					localThis.getCurrentTimeEverySecond(true);
				}.bind(this),
				1000
			);
		},
		pausedMusic: function() {
			clearTimeout(this.checkingCurrentPositionInTrack);
		},
		toggleDebug: function(){
			this.debug=!this.debug;
			document.body.classList.toggle('debug');
		}
	},
	computed:
	 {
		...mapGetters([
			"musicPlaylisted"
		])
	},
	watch: {
		currentTime: function() {
			this.currentTime = Math.round(this.currentTime);
		},
	},
	beforeDestroy: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);

		clearTimeout(this.checkingCurrentPositionInTrack);
	}
  }
</script> 

