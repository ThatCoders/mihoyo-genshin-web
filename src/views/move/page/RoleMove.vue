<template>
  <div class="role" @touchstart="touchstart" @touchmove="touchmove">
    <!-- 背景 -->

    <img
      class="background"
      :src="this.$store.getters.nowCity.char.bg3"
      alt="背景图"
    />

    <!-- 立绘  -->
    <transition name="painting">
      <img
        :src="$store.getters.nowRole.cover2"
        alt="全身立绘"
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
    <!-- 底部栏  -->
    <div class="sidebar">
      <CityListMove></CityListMove>
    </div>
  </div>
</template>
<script>
// import Background from "../components/Background.vue";
import RoleDataBox from "@/components/roleDataBox.vue";
import RoleListBox from "@/components/RoleListBox.vue";
import CityListMove from "@/views/move/move_components/CityListMove.vue";
export default {
  name: "RoleMove",
  data: () => {
    return {
      imgIf: true,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      cooling: true,
      coolingTime: 200,
    };
  },
  computed: {
    nowRoleListLength() {
      return this.$store.state.roleList[this.$store.state.role_cityIndex].role.length;
    },
  },
  methods: {
    changeImg: function () {
      this.imgIf = !this.imgIf;
    },
    chuangeIndex(index) {
      if (index <= 0) {
        this.$store.state.roleIndex >= 1
          ? this.$store.commit("redRoleIndex")
          : {};
      }
      if (index > 0) {
        this.$store.state.roleIndex < this.nowRoleListLength - 1
          ? this.$store.commit("addRoleIndex")
          : {};
      }
    },
    touchstart(e) {
      // 如果你要阻止点击事件，请反注释下一行代码
      // e.preventDefault()
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchmove(e) {
      // e.preventDefault()
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;
      if (Math.abs(this.startX - this.moveX) >= 50 && this.cooling) {
        this.cooling = false;
        this.changeImg();
        this.startX - this.moveX <= 0 ? this.chuangeIndex(0) : this.chuangeIndex(1);
        setTimeout(() => {
          this.changeImg();
          this.cooling = true;
        }, this.coolingTime);
      }
    },
  },
  components: {
    // Background,
    RoleDataBox,
    RoleListBox,
    CityListMove,
  },
  created: function () {},
};
</script>
<style lang="scss" scoped>
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
  overflow: hidden;
  .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .painting {
    position: absolute;
    top: 0px;
    right: 0;
    height: 100%;
    transition: all 0.5s ease;
  }
}
.content {
  position: absolute;
  top: rpx(220);
  left: rpx(60);
  .saying {
    position: relative;
    top: rpx(200);
    .sayImg {
      width: rpx(450);
    }
  }
}

.roleList {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 90px;
  z-index: 6;
}
.roleListBox {
  margin: 0 auto;
}
.sidebar {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 7;
  transform: translate(-50%, 0);
}
</style>
