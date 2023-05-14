<template>
  <div class="background">
    <div class="suspend">
      <img :src="imgList.bg2" alt="背景" class="backImg" />
      <img :src="imgList.bg1" alt="背景" class="backImg move1" />
    </div>
    <!-- 遮罩层 -->
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  name: "Background",
  props: {
    imgList: Object,
  },
  data() {
    return {
      index: 0, //图像序号
    };
  },
  computed: {},
  mounted: function () {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  height: 100vh;
  width: 100vw;
  min-width: 1300px;
  min-height: 800px;
  overflow: hidden;
  position: relative;
  perspective: 30px;
}
.cover {
  position: absolute;
  height: 100vh;
  width: 100vw;
  min-width: 1300px;
  min-height: 800px;
  top: 0;
  left: 0;
  background: url("../assets/人物/中间遮罩.png") no-repeat center;
  background-size: cover;
}
@keyframes suspendMove {
  0% {
    transform: translateZ(0px);
  }
  50% {
    transform: translateZ(5px);
  }
  100% {
    transform: translateZ(0px);
  }
}
.suspend {
  height: 100vh;
  width: 100vw;
   min-width: 1300px;
  min-height: 800px;
  transform: translateZ(0px);
  animation: suspendMove 60s infinite;
}
.backImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@keyframes move {
  0% {
    opacity: 0%;
  }
  4% {
    opacity: 100%;
  }
  50% {
    opacity: 100%;
  }
  54% {
    opacity: 0%;
  }
  100% {
    opacity: 0%;
  }
}
.move1 {
  animation: move 80s infinite;
}
</style>
