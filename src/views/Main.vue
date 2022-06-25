<template>
  <div class="main">
    <el-container>
     <el-header class="header" height='80px'>学校管理系统</el-header>
      <el-container>
        <el-aside>
          <el-menu default-active='2' class="el-menu-vertical-demo" :router='true'>
              <el-menu-item index='/main/studentlist'>
                 <i class="el-icon-menu"></i>
                 <span slot="title">学员管理</span>
              </el-menu-item>
              <el-menu-item index='/main/classlist'>
                 <i class="el-icon-document"></i>
                 <span slot="title">班级管理</span>
              </el-menu-item>
              <el-menu-item index='/main/courselist' disabled>
                 <i class="el-icon-setting"></i>
                 <span slot="title">课程管理</span>
              </el-menu-item>
              <el-menu-item index='/main/userlist'>
                 <i class="el-icon-user"></i>
                 <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index='/logout'>
                 <i class="el-icon-user"></i>
                 <span slot="title">注销</span>
              </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view /> 
        </el-main>
      </el-container> 
      <el-footer class="footer">版权所有&copy; xxx公司 2022</el-footer>
    </el-container>

    
  </div>
</template>

<style lang="less" scoped>

.header{
  background-color: #409eff;
  text-align: center;
  font-size: 36px;
  padding: 20px 0;
  color:#fff;
  line-height: 40px;
}
.footer{
  background-color: #409eff;
  text-align: center;
  font-size: 12px;
  line-height: 60px;  
  color:#fff;
}
</style>
            
             

