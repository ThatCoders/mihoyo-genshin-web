<template>
  <!-- 漫画盒子 -->
  <div class="ManhuaBox">
    <!-- 顶部功能栏 -->
    <div class="top" :class="{ topActive: menusShow || titleListShow }">
      <!-- 返回 -->
      <div class="goback" @click="changeManhuaShow">
        <div class="icon"></div>
        <div class="back">返回</div>
      </div>
      <!-- 列表集数 -->
      <div class="listIndex" @click="chuangeTitleList">
        <div class="listTitle">{{ manhuaList[manhuaIndex].title }}</div>
        <div class="state"></div>
      </div>
    </div>

    <div class="content" ref="content" @click="changeMenusShow">
      <ul class="manhuaBox">
        <li class="manhauItem" v-for="(item, index) of nowManhua" :key="index">
          <!-- <img :src="item" class="manhuaImg" /> -->
          <Imageb :dataSrc="item" :index="index"></Imageb>
        </li>
      </ul>
    </div>
    <!-- 底部功能栏 -->
    <div class="bottom" :class="{ bottomActive: menusShow || titleListShow }">
      <div
        class="toLeft buttomBox"
        :class="{ buttomBoxActive: manhuaIndex <= 0 }"
        @click="changeIndex(-1)"
      >
        <div class="icon"></div>
        <div class="text">上一话</div>
      </div>
      <div
        class="toRight buttomBox"
        @click="changeIndex(1)"
        :class="{ buttomBoxActive: manhuaIndex >= manhuaList.length - 1 }"
      >
        <div class="text">下一话</div>
        <div class="icon"></div>
      </div>
    </div>
    <!-- 漫画集数列表 -->
    <transition name="titleList">
      <div
        class="transparency"
        v-show="titleListShow"
        @click="chuangeTitleList"
      >
        <ul class="listBox">
          <li
            class="titleItem"
            :class="{ titleItemActive: index === manhuaIndex }"
            v-for="(item, index) in manhuaList"
            :key="item._id"
            @click.stop="changeManhuaIndex(index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import Imageb from "./Imageb.vue";
