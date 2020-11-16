<template>
  <div>
    <el-table
      :data="tableData"
      height="630"
      style="width:1208px;margin-left: 8%;margin-top: 40px"
      align="center">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">重置密码</span>
          <div style="float: right;margin-right: 20px">
            <el-input placeholder="输入用户姓名搜索" style="width: 200px" v-model="filters.f1"></el-input>
            <el-button size="small" icon="el-icon-search" circle @click="refreshList()"></el-button>
          </div>
        </template>
        <el-table-column
          type="index"
          label="序号"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="权限"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleReset(scope.$index, scope.row)">重置
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @current-change="getUserPwd"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-count="7"
        :total="totalUsersData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "ResetPwd",
    data() {
      return {
        tableData: [],//查询出来的所有数据
        totalUsersData: [],//该集合的个数为查询结果的个数
        pageSize: 5,
        curPage: 1,
        userId: '',
        filters: {//模糊查询的过滤器，绑定input框
          f1: ""
        },
        nameStr: 'all',//对应filters的f1,用于发送axios请求
      }
    },
    methods: {
      //模糊查询的姓名的过滤器
      checkFilter() {
        if ("" !== this.filters.f1) {
          this.nameStr = this.filters.f1
        } else {
          this.nameStr = "all"
        }
      },
      //带分页
      getUserPwd() {
        this.checkFilter();
        axios.get('/getUser/' + this.curPage + '/' + this.pageSize+ '/' + this.nameStr).then(res => {
          this.tableData = res.data
        })
      },
      //数量
      getUserPwd2() {
        this.checkFilter();
        axios.get('/getUser2/'+ this.nameStr).then(res => {
          this.totalUsersData = res.data
        })
      },
      //根据userId重置密码
      handleReset(index, row) {
        this.$confirm('确定重置吗?', '提示', {
          type: 'warning'
        }).then(()=>{
          this.userId = row.userId;
          axios.get('/gotoResetPwd/' + this.userId).then(res => {
            if (res.data > 0) {
              this.$message({
                message: '重置成功',
                type: 'success',
                offset:330
              });
            } else {
              this.$message({
                message: '重置失败',
                type: 'warning',
                offset:330
              });
            }
            this.refreshList()
          })
        })
      },
      refreshList() {
        this.getUserPwd();
        this.getUserPwd2()
      },
    },
    mounted() {
      this.refreshList()
    }
  }
</script>

<style scoped>

</style>
