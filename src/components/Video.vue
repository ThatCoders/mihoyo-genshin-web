<template>
  <div class="videoBox" v-show="this.$store.state.pvVideoShow">
    <div class="background" @click="$_changePvVideoShow"></div>
    <video class="videoDom" ref="pvVideo" controls="controls">
      <source :src="videoSrc_" type="video/mp4" />
      您的浏览器不支持播放此视频.
    </video>
  </div>
</template>
<script>
export default {
  name: "Video",
  props: {
    videoSrc: String,
  },
  data() {
    return {
      musicPlay: "",
    };
  },
  methods: {
    $_changePvVideoShow: function () {
      this.$store.commit("changePvVideoShow");
      const pvVideo = this.$refs.pvVideo;
      pvVideo.pause();
      //回复背景音乐
      this.$store.commit("changeMusicPlay", this.$store.state.musicLow);
    },
    play: function () {
      const pvVideo = this.$refs.pvVideo;
      pvVideo.load();
      pvVideo.play();
    },
  },
  computed: {
    videoSrc_: function () {
      let value = "";
      if (!this.videoSrc) {
        value = " ";
      } else {
        value = this.videoSrc;
      }
      return value;
    },
  },
  mounted: function () {
  },
  beforeDestroy: function () {
  },
};
</script>
<style scoped>
.videoBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}
.background {
  widows: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.videoDom {
  width: 900px;
  height: 500px;
  position: fixed;
  object-fit: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0px;
}
@media only screen and (max-width: 500px){
  .videoDom {
  width:100vw;
  height: 55vw;
  /* position: fixed;
  object-fit: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0px; */
}
}
</style>
