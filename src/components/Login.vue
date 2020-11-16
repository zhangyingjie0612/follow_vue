<template>
  <el-container>
    <el-aside width="70%">
      <img src="../assets/images/pic1.jpg"  height="710px" width="100%">
    </el-aside>
    <el-main width="26%">
      <div style="margin-top: 100px">
        <h1>金桥学员跟踪系统</h1>
      </div>
      <el-form :model="loginForm" :rules="rules" class="login-page">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
          <el-input type="password" v-model="loginForm.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember" class="remember1">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="submitForm" :loading=false>登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Login",
    data() {
      return {
        role:'',
        roleId: '',
        userId:'',
        loginForm: {
          userName: '',
          pwd: '',
          loginTime:''//随表单一起提交，在后端判断是否存改数据
        },
        remember: true,
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
        }
      }

    },
    methods: {
      //修改日期格式
      formatDate(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      },
      //设置cookie
      setCookie(userName, pwd, days) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + userName + ";path=/;expires=" + exdate.toString();
        window.document.cookie = "pwd" + "=" + pwd + ";path=/;expires=" + exdate.toString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] === 'userName') {
              //  console.log(arr2[1])
              this.loginForm.userName = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] === 'pwd') {
              // console.log(arr2[1])
              this.loginForm.pwd = arr2[1];
            }
          }
        }
      },

      //清除cookie
      clearCookie: function () {
        this.setCookie(this.loginForm.userName,this.loginForm.pwd, -1); //修改2值都为空，天数为负1天就好了
      },
      //点击登录按钮
      submitForm() {
        var today = new Date();
        var today2 = this.formatDate(today);
        this.loginForm.loginTime=today2;
        axios.post("/user/getLogin", this.loginForm).then(res => {
          if (null == res.data) {
            this.$message({
              message: '用户名或密码错误！',
              type: 'fail'
            });
          } else {
            if (this.remember == true) {
              this.setCookie(this.loginForm.userName,this.loginForm.pwd,7);
            }else {
              this.clearCookie();
            }

            this.userId = res.data.userId;
            this.roleId = res.data.roleId;
            //主页面要求存的数据
            sessionStorage.setItem("userId",this.userId);
            if (this.roleId==0){
              this.role = "管理员"
            }else if (this.roleId==0){
              this.role = "讲师"
            }else {
              this.role = "项目经理"
            }
            sessionStorage.setItem("role",this.role);
            sessionStorage.setItem("userName",this.loginForm.userName);
            if(this.roleId==0){
              sessionStorage.setItem("activeIndex","/followMenu/studentlist");
              this.$router.push({path:"/followMenu/studentlist"})
            }else if (this.roleId==1) {
              sessionStorage.setItem("activeIndex","/followMenu/tStudentList");
              this.$router.push({path:"/followMenu/tStudentList"})
            }else{
              sessionStorage.setItem("activeIndex","/followMenu/tStudentList");//项目经理跳转的主页
              this.$router.push({path:"/followMenu/tStudentList"})//项目经理跳转的主页
            }
          }
        })
      }
    },
    //页面加载调用获取cookie值
    mounted() {
      this.getCookie();
    }
  }
</script>

<style scoped>
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 50px;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.remember1 {
    margin: 0px 0px 15px;
    text-align: left;
  }

</style>