export default {
  name: "ManhuaMove",
  data() {
    return {
      // 集数列表是否显示
      titleListShow: false,
      // 菜单栏是否显示
      menusShow: true,
      // 菜单是否可以更改状态
      chuangeState: false,
      // 菜单显示时间
      showTime: 6000,
    };
  },
  computed: {
    manhuaIndex: function () {
      return this.$store.state.manhuaIndex;
    },
    // manhuaPage: function () {
    //   return this.$store.state.manhuaPage;
    // },
    nowManhua: function () {
      return this.$store.state.manhuaList[this.manhuaIndex].manhuaImg;
    },
    manhuaList: function () {
      return this.$store.state.manhuaList;
    },
  },
  watch: {
    // 监听页数变化，改变漫画位置，并记录
    // manhuaPage: function () {
    //   this.move();
    //   this.record();
    // },
    // 监听集数变化，并记录
    manhuaIndex: function () {
      this.record();
    },
    // 监听菜单显示状态
    menusShow: function (val) {
      if (val === true) {
        setTimeout(() => {
          this.menusShow = false;
        }, this.showTime);
      }
    },
  },
  mounted: function () {
    // 回到顶部
    this.toTop();
    // 记录集数页数
    this.record();
    //  移动至特定页数
    // this.move();
    setTimeout(() => {
      this.menusShow = false;
    }, 3000);
    this.chuangeState = true;
  },
  components: {
    Imageb
  },
  methods: {
    // 改变菜单栏状态
    changeMenusShow() {
      if (this.chuangeState === false) {
        return;
      }
      this.chuangeState = false;
      this.menusShow = !this.menusShow;
      setTimeout(() => {
        this.chuangeState = true;
      }, 500);
    },
    //页数增加1
    // addPage: function () {
    //   if (this.manhuaPage >= this.nowManhua.length - 1) {
    //     return;
    //   }
    //   this.$store.commit("alterManhuaPage", 1);
    // },
    // //页数减1
    // reducePage: function () {
    //   if (this.manhuaPage <= 0) {
    //     return;
    //   }
    //   this.$store.commit("alterManhuaPage", -1);
    // },
    //更换特定集数
    changeManhuaIndex: function (index) {
      if (index === this.manhuaIndex) {
        this.titleListShow = false;
        return;
      }
      this.$store.commit("changeManhuaIndex", index);
      this.titleListShow = false;
      this.toTop();
      // this.$store.commit("changeManhuaPage", 0);
    },
    // 按特定值增减集数
    changeIndex: function (value) {
      value = value + this.manhuaIndex;
      if (value >= 0 && value < this.manhuaList.length) {
        this.$store.commit("changeManhuaIndex", value);
        this.toTop();
      }
    },
    //更换页数
    // changeManhuaPage: function (event) {
    //   let index = Number(event.target.value);
    //   this.$store.commit("changeManhuaPage", index);
    //   // console.log("执行页数更改函数,当前页数"+this.manhuaPage);
    // },
    //管边遮罩层
    changeManhuaShow: function () {
      this.$store.commit("changeManhuaShow", false);
    },
    //显示漫画列表
    chuangeTitleList: function () {
      this.titleListShow = !this.titleListShow;
    },
    //漫画阅读记录函数
    record: function () {
      let a = this.manhuaIndex;
      this.$store.commit("changeManhuaIndexMove", a);
      window.localStorage.setItem(
        "index_move",
        JSON.stringify(this.$store.state.manhuaIndexMove)
      );
    },
    //位移函数
    // move: function () {
    //   const manhauDom = this.$refs.manhauDom;
    //   let d = -this.$store.state.manhuaPage * 100;
    //   // console.log("调用视图跟随数据更新" + d);
    //   manhauDom.style = "left:" + d + "%";
    // },
    toTop() {
      const content = this.$refs.content;
      this.$nextTick(() => {
        content.scrollTo(0, 0);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.titleList-enter,
.titleList-leave-to {
  opacity: 0;
}
.titleList-enter-active,
.titleList-leave-active {
  transition: all 0.4s ease;
}
.ManhuaBox {
  .icon {
    height: 100%;
    width: rpx(24);
    background: url("../../../assets/漫画/方向.png") no-repeat center;
    background-size: contain;
  }
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../../../assets/漫画/阅读器背景.jpg") no-repeat center;
  background-size: cover;
  .top {
    transition: all 0.5s ease;
    position: fixed;
    top: rpx(-108);
    left: 0;
    width: rpx(630);
    padding: 0 rpx(60);
    height: rpx(108);
    line-height: rpx(108);
    background-color: rgba(0, 0, 0, 0.92);
    color: #fff;
    display: flex;
    justify-content: space-between;
    .goback {
      height: 100%;
      display: flex;
      .back {
        margin-left: rpx(24);
      }
    }
    .listIndex {
      height: 100%;
      display: flex;
      .state {
        width: rpx(32);
        height: 100%;
        background: url("../../../assets/人物/城市状态.svg") no-repeat center;
        background-size: contain;
        margin-left: rpx(24);
      }
    }
  }
  .topActive {
    top: 0;
    left: 0;
  }
  .content {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    .manhuaBox {
      .manhauItem {
        .manhuaImg {
          width: 100vw;
        }
      }
    }
  }
  .transparency {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .listBox {
      width: rpx(630);
      position: fixed;
      top: rpx(128);
      left: 50%;
      transform: translate(-50%, 0);
      padding: 20px 0;
      overflow: hidden;
      overflow-y: scroll;
      height: rpx(420);
      background-color: rgba(0, 0, 0, 0.9);
      .titleItem {
        width: rpx(540);
        padding-left: rpx(90);
        color: #ddd;
        height: rpx(80);
        line-height: rpx(80);
      }
      .titleItemActive {
        background-color: rgba(106, 208, 235, 0.6);
      }
    }
    .listBox::-webkit-scrollbar-track {
      display: none;
    }
  }

  .bottom {
    position: fixed;
    bottom: rpx(-108);
    left: 0;
    width: rpx(630);
    padding: 0 rpx(60);
    height: rpx(108);
    line-height: rpx(108);
    background-color: rgba(0, 0, 0, 0.92);
    color: #fff;
    display: flex;
    justify-content: space-between;
    transition: all 0.5s ease;
    .buttomBox {
      height: 100%;
      display: flex;
      .text {
        margin: 0 10px;
      }
    }
    .buttomBoxActive {
      opacity: 50%;
    }
    .toRight {
      .icon {
        transform: rotate(180deg);
      }
    }
  }
  .bottomActive {
    bottom: 0;
  }
}
</style>
