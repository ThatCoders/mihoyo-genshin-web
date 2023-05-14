<template>
  <div class="cityList">
    <ul v-show="topBoxShow">
      <li
        class="cityBox"
        v-for="(item, index) of cityList"
        :key="item._id"
        @click="chuangeRole_cityIndex(index)"
        :class="{ liActive: index === cityIndex }"
      >
        {{ item.title }}
      </li>
      <li class="cityBox">敬请期待</li>
    </ul>
    <div class="showBox" @click="chuangeTopShow">
      <div class="cityText">{{ cityList[cityIndex].title }}</div>
      <div class="state" :class="{stateActive:topBoxShow}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CityListMove",
  data: () => {
    return {
      topBoxShow: false,
    };
  },
  methods: {
    chuangeTopShow() {
      this.topBoxShow = !this.topBoxShow;
    },
    chuangeRole_cityIndex: function (value) {
      this.$store.commit("chuangeRole_cityIndex", value);
      this.$store.commit("chuangeRoleIndex", 0);
      this.chuangeTopShow();
    },
  },
  computed: {
    cityIndex: function () {
      return this.$store.state.role_cityIndex;
    },
    cityList: function () {
      return this.$store.state.cityList;
    },
  },
  created: function () {},
};
</script>
<style scoped lang="scss">
.cityList {
  color: white;
  position: relative;
  height: 50px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  .showBox {
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    .cityText {
    }
    .state {
      width: rpx(32);
      height: rpx(16);
      position: absolute;
      left: 65vw;
      top: 50%;
      transform: translate(0, -50%);
      background: no-repeat url("../../../assets/人物/城市状态.svg");
      background-size: 100% 100%;
      transition: all 0.2s linear;
    }
    .stateActive {
      transform: rotate(180deg);
    }
  }
  ul {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 18px 0;
    list-style: none;
    background-color: rgba(0, 0, 0, 0.9);
    text-align: center;

    .cityBox {
      width: 90vw;
      height: 36px;
      font: 400 20px/36px 微软雅黑，宋体;
      // background-color: rgba(0, 0, 0, 0.6);
    }
    .liActive {
      background-color: rgba(106, 208, 235, 0.6);
    }
  }
}
</style>
