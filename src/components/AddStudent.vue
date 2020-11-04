<template>
  <el-form action="" style="margin-top: 20px">
    <table style="width: 1200px;height: 600px" align="center" :data="tableData">
      <tr><td colspan="7" style="font-size: x-large;font-weight: bolder">新增学生信息</td></tr>
      <tr>
        <td style="font-weight: bolder;width: 120px">姓名</td>
        <td width="200"><input type="text" v-model="tableData.stuName"></td>
        <td style="font-weight: bolder;width: 200px">性别</td>
        <td width="200"><input type="text" v-model="tableData.sex"></td>
        <td style="font-weight: bolder;width: 200px">民族</td>
        <td width="200"><input type="text" v-model="tableData.nation"></td>
        <td rowspan="5" width="300px"><el-button type="primary">上传图片</el-button></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">出生年月</td>
        <td><input type="text" v-model="tableData.birthday"></td>
        <td style="font-weight: bolder">籍贯</td>
        <td><input type="text" v-model="tableData.birthplace"></td>
        <td style="font-weight: bolder">婚否</td>
        <td><input type="text" v-model="tableData.marry"></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">联系电话</td>
        <td><input type="text" v-model="tableData.telephone"></td>
        <td style="font-weight: bolder">身份证号码</td>
        <td colspan="3"><input type="text" v-model="tableData.idcard"></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">毕业院校</td>
        <td><input type="text" v-model="tableData.university"></td>
        <td style="font-weight: bolder">专业</td>
        <td colspan="3"><input type="text" v-model="tableData.major"></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">入职时间</td>
        <td></td>
        <td style="font-weight: bolder">班期</td>
        <td><input type="text" v-model="tableData.className"></td>
        <td style="font-weight: bolder">部门名称</td>
        <td></td>
      </tr>
      <tr>
        <td style="font-weight: bolder">职位</td>
        <td></td>
        <td style="font-weight: bolder">备注</td>
        <td colspan="4"><input type="text" v-model="tableData.note"></td>
      </tr>
    </table>
    <br><br>
    <el-button type="primary" @click="goToSubmit()">提交</el-button>
    <el-button>重置</el-button>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AddStudent",
    data() {
      return {
        tableData: []
      }
    },
    methods:{
      goToSubmit(){
        console.log(this.tableData.length)
        this.tableData.photo=null;
        if(undefined===this.tableData.note){
          this.tableData.note=null
        }
        axios.get('/toAddStudent/'+this.tableData.stuName+'/'+this.tableData.sex+'/'+this.tableData.nation+'/'+this.tableData.birthday
          +'/'+this.tableData.birthplace +'/'+this.tableData.marry+'/'+this.tableData.telephone+'/'+this.tableData.idcard+'/' +this.tableData.university +'/'+this.tableData.major+'/'+this.tableData.photo +'/'+this.tableData.note+'/'+this.tableData.className).then(res => {
          if(res.data){
            alert("新增成功")
            location.reload()
          }else{
            alert("新增失败")
          }
        })
      }
    }
  }
</script>

<style scoped>
  table, td {
    border: 2px solid #cccccc;
    border-collapse: collapse;
    padding-left: 10px;
  }
  input{
    height: 100%;
    width: 95%;
    border: none;
  }
</style>
