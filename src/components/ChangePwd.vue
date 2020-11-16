<template>
  <div>
    <div  id="div1">
      <span id="span1">修改密码</span>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 24%;margin-left: 36%;margin-top: 4%" >
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" readonly="" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model.number="ruleForm.oldPwd"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
        name: "ChangePwd",
    data() {
      //    验证旧密码
      var checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }else {
          if (value != this.oldPwd) {
            console.log(value)
            callback(new Error('旧密码输入错误'));
          } else {
            callback();
          }
        }
      };
      //验证密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length <3){
          callback(new Error('密码不能小于3位'));
        }
        else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      //验证再次密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        }else if (value.length <3){
          callback(new Error('密码不能小于3位'));
        }
        else {
          callback();
        }
      };
      return {
        oldPwd:"",//旧密码
        userId:sessionStorage.getItem("userId"),
        ruleForm: {
          userName:sessionStorage.getItem("userName"),
          pass: '',//密码
          checkPass: '',//再次密码
          oldPwd: ''//旧密码
        },
        rules: {//表单验证
          pass: [//密码
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [//再次输出密码
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPwd: [//旧密码
            { validator: checkOldPwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('changeTeacherPwd/'+this.ruleForm.pass+'/'+this.userId).then(res =>{
              if(res.data){
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  offset:350
                });
                // alert('修改成功')
                this.resetForm('ruleForm')
                // location.reload()
              }else{
                this.$message({
                  message: '修改失败',
                  type: 'warning',
                  offset:350
                });
                // alert('修改失败')
              }
            })
          } else {
            this.$message({
              message: '提交失败',
              type: 'warning',
              offset:350
            });
            // console.log('error submit!!');
            return false;
          }
        });
      },
      //获取旧密码
      getPwd(){
        axios.get('getTeacherPwd/'+this.userId).then(res =>{
          this.oldPwd = res.data
          console.log(this.oldPwd);
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.getPwd();
    }
  }
</script>

<style scoped>
  #span1{
    font-size: 37px;
  }
  #div1{
    margin: 0;
    padding: 0;
    height: 90px;
    font-size: 30px;
    background-color: #F5F5F5;
    line-height:90px;
  }
</style>
