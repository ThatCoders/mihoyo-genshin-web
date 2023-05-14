<template>
  <!-- 任务选择框  -->
  <div class="roleListBox">
    <!-- 左按钮 -->
    <div class="toLeft" @click="redRoleIndex"></div>
    <!-- 任务头像列表框 -->
    <div class="headPortrait" ref="headBox">
      <ul ref="ruleUlDom" class="roleUl">
        <!-- @mousedown="move" -->
        <!-- 头像框 -->
        <li
          class="headBox"
          v-for="(item, index) of role"
          :key="index"
          :class="{ headBoxActive: index === roleIndex }"
          @click="chuangeRoleIndex(index)"
        >
          <!-- 头像 -->
          <img
            :src="item.icon"
            alt="头像"
            class="headImg"
            :class="{ headImgActive: index === roleIndex }"
          />
          <!-- 姓名标注 -->
          <p class="roleNmae_" :class="{ roleNmae_Activ: index === roleIndex }">
            {{ item.title }}
          </p>
        </li>
      </ul>
    </div>
    <!-- 右按钮 -->
    <div class="toRight" @click="addRoleIndex"></div>
  </div>
</template>
<script>
export default {
  name: "RoleListBox",
  data() {
    return {
      moveIndex: 3, //选择框焦点维持在当前角色列表框的位置
    };
  },
  methods: {
    //拖拽头像框改变距离
    // move() {
    //   // let late = document.defaultView.getComputedStyle(
    //   //   document.getElementsByClassName("roleUl")[0],
    //   //   null
    //   // ).transform;

    //   // let lateData = late.replace(")", "").split(",");
    //   // let lateX=lateData[lateData.length-2];
    //   // console.log(lateX);
    //   console.log("触发按下");
    //   document.onmousemove = () => {
    //    console.log("触发移动");
    //     document.onmouseup = () => {
    //       //鼠标按下并移动的事件
    //       document.onmousemove = null;
    //       document.onmouseup = null;
    //     };
    //   };
    // },
    //改变当然人物序号特定值
    chuangeRoleIndex(value) {
      this.$emit("changeImg");
      setTimeout(() => {
        this.$store.commit("chuangeRoleIndex", value);
        this.$emit("changeImg");
      }, 200);
    },
    //人物序号自增
    addRoleIndex() {
      this.$emit("changeImg");
      setTimeout(() => {
        if (this.roleIndex < this.role.length - 1) {
          this.$store.commit("addRoleIndex");
        } else {
          this.chuangeRoleIndex(0);
        }
        this.$emit("changeImg");
      }, 200);
    },
    //人物序号自减
    redRoleIndex() {
      this.$emit("changeImg");
      setTimeout(() => {
        if (this.roleIndex > 0) {
          this.$store.commit("redRoleIndex");
        } else {
          this.chuangeRoleIndex(this.role.length - 1);
        }
        this.$emit("changeImg");
      }, 200);
    },
  },
  computed: {
    roleIndex: function () {
      return this.$store.state.roleIndex;
    },
    role: function () {
      return this.$store.state.roleList[this.$store.state.role_cityIndex].role;
    },
  },
  mounted: function () {},
  updated: function () {
    // 判断是否位于移动端
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // console.log("执行移动端代码！");
      // 移动端JS代码
      let d = 0;
      if (this.roleIndex > this.moveIndex - 1) {
        d = ((this.roleIndex - (this.moveIndex - 1)) * 128) / 7.5;
      }
      if (this.roleIndex > this.role.length - 3) {
        d = ((this.role.length - 5) * 128) / 7.5;
      }
      d = d + "vw";
      // d = `rpx(-${d})`;
      // console.log("移动距离为：", d);
      const ruleUlDom = this.$refs.ruleUlDom;
      ruleUlDom.style = `transform: translateX(-${d})`;
      return;
    }
    // 电脑端代码
    let d = 0;
    if (this.roleIndex > this.moveIndex - 1) {
      d = (this.roleIndex - (this.moveIndex - 1)) * 144;
    }
    if (this.roleIndex > this.role.length - 4) {
      d = (this.role.length - 6) * 144;
    }
    d = d + "px";
    const ruleUlDom = this.$refs.ruleUlDom;
    ruleUlDom.style = `transform: translateX(-${d})`;
  },
};
</script>
<style lang="scss" scoped>
.roleListBox {
  width: 1000px;
  display: flex;
  .toLeft {
    width: 45px;
    height: 64px;
    background: url("../assets/人物/左.png") no-repeat;
    background-size: cover;
    margin: auto 0px;
  }
  .toRight {
    width: 45px;
    height: 64px;
    background: url("../assets/人物/右.png") no-repeat;
    background-size: cover;
    margin: auto 0px;
  }
  .headPortrait {
    width: 830px;
    overflow: hidden;
    margin: 0px 40px;
    .roleUl {
      display: flex;
      list-style: none;

      transform: translateX(0px);
      transition: all 0.5s ease;

      .headBox {
        width: 110px;
        background-color: rgba(255, 255, 255, 0);
        margin-right: 34px;
        border-radius: 5px;
        .headImg {
          margin: 2px 2px 0px 2px;
          display: block;
          width: 106px;
          background-image: linear-gradient(
            150deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.4) 60%,
            rgba(158, 158, 158, 1) 100%
          );
        }
        .headImgActive {
          background-image: linear-gradient(
            150deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 60%,
            rgba(158, 158, 158, 1) 100%
          );
        }
        .roleNmae_ {
          margin: 0 2px;
          margin-bottom: 2px;
          font: 400 18px/22px 微软雅黑;
          text-align: center;
          color: rgb(255, 255, 255);
          background-color: rgba(0, 0, 0, 0.55);
        }
        .roleNmae_Activ {
          color: rgb(0, 0, 0);
          background-color: rgba(255, 255, 255, 1);
        }
      }
      .headBox:hover {
        background-color: rgba(255, 255, 255, 1);
      }
      .headBox:hover .headImg {
        background-image: linear-gradient(
          150deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 1) 60%,
          rgba(158, 158, 158, 1) 100%
        );
      }
      .headBox:hover .roleNmae_ {
        color: rgb(0, 0, 0);
        background-color: rgba(255, 255, 255, 1);
      }
      .headBoxActive {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  .roleListBox {
    display: flex;
     width: rpx(640);
     position: relative;
    .toLeft {
      display: none;
      // 移动端显示方案
      // position: absolute;
      // bottom:80px;
      // left: rpx(-44);
      // width: rpx(90);

      // height: rpx(128);
      // background: url("../assets/人物/左.png") no-repeat;
      // background-size: 100% 100%;
      // margin: auto 0px;
      // z-index: 2;
    }
    .toRight {
      display: none;
      // position: absolute;
      // bottom:80px;
      // right: rpx(-44);
      // width: rpx(90);

      // height: rpx(128);
      // background: url("../assets/人物/右.png") no-repeat;
      // background-size: 100% 100%;
      // margin: auto 0px;
    }
    .headPortrait {
      width: rpx(640);
      overflow: hidden;
      margin: 0px;
      .roleUl {
        display: flex;
        list-style: none;

        transform: translateX(0px);
        transition: all 0.5s ease;

        .headBox {
          width: rpx(128);
          // height: rpx(168);
          border-radius: rpx(4);
          perspective: 40px;
          margin: 0;
          transition: all 0.5s ease;
          .headImg {
            margin: 0 rpx(2);
            margin-top: rpx(2);
            transform: translateZ(-4px);
            display: block;
            width: rpx(124);
            background-image: linear-gradient(
              150deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.4) 60%,
              rgba(158, 158, 158, 1) 100%
            );
            transition: all 0.5s ease;
          }
          .headImgActive {
            background-image: linear-gradient(
              150deg,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 60%,
              rgba(158, 158, 158, 1) 100%
            );
            transform: translateZ(0);
            // transition: all 0.5s ease;
          }
          .roleNmae_ {
            margin: rpx(2);
            margin-top: 0;
            transform: translateZ(-4px);
            font: 400 rpx(24) / rpx(36) 微软雅黑;
            text-align: center;
            color: rgb(255, 255, 255);
            background-color: rgba(0, 0, 0, 0.55);
            transition: all 0.5s ease;
          }
          .roleNmae_Activ {
            color: rgb(0, 0, 0);
            background-color: rgba(255, 255, 255, 1);
            transform: translateZ(0);
            // transition: all 0.5s ease;
          }
        }
        .headBoxActive {
          background-color: rgba(255, 255, 255, 1);
          // transition: all 0.5s ease;
        }
      }
    }
  }
}
</style>
