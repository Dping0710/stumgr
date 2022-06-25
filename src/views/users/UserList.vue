<template>
    <div class="class-list">
        <el-page-header @back='goBack' content='用户列表'></el-page-header>
        <p class="add">
            <el-link icon='el-icon-plus' href='/main/useredit/0'>添加用户</el-link>
        </p>
        <el-table :data='users' style="width:'100%">
            <el-table-column label="用户编号" width="100" prop="id"></el-table-column>
            <el-table-column label="登录名称" width="200" prop="loginName"></el-table-column>
            <el-table-column label="用户姓名" width="200" prop="name"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-edit" circle @click="modify(scope.row.id)"></el-button>
                    <el-popconfirm title="确定要删除改用户吗？" @confirm='del(scope.row.id)'>
                        <el-button slot='reference' size="mini" icon="el-icon-delete" circle type="danger"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>

        </el-table> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            users:[]
        }
    },
    methods:{
        getUsers(){
            this.axios.get("http://localhost:3000/users").then((result) => {
                this.users = result.data;
          });   
        },
        del(id){
             this.axios.delete("http://localhost:3000/users/" + id).then((result) => {
                this.getUsers();
          });        
            },
        modify(id) {
            this.$router.push('/main/useredit/'+id);
                },
        goBack(){
            this.$router.back();
                }
    },
    mounted(){
        this.getUsers();
    }
}
</script>

<style lang="less" scoped>
.add{
    text-align: right;
}
   .el-table{
       margin: 20px 0;
   }
</style>
