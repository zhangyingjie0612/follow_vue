<template>
  <div>
    <el-table
      :data="tableData"
      height="630"
      style="width:1010px;margin-left: 260px;margin-top: 40px" align="center">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">班期管理</span>
          <div style="float: right;margin-right: 20px">
            <el-input placeholder="输入教师姓名搜索" style="width: 200px" v-model="filters.f1"></el-input>
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
            <el-button size="small" type="primary" icon="el-icon-plus" circle @click="dialogTableVisible2=true"></el-button>
          </div>
        </template>
        <el-table-column
          type="index"
          label="序号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班期"
          width="300">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="教师姓名"
          width="300">
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="dialogTableVisible=true;handleEdit(scope.$index, scope.row)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!--    编辑弹框-->
    <el-dialog title="编辑班期信息" :visible.sync="dialogTableVisible" width="600px" height="500px">
      <el-form :data="aData">
        <el-form-item label="班期：" :label-width="formLabelWidth">
          <el-input v-model="aData.className" autocomplete="off" style="width: 250px" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="授课教师：" :label-width="formLabelWidth">
          <el-select
            v-model="aData.userName"
            placeholder="请选择授课老师"
            style="width: 250px">
            <el-option
              v-for="item in selectTeacherName"
              :key="item.userId"
              :label="item.userName"
              :value="item.userName">{{item.userName}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程：" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="checkedCourses"
            :min="1"
            :max="6">
            <el-checkbox v-for="course in coursesSelection" :label="course.courseName" :key="course.courseName" :value="course.courseName">{{course.courseName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button size="medium" type="primary" @click="goToSubmit()">提交</el-button>
      </el-form>
    </el-dialog>
    <!--    新增弹框-->
    <el-dialog title="新增班期信息" :visible.sync="dialogTableVisible2" width="600px" height="500px">
      <el-form :data="aData1">
        <el-form-item label="班期：" :label-width="formLabelWidth">
          <el-input v-model="addClassName" autocomplete="off" style="width: 250px" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="授课教师：" :label-width="formLabelWidth">
          <el-select
            v-model="aData1.userName"
            placeholder="请选择授课老师"
            style="width: 250px">
            <el-option
              v-for="item in selectTeacherName"
              :key="item.userId"
              :value="item.userName">{{item.userName}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程：" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="checkedCourses2"
            :max="6">
            <el-checkbox v-for="course in coursesSelection" :label="course.courseName" :key="course.courseName" :value="course.courseName">{{course.courseName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button size="medium" type="primary" @click="handleAdd()">提交</el-button>
      </el-form>
    </el-dialog>
    <div>
      <el-pagination
        @current-change="getClasses"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-count="7"
        :total="totalClassesData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ToGetClass",
    data() {
      return {
        dialogTableVisible: false,//修改的弹框
        dialogTableVisible2:false,//新增的弹框
        filters: {//模糊查询的过滤器，绑定input框
          f1: "",
          f2: ""
        },
        tableData: [],
        aData: '',
        aData1: {
          className:'',
          userName:'',
          userId:''
        },
        totalClassesData: [],
        selectOptionsAll: [],//所有的班期
        selectTeacherName: [],//所有的教师姓名
        pageSize: 5,
        curPage: 1,
        formLabelWidth: '120px',
        nameStr: 'all',//对应filters的f1,用于发送axios请求
        className: 'all',//对应filters的f2,用于发送axios请求
        checkedCourses: [],//已选课程
        checkedCourses2: [],//新增的已选课程
        coursesSelection: [],//课程选择范围
        cId:'',//新增班级返回的班期Id
        addData:[],//新增班期对应的课程信息的数据
        addData1:[],
        editData:[],//修改班期对应的课程信息的数据
        editData1:[],
        maxClassId:'',
        addClassName:'',
      }
    },
    methods: {
      getMaxClassId(){
        axios.get('/toGetMaxClassId/').then(res => {
          this.maxClassId = res.data;
          let cla=this.maxClassId+47;
          this.addClassName="金桥工程"+cla+"期";
        })
      },
      getCourseName(){
        axios.get('/getAllCourseName/').then(res => {
          this.coursesSelection = res.data
        })
      },
      getClassName() {
        this.checkFilter2();
        axios.get('/toGetClassName/').then(res => {
          this.selectOptionsAll = res.data;
          this.selectOptionsAll.push({className: "全部列表"})
        })
      },
      getTeacherName() {
        axios.get('/getAllTeacherName/').then(res => {
          this.selectTeacherName = res.data
        })
      },
      checkFilter() {
        if ("" !== this.filters.f1) {
          this.nameStr = this.filters.f1
        } else {
          this.nameStr = "all"
        }
      },
      checkFilter2() {
        if ("" !== this.filters.f2 && this.filters.f2 !== "全部列表") {
          this.className = this.filters.f2
        } else {
          this.className = "all"
        }
      },
      refreshList() {
        this.getMaxClassId();
        this.getCourseName();
        this.getTeacherName();
        this.getClassName();
        this.getClasses();
        this.getClassesNum();
      },
      getClasses() {
        this.checkFilter();
        axios.get('/getClassesList/' + this.curPage + '/' + this.pageSize + '/' + this.nameStr + '/' + this.className).then(res => {
          this.tableData = res.data;
        })
      },
      getClassesNum() {
        this.checkFilter();
        axios.get('/getClassesCount/' + this.nameStr + '/' + this.className).then(res => {
          this.totalClassesData = res.data
        })
      },
      handleEdit(index, row) {
        this.aData = row;
        axios.get('/toGetSelectedCourse/' + this.aData.className).then(res => {
          this.checkedCourses=res.data
        });
      },
      goToSubmit(){
        //遍历教师姓名和教师id，根据教师姓名匹配教师Id
        for(let i=0;i<this.selectTeacherName.length;i++){
          if (this.selectTeacherName[i].userName==this.aData.userName){
            this.aData.userId=this.selectTeacherName[i].userId
          }
        }
        for(let i in this.checkedCourses){
          for (let j in this.coursesSelection) {
            if (this.checkedCourses[i]==this.coursesSelection[j].courseName){
              this.editData[i] = JSON.parse(JSON.stringify({classId:this.aData.classId,courseId:this.coursesSelection[j].courseId}));
            }
          }
        }
        this.editData1=this.editData
        console.log(this.editData)
        console.log(this.editData1)
        axios.get('/toUpdateClasses/' + this.aData.classId + '/' + this.aData.className+ '/' + this.aData.userId).then(res => {
          if(res.data){
            axios.post('/toAddClassCourse/',this.editData1).then(res => {
              if(res.data){
                alert("修改成功")
              }else{
                alert("修改失败")
              }
            })
          }
        })
      },
      handleAdd() {
        for(let i=0;i<this.selectTeacherName.length;i++){
          if (this.selectTeacherName[i].userName==this.aData1.userName){
            this.aData1.userId=this.selectTeacherName[i].userId
          }
        }
        console.log(this.addClassName,this.aData1.userId)
        axios.get('/toAddClass/' + this.addClassName + '/' + this.aData1.userId).then(res => {
          this.cId=res.data;
          for(let i in this.checkedCourses2){
            for (let j in this.coursesSelection) {
              if (this.checkedCourses2[i]==this.coursesSelection[j].courseName){
                this.addData[i] = JSON.parse(JSON.stringify({classId:this.cId,courseId:this.coursesSelection[j].courseId}));
              }
            }
          }
          this.addData1=this.addData
          axios.post('/toAddClassCourse/',this.addData1).then(res => {
            if(res.data){
              alert("新增成功")
            }else{
              alert("新增失败")
            }
          })
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
