<template>
<!--  <div  v-if="bannerList!==[]" style="margin-top: 50px; margin-bottom: 50px">-->
<!--  <el-carousel :interval="4000" type="card" height="300px">-->
<!--    <el-carousel-item v-for="banner in bannerList" :key="banner.id">-->
<!--      <div class="demo-image__placeholder">-->
<!--        <div class="block">-->

<!--          <el-image :src="banner.imageUrl" @click="" :fit="fit" style="width: 700px; height: 500px">-->
<!--            <div slot="placeholder" class="image-slot">-->
<!--              加载中<span class="dot">...</span>-->
<!--            </div>-->
<!--          </el-image>-->

<!--        </div>-->
<!--      </div>-->
<!--    </el-carousel-item>-->
<!--  </el-carousel>-->
<!--  </div>-->

  <div  v-if="bannerList!==[]" style="margin-top: 50px; margin-bottom: 50px">
    <el-carousel :interval="4000" type="card" >
      <el-carousel-item v-for="banner in bannerList" :key="banner.id">
        <div class="demo-image__placeholder">
          <div class="block">
            <a target="_blank" :href="banner.linkUrl">
              <el-image
                :src="banner.imageUrl"
                :href="banner.linkUrl"
                fit="fit" style="position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;margin:auto;">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </a>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import banner from '@/api/edu/banner'

export default {
  data() {
    return {
      bannerList: [],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  created() {
    this.getAllBanner()
  },
  methods: {
    getAllBanner() {
      banner.getAllBanner()
        .then(response => {
          console.log("===========获取全部轮播图=========")
          console.log(response.data)
          this.bannerList = response.data.list
        })
    }

  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
