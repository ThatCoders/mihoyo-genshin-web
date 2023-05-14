<template>
  <!-- 首页 -->
  <div class="MoveHome">
    <!-- 第一页 -->
    <div class="basicBox">
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
      <!-- 中部大LOGO· -->

      <img class="loge" src="../../../assets/原神LOGO.png" alt="LOGE" />
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
          <a
            class="left"
            href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/android_default"
            ><img src="../../../assets/首页/move_下载.png" alt="游戏下载"
          /></a>
          <a
            class="right"
            href="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/android_default"
            ><img src="../../../assets/首页/move_tap.png" alt="Tap下载"
          /></a>
        </div>
        <!-- 声明 -->
        <div class="statement">
          <div class="author">开发者名称：上海米哈游天命科技有限公司</div>
          <div class="edition">
            <span>当前版本：2.5.0</span>
            <span>更新时间：2022.2.16</span>
          </div>
          <div class="agreement">
            <a href="https://ys.mihoyo.com/main/m/company/privacy">隐私协议</a>
            <a href="https://ys.mihoyo.com/main/m/news/detail/13367"
              >用户权限</a
            >
          </div>
        </div>
      </div>
      <img
        src="../../../assets/首页/适龄提示.png"
        alt="适龄提示"
        class="slts"
      />
    </div>
    <div class="story"></div>
    <Video :videoSrc="pvSrc" ref="pvVideo"></Video>
  </div>
</template>
<script scoped>
import Video from "@/components/Video.vue";
export default {
  name: "Home",
  data() {
    return {
      backSrc:
        "https://webstatic.mihoyo.com/hk4e/upload/website/cn/videos/002.mp4",
      pvSrc:
        "https://webstatic.mihoyo.com/upload/op-public/2020/09/27/fd431739ff26ceeb3010ac561d68446b_345688670889091949.mp4",
    };
  },
  methods: {
    changePvVideoShow: function () {
      // 创建组件时记录背景音乐是否播放
      this.$store.state.musicLow = this.$store.state.musicPlay;
      console.log("PV播放，暂停播放背景音乐");
      this.$store.commit("changeMusicPlay", false);

      this.$store.commit("changePvVideoShow");
      const pvVideo = this.$refs.pvVideo;
      pvVideo.play();
    },
  },
  components: {
    Video,
  },
};
</script>
<style lang="scss" scoped>
.MoveHome {
  width: 100vw;
  .basicBox {
    position: relative;
    width: 100vw;
    height: 100vh;
    .backVideo {
      position: absolute;
      z-index: 0;
      .video {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
      }
    }
    .loge {
      position: absolute;
      top: 12vh;
      left: 50%;
      height: rpx(300);
      transform: translate(-50%, 0);
    }
    .bottombar {
      z-index: 1;
      position: absolute;
      left: 50%;
      bottom: rpx(120);
      transform: translate(-50%);
      .videoPlay {
        margin: 0px auto;
        width: rpx(536);
        height: rpx(114);
        background: url("../../../assets/首页/播放边框.png") no-repeat center;
        background-size: contain;
        position: relative;
        .playButton {
          height: rpx(72);
          width: rpx(72);
          background: rgb(255, 255, 255);
          border: 0px;
          border-radius: 50%;
          outline: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.2s;
          .buImg {
            width: rpx(42);
            height: rpx(42);
            background: url("../../../assets/首页/播放按钮.png") no-repeat;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-size: contain;
            background-size: cover;
          }
        }
      }
      .download {
        margin-top: rpx(14);
        display: flex;
        a {
          display: block;
          margin: 0 rpx(20);
          img {
            width: rpx(240);
          }
        }
      }
      .statement {
        margin: 0px auto;
        width:rpx(500);
        color: #fff;
        font-size: rpx(24);
        text-align: center;
        div{
          margin: rpx(8);
        }
        .author{
          background-color: rgb(0,0,0,0.1);
        }
        .edition {
          width: 100%;
          display: flex;
          justify-content: space-around;
          background-color: rgb(0,0,0,0.1);
        }
        .agreement{
          width: 100%;
          display: flex;
           justify-content: space-around;
           background-color: rgb(0,0,0,0.1);
          a{
           display:inline-block;
            text-decoration: none;
            color: #fff;
            
          }
        }
      }
    }
    .slts {
      z-index: 1;
      position: absolute;
      width: rpx(100);
      top: rpx(10);
      left: rpx(10);
    }
  }
}
</style>
