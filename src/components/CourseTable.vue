<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true">
        <!--filters是条件查询的过滤器-->
        <el-form-item>
          <el-input v-model="filters.f1" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.number="filters.f2" placeholder="课程编号" min="1" max="100"></el-input>
        </el-form-item>
        <el-form-item label="课程状态">
          <el-select v-model="filters.f3" placeholder="请选择课程状态" >
            <el-option label="全部" value="all"></el-option>
            <el-option label="存在" value="1"></el-option>
            <el-option label="不存在" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="refreshList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--table主体，格式居中-->
    <el-col :offset="4" :span="16">
      <el-table :data="pageData" stripe style="width: 100%">
        <el-table-column prop="courseid" label="课程编号" width="180">
        </el-table-column>
        <el-table-column prop="coursename" label="课程名称" width="180">
        </el-table-column>
        <el-table-column prop="flag" label="课程状态" width="180" :formatter="formatFlag">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!--需要添加一个删除的功能-->
            <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页需要两个数据，包括总的数据条数totalNum，和pagelist-->
      <el-pagination
        @current-change="getPageListByLike"
        :current-page.sync="curPage"
        :page-size="pagesize"
        :pager-count="7"
        :total="totalNum"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </el-col>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input v-model="formInfo.courseid" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="formInfo.coursename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程状态" :label-width="formLabelWidth">
          <el-select v-model="formInfo.flag" placeholder="请选择课程状态" >
            <el-option label="存在" value="1"></el-option>
            <el-option label="不存在" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogFormVisible2">
      <el-form>
        <!--<el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input v-model="formInfo2.courseid" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="formInfo2.coursename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程状态" :label-width="formLabelWidth">
          <el-select v-model="formInfo2.flag" placeholder="请选择课程状态" >
            <el-option label="存在" value="1"></el-option>
            <el-option label="不存在" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit2">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  /*引入axios*/
  import axios from 'axios'

  export default {
    name: "CourseTable",
    data() {
      return {
        filters:{//模糊查询的过滤器，绑定input框
          f1:"",
          f2:"",
          f3:"",
        },
        formLabelWidth: '120px',//form宽
        dialogFormVisible: false,//隐藏编辑对话框
        dialogFormVisible2: false,//隐藏新增对话框
        pagesize: 5,//每页的页数
        curPage: 1,//当前页
        pageData: [],//模糊查询分页数据
        totalNum:0, //总数据条数
        formInfo: "", //编辑表单数据
        formInfo2: "",//新增表单数据
        deleteId:0,//删除id
        filter1:"all",//对应filters的f1,用于发送axios请求
        filter2:"all",
        filter3:"all",
      }
    },

    methods: {
      /*flag显示转换*/
      formatFlag: function (row, column) {
        return row.flag == "1" ? '存在' : row.flag == "0" ? '不存在' : '未知';
      },

      /*url不能传‘’空字符串，故用filter1替换之*/
      checkFilter(){
        if (""!==this.filters.f1){
          this.filter1=this.filters.f1
        }else {
          this.filter1="all"
        }
        if (""!==this.filters.f2){
          this.filter2=this.filters.f2
        }else {
          this.filter2="all"
        }
        if (""!==this.filters.f3){
          this.filter3=this.filters.f3
        }else {
          this.filter3="all"
        }
      },

      /*获取pagelist*/
      getPageListByLike() {
        this.checkFilter();
        /*this.filters.f1="all";*/
        axios.get("/course/getPageListByLike/" + this.curPage + "/" + this.pagesize + "/" + this.filter1+ "/" + this.filter2+ "/" + this.filter3).then(res => {
          this.pageData = res.data
        })
      },

      /*获取总条数*/
      getTotalNumByLike(){
        this.checkFilter();
        axios.get("/course/getTotalNumByLike/"+this.filter1+"/" + this.filter2+ "/" + this.filter3).then(res=>{
          this.totalNum=res.data
        })
      },

      /*在列表有改变后刷新列表*/
      refreshList(){
        this.getPageListByLike();
        this.getTotalNumByLike();
      },

      /*单条删除*/
      deleteById(){
        axios.get("/course/deleteById/"+this.deleteId);
      },

      /*弹出编辑框*/
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.formInfo = this.pageData[index];
        /*/!*转换编辑框的flag的显示*!/
        if (this.pageData[index].flag==="1"){
          this.formInfo.flag = "存在"
        }else if (this.pageData[index].flag=="0"){
          this.formInfo.flag = "不存在"
        }else {
          this.formInfo.flag = "未知"
        }*/
      },

      /*弹出新增框*/
      handleAdd() {
        this.dialogFormVisible2 = true;
        this.formInfo2 = [];
      },

      /*根据删除单条数据*/
      handleDelete(index,row){
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(()=>{
          this.deleteId=row.courseid;
          axios.get("/course/deleteById/"+this.deleteId).then(res=>{
            if (res.data > 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.refreshList();//改变list后刷新列表
            }
          })
        })
      },


      /*编辑的提交*/
      onSubmit() {
        axios.post("/course/update", this.formInfo).then(res => {
          if (res.data > 0) {
            this.dialogFormVisible = false;
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        })
      },

      /*新增的提交*/
      onSubmit2() {
        axios.get("/course/add/"+this.formInfo2.coursename+"/"+this.formInfo2.flag).then(res => {
          if (res.data > 0) {
            this.dialogFormVisible2 = false;
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }
          this.refreshList();
        })
      },
    },

    /*第一次加载表格*/
    mounted() {
      this.refreshList();
    }
  }
</script>

<style scoped>

</style>


