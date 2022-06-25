<template>
    <div class="class-edit">
        <el-page-header @back="goBack" :content='title'></el-page-header>
        <el-form @submit.prevent :model='clazz' label-width='100px'>
            <el-form-item label="班级名称：">
                <el-input v-model="clazz.name"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:"",
            clazz:{}
        };
    },
    methods:{
        save(){
            if(this.clazz.id){
                //修改
                this.axios.patch("http://localhost:3000/classes/"+ this.clazz.id, this.clazz).then((result) =>{
                    this.$router.push("/mian/classlist");
                });
            }else{
                //添加
                this.axios.post("http://localhost:3000/classes", this.clazz,).then((result) =>{
                    this.$router.push("/mian/classlist");
                    });
            }
        },
        goBack(){
            this.$router.back();
        },
    },
    mounted(){
        let id =this.$route.params.id;
        if(id == 0){
            this.title ='添加班级';
        }else{
            this.title = '修改班级';
            this.axios.get("http://localhost:3000/classes/" + id).then((result)=>{
                this.clazz = result.data;
            })
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
