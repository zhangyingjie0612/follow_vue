<template>
  <div>
    <el-table
      :data="tableData"
      height="630"
      style="width:680px;margin-left: 430px;margin-top: 40px">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="权限"
        width="120">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleReset(scope.$index, scope.row)">重置
          </el-button>
        </template>
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
        tableData: [],
        totalUsersData: [],
        pageSize: 5,
        curPage: 1,
        userId: ''
      }
    },
    methods: {
      getUserPwd() {
        axios.get('/getUser/' + this.curPage + '/' + this.pageSize).then(res => {
          this.tableData = res.data
        })
      },
      getUserPwd2() {
        axios.get('/getUser2/').then(res => {
          this.totalUsersData = res.data
        })
      },
      handleReset(index, row) {
        this.userId = row.userId;
        axios.get('/gotoResetPwd/' + this.userId).then(res => {
          if (res.data > 0) {
            alert("重置成功")
          } else {
            alert("重置失败")
          }
          location.reload()
        })
      }
    },
    mounted() {
      this.getUserPwd();
      this.getUserPwd2();
    }
  }
</script>

<style scoped>

</style>
