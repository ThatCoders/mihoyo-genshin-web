<template>
  <div class="world">
    <div class="centent" @wheel="ymAuto">
      <!-- 世界界面的首页  -->
      <div class="worldHome box">
        <!-- 文本内容 -->
        <div class="describe">
          <img
            src="../assets/世界/提瓦特大陆.png"
            alt="提瓦特大陆"
            class="homeTitle img"
          />
          <img
            src="../assets/世界/文字下部装饰.png"
            alt="标题页脚"
            class="yj img"
          />
          <p>这里是七种元素交汇的幻想世界「提瓦特」。</p>
          <p>
            在遥远的过去，人们藉由对神灵的信仰，获赐了驱动元素的力量，得以在荒野中筑起家园。
          </p>
          <p>五百年前，古国的覆灭却使得天地变异…</p>
          <p>如今，席卷大陆的灾难已经停息，和平却仍未如期光临。</p>
        </div>
        <!-- 动画按钮组件 -->
        <div class="down" @click="changeIndex(1)">
          <BottomDown></BottomDown>
        </div>
      </div>
      <!-- 各国家介绍页  -->
      <ul class="cityLst">
        <li
          class="cityBox box"
          v-for="(item, index) of $store.state.sceneryList"
          :key="item._id"
        >
          <!-- 城市背景大图 -->
          <img
            :src="$store.state.sceneryList[index].bg"
            alt=""
            class="cityImg"
          />
          <!-- 内容框 -->
          <div class="main">
            <!-- 阵营徽章 -->
            <img
              :src="$store.state.sceneryList[index].icon"
              alt=""
              class="icon"
            />
            <!-- 阵营名称 -->
            <div class="textBox">
              <img
                src="../assets/世界/城市标题左装饰.png"
                alt=""
                class="left"
              />
              <h1>{{ $store.state.sceneryList[index].title }}</h1>
              <img
                src="../assets/世界/城市标题右装饰.png"
                alt=""
                class="right"
              />
            </div>
            <!-- 描述文本 -->
            <div class="desc">
              {{ $store.state.sceneryList[index].desc }}
            </div>
            <!-- 详情页按钮 -->
            <div @click="showScenery(index)">
              <BottomPage class="detailPage"></BottomPage>
            </div>

            <P>查看详情</P>
          </div>
        </li>
      </ul>
    </div>

    <!-- 右侧侧边栏 -->
    <div class="rightSidebar" :class="{ rightSidebarActive: ymIndex == 0 }">
      <!-- 侧边栏盒子 -->
      <ul class="sidebarBox">
        <!-- 首页 -->
        <li class="citiList" @click="changeIndex(0)">
          <div class="cityTxet" :class="{ cityTxetActive: ymIndex == 0 }">
            首页
          </div>
          <div class="rightStyle">
            <div class="maxBox" :class="{ maxBoxActive: ymIndex == 0 }"></div>
            <div class="minBox" :class="{ minBoxActive: ymIndex == 0 }"></div>
          </div>
        </li>
        <!-- 城市列表 -->
        <li
          class="citiList"
          v-for="(item, index) of $store.state.sceneryList"
          :key="item._id"
          @click="changeIndex(index + 1)"
        >
          <div
            class="cityTxet"
            :class="{ cityTxetActive: index + 1 == ymIndex }"
          >
            {{ item.title }}
          </div>
          <div class="rightStyle">
            <div
              class="maxBox"
              :class="{ maxBoxActive: index + 1 == ymIndex }"
            ></div>
            <div
              class="minBox"
              :class="{ minBoxActive: index + 1 == ymIndex }"
            ></div>
          </div>
        </li>
        <!-- 敬请期待 -->
        <li class="citiList">
          <div class="cityTxet">敬请期待</div>
          <div class="rightStyle">
            <div class="maxBox"></div>
            <div class="minBox"></div>
          </div>
        </li>
        <div class="line"></div>
      </ul>
    </div>

    <!-- 城市资料遮罩层 -->
    <div class="cityScenery">
      <CityScenery></CityScenery>
    </div>
  </div>
