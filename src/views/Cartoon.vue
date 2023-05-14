<template>
  <div class="cartoon">
    <div class="conter" v-show="!$store.state.manhuaShow">
      <div class="cartoomHeader">
        <div class="txteBox">
          <div class="textMain">
            <h1>漫画</h1>
            <p>这里是七种元素神灵信仰交汇的幻想世界提瓦特。</p>
            <p>
              席卷大陆的灾难终于停息，疮痍逐渐被抚平——本应到来的安宁却并没有如期光临风之城「蒙德」。
            </p>
            <p>
              飞扬跋扈的组织「愚人众」借着保护的名义欺压诸国，而来自历史之暗的不祥也在等待着复仇的机会……
            </p>
            <div class="buttomBox">
              <div class="buttom b1" @click="getList">
                继续阅读
                <!-- //记录界面 -->
                <div class="getIndex">
                  <div class="getTxte">
                    {{ manhuaList[$store.state.index_page[0]].title }}
                  </div>
                  <img
                    :src="manhuaList[$store.state.index_page[0]].src"
                    alt=""
                    class="getImg"
                  />
                </div>
              </div>
              <div class="buttom b2" @click="newList">重新开始</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <ul class="manhuaList">
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
      </div>
    </div>
    <div class="cartoonBox" v-if="$store.state.manhuaShow">
      <Manhua></Manhua>
    </div>
  </div>
</template>
<script>
import Manhua from "../components/Manhua.vue";
export default {
  name: "Cartoon",
  data: () => {
    return {};
  },
  computed: {
    manhuaList: function () {
      return this.$store.state.manhuaList;
    },
  },
  methods: {
    // 显示漫画特定集数
    manhuaShow: function (value) {
      this.$store.commit("changeManhuaIndex", value);
      this.$store.commit("changeManhuaPage", 0);
      this.$store.commit("changeManhuaShow", true);
    },
    //继续阅读
    getList: function () {
      this.$store.commit("changeManhuaIndex", this.$store.state.index_page[0]);
      this.$store.commit("changeManhuaPage", this.$store.state.index_page[1]);
      this.$store.commit("changeManhuaShow", true);
    },
    //重新开始
    newList: function () {
      this.$store.commit("changeManhuaIndex", 0);
      this.$store.commit("changeManhuaPage", 0);
      this.$store.commit("changeManhuaShow", true);
    },
  },
  beforeMount: function () {
    if (window.localStorage.getItem("index_page")) {
      this.$store.commit(
        "changeIndex_page",
        JSON.parse(window.localStorage.getItem("index_page"))
      );
    }
    console.log("记录为：");
    console.log(this.$store.state.index_page);
  },
  components: {
    Manhua,
  },
};
</script>
<style scoped lang="scss">
.cartoonBox {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 4;
}
.cartoon {
  position: relative;
  width: 100vw;
  min-width: 1300px;
  .conter {
    .cartoomHeader {
      width: 100%;
      /* width: 100vw; */
      height: 34vw;
      min-height: 442px;
      background: url("../assets/漫画/漫画简介背景.jpg") no-repeat center;
      background-size: cover;
      .txteBox {
        display: flex;
        width: 1300px;
        height: 100%;
        margin: 0px auto;
        .textMain {
          margin: auto 10px;
          h1 {
            font: 400 40px/80px 等线中文;
          }
          p {
            font: 900 16px/24px 微软雅黑;
            width: 600px;
          }
          .buttomBox {
            display: flex;
            position: relative;
            .buttom {
              margin: 20px 20px;
              height: 34px;
              width: 155px;
              text-align: center;
              border-radius: 4px;
              font: 400 16px/34px 微软雅黑;
              color: aliceblue;
            }
            .b1 {
              background-color: rgba(0, 174, 255, 0.6);
              margin-left: 0px;
              .getIndex {
                position: absolute;
                top: 64px;
                left: -15px;
                padding: 10px;
                background-color: aliceblue;
                text-align: center;
                border-radius: 4px;
                margin: 0px;
                color: black;
                display: none;
                transition: all 1s ease;
                .getTxte {
                  font: 400 16px/20px 宋体;
                }
                .getImg {
                  width: 160px;
                }
              }
            }
            .b1:hover .getIndex {
              display: block;
            }
            .b2 {
              background-color: rgba(0, 0, 0, 0.6);
            }
          }
        }
      }
    }
    .container {
      padding: 20px 0px;
      width: 100vw;
      min-width: 1300px;
      background: url("../assets/漫画/漫画列表背景.jpg") no-repeat top;
      background-size: cover;
      .manhuaList {
        width: 1280px;
        margin: 0px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .manhuaBox {
          perspective: 100px;
          background-color: black;
          position: relative;
          width: 304px;
          height: 171px;
          overflow: hidden;
          margin: 15px 0px;
          border-radius: 5px;
          box-shadow: 3px 3px 8px 2px rgba(48, 48, 48, 0.4);
          img {
            transition: all 0.5s ease;
            transform: translateZ(0px);
            opacity: 0.8;
          }
          .manhuaTitle {
            position: absolute;
            bottom: 0px;
            left: 0px;
            height: 36px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            font: 400 20px/36px 微软雅黑;
            text-align: center;
            color: aliceblue;
          }
        }
        .manhuaBox:hover img {
          transform: translateZ(15px);
          opacity: 1;
        }
      }
    }
  }
}
</style>
