<template>
  <!-- 人物信息框  -->
  <div class="roleDataBox">
    <!-- 属性背景 -->
    <div class="back">
      <img :src="role.attr" alt="属性背景" class="backImg" />
    </div>
    <!-- 内容主体 -->
    <div class="centent">
      <!-- 横杠  -->
      <div class="rung"></div>
      <!-- 人物名 -->
      <div class="roleName">
        <img :src="role.name" alt="" class="nameImg" />
      </div>
      <!-- CV信息框 -->
      <div class="CV_Box">
        <audio class="audeoDom" ref="audeoDom">
          <source :src="audeoSrc" type="audio/mp3" />
          您的浏览器不支持播放此音频.
        </audio>
        <!-- 左侧装饰 -->
        <div class="backBox">
          <img src="../assets/人物/标注点1.jpg" alt="人名前装饰" class="left" />
          <!-- CV名 -->
          <div class="CV_Name">CV：{{ role.cv[CV_State].name }}</div>
          <!-- 声音播放框 -->
          <div
            class="audeoPlay"
            :class="{ audeoActive: audeoState === true }"
            @click="$_cvPlay"
          ></div>
        </div>
        <!-- 中日文切换 -->
        <div class="CV_Change" @click="$_chuangeCV">
          <span class="a1" :class="{ spanActiv: CV_State === 1 }">中</span>
          <span class="a2" :class="{ spanActiv: CV_State === 0 }">日</span>
        </div>
      </div>
      <!-- 介绍文本框 -->
      <div class="textBox">
        <!-- 左侧装饰 -->
        <div class="textLeft">
          <img src="../assets/人物/介绍文本前的标注.png" alt="" calss="" />
        </div>
        <!-- 文本 -->
        <div class="text">
          {{ role.intro }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoleDataBox",
  data() {
    return {
      CV_State: 0,
      index: 0,
      audeoState: false,
    };
  },
  methods: {
    $_cvPlay: function () {
      const audeoDom = this.$refs.audeoDom;
      this.audeoState = true;
      audeoDom.load();
      audeoDom.play();
      if (this.index < this.role.cv[this.CV_State].audio.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    },
    $_chuangeCV: function () {
      if (this.CV_State === 0) {
        this.CV_State = 1;
      } else {
        this.CV_State = 0;
      }
    },
  },
  computed: {
    role: function () {
      return this.$store.getters.nowRole;
    },
    audeoSrc: function () {
      return this.role.cv[this.CV_State].audio[this.index];
    },
  },
  mounted: function () {
    const audeoDom = this.$refs.audeoDom;
    audeoDom.onended = () => {
      this.audeoState = false;
    };
  },
};
</script>
<style scoped lang="scss">
.roleDataBox {
  position: relative;
  .back {
    position: absolute;
    top: -50px;
    left: -50px;
    opacity: 20%;
    img {
      width: 360px;
    }
  }
  .centent {
    position: relative;
    width: 550px;
    .rung {
      width: 180px;
      height: 4px;
      background-color: burlywood;
      margin-bottom: 20px;
    }
    .roleName {
      .nameImg {
      }
    }
    .CV_Box {
      height: 54px;
      display: flex;
      .audeoDom {
        display: none;
      }
      .backBox {
        height: 54px;
        display: flex;
        background-color: #cca574;
        box-shadow: 2px 2px 10px 1px rgba(54, 54, 54, 0.596);
        .left {
          height: 54px;
        }
        .CV_Name {
          width: 180px;
          font: 400 20px/54px 微软雅黑;
           overflow: hidden;
            height: 100%;
        }
        .audeoPlay {
          width: 54px;
          height: 54px;
          background: url("../assets/人物/麦克风.png") no-repeat;
          background-size: cover;
        }
        .audeoActive {
          background: url("../assets/人物/播放中.gif") no-repeat center;
          background-size: 140%;
        }
      }
    }
    .CV_Change {
      width: 80px;
      height: 32px;
      border: 2px solid rgba(255, 255, 255, 0.534);
      border-radius: 18px;
      position: relative;
      margin: auto 30px;
      background: #26343d62;
      span {
        display: block;
        color: #cca574;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        font: 400 22px/28px 微软雅黑;
        margin: 2px;
      }
      .spanActiv {
        background: #cca574;
      }
      .a2 {
        margin: 2px;
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }
    .textBox {
      display: flex;
      margin-top: 15px;
      background-color: rgba(0, 0, 0, 0.384);
      .textLeft {
        width: 50px;
        height: 60px;
      }
      img {
        margin: 20px 15px;
      }
      .text {
        width: 500px;
        font: 400 16px/26px 微软雅黑;
        color: azure;
      }
    }
  }
}
// 移动端界面
@media only screen and (max-width: 500px) {
  .roleDataBox {
    position: relative;
    .back {
      position: absolute;
      top: rpx(-60);
      left: rpx(-20);
      opacity: 20%;
      img {
        width: rpx(240);
      }
    }
    .centent {
      position: relative;
      width: rpx(284);
      .rung {
        width: rpx(140);
        height: rpx(4);
        background-color: burlywood;
        margin-bottom: rpx(8);
      }
      .roleName {
        .nameImg {
          width: rpx(536);
        }
      }
      .CV_Box {
        width: rpx(310);
        display: block;
        .audeoDom {
          display: none;
        }
        .backBox {
          height: rpx(70);
          position: relative;
          background-color: #cca574;
          box-shadow: 1px 1px 6px 1px rgba(54, 54, 54, 0.596);
          .left {
            height: rpx(70);
          }
          .CV_Name {
            overflow: hidden;
            height: 100%;
            position: absolute;
            top: 0;
            left: rpx(20);
            width: rpx(200);
            font: 400 rpx(28) / rpx(70) 微软雅黑;
            background-color: #cca574;
          }
          .audeoPlay {
            position: absolute;
            right: 0;
            top: 0;
            width: rpx(70);
            height: rpx(70);
            background: url("../assets/人物/麦克风.png") no-repeat;
            background-size: cover;
          }
          .audeoActive {
            background: url("../assets/人物/播放中.gif") no-repeat center;
            background-size: 140%;
          }
        }
      }
      .CV_Change {
        width: rpx(100);
        height: rpx(40);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: rpx(20);
        position: relative;
        margin: rpx(20) 0;
        background: #26343dc9;
        span {
          display: block;
          color: #cca574;
          width: rpx(36);
          height: rpx(36);
          border-radius: 50%;
          font: 400 rpx(28) / rpx(36) 微软雅黑;
          margin: rpx(2);
        }
        .spanActiv {
          background: #cca574;
        }
        .a2 {
          margin: rpx(2);
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }
      .textBox {
        display: none;
      }
    }
  }
}
</style>
