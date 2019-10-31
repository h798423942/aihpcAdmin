<template>
  <iframe :src="src" class="iframe-content" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
</template>
<script>
  import { getHpcSshInfoById } from '@/api/aihpc'
  export default {
    name: 'sshPage',
    data () {
      return {
        baseUrl: window.location.port ? `${window.location.protocol}//${window.location.hostname}:
                ${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`,
        // src: 'https://yun.ai/console'
        src: '',
      }
    },
    methods: {
      getSshInfoById: function () {
        let that = this;
        let params = {
          _id: this.$route.params.id
        };
        getHpcSshInfoById(params).then((res)=>{
          let data = res && res.data ? res.data.rows : [];
          let hostName= data._publicIp; //_publicIp
          let username= data._sshAccout; // _sshAccout
          let password= window.btoa(data._sshPasswd); // _sshPasswd
          that.src = `${that.baseUrl}/console/?hostname=${hostName}&username=${username}&password=${password}`
        }).catch((err)=>{
          that.$message.error("获取SSH信息失败")
        })
      }
    },
    mounted () {
      this.getSshInfoById()
    },
    beforeDestroy () {

    }
  }
</script>
<style lang="less" scoped>
  .iframe-content{
    width: 100%;
    height: 100%;
    min-height: 620px;
  }
</style>