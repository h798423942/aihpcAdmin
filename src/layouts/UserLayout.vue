<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/loginLogo.png" class="logo" alt="logo">
          </a>
        </div>
        <div class="desc">

        </div>
      </div>

      <route-view :key="key"></route-view>


    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  computed:{
    key(){
      return this.$route.path + Math.random();
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
    // this.initCanvas()
  },
  methods: {
    initCanvas: function () {
      let c = document.createElement('canvas').getContext('2d')
      let postctx = document.getElementById('userLayout').appendChild(document.createElement('canvas')).getContext('2d')
      let canvas = c.canvas
      let vertices = []

// Effect Properties
      let vertexCount = 7000
      let vertexSize = 3
      let oceanWidth = 204
      let oceanHeight = -80
      let gridSize = 32;
      let waveSize = 16;
      let perspective = 100;

// Common variables
      let depth = (vertexCount / oceanWidth * gridSize)
      let frame = 0
      let { sin, cos, tan, PI } = Math

// Render loop
      let loop = () => {
        let rad = sin(frame / 100) * PI / 20
        let rad2 = sin(frame / 50) * PI / 10
        frame++
        if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) {
          postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
          postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
        }


        c.fillStyle = `hsl(200deg, 100%, 2%)`
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)

        c.beginPath()
        vertices.forEach((vertex, i) => {
          let ni = i + oceanWidth
          let x = vertex[0] - frame % (gridSize * 2)
          let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0)
          let wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000))
          let y = vertex[1] + wave * waveSize
          let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
          let tx, ty, tz

          y -= oceanHeight

          // Transformation variables
          tx = x
          ty = y
          tz = z

          // Rotation Y
          tx = x * cos(rad) + z * sin(rad)
          tz = -x * sin(rad) + z * cos(rad)

          x = tx
          y = ty
          z = tz

          // Rotation Z
          tx = x * cos(rad) - y * sin(rad)
          ty = x * sin(rad) + y * cos(rad)

          x = tx;
          y = ty;
          z = tz;

          // Rotation X

          ty = y * cos(rad2) - z * sin(rad2)
          tz = y * sin(rad2) + z * cos(rad2)

          x = tx;
          y = ty;
          z = tz;

          x /= z / perspective
          y /= z / perspective



          if (a < 0.01) return
          if (z < 0) return


          c.globalAlpha = a
          c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 50%)`
          c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize)
          c.globalAlpha = 1
        })
        c.restore()

        // Post-processing
        postctx.drawImage(canvas, 0, 0)

        postctx.globalCompositeOperation = "screen"
        postctx.filter = 'blur(16px)'
        postctx.drawImage(canvas, 0, 0)
        postctx.filter = 'blur(0)'
        postctx.globalCompositeOperation = "source-over"

        requestAnimationFrame(loop)
      }

// Generating dots
      for (let i = 0; i < vertexCount; i++) {
        let x = i % oceanWidth
        let y = 0
        let z = i / oceanWidth >> 0
        let offset = oceanWidth / 2
        vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
      }

      loop()
    }
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;
  /*background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;*/
  background: #f0f2f5;
  background-size: 100%;
    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      position: absolute;
      left:50%;
      top:40%;
      transform: translate(-50%, -50%);
      /*min-height: 100%;*/
      /*background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;*/
      /*background-size: 100%;*/
      /*padding: 110px 0 144px;*/
      /*position: relative;*/

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
