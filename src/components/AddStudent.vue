<template>
  <el-form style="margin-top: 20px" :model="tableData" status-icon :rules="rules" ref="tableData">
    <table style="width: 1300px;height: 600px" align="center">
      <tr><td colspan="4" style="font-size: x-large;font-weight: bolder;height: 80px">新增学生信息</td></tr>
      <tr>
        <td>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="stuName">
            <el-input v-model="tableData.stuName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td width="350">
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio v-model="tableData.sex" label="男">男</el-radio>
            <el-radio v-model="tableData.sex" label="女">女</el-radio>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="民族" :label-width="formLabelWidth" prop="nation">
            <el-input v-model="tableData.nation" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td rowspan="5" width="300px">
          <div class="photo">
            <el-upload
              class="avatar-uploader"
              name="picture"
              action="http://localhost:8080/upload/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="出生年月" :label-width="formLabelWidth" prop="birthday">
            <el-date-picker
              v-model="tableData.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择出生日期">
            </el-date-picker>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="籍贯" :label-width="formLabelWidth" prop="birthplace">
            <el-input v-model="tableData.birthplace" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="婚否" :label-width="formLabelWidth" prop="marry">
            <el-radio v-model="tableData.marry" label="未婚">未婚</el-radio>
            <el-radio v-model="tableData.marry" label="已婚">已婚</el-radio>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="联系电话" :label-width="formLabelWidth" prop="telephone">
            <el-input v-model="tableData.telephone" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idcard">
            <el-input v-model="tableData.idcard" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="university">
            <el-input v-model="tableData.university" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
            <el-input v-model="tableData.major" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
            <el-input :disabled="true"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="班期" :label-width="formLabelWidth" prop="className">
            <el-select
              v-model="tableData.className"
              placeholder="请选择班期"
              maxlength="255">
              <el-option
                v-for="item in selectOptionsAll"
                :key="item.id"
                :value="item.className">{{item.className}}
              </el-option>
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input :disabled="true"></el-input>
          </el-form-item>
        </td>
        <td colspan="2">
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input :disabled="true"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="tableData.note"></el-input>
          </el-form-item>
        </td>
      </tr>
    </table>
    <br><br>
    <el-button type="primary" @click="goToSubmit('tableData')">提交</el-button>
    <el-button @click="resetForm()">重置</el-button>
    <el-button @click="returnList()">返回</el-button>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AddStudent",
    data() {
      return {
        formLabelWidth:"100px",
        tableData: {
          stuName:'',
          sex:'',
          nation:'',
          birthday:'',
          birthplace:'',
          marry:'',
          telephone:'',
          idcard:'',
          university:'',
          major:'',
          photo:'',
          note:'',
          className:''
        },
        selectOptionsAll:[],
        imageUrl: '',
        imgPath: '',
        rules: {
          stuName: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' }
          ],
          sex:[
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          nation:[
            { required: true, message: '请输入民族', trigger: 'blur' }
          ],
          birthday:[
            {required: true, message: '请选择出生日期', trigger: 'change'}
          ],
          birthplace:[
            { required: true, message: '请输入籍贯', trigger: 'blur' }
          ],
          marry:[
            { required: true, message: '请选择婚姻状况', trigger: 'change' }
          ],
          telephone:[
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { pattern: /^1[3|4|5|6|7|8][0-9]{9}$/, message: '输入的格式不正确', trigger: 'blur' }
          ],
          idcard:[
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '请输入正确的格式', trigger: 'blur' }
          ],
          university:[
            { required: true, message: '请输入毕业院校', trigger: 'blur' }
          ],
          major:[
            { required: true, message: '请输入专业', trigger: 'blur' }
          ],
          className:[
            { required: true, message: '请选择班期', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      getClassName(){
        axios.get('/toGetClassName/').then(res => {
          this.selectOptionsAll = res.data
        })
      },
      //  图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgPath=file.response
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
      },
      goToSubmit(tableData){
        this.$refs[tableData].validate((valid) => {
          if (valid) {
            this.tableData.photo=this.imgPath
            axios.post('/toAddStudent/',this.tableData).then(res => {
              if(res.data){
                alert("新增成功")
                location.reload()
              }else{
                alert("新增失败")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(ruleForm) {
        location.reload()
      },
      returnList(){
        this.$router.push({path: "/studentInfoList"});
      }
    },
    mounted(){
      this.getClassName()
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #409EFF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 50px;
    color: #8c939d;
    width: 230px;
    height: 280px;
    line-height: 230px;
    text-align: center;
    margin-top: 30px;
  }
  .avatar {
    width: 230px;
    height: 280px;
    display: block;
  }
  .photo{
    position: relative;
    border: 1px dashed #d9d9d9;
    width: 230px;
    height: 280px;
    line-height: 230px;
    margin-left: 60px;
  }
</style>
