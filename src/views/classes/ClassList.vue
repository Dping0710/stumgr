<template>
    <div class="class-list">
        <el-page-header @back='goBack' content='班级列表'></el-page-header>
        <p class="add">
            <el-link icon='el-icon-plus' href='/main/classedit/0'>添加班级</el-link>
        </p>
        <el-table :data='classes' style="width:'100%">
            <el-table-column label="班级编号" width="100" prop="id"></el-table-column>
            <el-table-column label="班级名称" width="800" prop="name"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-edit" circle @click="modify(scope.row.id)"></el-button>
                    <el-popconfirm title="确定要删除班级吗？" @confirm="del(scope.row.id)" >
                        <el-button slot="reference" size='mini' icon='el-icon-delete' circle type='danger'></el-button>
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
            classes:[]
        }
    },
    methods:{
        getClasses(){
            this.axios.get("http://localhost:3000/classes").then((result) => {
                this.classes = result.data;
          });   
        },
        del(id) {
             this.axios.delete("http://localhost:3000/classes/" + id).then((result) => {
                this.getClasses();
          });        
            },
        modify(id) {
                    this.$router.push('/main/classedit/' + id);
                },
        goBack(){
                    this.$router.back();
                }
    },
    mounted(){
        this.getClasses();
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
