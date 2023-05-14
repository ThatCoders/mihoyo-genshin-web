<template>
  <!-- 首页 -->
  <div class="home">
    <!-- 第一页 -->
    <div class="world basicBox">
      <!-- 背景 -->
      <div class="backVideo">
        <video
          class="video"
          ref="pvVideo"
          muted
          loop="loop"
          autoplay="autoplay"
        >
          <source :src="backSrc" type="video/mp4" />
          您的浏览器不支持播放此视频.
        </video>
      </div>
      <!-- 中部下载图示 -->
      <div class="bottombar">
        <!-- 播放按钮 -->
        <div class="videoPlay">
          <button class="playButton" @click="changePvVideoShow">
            <div class="buImg"></div>
          </button>
        </div>
        <!-- 下载图标 -->
        <div class="download">
          <div class="wx">
            <img
              src="../assets/首页/index.png"
              alt="微信二维码"
              class="wxCode"
            />
            <img src="../assets/首页/派蒙.jpg" alt="派蒙头像" class="pm" />
          </div>
          <div class="left jx">
            <a
              href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/ps4_default"
              class="ps4"
              ><img src="../assets/首页/PS.png" alt=""
            /></a>
            <a
              href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/ios_default"
              class="app"
              ><img src="../assets/首页/苹果.png" alt=""
            /></a>
          </div>
          <div class="rite jx">
            <a
              href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/taptappc_default"
              class="tap"
              ><img src="../assets/首页/TAP.png" alt=""
            /></a>
            <a
              href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/android_default"
              class="android"
              ><img src="../assets/首页/安卓.png" alt=""
            /></a>
          </div>
          <a
            href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/pc_default"
            class="pc"
            ><img src="../assets/首页/PC.png" alt=""
          /></a>
        </div>
        <div class="toBottom"></div>
      </div>
      <img src="../assets/首页/适龄提示.png" alt="适龄提示" class="slts" />
    </div>
    <div class="story"></div>
    <Video :videoSrc="pvSrc" ref="pvVideo"></Video>
  </div>
</template>
<script scoped>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Video from "../components/Video.vue";

export default {
  name: "Home",
  data() {
    return {
      backSrc: "https://ys.mihoyo.com/main/_nuxt/videos/3e78e80.mp4",
      pvSrc:
        "https://webstatic.mihoyo.com/upload/op-public/2020/09/27/fd431739ff26ceeb3010ac561d68446b_345688670889091949.mp4",
    };
  },
  methods: {
    changePvVideoShow: function () {
          // 创建组件时记录背景音乐是否播放
    this.$store.state.musicLow = this.$store.state.musicPlay;
    console.log("PV播放，暂停播放背景音乐")
    this.$store.commit("changeMusicPlay", false);

      this.$store.commit("changePvVideoShow");
      const pvVideo = this.$refs.pvVideo;
      pvVideo.play();
    },
  },
  components: {
    Video,
  },
  mounted: function () {},
};
</script>
<style>
.video {
  width: 100vw;
  min-width: 1300px;
  height: 100vh;
  object-fit: cover;
}
.world {
  position: relative;
}
.backVideo {
  position: absolute;
  z-index: 0;
}
.basicBox {
  width: 100vw;
  min-width: 1300px;
  height: 100vh;
}
.bottombar {
  z-index: 1;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 70px;
}
.videoPlay {
  margin: 0px auto;
  width: 356px;
  height: 76px;
  background: url("../assets/首页/播放边框.png") no-repeat;
  background-size: cover;
  position: relative;
  margin-bottom: 20px;
}
.playButton {
  height: 48px;
  width: 48px;
  background: rgb(255, 255, 255);
  border: 0px;
  border-radius: 50px;
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s;
}
.playButton:hover {
  background: rgba(253, 245, 230, 0);
}
.buImg {
  width: 28px;
  height: 28px;
  background: url("../assets/首页/播放按钮.png") no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.playButton:hover .buImg {
  background: url("../assets/首页/播放按钮.png") no-repeat 0px -28px;
}
.wx {
  position: relative;
  width: 104px;
  height: 104px;
  margin: auto 0px;
}
.wxCode {
  width: 104px;
  object-fit: cover;
}
.pm {
  width: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.download {
  padding: 10px;
  display: flex;
}
.jx a {
  display: block;
  width: 163px;
  height: 57px;
}
.download a img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pc {
  display: block;
  width: 114px;
  height: 114px;
}
.slts {
  z-index: 1;
  position: absolute;
  width: 100px;
  bottom: 60px;
  left: 60px;
}
</style>
