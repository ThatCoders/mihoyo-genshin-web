<template>
  <div class="cityList">
    <ul>
      <li
        class="cityBox"
        v-for="(item, index) of cityList"
        :key="item._id"
        @click="chuangeRole_cityIndex(index)"
        :class="{ liActive: index === cityIndex }"
      >
        <p class="pBox" :class="{ pActive: index === cityIndex }">
          {{ item.title }}
        </p>
      </li>
      <li class="cityBox"><p class="pBox">敬请期待</p></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "CityList",
  data: () => {
    return {};
  },
  methods: {
    chuangeRole_cityIndex: function (value) {
      this.$store.commit("chuangeRole_cityIndex", value);
      this.$store.commit("chuangeRoleIndex", 0);
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
<style scoped>
.cityList {
  height: 100vh;
  width: 370px;
}
.cityList ul {
  margin-top: 200px;
  list-style: none;
}
.cityList ul::before {
  display: block;
  content: "";
  height: 100vh;
  width: 2px;
  background-color: rgba(250, 250, 250, 0.1);
  position: absolute;
  top: 0;
  left: 37px;
}
.cityBox {
  width: 100%;
  height: 54px;
  font: 400 18px/54px 微软雅黑，宋体;
  color: white;
  background: url("../assets/人物/城市未激活.png") no-repeat 18px;
}
.pBox {
  margin-left: 50px;
}
.liActive {
  background: url("../assets/人物/城市激活.png") no-repeat 0px;
}
.pActive {
  margin-left: 70px;
}
</style>
