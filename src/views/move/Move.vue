<template>
  <div id="move" class="move">
    <!-- 导航按钮 -->
    <div class="navButton"   @click="changeNavShow"></div>
    <!-- 导航栏 -->
    <div class="navBack" :class="{ navbackActive: navShow === true }"></div>
    <div id="nav" class="nav" :class="{ 'navActive': navShow === true }">
      <div class="navTop">
        <div
          class="music"
          :class="{ musicNot: musicPlay === false }"
          @click="changeMusicPlay"
        >
          <!-- 背景音乐 -->
          <audio
            class="backAudio"
            ref="backAudio"
            autoplay="autoplay"
            loop="loop"
          >
            <source
              src="https://ys.mihoyo.com/main/_nuxt/medias/video-bgm.d8637316.mp3"
              type="audio/mp3"
            />
            您的浏览器不支持播放此音频.
          </audio>
        </div>
        <div class="logo"></div>
        <!-- 导航关闭按钮 -->
        <div class="navClose" @click="changeNavShow"></div>
      </div>
      <div class="router" @click="navShow=false">
        <router-link to="/">首页</router-link>
      </div>
      <div class="router" @click="navShow=false">
        <router-link to="/Role">角色</router-link>
      </div>
      <div class="router" @click="navShow=false">
        <router-link to="/World">世界</router-link>
      </div>
      <div class="router" @click="navShow=false">
        <router-link to="/Cartoon">漫画</router-link>
      </div>

      <div class="user">
        <div class="userImg"></div>
        <span>登录</span>
      </div>
    </div>
    <!-- 视图级组件 -->
    <router-view />
    <!-- 页脚 -->
    <MoveFooter></MoveFooter>
  </div>
</template>
<script>
// import Footer from "../../omponents/Footer.vue";
import MoveFooter from "./move_components/MoveFooter.vue"
export default {
  name: "move",
  data() {
    return {
      navShow: false,
    };
  },
  components: {
    MoveFooter
  },
  computed: {
    musicPlay: function () {
      return this.$store.state.musicPlay;
    },
  },
  watch: {
    musicPlay: function (value) {
      if (value) {
        this.music(1);
      } else {
        this.music(0);
      }
    },
  },
  methods: {
    //改变导航栏的显示状态
    changeNavShow:function(){
      this.navShow=!this.navShow;
    },
    //暂停或开始背景音乐播放
    music: function (value) {
      const backAudio = this.$refs.backAudio;
      if (value === 0) {
        // console.log("暂停播放音乐");
        backAudio.pause();
      } else if (value === 1) {
        // console.log("执行自动播放音乐");
        backAudio.play();
      }
    },
    changeMusicPlay: function () {
      this.$store.commit("changeMusicPlay", !this.$store.state.musicPlay);
      //  console.log("改变音乐状态");
    },

    //  网络请求函数，请求角色数据
    roleData: function () {
      let them = this;
      this.$axios("https://genshin_server.qijia8.top/role")
        .then(function (res) {
          them.$store.commit("changeRoleList", res.data);
          console.log(them.$store.state.roleList);
        })
        .catch(function (err) {
          console.log("网络请求出错！，错误详情为：");
          console.log(err);
        });
    },
    //  网络请求函数，请求主城数据
    cityData: function () {
      let them = this;
      this.$axios("https://genshin_server.qijia8.top/city")
        .then(function (res) {
          them.$store.commit("changeCityList", res.data);
          console.log(them.$store.state.cityList);
        })
        .catch(function (err) {
          console.log("网络请求出错！，错误详情为：");
          console.log(err);
        });
    },
    //  网络请求函数，请求各国家风景/名胜数据
    sceneryData: function () {
      let them = this;
      this.$axios("https://genshin_server.qijia8.top/scenery")
        .then(function (res) {
          them.$store.commit("chuangeScenery", res.data);
          console.log(them.$store.state.sceneryList);
        })
        .catch(function (err) {
          console.log("网络请求出错！，错误详情为：");
          console.log(err);
        });
    },
    //  网络请求函数，请求漫画数据
    manhauData: function () {
      let them = this;
      this.$axios("https://genshin_server.qijia8.top/manhua")
        .then(function (res) {
          them.$store.commit("changeManhuaList", res.data);
          console.log(them.$store.state.manhuaList);
        })
        .catch(function (err) {
          console.log("网络请求出错！，错误详情为：");
          console.log(err);
        });
    },
  },
  created: function () {},
  beforeMount: function () {
    this.roleData();
    this.cityData();
    this.sceneryData();
    this.manhauData();
  },
  mounted: function () {
    const backAudio = this.$refs.backAudio;
    backAudio.load();
    // backAudio.play();
  },
};
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0;
}
html {
  body {
    margin: 0px;
    scroll-behavior: smooth;
    .move {
      position: relative;
      .navButton{
        z-index: 7;
        position: fixed;
        top: 0;
        right: rpx(30);
        height: rpx(132);
        width: rpx(60);
        background: no-repeat url("../../assets/导航按钮.png") center;
        background-size:contain;
      }
      .navBack {
        display: none;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 7;
        background-color: rgba(0, 0, 0, 0.65);
      }
      .navbackActive{
        display: block;
      }
      
      .nav {
        position: fixed;
        top: 0;
        right: rpx(-600);
        height: 100vh;
        width: rpx(600);
        background-color: #fff;
        font: 400 rpx(40) / rpx(132) "宋体";
        z-index: 8;
        transition: all 0.5s ease;
        
        .navTop {
          position: relative;
          display: flex;
          height: rpx(132);
          width: 100%;
          background-color: #333;
          .music {
            width: rpx(68);
            height: rpx(68);
            background: url("../../assets/音乐.png") no-repeat;
            border-radius: 50%;
            background-size: contain;
            margin: auto rpx(36);
          }
          .musicNot {
            background: url("../../assets/音乐关闭.png") no-repeat;
            background-size: contain;
          }
          .logo {
            width: rpx(300);
            height: rpx(120);
            background: url("../../assets/logo.png") no-repeat center center;
            background-size: cover;
            margin: rpx(6) 0;
          }
          .navClose {
            width: rpx(40);
            height: rpx(40);
            background: no-repeat url("../../assets/关闭.png");
            background-size: contain;
            position: absolute;
            top: 50%;
            right: rpx(30);
            transform: translate(0, -50%);
          }
        }
        .router {
          width: 100%;
          height: rpx(132);
          color: #333;
          border-bottom: 1px solid #eee;
          a {
            height: 100%;
            line-height: 66px;
            text-decoration: none;
            color: #444;
            margin-left: rpx(80);
          }

          a.router-link-exact-active {
            text-shadow: 0px 0px 8px rgb(60, 162, 230);
          }
        }

        .user {
          margin-top: rpx;
          width: 100%;
          height: rpx(132);
          display: flex;
          background-color: #eee;
          margin-top: rpx(132);
          span {
            margin: auto 10px;
            font-size: rpx(40);
          }
          .userImg {
            width: 30px;
            height: 30px;
            background: url("../../assets/user_move.png") no-repeat;
            border-radius: 50%;
            background-size: contain;
            margin: auto 18px;
            color: #d4d4d4;

            margin-left: rpx(80);
          }
        }
      }
      .navActive {
          right: 0;
          transition: all 0.5s ease;
        }
    }
  }
}
</style>
