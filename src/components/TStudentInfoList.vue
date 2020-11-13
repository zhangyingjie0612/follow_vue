<template>
  <div>
    <table style="width: 1200px;margin-left: 10%" align="center">
      <tr>
        <td style="font-weight: bolder;font-size:16px;width: 120px">姓名</td>
        <td width="200">{{aData.stuName}}</td>
        <td style="font-weight: bolder;font-size:16px;width: 130px">性别</td>
        <td width="200">{{aData.sex}}</td>
        <td style="font-weight: bolder;font-size:16px;width: 130px">民族</td>
        <td width="200">{{aData.nation}}</td>
        <td rowspan="5" width="255px">
          <div class="photo">
            <img  v-if="aData.photo" :src="aData.photo" class="avatar">
          </div>
        </td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">出生年月</td>
        <td>{{aData.birthday}}</td>
        <td style="font-size:16px;font-weight: bolder">籍贯</td>
        <td>{{aData.birthplace}}</td>
        <td style="font-size:16px;font-weight: bolder">婚否</td>
        <td>{{aData.marry}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">联系电话</td>
        <td>{{aData.telephone}}</td>
        <td style="font-size:16px;font-weight: bolder">身份证号码</td>
        <td colspan="3">{{aData.idCard}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">毕业院校</td>
        <td>{{aData.university}}</td>
        <td style="font-size:16px;font-weight: bolder">专业</td>
        <td colspan="3">{{aData.major}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">入职时间</td>
        <td>{{aData.jobtime}}</td>
        <td style="font-size:16px;font-weight: bolder">班期</td>
        <td>{{aData.className}}</td>
        <td style="font-size:16px;font-weight: bolder">部门名称</td>
        <td>{{aData.deptname}}</td>
      </tr>
      <tr>
        <td style="font-size:16px;font-weight: bolder">职位</td>
        <td>{{aData.job}}</td>
        <td style="font-weight: bolder">备注</td>
        <td colspan="4">{{aData.note}}</td>
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
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "TStudentInfoList"
    ,data() {
      return {
        scoreData:'',
        evlContent:'',
        nameStr:'',
        aData:'',
        tableData: []
      }
    },
    methods:{
      /*获取课程名和课程id，发送班级、姓名*/
      getCourse(){
        axios.get("/toDoGetAllCourses/" + this.aData.className).then(res=>{
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
      //分页+模糊查询
      getStudents() {
        this.nameStr=this.aData.stuName
        axios.get('/getStudentList2/' + this.nameStr+'/'+this.aData.className).then(res => {
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
      getData(){
        this.aData=this.$route.query.aData
        console.log(this.$route.query.aData)

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
  /*table, td {*/
  /*  border: 2px solid #EBEEF5;*/
  /*  border-collapse: collapse;*/
  /*  padding-left: 10px;*/
  /*}*/
  /*input{*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  border: none;*/
  /*}*/




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
    margin-top: -45px;
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


</style>
