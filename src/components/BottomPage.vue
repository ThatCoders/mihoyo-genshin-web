<template>
  <div class="bottomPage">
    <div class="back"></div>
  </div>
</template>
<script>
export default {
  name: "BottomPage",
  data() {
    return {};
  },
  methods: {
  
  },
  computed: {

  },
};
</script>
<style scoped>
.back{
  width: 100px;
  height: 100px;
  background:url('../assets/世界/查看详情按钮-变化背景.png') no-repeat center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-size: 5% 5%;

  animation: bottomMove1 1.4s infinite ease-in-out;
}
@keyframes bottomMove1 {
  0%{
    background-size: 5% 5%;
  }
  100%{
    background-size: 100% 100%;
  }
}
.bottomPage{
  width: 52px;
  height: 52px;
  background:url('../assets/世界/查看详情按钮.png') no-repeat center;
  position: relative;
  background-size:contain;
}
</style>
