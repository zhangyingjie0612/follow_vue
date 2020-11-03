<template>
  <el-form  :model="loginForm" :rules="rules" class="login-page">
    <el-form-item label="用户名：" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="pwd">
      <el-input v-model="loginForm.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="loginForm.remember" class="rememberme">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="submitForm" :loading=false>登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "Login3",
      data(){
          return{
            loginForm:{
              username:'',
              pwd:'',
              remember:true,
            },
            rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],
            }
          }

      },
      methods:{
          submitForm(){
            alert("ok")
          }
      }
    }
</script>

<style scoped>
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
