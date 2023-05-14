<template>
  <!-- 主体 -->
  <div class="footerContent">
    <!-- 图标 -->
    <div class="icon">
      <div class="mihoyo"></div>
      <span></span>
      <div class="ys"></div>
    </div>
    <!-- 法律信息 -->
    <div class="siteinfoLegar">
      <div class="lawText">
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=沪公网安备31010402001113号"
          >沪公网安备31010402001113号
        </a>
      </div>
      <div class="lawText">增值电信业务经营许可证：沪B2-20190555</div>
      <div class="lawText">
        <a href="">沪ICP备19018275号-4</a>
      </div>
      <div class="lawText">沪网文〔2019〕3168-216号</div>
      <div class="lawText">国新出审【2019】2978号</div>
      <div class="lawText">未成年成长关爱热线：021-60371740</div>
      <div class="lawText">
        © 2020 米哈游版权所有<span>|</span>上海米哈游影铁科技有限公司
      </div>
      <div class="lawText">客服电话：400-666-6312</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveFooter",
  data: () => {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footerContent {
  background-color: rgb(15, 15, 15);
  padding: 20px 0;
}
.icon {
  display: flex;
  height: rpx(128);
  justify-content: center;
  span {
    width: 1px;
    height: rpx(60);
    background-color: rgb(212, 212, 212);
    font-size: rpx(60);
    margin: auto rpx(40);
  }
  .mihoyo {
    width: rpx(170);
    height: rpx(60);
    background: url("../../../assets/米哈游LOGO.png") no-repeat;
    background-size: contain;
    margin: auto 0px;
  }
  .ys {
    width: rpx(160);
    height: rpx(116);
    background: no-repeat url("../../../assets/原神LOGO_move.png");
    background-size: contain;
    margin: auto 0px;
  }
}

.siteinfoLegar {
  color: #aaa;
  font: 400 rpx(24) / rpx(48) "微软雅黑";
text-align: center;
}
.siteinfoLegar a {
  text-decoration: none;
}
.siteinfoLegar span {
  margin: 0px rpx(20);
}

.lawText a:link,
.lawText a:visited {
  color: #aaa;
}
</style>
