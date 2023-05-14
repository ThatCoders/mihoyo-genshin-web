<template>
  <div class="role">
    <!-- 背景 -->
    <div class="background">
      <!-- 呼吸、轮播图组件 -->
      <Background :imgList="this.$store.getters.nowCity.char"></Background>
    </div>
    <!-- 立绘  -->
    <transition name="painting">
      <img
        :src="$store.getters.nowRole.cover1"
        alt="半身立绘"
        class="painting"
        v-if="imgIf"
        ref="paintingDom"
      />
    </transition>

    <!-- 内容 -->
    <div class="content">
      <RoleDataBox></RoleDataBox>
      <!-- 名言 -->
      <div class="saying">
        <img :src="$store.getters.nowRole.sen" alt="" class="sayImg" />
      </div>
    </div>
    <!-- 人物选择栏 -->
    <div class="roleList">
      <RoleListBox calss="roleListBox" @changeImg="changeImg"></RoleListBox>
    </div>
    <!-- 侧边栏  -->
    <div class="sidebar">
      <CityList></CityList>
    </div>
  </div>
</template>
<script>
import Background from "../components/Background.vue";
import RoleDataBox from "../components/roleDataBox.vue";
import RoleListBox from "../components/RoleListBox.vue";
import CityList from "../components/CityList.vue";
export default {
  name: "Role",
  data: () => {
    return {
      imgIf: true,
    };
  },
  methods: {
    changeImg: function () {
      this.imgIf = !this.imgIf;
    },
  },
  computed: {},
  components: {
    Background,
    RoleDataBox,
    RoleListBox,
    CityList,
  },
  created: function () {},
};
</script>
<style scoped>
/* 立绘动画 */
.painting-enter,
.painting-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

.painting-enter-active,
.painting-leave-active {
  transition: all 0.2s ease;
}

.role {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1300px;
  min-height: 800px;
  overflow: hidden;
}
.content {
  position: absolute;
  top: 150px;
  left: 25%;
}
.painting {
  position: absolute;
  top: 0px;
  left: 20%;
  height: 100%;
  transition: all 0.5s ease;
}
.saying {
  position: relative;
  left: 50%;
}
.roleList {
  width: 100%;
  height: 180px;
  position: absolute;
  left: 0;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 6;
}
.roleListBox {
  margin: 20px auto;
}
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
</style>
