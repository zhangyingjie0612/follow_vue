<template>
  <div>
    <el-table
      :data="empData"
      stripe
      style="width: 90%;margin-left: 5%;height: 750px">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">学员基本信息</span>
          <div style="float: right;margin-right: 20px">
            <el-input placeholder="输入姓名搜索" style="width: 200px" v-model="filters.f1"></el-input>
            <el-select
              @change="getOptions"
              v-model="filters.f2"
              placeholder="请选择班期"
              maxlength="255">
              <el-option v-for="(item,index) in classDate" :key="index" :value="item.className" :label="item.className"/>
            </el-select>
            <el-button size="small" icon="el-icon-search" circle v-on:click="refreshList()"></el-button>
          </div>
        </template>
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="stuName"
        label="姓名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班期名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="evlScore"
        label="整体分数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="evlContent"
        label="评价"
        align="center">
      </el-table-column>
      <el-table-column label="操作"
                       prop="evlScore">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" :disabled="scope.row.evlScore != '未评价'"
                     @click="handleEdit1(scope.$index, scope.row)"
                     >评价</el-button>
          <el-button size="mini" type="success" :disabled="scope.row.evlScore == '未评价'"
                     @click="dialogTableVisible1 = true,handleEdit(scope.$index, scope.row)"
                     >修改</el-button>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
<!--    评价-->
    <el-dialog title="评价" :visible.sync="dialogTableVisible" width="700px":before-close="handleDialogClosein">
      <el-table
        :data="tableData"
        style="">
        <el-table-column label="培训学校评价" align="center">
          <el-table-column
            prop="stuname"
            label="学生姓名"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column label="培训期间测试成绩" width="480" align="center">
            <template  v-for='(one) in scoreData'>
              <el-table-column
                :prop="'z'+one.prop"
                :label="one.label"
                :key="'z'+one.prop"
                :formatter="formatNull"
                width="80px">
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="评价人"
            width=""
            align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
      <br><br>
    <el-form status-icon :model="form"style="width: 100%;margin-left: 0%" :rules="rules1" ref="form">
<!--      <el-form-item label="学生姓名" :label-width="formLabelWidth">-->
<!--        <el-input :disabled="true"v-model="form.stuname" autocomplete="off"></el-input>-->
<!--      </el-form-item>-->

      <el-form-item label="整体评价分数"  prop="evlScore" :label-width="formLabelWidth">
        <el-input v-model="form.evlScore" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="评价(包括主要优点及缺陷)"  prop="evlContent" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.evlContent" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogClosein">取 消</el-button>
      <el-button type="primary" @click="insertscore('form')">确 定</el-button>
    </div>
  </el-dialog>
    <!--    修改-->
    <el-dialog title="修改"  :visible.sync="dialogTableVisible1" width="700px" :before-close="handleDialogCloseup">
      <el-table
        :data="tableData"
        style="">
        <el-table-column label="培训学校评价" align="center">
          <el-table-column
            prop="stuname"
            label="学生姓名"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column label="培训期间测试成绩" width="480" align="center">
            <template  v-for='(one) in scoreData'>
              <el-table-column
                :prop="'z'+one.prop"
                :label="one.label"
                :key="'z'+one.prop"
                :formatter="formatNull"
                width="80px">
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="评价人"
            width=""
            align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
      <br><br>
      <el-form  :model="updateForm"style="width: 100%;margin-left: 0%":rules="rules" ref="updateForm">
