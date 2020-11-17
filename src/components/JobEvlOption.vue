<template>
  <div>
    <!--table主体，格式居中-->
    <el-col :offset="1" :span="22">
      <el-table
        @selection-change="handleSelectionChange"
        :data="pageData" stripe border height="500px">
        <!--多级表头-->
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <span style="font-size: x-large">评价管理</span>
            <el-row :gutter="20">
              <el-col :offset="9" :span="4">
                <el-input v-model="filters.f1" placeholder="评价名称"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input v-model.number="filters.f2" placeholder="评价编号" min="1" max="100"></el-input>
              </el-col>
              <el-col :span="5">
                <el-button size="small" icon="el-icon-search" circle v-on:click="refreshList()"></el-button>
                <el-button size="small" type="primary" icon="el-icon-plus" circle @click="handleAdd"></el-button>
                <!--需要添加一个批量删除的功能-->
                <el-button size="small" type="danger" icon="el-icon-delete" circle @click="handleBatchDelete"></el-button>
              </el-col>
            </el-row>
          </template>
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column type="index" label="序号" width="150" align="center">
          </el-table-column>
          <el-table-column prop="optionId" label="评价编号" width="250" align="center">
          </el-table-column>
          <el-table-column prop="optionName" label="评价名称" width="250" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
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

    <!--删除提示对话框-->
    <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
      <span>确定要删除吗</span>
      <span slot="footer">
                    <el-button type="primary" @click="batchDeleteByIds()">确 定</el-button>
                    <el-button @click="multiDeleteVisible=false">取消</el-button>
                  </span>
    </el-dialog>

    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px" :before-close="handleDialogClose">
      <el-form :model="formInfo" :rules="editRules" ref="editForm">
        <el-form-item label="评价编号" :label-width="formLabelWidth">
          <el-input v-model="formInfo.optionId" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="评价名称" :label-width="formLabelWidth" prop="optionName">
          <el-input v-model="formInfo.optionName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--新增对话框-->
    <el-dialog title="新增" :visible.sync="dialogFormVisible2" width="500px" :before-close="handleDialogClose2">
      <el-form :model="formInfo2" :rules="addRules" ref="addForm">
        <el-form-item label="评价名称" :label-width="formLabelWidth" prop="optionName">
          <el-input v-model="formInfo2.optionName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="handleDialogClose2">取 消</el-button>
        <el-button type="primary" @click="onSubmit2('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /*引入axios*/
  import axios from 'axios'

  export default {
    name: "JobEvlOption",
    data() {
      //新增表单名字重复的自定义验证
      var checkName = (rule, value, callback)=>{
        axios.get('/jobEvlOption/checkAddName/'+this.formInfo2.optionName).then(res=>{
          // alert(res.data);
          if (res.data!="ok"){
            callback(new Error('课程名重复'));
          }else {
            callback();
          }
        });
      };
      return {
        //编辑表单验证规则
        editRules:{
          optionName:[
            { required: true, message: '请输入评价名称', trigger: 'blur' },
          ],
        },
        //新增表单验证规则
        addRules:{
          optionName:[
            { required: true, message: '请输入评价名称', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' },
          ],
        },
        //模糊查询的过滤器，绑定input框
        filters:{
          f1:"",
          f2:""
        },
        formLabelWidth: '120px',//form宽
        dialogFormVisible: false,//隐藏编辑对话框
        dialogFormVisible2: false,//隐藏新增对话框
        multiDeleteVisible:false,//批量删除的提示框
        multipleSelection:[],//批量删除选择的复选框数组
        pagesize: 7,//每页的页数
        curPage: 1,//当前页
        pageData: [],//模糊查询分页数据
        totalNum:0, //总数据条数
        formInfo: "", //编辑表单数据
        formInfo2: "",//新增表单数据
        deleteId:0,//删除id
        filter1:"all",//对应filters的f1,用于发送axios请求
        filter2:"all",//对应filters的f2,用于发送axios请求
        ifExist:true,//删除时判断是否存在成员
      }
    },

    methods: {
      /*使编辑表单对话框关闭，并刷新页面*/
      handleDialogClose() {
        this.resetForm('editForm');
        this.dialogFormVisible = false
      },

      /*使新增表单对话框关闭，并刷新页面*/
      handleDialogClose2() {
        this.resetForm('addForm');
        this.dialogFormVisible2 = false
      },

      /*根据表单的ref属性刷新表单*/
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //点击批量删除按钮
      handleBatchDelete(){
        //先判断是否有选项
        if (this.multipleSelection.length== 0){
          alert("请先勾选要删除的项")
        }else {
          let ids = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].optionId);
          }
          this.multiDeleteVisible=true
        }
      },

      //传入复选框的值
      handleSelectionChange(val){
        this.multipleSelection = val;
      },

      //删除对话框上点击确认按钮后，根据ids批量删除
      batchDeleteByIds(){
        this.multiDeleteVisible=false;//关闭对话框
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].optionId);
        }
        //console.log(ids)
        axios.get('/jobEvlOption/batchDeleteByIds/'+ids).then(res=>{
          if(res.data>0){
            alert("删除成功");
          }else{
            alert("删除失败");
          }
          this.refreshList();//改变list后刷新列表
        });
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
      },

      /*获取pagelist*/
      getPageListByLike() {
        this.checkFilter();
        /*this.filters.f1="all";*/
        axios.get("/jobEvlOption/getPageListByLike/" + this.curPage + "/" + this.pagesize + "/" + this.filter1+ "/" + this.filter2).then(res => {
          this.pageData = res.data
        })
      },

      /*获取总条数*/
      getTotalNumByLike(){
        this.checkFilter();
        axios.get("/jobEvlOption/getTotalNumByLike/"+this.filter1+"/" + this.filter2).then(res=>{
          this.totalNum=res.data
        })
      },

      /*在列表有改变后刷新列表*/
      refreshList(){
        this.getPageListByLike();
        this.getTotalNumByLike();
      },

      /*弹出编辑框*/
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.formInfo = this.pageData[index];
      },

      /*弹出新增框*/
      handleAdd() {
        this.dialogFormVisible2 = true;
        this.formInfo2 ={};
      },

      /*根据删除单条数据*/
      handleDelete(index,row){
        let ids = [];
        ids.push(row.optionId);
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(()=>{
          this.deleteId=row.optionId;

          //axios.get("/jobEvlOption/deleteById/"+this.deleteId).then(res=>{
          /*考虑假删*/
          axios.get("/jobEvlOption/deleteByIdFake/"+this.deleteId).then(res=>{
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
      onSubmit(formName) {
        this.$refs[formName].validate((valid)=> {
          if (valid) {
            axios.post("/jobEvlOption/update", this.formInfo).then(res => {
              if (res.data > 0) {
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            })
          }
        });
      },

      /*新增的提交*/
      onSubmit2(formName) {
        this.$refs[formName].validate((valid)=>{
          if (valid){
            axios.get("/jobEvlOption/add/"+this.formInfo2.optionName).then(res => {
              if (res.data > 0) {
                this.dialogFormVisible2 = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              }
              this.refreshList();
            })
          }
        });

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


