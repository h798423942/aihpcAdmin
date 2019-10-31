<template>
  <!--<div class="console-content" id="terminal"></div>-->
  <iframe :src="src" class="iframe-content" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
</template>
<script>
  import { Terminal } from 'xterm';
  // import { FitAddon } from 'xterm-addon-fit';
  // import 'xterm/css/xterm.css'
  // import { AttachAddon } from 'xterm-addon-attach';
  // import Terminal from 'xterm/lib/xterm.js'
  import { getHpcSshInfoById } from '@/api/aihpc'
  export default {
    name: 'Console',
    // props: {
    //   terminal: {
    //     type: Object,
    //     default: {}
    //   }
    // },
    data () {
      // let baseUrl = window.location.port ? `${window.location.protocol}//${window.location.hostname}:
      //           ${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`
      // let iframeUrl =`http://10.0.0.114:8888/?host=${this.$route.params.hostname}&username=${this.$route.params.username}&password=${this.$route.params.pwd}`
      // console.log(iframeUrl)
      return {
        term: null,
        terminalSocket: null,
        baseUrl: window.location.port ? `${window.location.protocol}//${window.location.hostname}:
                ${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`,
        // src: 'https://yun.ai/console'
        src: '',
        sshInfo: {}
      }
    },
    methods: {
      getSshInfoById: function () {
        let that = this;
        let params = {
          _id: this.$route.params.id
        }
        getHpcSshInfoById(params).then((res)=>{
          let data = res && res.data ? res.data.rows : [];
          that.sshInfo = data;
          let hostName= data._publicIp; //_publicIp
          let username= data._sshAccout; // _sshAccout
          let password= window.btoa(data._sshPasswd); // _sshPasswd
          that.src = `http://10.0.0.114:8888/?hostname=${hostName}&username=${username}&password=${password}`
        }).catch((err)=>{
          that.$message.error("获取SSH信息失败")
        })
      }
    },
    mounted () {
      this.getSshInfoById()
      // console.log('pid : ' + this.terminal.pid + ' is on ready')
      // let terminalContainer = document.getElementById('terminal')
      // this.term = new Terminal({
      //   cols: 79,
      //   rows: 22,
      //   cursorBlink: true, // 光标闪烁
      //   cursorStyle: "bar", // 光标样式  null | 'block' | 'underline' | 'bar'
      //   scrollback: 800, //回滚
      //   tabStopWidth: 8, //制表宽度
      //   // disableStdin: true,
      //   screenKeys: true
      // })
      // let websocket = new WebSocket('ws:10.0.0.114');//地址
      // websocket.binaryType = "arraybuffer";
      // //连接成功
      // websocket.onopen = function(evt) {
      //   console.log("onopen", evt);
      //   this.term.writeln(
      //     "******************************************************************"
      //   );
      // };
      // let that = this
      // const fitAddon = new FitAddon();
      // // const attachAddon = new AttachAddon(websocket);
      // // this.term.loadAddon(attachAddon);
      // this.term.loadAddon(fitAddon);
      // this.term.open(terminalContainer);
      // this.term.write('Hello from \x1B[1;3;31maihpc ssh\x1B[0m $ ')
      // this.term._initialized = true
      // this.term.onData(function(data) {
      //   console.log(data)
      //   that.term.write(data)//输入
      //   // that.term.writeln(data)//输入并换行
      // })
      // this.term.attachCustomKeyEventHandler(function (ev) {
      //   if (ev.keyCode && ev.keyCode === 13) {
      //     console.log(ev.keyCode)
      //     that.term.writeln('')//输入并换行
      //   }
      // })
      // console.log('mounted is going on')
      // fitAddon.fit()
    },
    beforeDestroy () {
      // this.terminalSocket.close()
      // this.term.destroy()
    }
  }
</script>
<style lang="less" scoped>
  .iframe-content{
    width: 100%;
    height: 100%;
    min-height: 620px;
  }
  .xterm .xterm-viewport{
      overflow-y: hidden;
  }
</style>