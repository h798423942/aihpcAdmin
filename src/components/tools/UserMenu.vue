<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!--<a href="https://pro.loacg.com/docs/getting-started" target="_blank">-->
        <!--<span class="action">-->
          <!--<a-icon type="question-circle-o"></a-icon>-->
        <!--</span>-->
      <!--</a>-->
      <!--<notice-icon class="action"/>-->
      <a-dropdown>
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
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    // NoticeIcon
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
          that.$router.push({name: 'login'})
          window.location.reload()
          return that.Logout({}).then(() => {
            // window.location.reload()
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
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
