<template>
  <div>
    <!--form表单模块，由formShow控制显隐-->
    <el-col :offset="9" :span="6" style="margin-top: 5%"  v-show="formShow" >
      <h3 style="margin-bottom: 50px ">成绩录入</h3>
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <el-form-item  label="请选择打分班级" prop="class" >
          <el-select v-model="formData.class" placeholder="请选择班级" @change="getCourseData">
            <el-option
              v-for="item in classData"
              :disabled="item.disabled=='true'"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择打分课程" prop="course">
          <el-select v-model="formData.course"  placeholder="请选择课程">
            <el-option
              v-for="item in courseData"
              :disabled="item.disabled=='0'"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="formSubmit('formRef')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--table表格模块，通过tableShow控制显隐-->
    <el-col :offset="2" :span="20" v-show="tableShow">
      <h3 style="margin-bottom: 20px ">成绩录入</h3>
      <el-table :data="allData" height="470" border>
        <el-table-column type="index" label="序号" align="center" width="130">
        </el-table-column>
        <el-table-column prop="stuId" label="学生编号" align="center" width="230">
        </el-table-column>
        <el-table-column prop="classname" label="班级" align="center" width="230">
        </el-table-column>
        <el-table-column prop="stuName" label="学生姓名" align="center" width="230">
        </el-table-column>
        <el-table-column label="成绩" align="center">
          <template slot-scope="scope">
            <!--input框只能输入数字，超过100会有提示-->
            <el-input size="mini" v-model.number="scope.row.score" placeholder="请输入成绩"
                      oninput="if(value>100){value='请输入0-100！'}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=''}"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-button size="small" type="primary" @click="tableCancel">取消</el-button>
        <el-button size="small" type="danger" @click="tableSubmit">提交</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "AddScore",
    data(){
      return{
        //从session中取数据
        userid:sessionStorage.getItem("userId"),
        //表单的验证规则
        formRules:{
          class:[
            {required: true, message: '请选择班级', trigger: 'change' }
          ],
          course:[
            {required: true, message: '请选择课程', trigger: 'change' }
          ],
        },
        formData:{},//绑定表单数据
        filters:{
          f1:"-1",
          f2:"-1"
        },
        classData:
          [
            { label: "金桥工程48期", value: "1" ,disabled:true },
            { label: "金桥工程49期", value: "2" ,disabled:false},
          ],
        courseData:
          [
            { label: "请先选择班级", value: "0" ,disabled:'0'},
          ],
        formShow:true,//控制表单显隐，初始显
        tableShow:false,//控制table显隐，初始隐
        allData:[],//根据classId获取的所有学生信息
      }
    },
    methods:{
      //切换显隐
      switchShow(){
        this.formShow=!this.formShow;
        this.tableShow=!this.tableShow;
      },

      checkForm(){
        if (this.formData.class!=""){
          this.filters.f1=this.formData.class;
        }
        if (this.formData.course!=""){
          this.filters.f2=this.formData.course;
        }
      },

      //根据userid获取班级信息
      getClassData(){
        axios.get("/score/getClassData/"+this.userid).then(res=>{
          this.classData=res.data;
        })
      },

      //根据班级id获取课程信息
      getCourseData(){
        this.checkForm();
        axios.get("/score/getCourseData/"+this.filters.f1).then(res=>{
          this.courseData=res.data;
        })
      },

      //根据班级id获取所有学生信息
      getAllList() {
        this.checkForm();
        axios.get("/score/getAllList/" + this.filters.f1).then(res => {
          this.allData = res.data
        })
      },

      //form表单提交
      formSubmit(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid){
            this.getAllList();
            this.switchShow();
          }
        });
      },

      //表格取消
      tableCancel(){
        this.switchShow();
      },

      //表格提交
      tableSubmit(){
        let checkScores = this.allData.some( (item,i) =>{
          console.log(item);
          console.log(item.score);
          return item.score ==undefined||item.score=="请输入0-100！"||item.score=="";
        } );
        if(checkScores){
          this.$message('您还有未录入的成绩！')
        } else{
          this.$confirm('确认提交成绩吗?提交后不可修改', '提示', {
            type: 'warning'
          }).then(()=>{
            this.checkForm();
            axios.post("/score/addScores/"+this.filters.f1+"/"+this.filters.f2,this.allData).then(res=>{
              if (res.data > 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
              }
            })
          })
        }
      },
    },
    //初始获取班级信息
    mounted() {
      this.getClassData();
    }
  }
</script>
<style scoped>
</style>

