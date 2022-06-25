<template>
  <div class="student-edit">
     <el-page-header @back='goBack' :content='title'></el-page-header>
     <el-form @submit.prevent :model='student' label-width='100px'>
         <el-form-item label='姓名：'>
             <el-input v-model="student.name"></el-input>
         </el-form-item>
         <el-form-item label='性别：'>
             <el-radio-group v-model="student.sex">
                 <el-radio label='男'>男</el-radio>
                 <el-radio label='女'>女</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label='出生日期：'>
             <el-date-picker v-model="student.birthday" type='date' placeholder='选择日期'></el-date-picker>
         </el-form-item>
         <el-form-item label='住址：'>
             <el-input v-model="student.address"></el-input>
         </el-form-item>
         <el-form-item label='班级：'>
             <el-select v-model="student.classesId" placeholder='请选择班级'>
                 <el-option v-for="c in classes" :key="c.id" :value='c.id' :lable='c.anem'></el-option>
             </el-select>
         </el-form-item>
         <el-form-item label=''>
             <el-button type='primary' @click="save">保存</el-button>
         </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
             title:'',
             classes: [],
             student: {},
        }
                
            },
            methods: {
                save() {
                    if(typeof this.student.birthday == 'object'){
                        this.student.birthday = this.student.birthday.toLocaleDateString().split('/').join('-');
                    }
                    if (this.student.id) {
                        this.axios.patch("http://localhost:3000/students/" + this.student.id, this.student).then((
                            result) => {
                            this.$router.push('/main/studentlist');
                        });
                    } else {
                        this.axios.post("http://localhost:3000/students", this.student).then((result) => {
                            this.$router.push('/main/studentlist');
                        });
                    }
                },
                getClasses() {
                   this.axios.get("http://localhost:3000/classes").then((result) => {
                        this.classes = result.data;
                    });
                },
                goBack(){
                    this.$router.back();
                }
            },
            mounted() {
                this.getClasses();
                let id = this.$route.params.id;
                if (id == 0) {
                    this.title = "添加学员";  
                } else {
                    this.title = "修改学员"; 
                    this.axios.get("http://localhost:3000/students/" + id).then((result) => {
                        this.student = result.data;
                    });
                }
            }
}
</script>

<style lang="less" scoped>
   .el-from{
       margin-top: 50px;
       width:500px
       ;
   }
</style>

