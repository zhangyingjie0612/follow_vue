<template>
  <div>
    <el-table
      :data="tableData"
      height="650"
      border
      @selection-change="handleSelectionChange"
      style="width: 80%;margin-left: 10%;margin-top: 2%">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">学员基本信息</span>
          <div style="float: right;margin-right: 45px">
            <el-input placeholder="输入姓名" v-model="filters.f1" style="width: 200px"></el-input>
            <el-input placeholder="输入部门名称" v-model="filters.f2" style="width: 200px"></el-input>
            <el-input placeholder="输入职位" v-model="filters.f3" style="width: 200px"></el-input>
            <el-button size="small" icon="el-icon-search" circle @click="refreshList()"></el-button>
            <el-button size="small" type="primary" icon="el-icon-plus" circle @click="handleAdd()"></el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="multiDeleteVisible=true"></el-button>
            <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
              <span>确定要删除吗</span>
              <span slot="footer">
                <el-button type="primary" @click="delStudents();multiDeleteVisible=false">确 定</el-button>
                <el-button @click="multiDeleteVisible=false">取消</el-button>
              </span>
            </el-dialog>
          </div>
        </template>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="60">
        </el-table-column>
        <el-table-column
          prop="university"
          label="毕业院校"
          width="150">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班期"
          width="130">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="部门"
          width="180">
        </el-table-column>
        <el-table-column
          prop="job"
          label="职位"
          width="180">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"
                       @click="dialogTableVisible = true;handleLook(scope.$index, scope.row)">查看
            </el-button>
            <el-dialog title="学员详细信息" :visible.sync="dialogTableVisible" width="1300px">
              <table style="width: 1200px;height: 400px" align="center">
                <tr>
                  <td style="font-weight: bolder;width: 120px">姓名</td>
                  <td width="200">{{aData.stuName}}</td>
                  <td style="font-weight: bolder;width: 130px">性别</td>
                  <td width="200">{{aData.sex}}</td>
                  <td style="font-weight: bolder;width: 130px">民族</td>
                  <td width="200">{{aData.nation}}</td>
                  <td rowspan="5" width="255px"><img  v-if="aData.photo" :src="aData.photo" class="avatar"></td>
                </tr>
                <tr>
                  <td style="font-weight: bolder">出生年月</td>
                  <td>{{aData.birthday}}</td>
                  <td style="font-weight: bolder">籍贯</td>
                  <td>{{aData.birthplace}}</td>
                  <td style="font-weight: bolder">婚否</td>
                  <td>{{aData.marry}}</td>
                </tr>
                <tr>
                  <td style="font-weight: bolder">联系电话</td>
                  <td>{{aData.telephone}}</td>
                  <td style="font-weight: bolder">身份证号码</td>
                  <td colspan="3">{{aData.idCard}}</td>
                </tr>
                <tr>
                  <td style="font-weight: bolder">毕业院校</td>
                  <td>{{aData.university}}</td>
                  <td style="font-weight: bolder">专业</td>
                  <td colspan="3">{{aData.major}}</td>
                </tr>
                <tr>
                  <td style="font-weight: bolder">入职时间</td>
                  <td>{{aData.jobtime}}</td>
                  <td style="font-weight: bolder">班期</td>
                  <td>{{aData.className}}</td>
                  <td style="font-weight: bolder">部门名称</td>
                  <td>{{aData.deptname}}</td>
                </tr>
                <tr>
                  <td style="font-weight: bolder">职位</td>
                  <td>{{aData.job}}</td>
                  <td style="font-weight: bolder">备注</td>
                  <td colspan="4">{{aData.note}}</td>
                </tr>
              </table>
            </el-dialog>
            &nbsp;
            <el-button size="mini" type="success" @click="dialogTableVisible2 = true;handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dialog title="编辑学生信息" :visible.sync="dialogTableVisible2" width="1200px">
              <el-form>
                <table style="width: 1100px;height: 400px" align="center" :data="tableData">
                  <tr>
                    <td style="font-weight: bolder;width: 120px">姓名</td>
                    <td width="200"><input type="text" v-model="aData.stuName"></td>
                    <td style="font-weight: bolder;width: 120px">性别</td>
                    <td width="200">
                      <el-radio v-model="aData.sex" label="男">男</el-radio>
                      <el-radio v-model="aData.sex" label="女">女</el-radio>
                    </td>
                    <td style="font-weight: bolder;width: 120px">民族</td>
                    <td width="200"><input type="text" v-model="aData.nation"></td>
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
                    <td style="font-weight: bolder">出生年月</td>
                    <td>
                      <el-date-picker
                        v-model="aData.birthday"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择出生日期">
                      </el-date-picker>
                    </td>
                    <td style="font-weight: bolder">籍贯</td>
                    <td><input type="text" v-model="aData.birthplace"></td>
                    <td style="font-weight: bolder">婚否</td>
                    <td>
                      <el-radio v-model="aData.marry" label="未婚">未婚</el-radio>
                      <el-radio v-model="aData.marry" label="已婚">已婚</el-radio>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: bolder">联系电话</td>
                    <td><input type="text" v-model="aData.telephone"></td>
                    <td style="font-weight: bolder">身份证号码</td>
                    <td colspan="3"><input type="text" v-model="aData.idCard"></td>
                  </tr>
                  <tr>
                    <td style="font-weight: bolder">毕业院校</td>
                    <td><input type="text" v-model="aData.university"></td>
                    <td style="font-weight: bolder">专业</td>
                    <td colspan="3"><input type="text" v-model="aData.major"></td>
                  </tr>
                  <tr>
                    <td style="font-weight: bolder">入职时间</td>
                    <td>
                      <el-date-picker
                        v-model="aData.jobtime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择入职时间">
                      </el-date-picker>
                    </td>
                    <td style="font-weight: bolder">班期</td>
                    <td><el-select
                      clearable
                      v-model="aData.className"
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
                    <td><input type="text" v-model="aData.deptName"></td>
                  </tr>
                  <tr>
                    <td style="font-weight: bolder">职位</td>
                    <td><input type="text" v-model="aData.job"></td>
                    <td style="font-weight: bolder">备注</td>
                    <td colspan="4"><input type="text" v-model="aData.note"></td>
                  </tr>
                </table>
                <br><br>
                <el-button type="primary" @click="goToSubmit()">提交</el-button>
              </el-form>
            </el-dialog>
            &nbsp;
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @current-change="getStudentsByPage"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-count="7"
        :total="totalStudentsData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "StudentInfoList",
    data() {
      return {
        filters:{//模糊查询的过滤器，绑定input框
          f1:"",
          f2:"",
          f3:""
        },
        tableData: [],
        pageSize: 8,
        curPage: 1,
        totalStudentsData: [],
        multipleSelection:[],//批量删除选择的复选框数组
        multiDeleteVisible:false,//批量删除的提示框
        dialogTableVisible: false,//隐藏编辑对话框
        dialogTableVisible2:false,
        aData: '',
        deptName:'',
        selectOptionsAll: [],
        sName:'all',//对应filters的f1,用于发送axios请求
        dept:'all',
        jobStr:'all',
        imageUrl: '',
        imgPath: '',
        updateData:{
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
        years:''
      }
    },
    methods: {
      getClassName(){
        axios.get('/toGetClassName/').then(res => {
          this.selectOptionsAll = res.data
        })
      },
      checkFilter(){
        if (""!==this.filters.f1){
          this.sName=this.filters.f1
        }else {
          this.sName="all"
        }
        if (""!==this.filters.f2){
          this.dept=this.filters.f2
        }else {
          this.dept="all"
        }
        if (""!==this.filters.f3){
          this.jobStr=this.filters.f3
        }else {
          this.jobStr="all"
        }
      },
      getStudentsByPage() {
        this.checkFilter();
        axios.get('/getStudentsByPage/' + this.curPage + '/' + this.pageSize + '/' + this.sName + '/' + this.dept + '/' + this.jobStr).then(res => {
          this.tableData = res.data
        })
      },
      getStudentsByLike() {
        this.checkFilter();
        axios.get('/getStudentsByLike/' + this.sName + '/' + this.dept + '/' + this.jobStr).then(res => {
          this.totalStudentsData = res.data
        })
      },
      refreshList(){
        this.getClassName();
        this.getStudentsByPage();
        this.getStudentsByLike();
      },
      handleAdd(){
        this.$router.push({path: "/addstudent"});
      },
      handleLook(index, row) {
        this.aData = row
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
      //单条删除
      handleDelete(index, row) {
        axios.get('/toDelStudent/' + row.stuId).then(res => {
          if(res.data>0){
            alert("删除成功")
            location.reload()
          }else{
            alert("删除失败")
          }
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        if (this.multipleSelection.length== 0){
          alert("请先勾选要删除的学生")
        }
      },
      //批量删除
      delStudents(){
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].stuId);
        }
        axios.get('/toDelStudents/'+ids).then(res=>{
          if(res.data>0){
            alert("删除成功");
            location.reload();
          }else{
            alert("删除失败");
          }
        })
      },
      handleEdit(index, row) {
        this.aData = row
        this.imageUrl=this.aData.photo
      },
      goToSubmit(){
        this.updateData=this.aData
        this.updateData.photo=this.imgPath
        //计算学生状态
        if(undefined===this.aData.jobtime||""===this.aData.jobtime){
          this.updateData.state=0;
          this.updateData.jobtime=null
        }else{
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth() + 1;
          let tJob=this.aData.jobtime.split("-");
          if((mm-tJob[1])<0){
            this.years=yy-1-tJob[0];
            if(this.years<1){
              this.updateData.state=0;
            }
            if(this.years<2&&this.years>1){
              this.updateData.state=1;
            }
            if(this.years<3&&this.years>2){
              this.updateData.state=2;
            }
            if(this.years>3){
              this.updateData.state=3
            }
          }else{
            this.years=yy-tJob[0];
            if(this.years<1){
              this.updateData.state=0;
            }
            if(this.years<2&&this.years>1){
              this.updateData.state=1;
            }
            if(this.years<3&&this.years>2){
              this.updateData.state=2;
            }
            if(this.years>3){
              this.updateData.state=3
            }
          }
          console.log(this.years)
          console.log(this.state)
        }
        axios.post('/toUpdateStudent/',this.updateData).then(res => {
          if(res.data>0){
            alert("修改成功")
          }else{
            alert("修改失败")
          }
        })
      }
    },
    mounted() {
      this.refreshList()
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
    margin-left: 20px;
  }
</style>
