<template>
  <div class="world">
    <div
      class="centent"
      ref="centent"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      id="centent"
    >
      <!-- 世界界面的首页  -->
      <div class="worldHome box">
        <!-- 文本内容 -->
        <div class="describe">
          <img
            src="@/assets/世界/提瓦特大陆.png"
            alt="提瓦特大陆"
            class="homeTitle img"
          />
          <img
            src="@/assets/世界/文字下部装饰.png"
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
        <div class="down" @touchstart.stop="changeIndex(1)">
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
              <img src="@/assets/世界/城市标题左装饰.png" alt="" class="left" />
              <h1>{{ $store.state.sceneryList[index].title }}</h1>
              <img
                src="@/assets/世界/城市标题右装饰.png"
                alt=""
                class="right"
              />
            </div>
            <!-- 描述文本 -->
            <div class="desc">
              {{ $store.state.sceneryList[index].desc }}
            </div>
            <!-- 详情页按钮 -->
            <div @touchstart.stop="showScenery(index)" class="detailPage">
              <BottomPage></BottomPage>
            </div>
            <p>查看详情</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 右侧侧边栏 -->
    <div class="rightSidebar" :class="{ rightSidebarActive: ymIndex == 0 }">
      <!-- 侧边栏盒子 -->
      <ul class="sidebarBox">
        <!-- 首页 -->
        <li class="citiList" @touchstart.stop="changeIndex(0)">
          <div class="rightStyle">
            <div class="maxBox" :class="{ maxBoxActive: ymIndex == 0 }"></div>
            <div class="minBox" :class="{ minBoxActive: ymIndex == 0 }"></div>
          </div>
          <div class="cityTxet">首页</div>
        </li>
        <!-- 城市列表 -->
        <li
          class="citiList"
          v-for="(item, index) of $store.state.sceneryList"
          :key="item._id"
          @touchstart.stop="changeIndex(index + 1)"
        >
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
          <div class="cityTxet">
            {{ item.title }}
          </div>
        </li>
        <!-- 敬请期待 -->
        <li class="citiList">
          <div class="rightStyle">
            <div class="maxBox"></div>
            <div class="minBox"></div>
          </div>
          <div class="cityTxet">敬请期待</div>
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
import BottomDown from "@/components/BottomDown.vue";
import BottomPage from "@/components/BottomPage.vue";
import CityScenery from "@/components/CityScenery.vue";
export default {
  name: "World",
  data: () => {
    return {
      ymIndex: 0, //页面索引
      maxYs: 4, //最大页数
      time: 500, //页面跳转冷却时间
      state: true, //判断页面跳转是否冷却
      modeTime: 300, //快速换页与缓慢滑动的分界时间
      active: false, //判断页面是否激活跳转状态
      minDy: 10, //页面快速换页需要的最小位移值
      slide:false,//判断是否有滑动操作

      startX: 0, //触摸X坐标
      startY: 0, //触摸Y坐标
      moveX: 0, //移动X坐标
      moveY: 0, //移动Y坐标
      starTime: 0, //触摸开始时间
      endTime: 0, //触摸结束时间
      lateY: 0, //当前页面偏移量
      moveEndY: 0, //移动事件结束后页面偏移量
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

    //改变到特定页面
    changeIndex: function (index) {
      this.ymIndex = index;
      const centent = this.$refs.centent;
      let height = index * 100;
      centent.style.transform = `translate(0, -${height}vh)`;
      return false;
      // document.documentElement.scrollTop = height;
      // console.log("坐标点"+height);
    },
    // 触摸接触事件
    touchstart(e) {
      // 如果你要阻止点击事件，请反注释下一行代码
      // e.preventDefault()
      this.active = true;
      // 阻止页面滚动
      e.preventDefault();
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.starTime = new Date();
      // console.log("接触时间", this.starTime);

      // 获取对象偏移量
      let late = document.defaultView.getComputedStyle(
        document.getElementsByClassName("centent")[0],
        null
      ).transform;

      let lateData = late.replace(")", "").split(",");
      this.lateY = Number(lateData[lateData.length - 1]);
      // console.log("初始偏移量", this.lateY);

      this.$refs.centent.style.transitionDuration = "0ms";
    },
    // 触摸移动事件
    touchmove(e) {
      if (!this.active) {
        return;
      }
      // e.preventDefault()
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;
      // 获得鼠标偏移量
      let dY = this.moveY - this.startY;
      this.moveEndY = this.lateY + dY;
      this.$refs.centent.style.transform = `translateY(${this.moveEndY}px)`;
      this.slide=true;
      // console.log("移动中！结果偏移量为：", this.moveEndY);
    },
    touchend() {
      if (!this.active) {
        return;
      }
      if(!this.slide){
        this.$refs.centent.style.transitionDuration = "600ms";
        return;
      }
      this.endTime = new Date();
      let dY = Math.abs(this.moveY - this.startY);
      this.$refs.centent.style.transitionDuration = "600ms";
      let time = this.endTime - this.starTime;
      // console.log("时间：", time);
      // console.log("开始时Y值", this.startY);
      // console.log("结束时Y值", this.moveY);
      // console.log("位移：", dY);
      if (time <= this.modeTime && time >= 100 && dY >= this.minDy) {
        // console.log("快速换页");
        this.ymAuto();
      } else {
        // console.log("自动回复");
        this.autoHeight();
      }
      this.active = false;
      this.slide=false;
    },

    //缓慢拖动结束后，根据屏幕顶部位于文档的位置确定位置
    autoHeight: function () {
      let value = -this.moveEndY / window.innerHeight;
      // console.log("偏移量", this.lateY);
      // console.log("屏幕高", window.innerHeight);

      let a = Math.ceil(value - 0.5);
      if (a < 0) {
        a = 0;
      }
      if (a > this.maxYs - 1) {
        a = this.maxYs - 1;
      }
      // console.log("确定页数", a);
      this.changeIndex(a);
    },
    //快速滑动时，触发页面自动跳转
    ymAuto: function () {
      if (this.state === false) {
        return;
      }
      this.state = false;
      //  if (Math.abs(this.moveY - this.startY )<20) {
      //    console.log('滑动距离小，不触发换页');
      //    return;
      //  }
      let d;
      if (this.moveY - this.startY > 0) {
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
    // window.addEventListener("scroll", this.handleScroll, true);
    //释放鼠标时自动调节按钮
  },
  beforeDestroy: function () {
    // console.log("移除自动调节窗口");
    // window.removeEventListener("scroll", this.handleScroll, true);
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
  font: 400 rpx(26) / rpx(40) 微软雅黑;
  color: #fff;
}
.world {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // overflow-y: scroll;
  .centent {
    transform: translate(0, 0);
    transition: all 0.6s ease;
    .box {
      width: 100vw;
      height: 100vh;
    }
    .worldHome {
      background: url("https://ys.mihoyo.com/main/_nuxt/img/7589496.jpg")
        no-repeat center;
      background-size: cover;
      position: relative;
      .describe {
        width: rpx(650);
        position: absolute;
        top: 38%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img {
          display: block;
          margin: 0px auto;
          margin-bottom: 12px;
        }
        .homeTitle {
          width: rpx(500);
        }
        .yj {
          width: 100%;
        }
        p {
          text-align: center;
          color: #fff;
          font: 400 rpx(26) / rpx(40) 微软雅黑;
          text-shadow: 0 0 12px rgba(110, 159, 193, 0.36);
        }
      }
      .down {
        position: absolute;
        left: 50%;
        bottom: 20%;
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
          width: rpx(500);
          position: absolute;
          top: 14%;
          left: 50%;
          transform: translate(-50%);
          .icon {
            display: block;
            height: 15vh;
            margin: 10px auto;
          }
          .textBox {
            width: 100%;
            display: flex;
            margin: 0px auto;
            justify-content: center;
            .left,
            .right {
              width: rpx(300);
              margin: auto 0px;
            }
            .right {
              transform: rotate(180deg);
            }
            h1 {
              margin: 0px 20px;
              color: #fff;
              font-size: rpx(40);
            }
          }
          .desc {
            width: 100%;
            margin: 20px auto;
            text-align: center;
            font: 400 rpx(25) / rpx(44) 微软雅黑;
            color: #fff;
          }
          .detailPage {
            width: 52px;
            margin: 0px auto;
            margin-top: 40px;
            // margin-bottom: 10px;
          }
        }
      }
    }
  }
  .rightSidebar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    transition: all 0.6s ease-out;
    .sidebarBox {
      list-style: none;
      display: flex;
      .citiList {
        font: 400 rpx(26) / rpx(30) 微软雅黑;
        text-align: center;
        color: #fff;
        .cityTxet {
          height: rpx(32);
          width: rpx(125);
        }
        .rightStyle {
          margin: 0 auto;
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
        height: 1px;
        width: 100%;
        background: rgba(255, 255, 255, 0.2);
        top: 13px;
      }
    }
  }
  .rightSidebarActive {
    bottom: -50px;
  }
}
</style>
