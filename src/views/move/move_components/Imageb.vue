<template>
  <div class="imageBox">
    <img
      :src="src"
      alt=""
      calss="imgBox"
      ref="image"
      :id="'imgBox'+index"
      style="width: 100vw; height: 100vw"
    />
  </div>
</template>
<script>
export default {
  name: "Imageb",
  data() {
    return {
      src: "",
    };
  },
  props: {
    dataSrc: String,
    index:Number,
  },
  watch:{
    dataSrc:function(){
      this.func();
    }
  },
  methods: {
    //   对src进行赋值
    changeSrc() {
      // console.log("对图片进行赋值！");
      this.src = this.dataSrc;
    },
    // 图片长宽自适应
    imgHrightAuto() {
      // console.log("修改图片宽度！");
      const image = this.$refs.image;
      image.style.height = "auto";
    },
    //注册触发事件
    func() {
      const imgDom = document.querySelector("#imgBox"+this.index);
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio > 0) {
          this.changeSrc();
          this.imgHrightAuto();
          // console.log("可见比例：", entries[0].intersectionRatio);
          observer.unobserve(imgDom);
        }
      });
      observer.observe(imgDom);
    },
  },
  mounted() {
    this.func();
  },
  // updated() {
  //   this.func();
  // },
};
</script>
<style lang="scss" scoped>
.imageBox {
  .imgBox {
    width: 100vw;
    height: 100vw;
  }
}
</style>
