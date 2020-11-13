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
        <template slot-scope="scope" >
          <el-link size="mini" @click="dialogTableVisible = true;handleEdit1(scope.$index, scope.row)">{{scope.row.stuName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nation"
        label="民族"
        align="center">
      </el-table-column>

      <el-table-column
        prop="university"
        label="毕业院校"
        align="center">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班期"
        align="center">
      </el-table-column>
      <el-table-column
      prop="telephone"
      label="联系方式"
      align="center">
    </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogTableVisible = true;handleEdit1(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @current-change="getStuListByPage"
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
        name: "TStuInfoList",
      data() {
        return {
          stuname:"all",//对应filters的f1,用于发送axios请求
          classname:"all",
          dialogTableVisible: false,
          pagesize:5,
          curPage:1,
          userid:"2",
          //分页员工数据
          empData: [],
          classDate:[],
          aData:'',
          filters:{//模糊查询的过滤器，绑定input框
            f1:"",
            f2:""
          },
          totalEmpData: []
        }
      },
      methods:{
        /*url不能传‘’空字符串，故用stuname替换之*/
        checkFilter(){
          if (""!==this.filters.f1 ){
            this.stuname=this.filters.f1
          }else {
            this.stuname="all"
          }
          if (""!==this.filters.f2 && "全部"!=this.filters.f2){
            this.classname=this.filters.f2
          }else {
            this.classname="all"
          }
        },
        //    获取分页员工列表
        getStuListByPage(){
          this.checkFilter();
          axios.get('/getAllStuByPage/'+this.curPage+'/'+this.pagesize+'/'+this.stuname+'/'+ this.classname).then(res => {
            this.empData = res.data

          })
        },
        //  获取产品列表
        getStuListByLike(){
          this.checkFilter();
          axios.get('/getAllStuByLike/'+this.stuname+'/'+ this.classname).then(res =>{
            this.totalEmpData = res.data
          })
        },
        handleEdit(index, row) {
          console.log(index, row);
          console.log( row);
          console.log(row.username);
          this.$router.push({path:"/update",query:{username:row.username,password:row.password,id:row.id}})

        }, handleEdit1(index, row) {
          // console.log( row);
          // this.aData=row
          this.$router.push({path:"/followMenu/tStudentInfoList",query:{aData:row}})
        },

        //获取下拉框中内容
        getOptions(){
          axios.get('/getClassName/'+this.userid).then(res =>{
            this.classDate=res.data
            this.classDate.push({className:"全部"})
            console.log(this.classDate);

          })
        },
        refreshList(){
          this.getStuListByPage();
          this.getStuListByLike();
        },
      },
      mounted() {
        this.getStuListByPage();
        this.getStuListByLike();
        this.getOptions();
      }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;}

  table, td {
    border: 2px solid #cccccc;
    border-collapse: collapse;
    padding-left: 10px;
  }

  .tr td{
    height: 35px;
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
</style>
