<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Banner名称">
        <el-input v-model="banner.title" placeholder="Banner名称(随便填写)"/>
      </el-form-item>

      <el-form-item label="Banner链接">
        <el-input v-model="banner.linkUrl" placeholder="Banner跳转链接(例: /course)"/>
      </el-form-item>

      <el-form-item label="Banner排序">
        <el-input-number v-model="banner.sort" :min="0" :max="20" controls-position="right"/>
      </el-form-item>


      <el-form-item label="Banner轮播图" style="margin-top: 20px">

        <template slot-scope="scope">
          <el-upload
            class="avatar-uploader"
            :action="BASE_API+'/educos/filecos'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img :alt="banner.title" v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar" style="width: 500px; height: 300px" title="点击更换">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>

        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/educos/filecos'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="addBanner()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import banner from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: {
        title: '',
        linkUrl: '',
        imageUrl: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/cms/2019/11/14/297acd3b-b592-4cfb-a446-a28310369675.jpg',
        sort: 0,
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 默认上传的组件是否显示
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.BASE_API// 获取dev.env.js端口号
    }
  },

  methods: {

    handleAvatarSuccess(res, file) {
      console.log("============上传文件=============")
      console.log("res = ",res)
      console.log("file = ",file)
      console.log("res = ",res.data.url)

      this.banner.imageUrl = res.data.url
    },

    beforeAvatarUpload(file) {
      const isFormat = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isFormat) {
        this.$message.error('上传头像图片只能是 jpg/jpeg/png 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isFormat && isLt10M;
    },

    // 关闭上传弹窗
    close() {
      this.imagecropperShow = false
      // 解决上传完图片重新上传需要点两次，将id+1
      this.imagecropperKey += 1
    },

    // 上传成功方法
    cropSuccess(data) {
      // 关闭弹窗
      this.imagecropperShow = false
      // 上传之后接口返回图片地址
      this.banner.imageUrl = data.url
      // 解决上传完图片重新上传需要点两次，将id+1
      this.imagecropperKey += 1
    },

    // 添加讲师的方法
    addBanner() {
      banner.addBanner(this.banner)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/banner/list' })
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
