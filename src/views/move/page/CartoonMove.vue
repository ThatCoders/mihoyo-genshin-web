<template>
  <div class="cartoon">
    <div class="conter" v-show="!$store.state.manhuaShow">
      <div class="cartoomHeader">
        <div class="buttomBox">
          <div class="buttom b1" @click="getList">继续阅读</div>
          <div class="buttom b2" @click="newList">重新开始</div>
        </div>
      </div>
      <div class="container">
        <ul class="manhuaList" :class="{ manhuaListActive: extend }">
          <li
            class="manhuaBox"
            v-for="(item, index) of manhuaList"
            :key="item._id"
            @click="manhuaShow(index)"
          >
            <img :src="item.src" alt="" />
            <div class="manhuaTitle">{{ item.title }}</div>
          </li>
        </ul>
        <div
          class="extend"
          :class="{ extendActive: extend }"
          @click="changeExtend"
        >
          加载更多
        </div>
      </div>
    </div>
    <div class="cartoonBox" v-if="$store.state.manhuaShow">
     <ManhuaMove></ManhuaMove> 
    </div>
  </div>
</template>
<script>
import ManhuaMove from "@/views/move/move_components/ManhuaMove.vue";

export default {
  name: "Cartoon",
  data: () => {
    return {
      extend: false,
    };
  },
  computed: {
    manhuaList: function () {
      return this.$store.state.manhuaList;
    },
  },
  methods: {
    //点击拓展漫画列表
    changeExtend: function () {
      this.extend = true;
    },
    // 显示漫画特定集数
    manhuaShow: function (value) {
      this.$store.commit("changeManhuaIndex", value);
      this.$store.commit("changeManhuaShow", true);
    },
    //继续阅读
    getList: function () {
      this.$store.commit("changeManhuaIndex", this.$store.state.manhuaIndexMove);
      // this.$store.commit("changeManhuaPage", this.$store.state.index_page[1]);
      this.$store.commit("changeManhuaShow", true);
    },
    //重新开始
    newList: function () {
      this.$store.commit("changeManhuaIndex", 0);
      // this.$store.commit("changeManhuaPage", 0);
      this.$store.commit("changeManhuaShow", true);
    },
  },
  beforeMount: function () {
    if (window.localStorage.getItem("index_move")) {
      this.$store.commit(
        "changeManhuaIndexMove",
        JSON.parse(window.localStorage.getItem("index_move"))
      );
    }
    console.log("记录为：");
    console.log(this.$store.state.manhuaIndexMove);
  },
  components: {
   ManhuaMove,
  },
};
</script>
<style scoped lang="scss">
.cartoon {
  position: relative;
  width: 100vw;
  .conter {
    .cartoomHeader {
      width: 100%;
      /* width: 100vw; */
      height: rpx(536);
      background: url("https://ys.mihoyo.com/main/_nuxt/img/de106ff.jpg")
        no-repeat bottom;
      background-size: cover;
      position: relative;

      .buttomBox {
        display: flex;
        position: absolute;
        bottom: 16px;
        right: 20px;

        .buttom {
          padding: 0 rpx(28);
          margin: 0 rpx(14);
          height: rpx(56);
          width: rpx(100);
          text-align: center;
          border-radius: 4px;
          font: 400 rpx(24) / rpx(56) 微软雅黑;
          color: aliceblue;
        }
        .b1 {
          background-color: rgba(0, 174, 255, 0.8);
          margin-left: 0px;
        }
      }
      .b2 {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  .container {
    padding: 20px 0px;
    width: 100vw;

    background: url("https://ys.mihoyo.com/main/_nuxt/img/6d84891.jpg")
      no-repeat top;
    background-size: cover;
    .manhuaList {
      margin: 0 auto;
      width: 92%;
      height: rpx(880);
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .manhuaBox {
        margin: rpx(25) 0;
        perspective: 100px;
        background-color: black;
        position: relative;
        width: rpx(300);
        height: rpx(170);
        overflow: hidden;
        border-radius: 6px;
        box-shadow: 3px 3px 8px 2px rgba(48, 48, 48, 0.4);
        img {
          width: 100%;
          height: 100%;
          transition: all 0.5s ease;
          transform: translateZ(0px);
        }
        .manhuaTitle {
          position: absolute;
          bottom: 0px;
          left: 0px;
          height: rpx(56);
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          font: 300 rpx(24) / rpx(56) 微软雅黑;
          text-align: center;
          color: aliceblue;
        }
      }
    }
    .manhuaListActive {
      height: auto;
    }
    .extend {
      width: 80%;
      height: rpx(70);
      background-color: black;
      color: #f4d8a8;
      border-radius: 4px;
      margin: 0px auto;
      text-align: center;
      font: 400 rpx(32) / rpx(70) 微软雅黑;
    }
    .extendActive {
      display: none;
    }
  }
  .cartoonBox {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 9;
  }
}
</style>
