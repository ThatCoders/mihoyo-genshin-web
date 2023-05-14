<template>
  <div class="cityScenery" v-show="this.$store.state.sceneryShow">
    <!-- 半透明遮罩层  -->
    <div class="background"></div>
    <div class="content">
      <!-- 标题  -->
      <div class="title">
        <!-- 标题文本 -->
        <div class="titleText">
          {{ $store.state.sceneryList[$store.state.sceneryIndex].title }}
        </div>
        <!-- 关闭按钮 -->
        <div class="clear" @click="changeSceneryShow"></div>
      </div>
      <!-- 列表容器 -->
      <ul class="listBox">
        <!-- 单项 -->
        <li
          class="sceneryList"
          v-for="(item, index) of sceneryListNow"
          :key="index"
        >
          <!-- 地名 -->
          <h1 class="sceneryName">{{ item.sceneryName }}</h1>
          <!-- 分隔线 -->
          <div class="divisionBox">
            <div class="division1"></div>
          </div>
          <p class="sceneryText">{{ item.text }}</p>
          <img :src="item.imgSrc" alt="图示" class="sceneryImg" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "CityScenery",
  data() {
    return {};
  },
  methods: {
    changeSceneryShow: function () {
      this.$store.commit("changeSceneryShow");
    },
  },
  computed: {
    sceneryListNow: function () {
      return this.$store.state.sceneryList[this.$store.state.sceneryIndex]
        .centent;
    },
  },
};
</script>
<style scoped lang="scss">
.cityScenery {
  width: 100vw;
  height: 100vh;
  min-width: 1300px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}
.background {
  /* position:absolute;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  /* width: 100vw;
  height: 100vh; */
  background-color: rgba(0, 0, 0, 0.7);
}
.content {
  position: relative;
  width: 700px;
  height: 80vh;
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
}
.title {
  width: 100%;
  height: 60px;
  font: 400 46px/60px 宋体;
  position: relative;
}
.titleText {
  width: 520px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0 40px;
}
.clear {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  background: rgba(255, 255, 255, 0.15) url("../assets/世界/关闭.png") no-repeat
    center;
}
.listBox {
  position: absolute;
  top: 90px;
  bottom: 0px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.listBox::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f54d;
}
.listBox::-webkit-scrollbar-thumb {
  background-color: rgb(197, 197, 197);
}
.divisionBox {
  width: 600px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.247);
  margin: 15px 0px;
}
.division1 {
  height: 3px;
  width: 100px;
  background-color: rgb(233, 188, 132);
}
.sceneryText {
  font: 400 14px/30px 微软雅黑;
  width: 600px;
  margin-bottom: 20px;
}
.sceneryList {
  margin: 40px 0px;
}
.sceneryImg {
  width: 600px;
}
@media only screen and (max-width: 500px) {
  .cityScenery {
    width: 100vw;
    height: 100vh;
    min-width: 375px;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .background {
    /* position:absolute;
  top: 0;
  left: 0; */
    width: 100%;
    height: 100%;
    /* width: 100vw;
  height: 100vh; */
    background-color: rgba(0, 0, 0, 0.7);
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height:100vh;
    top: 0;
    left: 50%;
    transform: translate(-50%,0);
    color: #fff;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background-color: rgba(0, 0, 0, 1);
  }
  .titleText {
    height: 50px;
     font: 400 30px/50px 宋体;
    padding: 0 40px;
  }
  .clear {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    background: rgb(0, 0, 0) url("../assets/世界/关闭.png")
      no-repeat center;
  }
  .listBox {
    position: absolute;
    top: 50px;
    bottom: 0px;
    width: 90vw;
    overflow-x: hidden;
    overflow-y: scroll;
    left: 50%;
    transform: translate(-50%);
  }
  .listBox::-webkit-scrollbar {
    /* width: 5px;
    height: 5px;
    background-color: #f5f5f54d; */
    display: none;
  }
  .listBox::-webkit-scrollbar-thumb {
    background-color: rgb(197, 197, 197);
  }
  .sceneryName{
    font: 300 rpx(40)/rpx(64) 微软雅黑;
  }
  .divisionBox {
    width: 100;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.247);
    margin: 10px 0px;
  }
  .division1 {
    height: 2px;
    width: 40px;
    background-color: rgb(233, 188, 132);
  }
  .sceneryText {
    font: 400 rpx(24)/rpx(48) 微软雅黑;
    width: 100%;
    margin-bottom: 20px;
  }
  .sceneryList {
    margin: 40px 0px;
  }
  .sceneryImg {
    width: 100%;
  }
}
</style>
