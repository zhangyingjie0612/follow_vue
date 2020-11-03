<template>
  <div>
    <el-table
      :data="tableData"
      height="650"
      border
      style="width: 80%;margin-left: 10%;margin-top: 2%">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">学员基本信息</span>
          <div style="float: right;margin-right: 45px">
            <el-input placeholder="输入姓名" v-model="filters.f1" style="width: 200px"></el-input>
            <el-input placeholder="输入部门名称" v-model="filters.f2" style="width: 200px"></el-input>
            <el-input placeholder="输入职位" v-model="filters.f3" style="width: 200px"></el-input>
<!--            <el-select-->
<!--              v-model="deptName"-->
<!--              placeholder="请在下拉框中选择名称"-->
<!--              maxlength="255"-->
<!--              :disabled="false"-->
<!--              clearable>-->
<!--              <el-option-->
<!--                v-for="item in selectOptionsAll"-->
<!--                :key="item.id"-->
<!--                :value="item.deptName">{{item.deptName}}-->
<!--              </el-option>-->
<!--            </el-select>-->
            <el-button size="small" icon="el-icon-search" circle @click="refreshList()"></el-button>
            <el-button size="small" type="primary" icon="el-icon-plus" circle @click="handleAdd(scope.$index, scope.row)"></el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" circle></el-button>
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
                  <td style="font-weight: bolder;width: 200px">性别</td>
                  <td width="200">{{aData.sex}}</td>
                  <td style="font-weight: bolder;width: 200px">民族</td>
                  <td width="200">{{aData.nation}}</td>
                  <td rowspan="5" width="300px"></td>
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
                  <td style="font-weight: bolder">备注</td>
                  <td colspan="6">{{aData.note}}</td>
                </tr>
              </table>
            </el-dialog>
            &nbsp;
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        pageSize: 5,
        curPage: 1,
        totalStudentsData: [],
        dialogTableVisible: false,//隐藏编辑对话框
        aData: '',
        deptName:'',
        selectOptionsAll: [],
        sName:'all',//对应filters的f1,用于发送axios请求
        dept:'all',
        jobStr:'all'
      }
    },
    methods: {
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
        this.getStudentsByPage();
        this.getStudentsByLike();
      },
      handleAdd(index, row){
        this.$router.push({path: "/addstudent"});
      },
      handleLook(index, row) {
        console.log(row);
        this.aData = row
      },
      handleEdit(index, row) {
        // this.$router.push({path: "/update", query: {id: row.id, name: row.username, pwd: row.password}});
      },
      handleDelete(index, row) {
        // this.$router.push({path: "/del", query: {id: params.row.id}})
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
</style>
