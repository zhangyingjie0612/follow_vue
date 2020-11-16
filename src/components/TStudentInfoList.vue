<template>
  <div>
    <div  id="div1">
      <span id="span1">学员详细信息</span>
    </div>
    <el-button style="float: left" @click="returnList()">返回</el-button>
    <table style="width: 1200px;margin-left: 10%" align="center">
      <tr>
        <td style="font-weight: bolder;font-size:16px;width: 120px">姓名</td>
        <td width="200">{{stuData.stuName}}</td>
        <td style="font-weight: bolder;font-size:16px;width: 130px">性别</td>
        <td width="200">{{stuData.sex}}</td>
        <td style="font-weight: bolder;font-size:16px;width: 130px">民族</td>
        <td width="200">{{stuData.nation}}</td>
        <td rowspan="5" width="255px">
          <div class="photo">
            <img  v-if="stuData.photo" :src="stuData.photo" class="avatar">
          </div>
        </td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">出生年月</td>
        <td>{{stuData.birthday}}</td>
        <td style="font-size:16px;font-weight: bolder">籍贯</td>
        <td>{{stuData.birthplace}}</td>
        <td style="font-size:16px;font-weight: bolder">婚否</td>
        <td>{{stuData.marry}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">联系电话</td>
        <td>{{stuData.telephone}}</td>
        <td style="font-size:16px;font-weight: bolder">身份证号码</td>
        <td colspan="3">{{stuData.idCard}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">毕业院校</td>
        <td>{{stuData.university}}</td>
        <td style="font-size:16px;font-weight: bolder">专业</td>
        <td colspan="3">{{stuData.major}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">入职时间</td>
        <td>{{stuData.jobtime}}</td>
        <td style="font-size:16px;font-weight: bolder">班期</td>
        <td>{{stuData.className}}</td>
        <td style="font-size:16px;font-weight: bolder">部门名称</td>
        <td>{{stuData.deptname}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">职位</td>
        <td>{{stuData.job}}</td>
        <td style="font-weight: bolder">备注</td>
        <td colspan="4">{{stuData.note}}</td>
      </tr>
    </table>
    <el-table
      :data="tableData"
      style="width: 1201px;;margin-left: 10%">
      <el-table-column label="培训学校评价"
                       align="center">
        <el-table-column
          prop="date"
          label="培训学校"
          width="160"
          align="center">
          <template slot-scope="scope">
            <span style="font-weight: bolder">学习评价</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="className"
          label="班期"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="评价人"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column label="培训期间测试成绩" width="720" align="center">
          <template  v-for='(one) in scoreData'>
            <el-table-column
              :prop="'z'+one.prop"
              :label="one.label"
              :key="'z'+one.prop"
              :formatter="formatNull"
              width="120px">
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column
          prop="evlScore"
          label="整体评价分数"
          width="120"
          align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
      <table style="width: 1201px;height: 200px;width: 1201px;margin-left: 10%" align="left">
        <tr>
          <td style="font-weight: bolder;width: 160px;">评价(包括主要优点及缺陷)</td>
          <td class="td-explainleft">
            <div>
              {{evlContent}}
            </div>
          </td>
        </tr>
      </table>
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "TStudentInfoList"
    ,data() {
      return {
        scoreData:'',//成绩
        evlContent:'',//评价
        nameStr:'',
        stuData:'',
        tableData: []//学生信息
      }
    },
    methods:{
      /*获取课程名和课程id和成绩，发送班级、姓名*/
      getCourse(){
        axios.get("/toDoGetAllCourses/" + this.stuData.className).then(res=>{
          this.scoreData=res.data
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
      //获取学生信息
      getStudents() {
        this.nameStr=this.stuData.stuName
        axios.get('/getStudentList3/' + this.nameStr+'/'+this.stuData.className).then(res => {
          this.tableData = res.data
          for (var i in this.tableData) {
            if (this.tableData[i].evlContent == null) (
              this.tableData[i].evlContent="未评价"
            )
            if (this.tableData[i].evlScore == null) (
              this.tableData[i].evlScore="未评价"
            )
          }
          this.evlContent=this.tableData[0].evlContent
          console.log(this.tableData)
        })
      },
      //接受学生信息
      getData(){
        this.stuData=this.$route.query.stuData
        console.log(this.$route.query.stuData)

      },
      //返回
      returnList(){
        console.log(this.stuData.className)
        this.$router.push({path: "/followMenu/tStuInfoList",query:{className:this.stuData.className}});
      }
    },
    mounted() {
      this.getData();
      this.getStudents();
      this.getCourse();
    }
  }
</script>

<style scoped>


  * {
    box-sizing: border-box;}

  table, td {
    border: 1px solid #cccccc;
    border-collapse: collapse;
    padding-left: 10px;
  }

   td{
    height: 60px;
  }
  .photo{
    position: relative;
    border: 1px dashed #d9d9d9;
    width: 230px;
    height: 250px;
    line-height: 250px;
    margin-top: -0px;
    margin-left: 1px;
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
  .avatar {
    width: 230px;
    height: 250px;
    display: block;
  }
  .td-explainleft{vertical-align:top;position:relative;}
  .td-explainleft div{position:absolute; left:0; top:0;}

  #span1{
    font-size: 37px;
  }
  #div1{
    margin: 0;
    padding: 0;
    height: 70px;
    font-size: 30px;
    background-color: #F5F5F5;
    line-height:70px;
  }
</style>
