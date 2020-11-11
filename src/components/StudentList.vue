<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 1330px;margin-left: 95px;height: 650px;margin-top: 30px"
      align="center">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">学员跟踪表</span>
          <div style="float: right;margin-right: 20px">
            <el-input placeholder="输入姓名搜索" style="width: 200px" v-model="filters.f1"></el-input>
            <el-select
              v-model="filters.f2"
              placeholder="请选择班期"
              maxlength="255">
              <el-option
                v-for="item in selectOptionsAll"
                :key="item.id"
                :value="item.className">{{item.className}}
              </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" circle @click="refreshList()"></el-button>
          </div>
        </template>
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="stuname"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="university"
          label="毕业院校"
          width="140">
        </el-table-column>
        <el-table-column
          prop="birthplace"
          label="籍贯"
          width="100">
        </el-table-column>
        <el-table-column label="培训期间测试成绩" align="center">
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
          prop="evlScore"
          label="学校评价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="s1"
          label="转正评价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="s2"
          label="一年评价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="s3"
          label="两年评价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="s4"
          label="三年评价"
          width="80">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @current-change="getStudents"
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
    name: "StudentList",
    data() {
      return {
        filters:{//模糊查询的过滤器，绑定input框
          f1:"",
          f2:""
        },
        tableData: [],
        pageSize: 10,
        curPage: 1,
        totalStudentsData: [],
        selectOptionsAll:[],
        className:'all',
        nameStr:'all',//对应filters的f1,用于发送axios请求
        scoreData:'',
        courseNum:''
      }
    },
    methods: {
      /*flag显示转换*/
      formatNull: function (row, column, cellValue, index) {
        if (cellValue==null){
          return "未录入";
        }
        else {
          return cellValue;
        }
      },
      /*获取课程名和课程id，发送班级、姓名*/
      getCourse(){
        this.checkFilter2();
        axios.get("/toDoGetAllCourses/" + this.className).then(res=>{
          this.scoreData=res.data
        })
      },
      getClassName(){
        this.checkFilter2();
        axios.get('/toGetClassName/').then(res => {
          this.selectOptionsAll = res.data
        })
      },
      checkFilter(){
        if (""!==this.filters.f1){
          this.nameStr=this.filters.f1
        }else{
          this.nameStr="all"
        }
      },
      checkFilter2(){
        if (""!==this.filters.f2){
          this.className=this.filters.f2
        }else if(""===this.filters.f2){
          this.className="金桥工程47期"
        }else {
          this.className="all"
        }
      },
      refreshList(){
        this.getCourse();
        this.getClassName();
        this.getStudents();
        this.getStudents2();
      },
      //分页+模糊查询
      getStudents() {
        this.checkFilter();
        axios.get('/getStudentList/' + this.curPage + '/' + this.pageSize+ '/' + this.nameStr+'/'+this.className).then(res => {
          this.tableData = res.data
          for (var i in this.tableData) {
            if (this.tableData[i].s1 == null) (
              this.tableData[i].s1="未评价"
            )
            if (this.tableData[i].s2 == null) (
              this.tableData[i].s2="未评价"
            )
            if (this.tableData[i].s3 == null) (
              this.tableData[i].s3="未评价"
            )
            if (this.tableData[i].s4 == null) (
              this.tableData[i].s4="未评价"
            )
            if (this.tableData[i].evlScore == null) (
              this.tableData[i].evlScore="未评价"
            )
          }
        })
      },
      //获取所有列表来求个数
      getStudents2() {
        this.checkFilter();
        axios.get('/getStudentList2/'+ this.nameStr+'/'+this.className).then(res => {
          this.totalStudentsData = res.data
        })
      }
    },
    mounted() {
      this.refreshList()
    }
  }
</script>

<style scoped>

</style>
