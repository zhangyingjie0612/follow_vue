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
            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="delStudents()"></el-button>
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
            <el-dialog title="学员详细信息" :visible.sync="dialogTableVisible" width="1200px">
              <table style="width: 1100px;height: 400px" align="center">
                <tr>
                  <td style="font-weight: bolder;width: 120px">姓名</td>
                  <td width="200">{{aData.stuName}}</td>
                  <td style="font-weight: bolder;width: 130px">性别</td>
                  <td width="200">{{aData.sex}}</td>
                  <td style="font-weight: bolder;width: 130px">民族</td>
                  <td width="200">{{aData.nation}}</td>
                  <td rowspan="5" width="255px"><img v-if="aData.photo" :src="aData.photo" class="avatar"></td>
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
            <el-button size="mini" type="success"
                       @click="dialogTableVisible2 = true;handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-dialog title="编辑学生信息" :visible.sync="dialogTableVisible2" width="1350px"
                       :before-close="handleDialogClose">
              <el-form :model="aData" status-icon :rules="rules" ref="aData">
                <table style="width: 1300px;height: 400px;border: none" align="center">
                  <tr>
                    <td style="border: none">
                      <el-form-item label="姓名" :label-width="formLabelWidth" prop="stuName">
                        <el-input v-model="aData.stuName" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-radio v-model="aData.sex" label="男">男</el-radio>
                        <el-radio v-model="aData.sex" label="女">女</el-radio>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="民族" :label-width="formLabelWidth" prop="nation">
                        <el-input v-model="aData.nation" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td rowspan="4" style="border: none">
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
                    <td style="border: none">
                      <el-form-item label="出生年月" :label-width="formLabelWidth" prop="birthday">
                        <el-date-picker
                          v-model="aData.birthday"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择出生日期"
                          style="width: 220px">
                        </el-date-picker>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="籍贯" :label-width="formLabelWidth" prop="birthplace">
                        <el-input v-model="aData.birthplace" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="婚否" :label-width="formLabelWidth" prop="marry">
                        <el-radio v-model="aData.marry" label="未婚">未婚</el-radio>
                        <el-radio v-model="aData.marry" label="已婚">已婚</el-radio>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: none">
                      <el-form-item label="联系电话" :label-width="formLabelWidth" prop="telephone">
                        <el-input v-model="aData.telephone" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idCard">
                        <el-input v-model="aData.idCard" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="university">
                        <el-input v-model="aData.university" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: none">
                      <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
                        <el-input v-model="aData.major" placeholder="请输入内容" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="入职时间" :label-width="formLabelWidth">
                        <el-date-picker
                          v-model="aData.jobtime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择入职时间"
                          style="width: 220px">
                        </el-date-picker>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="班期" :label-width="formLabelWidth" prop="className">
                        <el-select
                          v-model="aData.className"
                          placeholder="请选择班期"
                          style="width: 220px">
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
                    <td style="border: none">
                      <el-form-item label="部门名称" :label-width="formLabelWidth">
                        <el-select
                          clearable
                          v-model="aData.deptName"
                          placeholder="请选择部门"
                          style="width: 220px">
                          <el-option
                            v-for="item in selectOptionsAll2"
                            :key="item.id"
                            :value="item.deptName">{{item.deptName}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <td style="border: none">
                      <el-form-item label="职位" :label-width="formLabelWidth">
                        <el-input v-model="aData.job" style="width: 220px"></el-input>
                      </el-form-item>
                    </td>
                    <td colspan="2" style="border: none">
                      <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input v-model="aData.note"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                </table>
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button type="primary" @click="goToSubmit('aData')">提交</el-button>
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
        formLabelWidth: "100px",
        filters: {//模糊查询的过滤器，绑定input框
          f1: "",
          f2: "",
          f3: ""
        },
        tableData: [],
        pageSize: 8,
        curPage: 1,
        totalStudentsData: [],
        multipleSelection: [],//批量删除选择的复选框数组
        dialogTableVisible: false,//查看
        dialogTableVisible2: false,//隐藏编辑对话框
        aData: {
          stuId: '',
          stuName: '',
          sex: '',
          nation: '',
          birthday: '',
          birthplace: '',
          marry: '',
          telephone: '',
          idCard: '',
          university: '',
          major: '',
          photo: '',
          note: '',
          state: '',
          className: '',
          deptName: '',
          job: '',
          jobtime: ''
        },
        deptName: '',
        selectOptionsAll: [],//班期名称
        selectOptionsAll2: [],//部门名称
        sName: 'all',//对应filters的f1,用于发送axios请求
        dept: 'all',
        jobStr: 'all',
        imageUrl: '',
        imgPath: '',
        years: '',
        months: '',
        initState: 5,
        sumMonths:'',
        rules: {
          stuName: [
            {required: true, message: '请输入学生姓名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          nation: [
            {required: true, message: '请输入民族', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'change'}
          ],
          birthplace: [
            {required: true, message: '请输入籍贯', trigger: 'blur'}
          ],
          marry: [
            {required: true, message: '请选择婚姻状况', trigger: 'change'}
          ],
          telephone: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
            {pattern: /^1[3|4|5|6|7|8][0-9]{9}$/, message: '输入的格式不正确', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message: '请输入正确的格式',
              trigger: 'blur'
            }
          ],
          university: [
            {required: true, message: '请输入毕业院校', trigger: 'blur'}
          ],
          major: [
            {required: true, message: '请输入专业', trigger: 'blur'}
          ],
          className: [
            {required: true, message: '请选择班期', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      handleDialogClose() {
        this.resetForm('aData');
        this.dialogTableVisible2 = false
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getAllDeptName() {
        axios.get('/toGetAllDeptName/').then(res => {
          this.selectOptionsAll2 = res.data
        })
      },
      getClassName() {
        axios.get('/toGetClassName/').then(res => {
          this.selectOptionsAll = res.data
        })
      },
      checkFilter() {
        if ("" !== this.filters.f1) {
          this.sName = this.filters.f1
        } else {
          this.sName = "all"
        }
        if ("" !== this.filters.f2) {
          this.dept = this.filters.f2
        } else {
          this.dept = "all"
        }
        if ("" !== this.filters.f3) {
          this.jobStr = this.filters.f3
        } else {
          this.jobStr = "all"
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
      refreshList() {
        this.getAllDeptName();
        this.getClassName();
        this.getStudentsByPage();
        this.getStudentsByLike();
      },
      handleAdd() {
        this.$router.push({path: "/addstudent"});
      },
      handleLook(index, row) {
        this.aData = row
      },
      //  图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgPath = file.response
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
        this.$confirm('确认删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          axios.get('/toDelStudent/' + row.stuId).then(res => {
            if (res.data > 0) {
              this.$message({
                message: '删除成功',
                type: 'success',
                offset: 330
              });
              this.refreshList();
            } else {
              this.$message({
                message: '删除失败',
                type: 'warning',
                offset: 330
              });
            }
          })
        })
      },
      //批量删除
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //批量删除
      delStudents() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            message: '请先勾选要删除的项',
            type: 'warning',
            offset: 330
          });
        } else {
          this.$confirm('确认删除吗?', '提示', {
            type: 'warning'
          }).then(() => {
            let ids = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              ids.push(this.multipleSelection[i].stuId);
            }
            axios.get('/toDelStudents/' + ids).then(res => {
              if (res.data > 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  offset: 330
                });
                this.refreshList();
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'warning',
                  offset: 330
                });
              }
            })
          })
        }
      },
      handleEdit(index, row) {
        this.aData = row;
        this.imageUrl = this.aData.photo
      },
      goToSubmit(aData) {
        this.$refs[aData].validate((valid) => {
          if (valid) {
            if ("../../static/imgs/" == this.imageUrl.substring(0,18)) {
              this.imageUrl=this.imageUrl.substring(18)
              this.aData.photo=this.imageUrl
            }else {
              this.aData.photo=this.imgPath
            }
            //计算学生状态
            if(undefined===this.aData.jobtime||""===this.aData.jobtime){
              this.initState=0;
            }else{
              let yy = new Date().getFullYear();
              let mm = new Date().getMonth() + 1;
              let tJob=this.aData.jobtime.split("-");
              if((mm-tJob[1])<0){
                this.years=yy-1-tJob[0];
                this.months=mm+12-tJob[1];
                this.sumMonths=this.years*12+this.months;
                if(this.sumMonths>=0&&this.sumMonths<3){
                  this.initState=0;
                }
                if(this.sumMonths>=3&&this.sumMonths<12){
                  this.initState=5
                }
                if(this.sumMonths<24&&this.sumMonths>=12){
                  this.initState=1;
                }
                if(this.sumMonths<36&&this.sumMonths>=24){
                  this.initState=2;
                }
                if(this.sumMonths>=36){
                  this.initState=3
                }
              }else{
                this.years=yy-tJob[0];
                this.months=mm-tJob[1];
                this.sumMonths=this.years*12+this.months;
                if(this.sumMonths>=0&&this.sumMonths<3){
                  this.initState=0;
                }
                if(this.sumMonths>=3&&this.sumMonths<12){
                  this.initState=5;
                }
                if(this.sumMonths<24&&this.sumMonths>=12){
                  this.initState=1;
                }
                if(this.sumMonths<36&&this.sumMonths>=24){
                  this.initState=2;
                }
                if(this.sumMonths>=36){
                  this.initState=3
                }
              }
              console.log(this.sumMonths)
              console.log(this.initState)
            }
            this.aData.state=this.initState;
            console.log(this.aData.state)
            axios.post('/toUpdateStudent/',this.aData).then(res => {
              if(res.data>0){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.dialogTableVisible2=false
              }else{
                this.$message({
                  message: '修改失败',
                  type: 'warning'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

  .photo {
    position: relative;
    border: 1px dashed #d9d9d9;
    width: 230px;
    height: 280px;
    line-height: 230px;
    margin-left: 20px;
  }
</style>