</template>
<script>
import BottomDown from "../components/BottomDown.vue";
import BottomPage from "../components/BottomPage.vue";
import CityScenery from "../components/CityScenery.vue";
export default {
  name: "World",
  data: () => {
    return {
      ymIndex: 0, //页面索引
      maxYs: 4, //最大页数
      time: 500, //页面跳转冷却时间
      state: true, //是否可执行运动状态
    };
  },
  computed: {},
  watch: {},
  methods: {
    //显示风景详细
    showScenery: function (index) {
      this.$store.commit("chuangeSceneryIndex", index);
      this.$store.commit("changeSceneryShow");
    },

    //画面滚动执行
    handleScroll: function () {
      // console.log("坐标" + document.documentElement.scrollTop);
      // console.log("高度" + window.innerHeight);
      let value;
      value = document.documentElement.scrollTop / window.innerHeight;
      this.ymIndex = Math.ceil(value - 0.5);
      // console.log(this.ymIndex);
    },
    //释放鼠标时改变高度
    changeHeight: function () {
      let height = this.ymIndex * window.innerHeight;
      document.documentElement.scrollTop = height;
      // console.log("坐标点"+height);
    },
    //改变到特定页面
    changeIndex: function (index) {
      let height = index * window.innerHeight;
      document.documentElement.scrollTop = height;
      // console.log("坐标点"+height);
    },
    //滚轮滑动时，触发页面自动跳转
    ymAuto: function (e) {
      if (this.state === false) {
        return;
      }
      this.state = false;
      let d;
      if (e.wheelDelta > 0) {
        // console.log("向上");
        d = -1;
      } else {
        // console.log("向下");
        d = 1;
      }
      let index = this.ymIndex + d;
      if (index < 0) {
        index = 0;
      }
      if (index > this.maxYs - 1) {
        index = this.maxYs - 1;
      }
      this.changeIndex(index);
      setTimeout(() => {
        this.state = true;
      }, this.time);
    },
  },
  components: {
    BottomDown,
    BottomPage,
    CityScenery,
  },
  mounted() {
    // 禁用鼠标滚动页面
    window.onmousewheel = function () {
      // console.log("禁用鼠标滚轮");
      return false;
    };
    //滚动事件监控
    window.addEventListener("scroll", this.handleScroll, true);
    //释放鼠标时自动调节按钮
    window.addEventListener("mouseup", this.changeHeight, true);
  },
  beforeDestroy: function () {
    // console.log("移除自动调节窗口");
    window.removeEventListener("mouseup", this.changeHeight, true);
    window.removeEventListener("scroll", this.handleScroll, true);
  },
};
</script>
<style scoped lang="scss">
.cityScenery {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
p {
  text-align: center;
  font: 400 14px/30px 微软雅黑;
  color: #fff;
}
.world {
  position: relative;
  .centent {
    .box {
      width: 100vw;
      height: 100vh;
      min-width: 1300px;
    }
    .worldHome {
      background: url("../assets/世界/5c125a1.png") no-repeat center;
      background-size: cover;
      position: relative;
      .describe {
        width: 900px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img {
          display: block;
          margin: 0px auto;
          margin-bottom: 18px;
        }
        .homeTitle {
          height: 10vh;
        }
        p {
          text-align: center;
          color: #fff;
          font: 400 16px/30px 微软雅黑;
          text-shadow: 0 0 12px rgba(110, 159, 193, 0.36);
        }
      }
      .down {
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translate(-50%, 0);
      }
    }
    .cityLst {
      .cityBox {
        position: relative;
        .cityImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .main {
          width: 700px;
          position: absolute;
          top: 18%;
          left: 50%;
          transform: translate(-50%);
          .icon {
            display: block;
            height: 12vh;
            margin: 10px auto;
          }
          .textBox {
            display: flex;
            margin: 0px auto;
            justify-content: center;
            .left,
            .right {
              height: 12px;
              margin: auto 0px;
            }
            .right {
              transform: rotate(180deg);
            }
            h1 {
              margin: 0px 20px;
              color: #fff;
              font-size: 5vh;
            }
          }
          .desc {
            width: 485px;
            margin: 20px auto;
            text-align: center;
            font: 400 14px/30px 微软雅黑;
            color: #fff;
          }
          .detailPage {
            margin: 0px auto;
            margin-top: 70px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .rightSidebar {
    position: fixed;
    top: 50%;
    right: 36px;
    transform: translate(0, -50%);
    transition: all 0.6s ease-out;
    .sidebarBox {
      list-style: none;
      .citiList {
        height: 25px;
        font: 400 14px/25px 微软雅黑;
        margin: 12px 0px;
        text-align: right;
        color: #fff;
        display: flex;
        .cityTxet {
          height: 100%;
          width: 100px;
          width: 80px;
          padding-right: 20px;
          height: 100%;
        }
        .cityTxetActive {
          background: #fff;
          color: black;
        }
        .rightStyle {
          width: 25px;
          height: 25px;
          position: relative;
          transform: rotate(45deg);
          .maxBox {
            width: 2px;
            height: 2px;
            border: 1px solid #fff;
            background-color: rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.5s ease;
          }
          .maxBoxActive {
            width: 12px;
            height: 12px;
            border: 1px solid #fff;
            background-color: rgba(0, 0, 0, 0.3);
          }
          .minBox {
            width: 3px;
            height: 3px;
            background-color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.5s ease;
          }
          .minBoxActive {
            width: 6px;
            height: 6px;
            background-color: #fff;
          }
        }
      }
      li:nth-child(5) {
        color: rgba(255, 255, 255, 0.6);
      }
      .line {
        position: absolute;
        height: 130%;
        width: 2px;
        background: rgba(255, 255, 255, 0.2);
        top: 50%;
        right: 11px;
        transform: translate(0px, -50%);
      }
    }
  }
  .rightSidebarActive {
    right: -200px;
  }
}
</style>
