<template>
  <div id="app">
    <!-- 导航栏 -->
    <div id="nav" class="nav">
      <div class="music" :class="{ musicNot: musicPlay === false }" @click=" changeMusicPlay">
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
      <router-link to="/">首页</router-link>
      <router-link to="/Role">角色</router-link>
      <router-link to="/World">世界</router-link>
      <router-link to="/Cartoon">漫画</router-link>
      <a href="https://github.com/LuYou-fangweng?tab=repositories" class="user">
        <span>github</span>
        <div class="userImg"></div>
      </a>
    </div>
    <!-- 视图级组件 -->
    <router-view />
    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "./components/Footer.vue";

// import { } from './api';
export default {
  name: "app",
  components: {
    Footer,
  },
  data() {
    return {
      id: 0,
      info: {}
    }
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
    id(id) {
      console.log({id});
    }
  },
  methods: {
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
    changeMusicPlay:function( ){
       this.$store.commit("changeMusicPlay",!(this.$store.state.musicPlay))
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
  created: function () {
    window.vm = this;
  },
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

<style>
* {
  margin: 0px;
  padding: 0px;
}
html,
body {
  scroll-behavior: smooth;
  width: 100vw;
  min-height: 100vh;
  overflow-x:hidden;
}
/* footer { max-width: 100%; }
.basicBox { max-width: 100vw; overflow: hidden;}
.world .centent .box { max-width: 100%; } */
#app {
  min-width: 1300px;
  width: 100%;
  position: relative;
  height: auto;
}
.nav {
  position: fixed;
  display: flex;
  height: 66px;
  width: 100vw;
  min-width: 1300px;
  margin: 0px auto;
  background-color: rgba(0, 0, 0, 0.65);
  font: 400 20px/66px "宋体";
  z-index: 8;
}
.music {
  width: 34px;
  height: 34px;
  background: url("./assets/音乐.png") no-repeat;
  border-radius: 50%;
  background-size: contain;
  margin: auto 18px;
}
.musicNot {
  background: url("./assets/音乐关闭.png") no-repeat;
  background-size: contain;
}
.logo {
  width: 240px;
  height: 60px;
  background: url("./assets/logo.png") no-repeat center center;
  background-size: cover;
}
.user {
  position: absolute;
  right: 10px;
  height: 60px;
  display: flex;
  opacity: 0.7;
}
.user:hover {
  opacity: 1;
}
.user span {
  color: #ffffff;
  font-size: 20px;
}
.userImg {
  width: 30px;
  height: 30px;
  background: url("./assets/user.png") no-repeat;
  border-radius: 50%;
  background-size: contain;
  margin: auto 18px;
  color: #d4d4d4;
}

#nav a {
  color: #d4d4d4;
  text-decoration: none;
  margin: 0px 25px;
}

#nav a.router-link-exact-active {
  text-shadow: 0px 0px 8px rgb(60, 162, 230);
  color: #ffffff;
}
</style>
