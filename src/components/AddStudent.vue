<template>
  <el-form action="" style="margin-top: 20px">
    <table style="width: 1200px;height: 600px" align="center" :data="tableData">
      <tr><td colspan="4" style="font-size: x-large;font-weight: bolder">新增学生信息</td></tr>
      <br><br>
      <tr>
        <td>
          <el-form-item label="姓名" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.stuName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="性别" :label-width="formLabelWidth" :required="true">
            <el-radio v-model="tableData.sex" label="男">男</el-radio>
            <el-radio v-model="tableData.sex" label="女">女</el-radio>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="民族" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.nation" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td rowspan="5" width="300px">
          <div class="photo">
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
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="出生年月" :label-width="formLabelWidth" :required="true">
            <el-date-picker
              v-model="tableData.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择出生日期">
            </el-date-picker>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="籍贯" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.birthplace" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="婚否" :label-width="formLabelWidth" :required="true">
            <el-radio v-model="tableData.marry" label="未婚">未婚</el-radio>
            <el-radio v-model="tableData.marry" label="已婚">已婚</el-radio>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="联系电话" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.telephone" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="身份证号码" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.idcard" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="毕业院校" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.university" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="专业" :label-width="formLabelWidth" :required="true">
            <el-input v-model="tableData.major" placeholder="请输入内容"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
            <el-input :disabled="true"></el-input>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="班期" :label-width="formLabelWidth" :required="true">
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
    <el-button type="primary" @click="goToSubmit()">提交</el-button>
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
        tableData: [],
        selectOptionsAll:[],
        imageUrl: '',
        imgPath: '',
        addData:{
          stuId:'',
          stuName:'',
          sex:'',
          nation:'',
          birthday:'',
          birthplace:'',
          marry:'',
          telephone:'',
          idCard:'',
          university:'',
          major:'',
          photo:'',
          note:'',
          state:'',
          className:'',
          deptName:'',
          job:'',
          jobtime:'',
        },
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
        console.log(file)
        console.log(this.imgPath)
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
      goToSubmit(){
        console.log(this.tableData.length)
        this.tableData.photo=this.imgPath
        if(undefined===this.tableData.note||""===this.tableData.note){
          this.tableData.note=null
        }
        axios.get('/toAddStudent/'+this.tableData.stuName+'/'+this.tableData.sex+'/'+this.tableData.nation+'/'+this.tableData.birthday
          +'/'+this.tableData.birthplace +'/'+this.tableData.marry+'/'+this.tableData.telephone+'/'+this.tableData.idcard+'/' +this.tableData.university +'/'
          +this.tableData.major+'/'+this.tableData.photo +'/'+this.tableData.note+'/'+this.tableData.className).then(res => {
          if(res.data){
            alert("新增成功")
            location.reload()
          }else{
            alert("新增失败")
          }
        })
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
    height: 230px;
    line-height: 230px;
    text-align: center;
    margin-top: 30px;
  }
  .avatar {
    width: 230px;
    height: 230px;
    display: block;
  }
  .photo{
    position: relative;
    border: 1px dashed #d9d9d9;
    width: 230px;
    height: 300px;
    line-height: 230px;
    margin-left: 60px;
  }
</style>
