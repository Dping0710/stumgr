<template>
  <div class="login">
      <el-form submit.prevent :model='user' label-widtm='100px'>
            <el-form-item label='登录名称：'>
                <el-input v-model="user.loginName"></el-input>
            </el-form-item>
            <el-form-item label='密码：'>
                <el-input v-model="user.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label=''>
                <el-button type='primary' @click="login">登录</el-button>
            </el-form-item>
        </el-form>
  </div>
</template> 

<script>
export default {
    data (){
        return{
            user:{},
        }
    },
    methods:{
        login(){
            let url = `http://localhost:3000/users?loginName=${this.user.loginName}&password=${this.user.password}`;
            this.axios.get(url).then((result) =>{
                if(result.data.length == 0 ){
                    this.$message.error('用户名或密码错误!');

                }else{
                    sessionStorage.setItem('token',result.data[0].loginName);
                    this.$router.push('/main');
                }
            })
        }
    }
}
</script>

<style>
.el-form{
    width: 500px;
    margin: 100px auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 10px #aaa;
    padding: 30px;
}
</style>