<template>
  <div class="tc">
    <span class="upLoadImgBt">点击上传
    <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage">
    <img :src="image" class="upLoadImg">
    </span>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Test",
    data(){
      return{
        cacheImg:"",//头像提交本地地址
        image:"",//图片加载完成地址
      }
    },
    methods:{
      //头像提交
      uploadImg(event){
        let param = new FormData(); // 创建form对象
        param.append("image", this.cacheImg);// 通过append向form对象添加数据
        param.append("v",10);// 添加form表单中其他数据
        param.append("c",'Bm');// 添加form表单中其他数据
        param.append("a",'saveImg');// 添加form表单中其他数据
        console.log(param);
        console.log(param.get('image')); // FormData可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }// 添加请求头(如需要更改头部请求)
        axios.post('/upload/', param, config).then(response => {
          if (response.data.status==1) {
            this.image = response.data.data.src;
            console.log(this.image);
          }else{
            //错误提示
          }
        })
      },
      //头像提交完毕后回显
      changeImage(event) {
        var files = event.target.files;
        var reader = new FileReader();
        reader.addEventListener('load', () => {
          this.image = reader.result;
        });
        reader.readAsDataURL(files[0]);
        this.cacheImg = files[0];
        console.log(this.image);
        console.log(this.cacheImg);
        this.uploadImg();
      },
    }
  }
</script>

<style scoped>
  .upLoadImg{display:block;margin:0 auto;max-width:80%;height:auto;background:#99D3F5;color:#1E88C7;}
  .upLoadImgBt{position:relative;display:block;background:#D0EEFF;border:.1rem solid #99D3F5;border-radius:.5rem;overflow:hidden;color:#1E88C7;font-size:1.4rem;line-height:3.8rem;box-sizing:border-box;}
  .upLoadImgBt input{position:absolute;right:0;top:0;left:0;bottom:0;opacity:0;display:block;width:100%;}

</style>
