<template>
  <div class="bottomDown">
    <div class="back"></div>
    <img src="../assets/世界/下移图标-可移动内容.png" alt="">
  </div>
</template>
<script>
export default {
  name: "BottomDown",
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
.bottomDown{
  width: 52px;
  height: 52px;
  background:url('../assets/世界/下移图标-框架.png') no-repeat center;
  position: relative;
  /* background-size:contain; */
}
.bottomDown img{
  position: relative;
  top:30%;
  left:50%;
  transform: translate(-47%,0%);
  animation: bottomMove2 2.8s infinite ease-in-out;
}
@keyframes bottomMove2 {
  0%{
    top:30%;
  }
  50%{
    top:60%;
  }
  
  100%{
    top:30%;
  }
}
</style>
