<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 1330px;margin-left: 95px;height: 650px;margin-top: 30px">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">学员跟踪表</span>
          <div style="float: right;margin-right: 20px">
            <el-input placeholder="输入关键字搜索" style="width: 200px"></el-input>
            <el-select
              v-model="deptName"
              placeholder="请在下拉框中选择名称"
              maxlength="255"
              :disabled="false"
              clearable>
              <el-option
                v-for="item in selectOptionsAll"
                :key="item.id"
                :value="item.deptName">{{item.deptName}}
              </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" circle></el-button>
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
          width="150">
        </el-table-column>
        <el-table-column
          prop="birthplace"
          label="籍贯"
          width="100">
        </el-table-column>
        <el-table-column label="培训期间测试成绩" align="center">
          <el-table-column
            prop="z1"
            label="HTML"
            width="80">
          </el-table-column>
          <el-table-column
            prop="z2"
            label="oracle"
            width="80">
          </el-table-column>
          <el-table-column
            prop="z3"
            label="java基础"
            width="80">
          </el-table-column>
          <el-table-column
            prop="z4"
            label="java高级"
            width="80">
          </el-table-column>
          <el-table-column
            prop="z5"
            label="js"
            width="80">
          </el-table-column>
          <el-table-column
            prop="z6"
            label="L1面试"
            width="80">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="evlcontent"
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
        tableData: [],
        pageSize: 5,
        curPage: 1,
        totalStudentsData: [],
        stuname: '',
        sex: '',
        university: '',
        birthplace: '',
        evlContent: '',
        s1: '',
        s2: '',
        s3: '',
        s4: ''
      }
    },
    methods: {
      getStudents() {
        axios.get('/getStudentList/' + this.curPage + '/' + this.pageSize).then(res => {
          this.tableData = res.data
        })
      },
      getStudents2() {
        axios.get('/getStudentList2/').then(res => {
          this.totalStudentsData = res.data
        })
      }
    },
    mounted() {
      this.getStudents();
      this.getStudents2();
    }
  }
</script>

<style scoped>

</style>
