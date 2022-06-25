<template>
    <div class="class-edit">
        <el-page-header @back='goBack' :content='title'></el-page-header>
        <el-form @submit.prevent :model='user' label-widtm='100px'>
            <el-form-item label='登录名称：'>
                <el-input v-model="user.loginName" :disabled='disableEditLoginName'></el-input>
            </el-form-item>
            <el-form-item label='姓名：'>
                <el-input v-model="user.name" ></el-input>
            </el-form-item>
            <el-form-item label='密码：'>
                <el-input v-model="user.password" type="password" show-password></el-input>
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
            user:{},
            disableEditLoginName:false,
        };
    },
    methods:{
        save(){
            if(this.user.id){
                this.axios.patch('http://localhost:3000/users/'+ this.user.id, this.user).then((result)=>{
                    this.$router.push('/main/userlist');
                });
            }else{
                this.axios.get('http://localhost:3000/users?loginName=' + this.user.loginName).then((result)=>{
                    if(result.data.length == 0){
                        this.axios.post('http://localhost:3000/users', this.user).then((result)=>{
                            this.$router.push('/main/userlist');
                        });
                    }else{
                        this.$message.error('该登录名已经被使用');
                    }
                });
            }
        },
        goBack(){
                    this.$router.back();
                },
    },
     mounted(){
        let id =this.$route.params.id;
        console.log(id);
        if(id == 0){
            this.title ='添加用户';
            this.disableEditLoginName = false;
        }else{
            this.title = '修改用户';
            this.disableEditLoginName = true;
            this.axios.get('http://localhost:3000/users/' + id).then((result)=>{
                this.user = result.data;
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
