<template>
  <div>
    <div id="asd">
      <el-upload
        class="avatar-uploader"
        name="picture"
        action="http://localhost:8080/up/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button type="primary" @click="multiDelete">确 定</el-button>
    </div>
    <!--            action="https://jsonplaceholder.typicode.com/posts/"
    -->
    <!--    action="http://localhost:8080/up/"-->

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Test",
    data() {
      return {
        imageUrl: '',
        imgPath:''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imgPath=file.response
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      multiDelete(){
        console.log(this.imgPath)
        axios.get('/savephoto/'+this.imgPath).then(res => {
          this.empData = res.data;
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px  #d9d9d9;
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
  #asd{
    border: 1px dashed #d9d9d9;
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
</style>
