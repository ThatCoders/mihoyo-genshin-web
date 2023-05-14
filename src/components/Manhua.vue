<template>
  <!-- 漫画盒子 -->
  <div class="ManhuaBox">
    <!-- 背景 -->
    <div class="back"></div>
    <!-- 内容 -->
    <div class="contentBox">
      <!-- 关闭按钮 -->
      <div class="clear" @click="changeManhuaShow"></div>
      <!-- 后退 -->
      <div
        class="button left"
        @click="reducePage"
        :class="{ buttonNo: manhuaPage <= 0 }"
      ></div>
      <!-- 漫画窗口 -->
      <div class="manhuaWindow">
        <!-- 填充内容，用于确定正确宽高比 -->
        <div class="backModel">
          <img src="../assets/漫画/填充模板画板 1.jpg" alt="" class="model" />
        </div>
        <!-- 漫画内容 -->
        <ul class="manhauUl" ref="manhauDom">
          <li
            class="manhuaContent"
            v-for="(item, index) of nowManhua"
            :key="index"
          >
            <img
              src="../assets/漫画/填充模板画板 1.jpg"
              alt=""
              class="model"
            />
            <img
              :data-src="item"
              alt="漫画"
              class="manhuaImage"
            />
          </li>
        </ul>
      </div>
      <!-- 前进 -->
      <div
        class="button right"
        @click="addPage"
        :class="{ buttonNo: manhuaPage >= nowManhua.length-1 }"
      ></div>
      <!-- 导航栏 -->
      <div class="navBox">
        <!-- 集数选择栏 -->
        <select
          class="indexList"
          @change="changeManhuaIndex($event)"
          :value="this.manhuaIndex"
        >
          <option
            :value="index_index"
            class="index"
            v-for="(item_index, index_index) of manhuaList"
            :key="item_index._id"
          >
            {{ item_index.title }}
          </option>
        </select>
        <!-- 页数选择栏 -->
        <select
          class="pageList"
          :value="this.manhuaPage"
          @change="changeManhuaPage($event)"
        >
          <option
            :value="index_page"
            class="page"
            v-for="(item_page, index_page) of nowManhua"
            :key="index_page"
          >
            第{{ index_page + 1 }}页
          </option>
        </select>
        <div class="pageLength">共{{ nowManhua.length }}页</div>
      </div>
    </div>
    <div class="navBack"></div>
  </div>
</template>
<script>
export default {
  name: "Manhua",
  data() {
    return {};
  },
  computed: {
    manhuaIndex: function () {
      return this.$store.state.manhuaIndex;
    },
    manhuaPage: function () {
      return this.$store.state.manhuaPage;
    },
    nowManhua: function () {
      return this.$store.state.manhuaList[this.manhuaIndex].manhuaImg;
    },
    manhuaList: function () {
      return this.$store.state.manhuaList;
    },
  },
  watch: {
    // 监听页数变化，改变漫画位置，并记录
    manhuaPage: function () {
      this.move();
      this.record();
    },
    // 监听集数变化，并记录
    manhuaIndex: function () {
      this.record();
    },
  },
  mounted: function () {
    // 记录集数页数
    this.record();
    //  移动至特定页数
    this.move();
    this.lzay();
  },
  methods: {
    // 图片懒加载函数
    lzay() {
      const imgs = document.querySelectorAll(".manhuaImage");
      // console.log(imgs);
      const observer = new IntersectionObserver((change) => {
        // changes: 目标元素集合
        // intersectionRatio
        if (change[0].isIntersecting) {
          // console.log("触发显示！");
          const img = change[0].target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
      imgs.forEach((item) => {
        observer.observe(item);
      });
    },
    //页数增加1
    addPage: function () {
      if (this.manhuaPage >= this.nowManhua.length - 1) {
        return;
      }
      this.$store.commit("alterManhuaPage", 1);
    },
    //页数减1
    reducePage: function () {
      if (this.manhuaPage <= 0) {
        return;
      }
      this.$store.commit("alterManhuaPage", -1);
    },
    //更换集数
    changeManhuaIndex: function (event) {
      let index = Number(event.target.value);
      this.$store.commit("changeManhuaIndex", index);
      this.$store.commit("changeManhuaPage", 0);
      this.lzay();
    },
    //更换页数
    changeManhuaPage: function (event) {
      let index = Number(event.target.value);
      this.$store.commit("changeManhuaPage", index);
      // console.log("执行页数更改函数,当前页数"+this.manhuaPage);
    },
    //关闭遮罩层
    changeManhuaShow: function () {
      this.$store.commit("changeManhuaShow", false);
    },
    //漫画阅读记录函数
    record: function () {
      let a = [];
      a[0] = this.manhuaIndex;
      a[1] = this.manhuaPage;
      this.$store.commit("changeIndex_page", a);
      window.localStorage.setItem(
        "index_page",
        JSON.stringify(this.$store.state.index_page)
      );
    },
    //位移函数
    move: function () {
      const manhauDom = this.$refs.manhauDom;
      let d = -this.$store.state.manhuaPage * 100;
      // console.log("调用视图跟随数据更新" + d);
      manhauDom.style = "left:" + d + "%";
    },
  },
};
</script>
<style scoped>
.clear {
  opacity: 0.6;
  position: absolute;
  top: 0;
  right: -120px;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15) url("../assets/世界/关闭.png") no-repeat
    center;
}
.clear:hover {
  opacity: 1;
}
.backModel {
  padding: 10px 8px;
  height: 100%;
  box-sizing: border-box;
}
.backModel img {
  height: 100%;
}
.ManhuaBox {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1300px;
  min-height: 700px;
}
.back {
  width: 100%;
  height: 100%;
  background: url("../assets/漫画/阅读器背景.jpg") no-repeat center;
  background-size: cover;
}
.navBack {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 66px;
  background-color: black;
  z-index: 1;
}
.navBox {
  display: flex;
  height: 66px;
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: -66px;
}
.contentBox {
  z-index: 2;
  position: absolute;
  top: 66px;
  bottom: 66px;
  left: 50%;
  transform: translate(-50%);
  background: rgba(255, 235, 205, 0.281);
}
.button {
  width: 45px;
  height: 64px;
  background: url("../assets/人物/左.png") no-repeat center;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  opacity: 0.7;
}
.button:hover {
  opacity: 1;
}
.buttonNo {
  opacity: 0.2 !important;
}
.left {
  left: -100px;
}
.right {
  background: url("../assets/人物/右.png") no-repeat center;
  right: -100px;
}
.manhuaWindow {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.manhauUl {
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  position: absolute;
  top: 0;
  left: -0%;
  transition: all 0.5s ease;
  list-style: none;
}
.manhuaContent {
  padding: 10px 8px;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
}
.manhuaContent .manhuaImage {
  height: 100%;
  position: relative;
  left: 0;
  top:-100%;
}
.manhuaContent .model {
  height: 100%;
  /* display: none; */
}
.indexList {
  height: 40px;
  width: 40%;
  margin: auto 0px;
}
.pageList {
  height: 40px;
  width: 20%;
  margin: auto 0px;
  margin-left: 20%;
}
.pageLength {
  height: 66px;
  line-height: 66px;
  color: #fff;
  margin-left: 5%;
}
</style>
