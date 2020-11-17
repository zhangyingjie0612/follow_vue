<template>
  <div>
    <el-container style="height: 915px; border: 1px solid #eee">
      <el-header style="font-size: 12px;height: 60px">
        <div style="float: left">
          <span style="font-size: 18px;font-weight:bolder;font-family: PingFang SC;">金桥学员成长跟踪系统({{role}})</span>
        </div>
        <div align="right">
          <span style="font-size: 15px;color: white"><i style="font-size: 18px;" class="el-icon-user"></i>&nbsp;&nbsp;{{userName}}</span>&nbsp;&nbsp;
<!--          <el-button @click="exit()"style="cursor: pointer"icon="el-icon-delete"></el-button>-->
          <el-button  size="small" @click="exit()">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 855px">
          <el-menu :default-active="activeIndex">
            <navigation-item v-for="(menu,i) in adminMenus" :key="i" :item="menu"/>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios/index';
  import NavigationItem from "./NavigationItem"; //引入菜单
    export default {
        name: "FollowMenu",

      data() {
          return{
            activeIndex:sessionStorage.getItem("activeIndex"),//默认选中的菜单
            adminMenus: [],//菜单数组
            role:sessionStorage.getItem("role"),//身份权限
            userName:sessionStorage.getItem("userName"),
            userId:sessionStorage.getItem("userId"),
          }
      },
      methods: {
        getCurrentMenu () {
          // 获取当前页面 菜单刷新后能自动选中
          // this.activeIndex = ""
        },

        getMenu() {
          axios.get('/getMenu/' + this.userId).then(res => {
            this.adminMenus = res.data;
            console.log(res.data)
          })
        },
        exit(){
            this.$confirm('是否退出系统？', '提示', {
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("activeIndex");
              sessionStorage.removeItem("userName");
              this.$router.push ({path:"/"});
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
        }
      },
      mounted() {
        this.getCurrentMenu();
      } ,
      created() {
        this.getMenu();
      },
      components: {
        "navigation-item": NavigationItem
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
