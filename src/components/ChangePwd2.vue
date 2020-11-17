<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 24%;margin-left: 36%" >
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model.number="ruleForm.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
        name: "ChangePwd2",
    data() {
      var checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }else {
          if (value != this.oldPwd) {
            callback(new Error('旧密码输入错误'));
          } else {
            callback();
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length <3){
          callback(new Error('密码不能小于3位'));
        }
        else {
          if (this.ruleForm.checkPwd !== '') {
            this.$refs.ruleForm.validateField('checkPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        }else if (value.length <3){
          callback(new Error('密码不能小于3位'));
        }
        else {
          callback();
        }
      };
      return {
        oldPwd:"",
        userId:"0",
        ruleForm: {
          userName:"王芳",
          pwd: '',
          checkPwd: '',
          oldPwd: ''
        },
        rules: {
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPwd: [
            { validator: checkOldPwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('changeManagePwd/'+this.ruleForm.pwd+'/'+this.userId).then(res =>{
              if(res.data){
                alert("修改成功")
                location.reload()
              }else{
                alert("修改失败")
              }
            })
          } else {
            alert('提交失败');

            // console.log('error submit!!');
            return false;
          }
        });
      },
      getPwd(){
        axios.get('getManagePwd/'+this.userId).then(res =>{
          this.oldPwd = res.data
          console.log(this.oldPwd);
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      if (sessionStorage.getItem("userId")!=null){
        this.userId=sessionStorage.getItem("userId");
      }else {
        this.userId="1";
      }
      this.getPwd();
    }
  }
</script>

<style scoped>

</style>
