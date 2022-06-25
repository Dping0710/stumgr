<template>
    <div class="student-list">
        <el-page-header @back='goBack' count='学员列表'></el-page-header>
    
       <p class="add"> 
           <el-link icon='el-icon-plus' href='/main/studentedit/0'>添加学员</el-link>
       </p>
       <el-row>
           <el-col :xs='24' :sm='18' :md='12' :lg='8' :xl='6'>
               <el-input placeholder="请输入学生姓名，支持模糊查询" v-model="searchName" class="input-with-search" >  
                   <template slot="prepend">姓名</template>
                   <el-button slot="append" icon='el-icon-search' @click="turnPage(1)"></el-button>
               </el-input>
           </el-col>
       </el-row>
        <el-table :data='students' style="width:100%">
            <el-table-column label='学号' width='100' prop='id'></el-table-column>
            <el-table-column label='姓名' width='150' prop='name'></el-table-column>
            <el-table-column label='性别' width='100' prop='sex'></el-table-column>
            <el-table-column label='出生日期' width='180'>
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{scope.row.birthday}}</span>   
                </template>
            </el-table-column>
            <el-table-column label='住址' width='800' prop='address'></el-table-column>
            <el-table-column label='班级' width='100' prop='classes.name'></el-table-column>
            <el-table-column label='操作' >
                <template slot-scope="scope">
                    <el-button size='mini' icon='el-icon-edit' circle @click="modify(scope.row.id)"></el-button>
                    <el-popconfirm title="确定要删除学员吗?" @confirm='del(scope.row.id)'>
                        <el-button slot="reference" size='mini' icon='el-icon-delete' circle type='danger'></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination backgroun @current-change='turnPage' layout='prev,pager,next' :page-size='pager.pageIndex'></el-pagination>
    </div>
</template>

<script>
import router from '@/router';
export default {
            data(){
                return{
                    searchName:'',
                    students: [],
                    pager: {
                        pageIndex: 1,
                        pageSize: 10,
                        totalPages: 0,
                        totalCount:0,
                        hasPrevPage: false,
                        hasNextPage: false,
             },
                toPage: 1,
                }
            },
            methods: {
                getTotalPages() {
                    let url ='http://localhost:3000/students'
                    if(this.searchName.trim() != ''){
                        url += '?name_like=' + this.searchName;
                    }
                    this.axios.get(url).then((result) => {
                        this.pager.totalCount = result.data.length;
                        this.pager.totalPages = Math.ceil(result.data.length / this.pager.pageSize);
                        this.pager.hasPrevPage = this.pager.pageIndex > 1;
                        this.pager.hasNextPage = this.pager.pageIndex < this.pager.totalPages;
                    });
                },
                getStudents() {
                    let url =
                        `http://localhost:3000/students?_expand=classes&_page=${this.pager.pageIndex}&_limit=${this.pager.pageSize}`;
                        if(this.searchName.trim() != ''){
                        url += '&name_like=' + this.searchName;
                    }
                    this.axios.get(url).then((result) => {
                        this.students = result.data;
                    });
                },
                turnPage(index) {
                    if (index) {
                        this.pager.pageIndex = parseInt(index);
                    }
                    this.getTotalPages();
                    this.getStudents();
                    let sd = "";
                console.log(typeof(searchName));
                },
                del(id) {
                        this.axios.delete("http://localhost:3000/students/" + id).then((result) => {
                            this.turnPage();
                        });        
                },
                modify(id) {
                    this.$router.push('/main/studentedit/'+id);
                },
                goBack(){
                    this.$router.back();
                }

            },
            mounted() {
                this.getTotalPages();
                this.getStudents();
                
            },
}
</script>

<style lang="less" scoped>
.add{
    text-align: center;
}
.el-table{
    margin:20px 0;
}
</style>