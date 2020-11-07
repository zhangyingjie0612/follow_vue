<template>
  <el-form action="" style="margin-top: 20px">
    <table style="width: 1200px;height: 600px" align="center" :data="tableData">
      <tr><td colspan="7" style="font-size: x-large;font-weight: bolder">新增学生信息</td></tr>
      <tr>
        <td style="font-weight: bolder;width: 120px">姓名</td>
        <td width="200"><input type="text" v-model="tableData.stuName"></td>
        <td style="font-weight: bolder;width: 200px">性别</td>
        <td width="200"><input type="text" v-model="tableData.sex"></td>
        <td style="font-weight: bolder;width: 200px">民族</td>
        <td width="200"><input type="text" v-model="tableData.nation"></td>
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
        <td style="font-weight: bolder">出生年月</td>
        <td>
          <el-date-picker
            v-model="tableData.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生日期">
          </el-date-picker>
        </td>
        <td style="font-weight: bolder">籍贯</td>
        <td><input type="text" v-model="tableData.birthplace"></td>
        <td style="font-weight: bolder">婚否</td>
        <td><input type="text" v-model="tableData.marry"></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">联系电话</td>
        <td><input type="text" v-model="tableData.telephone"></td>
        <td style="font-weight: bolder">身份证号码</td>
        <td colspan="3"><input type="text" v-model="tableData.idcard"></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">毕业院校</td>
        <td><input type="text" v-model="tableData.university"></td>
        <td style="font-weight: bolder">专业</td>
        <td colspan="3"><input type="text" v-model="tableData.major"></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">入职时间</td>
        <td></td>
        <td style="font-weight: bolder">班期</td>
        <td><el-select
          v-model="tableData.className"
          placeholder="请选择班期"
          maxlength="255">
          <el-option
            v-for="item in selectOptionsAll"
            :key="item.id"
            :value="item.className">{{item.className}}
          </el-option>
        </el-select>
        </td>
        <td style="font-weight: bolder">部门名称</td>
        <td></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">职位</td>
        <td></td>
        <td style="font-weight: bolder">备注</td>
        <td colspan="4"><input type="text" v-model="tableData.note"></td>
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
          jobtime:''
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
  table, td {
    border: 2px solid #cccccc;
    border-collapse: collapse;
    padding-left: 10px;
  }
  input{
    height: 100%;
    width: 95%;
    border: none;
  }
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
    margin-left: 20px;
  }
</style>
