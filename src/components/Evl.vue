<template>
  <div>
    <div v-show="tableShow">
      <el-table
        :data="pageData" stripe border height="600px" >
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <span style="font-size: x-large">评价</span>
            <el-row :gutter="20">
              <el-col :offset="9" :span="4">
                <el-input v-model="filters.f1" placeholder="学员姓名" ></el-input>
              </el-col>
              <el-col :span="5">
                <el-button size="small" icon="el-icon-search" circle v-on:click="refreshList()"></el-button>
              </el-col>
            </el-row>
          </template>
          <el-table-column type="index" label="序号" width="120" align="center">
          </el-table-column>
          <el-table-column prop="stuId" label="学生编号" width="200" align="center"></el-table-column>
          <el-table-column prop="stuname" label="学生名称" width="200" align="center"></el-table-column>
          <el-table-column prop="university" label="毕业院校" width="200" align="center"></el-table-column>
          <el-table-column prop="telephone" label="手机号" width="200" align="center"></el-table-column>
          <el-table-column label="操作"  align="center">
            <template slot-scope="scope">
              <el-button size="small" @click="but0(scope.$index, scope.row)">转正评价</el-button>
              <el-button size="small" @click="but1(scope.$index, scope.row)">一年评价</el-button>
              <el-button size="small" @click="but2(scope.$index, scope.row)">两年评价</el-button>
              <el-button size="small" @click="but3(scope.$index, scope.row)">三年评价</el-button>
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
    </div>

    <div v-show="formShow" style="margin-top: 50px">
      <h3>项目经理评价</h3>
      <el-form >
        <template v-for="(one) in formData">
          <el-col :span="6" :offset="9">
            <el-form-item :label="'*请输入'+one.label+':'" label-position="right" label-width="120px">
              <el-input v-model="one.model"
                        oninput="if(value>5){value=''}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=''}"
              ></el-input>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="6" :offset="9">
          <el-form-item label="*请输入整体分数" label-position="right" label-width="120px">
            <el-input v-model = "sumscore"
                      oninput="if(value>5){value=''}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=''}"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="9">
          <el-form-item label="*评价优缺点"  label-position="right" label-width="120px">
            <el-input type="textarea" v-model="jobEvlContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button @click="switchShow">返回</el-button>
            <el-button type="primary" @click="formSub">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Evl",
    data(){
      return{

        //模糊查询的过滤器，绑定input框
        filters:{
          f1:"",
        },
        pagesize: 7,//每页的页数
        curPage: 1,//当前页
        pageData: [],//模糊查询分页数据
        totalNum:0, //总数据条数
        filter1:"all",//对应filters的f1,用于发送axios请求

        formData:[
         /* {
            label:'能力',//对应job_evl_option 的 optionname
            prop:1,//对应job_evl_option 的 optionname
            model:'',//传个空就行
          },
          {
            label:'人品',
            prop:1,
            model:'',
          },*/
        ],
        sumscore:'',
        jobEvlContent:'',
        dateId:'',//通过按钮来赋值
        stuId:1,//通过按钮来赋值
        //从session中取数据
        userId:0,//测试值

        deptName:"",//根据userId来查询
        tableShow:true,//控制table显隐，初始显
        formShow:false,//控制表单显隐，初始隐

      }
    },

    methods:{
      getDeptName(){
        axios.get("/evl/getDeptName/"+this.userId).then(res=>{
          this.deptName=res.data;
        })
      },

      /*4个不同的评价按钮*/
      but0(index, row){
        this.dateId='0';
        this.stuId=this.pageData[index].stuId;
        this.switchShow();
      },
      but1(index, row){
        this.dateId='1';
        this.stuId=this.pageData[index].stuId;
        this.switchShow();
      },
      but2(index, row){
        this.dateId='2';
        this.stuId=this.pageData[index].stuId;
        this.switchShow();
      },
      but3(index, row){
        this.dateId='3';
        this.stuId=this.pageData[index].stuId;
        this.switchShow();
      },
      //切换显隐
      switchShow(){
        this.formShow=!this.formShow;
        this.tableShow=!this.tableShow;
      },

      formSub(){
        axios.post('/evl/addEvl/'+this.userId+'/'+this.dateId+'/'+this.stuId+'/'+this.sumscore+'/'+this.jobEvlContent,this.formData).then(res=>{
          if (res.data>0){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.switchShow();
          }else {
            this.$message({
              message: '操作失败',
              type: 'fail'
            });
          }
        })
      },

      getFormData(){
        axios.get('/evl/getFormData').then(res =>{
          this.formData = res.data;
        })
      },

      /*url不能传‘’空字符串，故用filter1替换之*/
      checkFilter(){
        if (""!==this.filters.f1){
          this.filter1=this.filters.f1
        }else {
          this.filter1="all"
        }
      },
      /*获取pagelist*/
      getPageListByLike() {
        this.checkFilter();
        axios.get("/evl/getPageListByLike/" + this.curPage + "/" + this.pagesize + "/" + this.filter1+ "/" + this.deptName).then(res => {
          this.pageData = res.data
        })
      },

      /*获取总条数*/
      getTotalNumByLike(){
        this.checkFilter();
        axios.get("/evl/getTotalNumByLike/"+this.filter1+ "/" + this.deptName).then(res=>{
          this.totalNum=res.data
        })
      },

      /*在列表有改变后刷新列表*/
      refreshList(){
        this.getPageListByLike();
        this.getTotalNumByLike();
      },

    },
    mounted() {
      if (sessionStorage.getItem("userId")!=null){
        this.userId=sessionStorage.getItem("userId");
      }else {
        this.userId="1";
      }
      this.getDeptName();
      setTimeout(()=>{
        this.getFormData();
        this.refreshList();
      },50)


    }
  }
</script>

<style scoped>

</style>

