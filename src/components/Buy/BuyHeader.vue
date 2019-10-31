<template>
  <div class="buy-header-content">
    <div class="header-left">
      <div class="logo-box">
        <router-link :to="{ name: 'index' }">
          <img :src="logoPath" alt="logo">
        </router-link>
      </div>

      <!--<a-menu  mode="horizontal"  :defaultSelectedKeys="['menu2']">-->
        <!--<a-menu-item key="menu1">AI训练</a-menu-item>-->
        <!--<a-menu-item key="menu2">AI在线推理</a-menu-item>-->
        <!--<a-menu-item key="menu3">AI算力</a-menu-item>-->
        <!--<a-menu-item key="menu4">AI应用商城</a-menu-item>-->
        <!--<a-menu-item key="menu5">AI学院</a-menu-item>-->
      <!--</a-menu>-->
    </div>

    <a-button class="login-btn" v-if="!token" @click="goLoginPage">登录/注册</a-button>
    <a-dropdown v-else>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!--<a-avatar class="avatar" size="small" :src="avatar()"/>-->
          <span class="user-img-box">
            <i class="iconfont anticon-yonghu"></i>
          </span>
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'aihpc' }">
              <a-icon type="user"/>
              <span>控制台</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import logo from '../../assets/yunaiLogo.png'
    export default {
      name: "",
      data(){
        return {
          logoPath: logo
        }
      },
      computed: {
        ...mapState({
          // 动态主路由
          token: state => state.user.token
        })
      },
      methods: {
        ...mapActions(['Logout']),
        ...mapGetters(['nickname', 'avatar']),
        handleLogout () {
          const that = this

          this.$confirm({
            title: '提示',
            content: '真的要注销登录吗 ?',
            onOk () {
              return that.Logout({}).then(() => {
                that.$router.push({name: 'login'})
                window.location.reload()
              }).catch(err => {
                that.$message.error({
                  title: '错误',
                  description: err.message
                })
              })
            },
            onCancel () {
            }
          })
        },
        goLoginPage: function () {
          this.$router.push({name: "login"})
        }
      }
    }
</script>

<style lang="less" scoped>
.ant-layout-header{
  height: 85px;
  background-color: #ffffff;
}
.login-btn{
  width: 130px;
  height: 40px;
  margin-right: 20px;
  margin-left: 35px;
  border-radius: 8px;
  background: #f8a420;
  color: #ffffff;
  &:hover{
    color: #ffffff;
    border: 1px solid #dddddd;
   }
}
.buy-header-content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .header-left{
    display: flex;
    align-items: center;
    .ant-menu{
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 25px;
      border: none;
      color: #888888;
      .ant-menu-item{
        height: 100%;
        line-height: 83px;
        /*color: #888;*/
        width: auto;
        padding-right: 15px;
        padding-left: 15px;
        margin: 0 20px;
        font-size: 16px;
        text-align: center;
      }
    }
  }

  .user-dropdown-menu{
    cursor: pointer;
  }

  .user-img-box{
    padding: 5px;
    background-color: #f6a520;
    border-radius: 50%;
    margin-right: 8px;
    i{
      font-size: 20px;
      color: #ffffff;
    }
  }
}

.user-dropdown-menu-wrapper.ant-dropdown-menu .ant-dropdown-menu-item{
  width: auto;
}

@media screen and (max-width: 768px) {
  .ant-menu{
    display: none!important;
  }
}
</style>