<!--        <el-form-item label="学生姓名" :label-width="formLabelWidth">-->
<!--          <el-input :disabled="true" v-model="updateForm.stuname" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="整体评分"  prop="evlScore" :label-width="formLabelWidth">
          <el-input v-model="updateForm.evlScore" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="evlContent" :label-width="formLabelWidth" >
          <el-input  type="textarea" v-model="updateForm.evlContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCloseup">取 消</el-button>
        <el-button type="primary" @click="updatascore('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-pagination
        @current-change="getEmpListByPage"
        :current-page.sync="curPage"
        :page-size="pagesize"
        :pager-count="7"
        :total="totalEmpData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
        name: "TSchoolEvl",
    data() {
      var checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('评价不能为空'));
        }else {

          callback();
        }
      };
      var checkOldPwd1 = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('评价不能为空'));
        }else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        const cEvlScore=/^([0-4]\.\d)$|^[0-5]{1}$/
        if (value === null) {
          callback(new Error('请输入整体分数'));
        }
        else {
          if (!cEvlScore.test(value)){
            callback(new Error('请填写数字0-5'));
          } else {
            callback();
          }
        }
      };
      return {
        rules: {
          evlScore: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          evlContent: [
            {required: true, validator: checkOldPwd, trigger: 'blur' }
          ]
        },
        rules1: {
          evlScore: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          evlContent: [
            { required: true,validator: checkOldPwd1, trigger: 'blur' }
          ]
        },
        filters:{//模糊查询的过滤器，绑定input框
          f1:"",
          f2:""
        },
        dialogTableVisible: false,
        dialogTableVisible1: false,
        band:true,
        formLabelWidth:'120px',
        pagesize:5,
        curPage:1,
        scoreData:'',
        selectOptionsAll:[],
        tableData: [],
        form: {
          stuId:'',
          stuname:'',
          evlScore:null,
          evlContent:''
        },
        updateForm: {
          stuId:'',
          stuname:'',
          evlScore:null,
          evlContent:''
        },
        schoolEvl:{
          stuId:null,
          userId:'2',
          evlScore:null,
          evlContent:null,
        },
        //分页员工数据
        empData: [],
        aData:'',
        userid:"2",
        totalEmpData: [],
        stuname:"all",//对应filters的f1,用于发送axios请求
        className:"all",
        classDate:[],
        asd:null
      }
    },
    methods:{
      //  编辑时点取消会刷新
      handleDialogCloseup() {
        this.resetForm('updateForm');
        this.dialogTableVisible1 = false
      },
 //  评分点取消会刷新
      handleDialogClosein() {
        this.resetForm('form');
        this.dialogTableVisible = false
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*url不能传‘’空字符串，故用stuname替换之*/
      checkFilter(){
        if (""!==this.filters.f1 ){
          this.stuname=this.filters.f1
        }else {
          this.stuname="all"
        }
        if (""!==this.filters.f2 && "全部"!=this.filters.f2){
          this.className=this.filters.f2
        }else {
          this.className="all"
        }
      },
      //    获取分页员工列表
      getEmpListByPage(){
        this.checkFilter();
        axios.get('/getSchoolEvl/'+this.curPage+'/'+this.pagesize+'/'+this.stuname +'/'+ this.userid+'/'+ this.className).then(res => {
          this.empData = res.data;
          for (var i in this.empData) {
            if (this.empData[i].evlScore == null || this.empData[i].evlScore == "") (
              this.empData[i].evlScore="未评价"
            )
            if (this.empData[i].evlContent == null || this.empData[i].evlContent == "") (
              this.empData[i].evlContent="未评价"
            )
          }
        })
      },
      //  获取产品列表
      getEmpList(){
        this.checkFilter();
        axios.get('getSchoolEvlByLike/'+this.stuname +'/'+ this.userid+'/'+ this.className).then(res =>{
          this.totalEmpData = res.data
          // console.log(null);
        })
      },
      handleEdit(index, row) {
        this.className = row.className
        this.nameStr=row.stuName
        this.updateForm.stuname=row.stuName
        this.updateForm.stuId=row.stuId
        this.updateForm.evlScore=row.evlScore
        this.updateForm.evlContent=row.evlContent
        this.getStudentsScore();
        this.getCourse();
      },
      handleEdit1(index, row) {
        console.log(row);
        this.className = row.className
        this.nameStr=row.stuName
        this.form.stuname=row.stuName
        this.form.stuId=row.stuId
        this.form.evlScore=null
        this.form.evlContent=null
        if (row.state==0) {
          this.$message({
            message: '学员未结束培训，不能进行评分',
            type: 'warning',
            offset:350
          });
        }else {
          this.dialogTableVisible = true;
          this.getStudentsScore();
          this.getCourse();
        }
      },
      //获取学生成绩
      getStudentsScore() {
        axios.get('/getStudentList2/' + this.nameStr+'/'+this.className).then(res => {
          this.tableData = res.data
          console.log(this.tableData)
        })
      },
      /*获取课程名和课程id，发送班级、姓名*/
      getCourse(){
        axios.get("/toDoGetAllCourses/" + this.className).then(res=>{
          this.scoreData=res.data
          console.log(this.scoreData)
        })
      },
      /*flag显示转换*/
      formatNull: function (row, column, cellValue, index) {
        if (cellValue==null){
          return "未录入";
        }
        else {
          return cellValue;
        }
      },
      //评价
      insertscore(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.schoolEvl.stuId=this.form.stuId
            this.schoolEvl.evlContent=this.form.evlContent
            this.schoolEvl.evlScore=this.form.evlScore
            console.log( this.schoolEvl);
            axios.post('insertSchoolEvl/',this.schoolEvl).then(res =>{
              if(res.data){
                this.dialogTableVisible=false;
                this.$message({
                  message: '评价成功',
                  type: 'success',
                  offset:350
                });
                this.winload();
              }else{
                this.$message({
                  message: '评价成功',
                  type: 'warning',
                  offset:350
                });
              }
            })
          } else {
            this.$message({
              message: '提交失败,请按要求填写信息',
              type: 'warning',
              offset:350
            });
            return false;
          }
        });

      },
      //修改评价
      updatascore(updateForm) {
        this.$refs[updateForm].validate((valid) => {
          if (valid) {
            this.schoolEvl.stuId=this.updateForm.stuId
            this.schoolEvl.evlContent=this.updateForm.evlContent
            this.schoolEvl.evlScore=this.updateForm.evlScore
            console.log( this.schoolEvl);
            axios.post('updateSchoolEvl/',this.schoolEvl).then(res =>{
              if(res.data){
                this.dialogTableVisible1=false;
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  offset:350
                });
                this.winload();
              }else{
                this.$message({
                  message: '修改成功',
                  type: 'warning',
                  offset:350
                });
              }
            })
          } else {
            this.$message({
              message: '提交失败,请按要求填写信息',
              type: 'warning',
              offset:350
            });
            return false;
          }
        });
      },
      refreshList(){
        this.getEmpListByPage();
        this.getEmpList();
      },
      //获取下拉框中内容
      getOptions(){
        axios.get('/getClassName/'+this.userid).then(res =>{
          this.classDate=res.data
          this.classDate.push({className:"全部"})
          console.log(this.classDate);

        })
      },
      winload(){
        this.getEmpListByPage();
        this.getEmpList();
        this.getOptions();
      }
    },
    mounted() {
      this.winload();
    }
    }
</script>

<style scoped>
  table, td {
    border: 1px solid #cccccc;
    border-collapse: collapse;
    padding-left: 10px;
  }
</style>
