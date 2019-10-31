<template>
  <div class="logo">
    <router-link :to="{name:'index'}">
      <!--<LogoSvg alt="logo" />-->
      <!--<h1 v-if="showTitle">{{ title }}</h1>-->
      <img :src="logo" alt="" style="width: 155px;height:  47px" v-if="sidebar">
      <img :src="smallLogo" alt="" style="width: 60px;height:  60px" v-else-if="!sidebar">
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'
import logo from '@/assets/yunaiLogo.png'
import { mapState, mapActions } from 'vuex'
import smallLogo from '@/assets/smallLogo.png'
export default {
  name: 'Logo',
  data(){
    return{
      logo: logo,
      smallLogo: smallLogo
    }
  },
  components: {
    // LogoSvg
  },
  computed: {
    ...mapState({
      // 动态主路由
      sidebar: state => state.app.sidebar
    })
  },
  props: {
    title: {
      type: String,
      default: 'aihpc',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style lang="less" scoped>
  .sider{
    .logo{
      padding-left: 10px;
    }
  }
</style>
