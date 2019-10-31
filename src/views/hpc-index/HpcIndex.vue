<template>
  <div class="page-content">
    <a-layout>
      <!--<a-layout-header>-->
        <!---->
      <!--</a-layout-header>-->
      <a-layout-content>

        <div class="content" style="height: 100%">
          <buyHeader class="index-header" :class="{'scroll-header':isFiexdHeader}"></buyHeader>
          <a-row class="banner-box" id='banner'>
            <div class="banner-center-box">
              <a-col :xs="24" :sm="24" :md="24">
              <div class="top-buy-box">
                <p>AI在线推理</p>
                <p>自主研发</p>
                <p>大规模分布式计算平台</p>
                <div>
                  <a-button class="buy-btn">
                    <router-link :to="{ name: 'buy' }">
                      购买
                    </router-link>
                  </a-button>
                </div>
              </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" class="top-text-box">
              <a-row>
                <a-col :xs="24" :sm="24" :md="4" class="textico-box">
                <div class="text-ico"></div>
                <!--{/*<img src={topico} alt="" class={styles['text-ico']}/>*/}-->
                <!--{/*<Icon type='AIsuanliyinqing-huidu'></Icon>*/}-->
                </a-col>
                <a-col :xs="24" :sm="24" :md="20" class="text-box">
                AI在线推理由叆云完全自主研发，面向AI在线服务的大规模分布式AI算力平台。利用云计算技术，用户可低成本、快速、便捷
                获取AI算力，平台自动完成AI请求的负载均衡，具备高可用、高安全等特点，用户能自定义满足医疗影像、语音识别、 自然
                语言处理等众多AI领域的计算需求。
                </a-col>
              </a-row>
              </a-col>
            </div>
            <div class="bannerBgBox">
              <img src="" alt=""/>
            </div>
            <div class="bevel"></div>
          </a-row>

          <div class="features-box">
            <div class="center-box">
              <a-row :gutter="24">
                <a-col :xs="24" :sm="24" :md="24">
                <p><span>产品特色</span></p>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" class="item-box">
                <div class="ico-box">

                  <!--{/*<Icon type="AIyingyongzhuanxiang"></Icon>*/}-->
                </div>
                <div class="text-box">
                  <h2>AI应用专享</h2>
                  <div>支持异构设备分布式计算的Tensorflow框架，适配AI机器学习和深度学习</div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" class="item-box" >
                <div class="ico-box ico-box2">
                  <!--{/*<Icon type="beishusuanli"></Icon>*/}-->
                </div>
                <div class="text-box">
                  <h2>倍速算力</h2>
                  <div>十万核级别计算资源池，算力加倍，充分保障指数级数据增长的算力需求</div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" class="item-box">
                <div class="ico-box ico-box3">
                  <!--{/*<Icon type="danxingshensuo"></Icon>*/}-->
                </div>
                <div class="text-box">
                  <h2>弹性伸缩</h2>
                  <div>秒级快速按需自动扩张或缩减计算资源配比，满足快速变化的业务需求</div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" class="item-box">
                <div class="ico-box ico-box4">
                  <!--{/*<Icon type="linghuobushu"></Icon>*/}-->
                </div>
                <div class="text-box">
                  <h2>灵活部署</h2>
                  <div>适用于各种应用场景，按照实际计算资源消耗收费，不需担心资源闲置浪费</div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" class="item-box">
                <div class="ico-box ico-box5">
                  <!--{/*<Icon type="anquangaokeyong"></Icon>*/}-->
                </div>
                <div class="text-box">
                  <h2>安全高可用</h2>
                  <div>计算节点集群化，提供容灾保障，且用户间存储、网络、计算资源相互隔离，安全可靠</div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" class="item-box">
                <div class="ico-box ico-box6">
                  <!--{/*<Icon type="keshihuaguanli"></Icon>*/}-->
                </div>
                <div class="text-box">
                  <h2>可视化管理</h2>
                  <div>一键快速自动化部署交付使用，支持可视化业务调控/监控，降低管理难度及成本</div>
                </div>
                </a-col>
              </a-row>
            </div>
          </div>

          <div class="function-box">
            <div class="center-box">
              <h1>产品功能</h1>
              <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="6" class="gutter-a-row">
                <div  class="item-box">
                  <h2 class="item-tit">迁移部署</h2>
                  <div class="item-detail">
                    提供自动化部署工具，一键从本地迁移部署到AI算力引擎平台
                  </div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" class="gutter-a-row">
                <div  class="item-box item-box2">
                  <h2 class="item-tit">批量管理</h2>
                  <div class="item-detail">
                    您可以在线批量管理AI服务，包括暂停、销毁、监控等操作
                  </div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" class="gutter-a-row">
                <div  class="item-box item-box3">
                  <h2 class="item-tit">版本管理</h2>
                  <div class="item-detail">
                    支持同一服务多版本部署，流量控制，版本回滚，并可在线查询服务版本情况
                  </div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" class="gutter-a-row">
                <div  class="item-box item-box4">
                  <h2 class="item-tit">监控告警</h2>
                  <div class="item-detail">
                    实时采集服务运行状态，支持进程监控、可用性监控及异常状态的及时报警
                  </div>
                </div>
                </a-col>
              </a-row>
            </div>
            <div class="round-box1"></div>
            <div class="round-box2"></div>
            <div class="round-box3"></div>
          </div>

          <div class="scenario-box">
            <div class="center-box">
              <h1>应用场景</h1>
              <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="8" class="gutter-a-row">
                <div class="item-box">
                  <h2>图像识别</h2>
                  <div class="item-detail">
                    <h3>图像识别</h3>
                    <div class="detail-text">
                      人脸识别是AI图像识别最常见的应用，要对上万甚至上亿张脸进行快速识别并处理，高效的算力必不可少。
                      AI算力引擎平台与图像识别框架高度融合，在十万核级别计算资源池的支撑下，可秒级处理图像。
                    </div>
                  </div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" class="gutter-a-row">
                <div class="item-box item-box2">
                  <h2>语音识别</h2>
                  <div class="item-detail">
                    <h3>语音识别</h3>
                    <div class="detail-text">
                      在智能家居、智能车载、智能客服机器人等语音识别领域，AI通过对音量、音调、音色进行识别认知，AI算力引擎平台
                      提供处理动力，在算法的配合下高速将语音转化为AI系统的反馈行为。
                    </div>
                  </div>
                </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" class="gutter-a-row">
                <div class="item-box item-box3">
                  <h2>自然语言处理</h2>
                  <div class="item-detail">
                    <h3>自然语言处理</h3>
                    <div class="detail-text">
                      自然语言理解需要AI系统进行海量的数据训练，才有可能对文本的理解、分类、摘要、信息抽取、知识问答等做出正确反应。
                      AI算力引擎平台提供对海量数据的处理需求，具备超高负荷及特殊环境下数据处理与分析的运转能力。
                    </div>
                  </div>
                </div>
                </a-col>
              </a-row>
            </div>
          </div>

          <div class="footer-box">
            <div class="center-box">
              ©YUN.AI,北京叆云云计算有限公司
            </div>
          </div>
        </div>

      </a-layout-content>
      <!--<a-layout-footer>Footer</a-layout-footer>-->
    </a-layout>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import buyHeader from '@/components/Buy/BuyHeader.vue'
  export default {
    name: 'BuyLaout',
    data(){
      return {
        isFiexdHeader: false
      }
    },
    mounted(){
      window.addEventListener('scroll',this.handleScroll,true)
    },
    components: {
      // NoticeIcon
      buyHeader
    },
    methods: {
      handleScroll: function (e) {
        let scrollTop = e.target.scrollTop;
        if(scrollTop>300){
          this.isFiexdHeader = true;
        }
      }
    },
    destroyed(){
      window.removeEventListener('scroll',this.handleScroll,true)
    }
  }
</script>
</script>

<style lang="less" scoped>
@media (min-width: 768px) {
.centerBox(){
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 100px;
  }
  .index-header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    height: 85px;
    padding: 20px;
    &.scroll-header{
      position: fixed;
      background-color: #591fb2;
    }
    /deep/ .user-dropdown-menu{
      float: right;
      color: #fff;
      padding-right: 30px;
    }
    & /deep/ .ant-menu-item:hover{
      color: #f8a420;
      border-bottom: #f8a420 2px solid!important;
    }
  }
.index-header /deep/ .ant-menu {
    background-color: transparent;
    color: #fff!important;
  }
.index-header /deep/  .ant-menu-item-selected{
    color: #f8a420;
    border-bottom: #f8a420 2px solid!important;
  }
.content{
  position: relative;
  .banner-box{
      height: 670px;
      background-color: #591fb2;
      background-image: url("../../assets/index/banner-bg.jpg");
      background-repeat: no-repeat;
      background-position: 85% -40px;
      background-size: contain;
    .banner-center-box{
        width: 1200px;
        margin: 0 auto;
      .top-buy-box{
          color: #ffffff;
          margin-top: 160px;
          p{
            font-size: 24px;
            margin-bottom: 0;
          };
          p:first-child{
            font-size: 40px;
            font-weight: 500;
          }
        .buy-btn{
            margin-top: 40px;
            font-size: 16px;
            border-color: #591fb2;
            width: 130px;
            height: 40px;
            background-color: #f8a420;
            color: #ffffff;
          }
        }
      .top-text-box{
          margin-top: 138px;
          background-color: #ffffff;
          border-radius: 5px;
          padding: 0px 70px 0px 70px;
          color: #666666;
          font-size: 16px;
          -moz-box-shadow:0px 2px 5px #ECECEC;
          -webkit-box-shadow:0px 2px 5px #ECECEC;
          box-shadow:0px 2px 5px #ECECEC;
          z-index: 2;
        .textico-box{
            width: 150px;
            height: 150px;
            //line-height: 130px;
            //font-size: 108px;
            //color: #ddd;
          .text-ico{
              width: 90px;
              height: 90px;
              background-image: url("../../assets/index/banner-icoN.png");
              background-size: cover;
              background-repeat: no-repeat;
              position: relative;
              top: 28px;
            }
          }
        .text-box{
            padding: 30px 0 45px 0;
            line-height: 26px;
          }
        }
      .top-text-box:hover .text-ico{
          background-image: url("../../assets/index/banner-icoY.png");
        }
      }

    .bevel{
        position: absolute;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 140px solid #ffffff;
        border-right: calc(98vw) solid transparent;
      }
    }

  .features-box{
      background-color: #ffffff;
    .center-box{
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 55px;
        p{
          text-align: center;
          padding: 100px 0 70px 0;
          margin-bottom: 0;
          span{
            font-size: 36px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 0;
          }
        }
      .item-box{
          margin-bottom: 60px;
        .ico-box,.ico-box2,.ico-box3,.ico-box4,.ico-box5,.ico-box6{
            //float: left;
            display: inline-block;
            font-size: 52px;
            color: #f8a420;
            width: 80px;
            height: 80px;
            background-image: url("../../assets/index/features01.png");
            background-size: 58px 58px;
            background-repeat: no-repeat;
            i{
              position: absolute;
              top: 2px;
            }
          }
        .ico-box2{
            background-image: url("../../assets/index/features02.png");
          }
        .ico-box3{
            background-image: url("../../assets/index/features03.png");
          }
        .ico-box4{
            background-image: url("../../assets/index/features04.png");
          }
        .ico-box5{
            background-image: url("../../assets/index/features05.png");
          }
        .ico-box6{
            background-image: url("../../assets/index/features06.png");
          }

        .text-box{
            //float: left;
            display: inline-block;
            color: #666666;
            font-size: 16px;
            width: 490px;
            h2{
              margin-bottom: 0;
              font-size: 24px;
              font-weight: 500;
              color: #333333;
            }
          }
        }
      }
    }

  .function-box{
      background-color: #591fb2;
      position: relative;
    .center-box{
      .centerBox;
        h1{
          color: #ffffff;
          font-size: 36px;
          font-weight: bold;
          padding: 90px 0 50px 0;
          text-align: center;
        }
      .item-box, .item-box2, .item-box3, .item-box4{
          position: relative;
          z-index: 4;
          background-color: #591fb2;
          height: 450px;
          padding: 40px 30px 0 30px;
          border: 1px solid #8f5bde;
          border-radius: 5px;
          width: 280px;
          background-image: url("../../assets/index/function-ico1.png");
          background-position: 59px 245px;
          background-repeat: no-repeat;
          transition: .5s;
        .item-tit{
            font-size: 24px;
            color: #ffffff;
            font-weight: 500;
          }
        .item-detail{
            font-size: 16px;
            color: #d4bef5;
          }
        }
      .item-box:hover, .item-box2:hover, .item-box3:hover, .item-box4:hover{
          background-image: url("../../assets/index/function-ico1s.png");
          background-color: #6830bf;
          -moz-box-shadow:0px 3px 10px #421586;
          -webkit-box-shadow:0px 3px 10px #421586;
          box-shadow:0px 3px 10px #421586;
          background-position: 59px 155px;
        }
      .item-box2{
          background-image: url("../../assets/index/function-ico2.png");
        }
      .item-box2:hover{
          background-image: url("../../assets/index/function-ico2s.png");
          background-position: 59px 165px;
        }
      .item-box3{
          background-image: url("../../assets/index/function-ico3.png");
        }
      .item-box3:hover{
          background-image: url("../../assets/index/function-ico3s.png");
        }
      .item-box4{
          background-image: url("../../assets/index/function-ico4.png");
        }
      .item-box4:hover{
          background-image: url("../../assets/index/function-ico4s.png");
          background-position: 59px 170px;
        }
      }
    .round-box1, .round-box2, .round-box3{
        position: absolute;
        bottom: -383px;
        left: 50%;
        margin-left: -325px;
        width: 650px;
        height: 520px;
        border-radius: 50%;
        border: 1px solid #c5a9f0;
        opacity: 0.3;
        filter:alpha(opacity=30);
        z-index: 3;
      }
    .round-box2{
        width: 1100px;
        height: 1000px;
        opacity: 0.2;
        filter: alpha(opacity=20);
        margin-left: -550px;
        bottom: -740px;
      }
    .round-box3{
        width: 1400px;
        height: 1200px;
        opacity: 0.1;
        filter: alpha(opacity=10);
        margin-left: -700px;
        bottom: -817px;
      }
    }

  .scenario-box{
      background-color: #f7f7f7;
      position: relative;
      z-index: 5;
    .center-box{
      .centerBox;
        h1{
          color: #000000;
          font-size: 36px;
          font-weight: bold;
          padding: 90px 0 50px 0;
          text-align: center;
        }
      .item-box,.item-box2,.item-box3{
          height: 500px;
          width: 380px;
          border-radius: 5px;
          text-align: center;
          //line-height: 500px;
          background-image: url("../../assets/index/scenario-bg1.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          overflow: hidden;
        &:hover{
            -moz-box-shadow:0px 5px 10px #ECECEC;
            -webkit-box-shadow:0px 5px 10px #ECECEC;
            box-shadow:0px 5px 10px #ECECEC;
          }
        &:hover .item-detail{
            left: 0;
          }
          h2{
            margin-top: 230px;
            font-size: 34px;
            color: #ffffff;
            font-weight: 500;
          }
        .item-detail{
            position: absolute;
            left: -380px;
            bottom: 0;
            width: 100%;
            height: 300px;
            padding: 40px 35px;
            text-align: left;
            background-color: #ffffff;
            font-size: 16px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            color: #666666;
            transition: .3s;
            h3{
              text-align: center;
              font-size: 24px;
              color: #333333;
              font-weight: 500;
            }
          }
        }
      .item-box2{
          background-image: url("../../assets/index/scenario-bg2.jpg");
        }
      .item-box3{
          background-image: url("../../assets/index/scenario-bg3.jpg");
        }
      }
    }

  .footer-box{
      height: 200px;
      line-height: 200px;
      background-color: #eeeeee;
    .center-box{
      .centerBox;
        padding-bottom: 0;
        font-size: 14px;
        color: #666666;
      }
    }

  }
}

@media (max-width: 575px){
.centerBox(){
    width: 100%;
    margin: 0 auto;
    //padding-bottom: 100px;
  }
.content{
  .banner-box{
      background-color: #591fb2;
      // background-image: url("../../assets/index/banner-bg.jpg");
      background-repeat: no-repeat;
      background-position: 59px 47%;
      background-size: contain;
    .banner-center-box{
        width: 100%;
        margin: 0 auto;
        padding-top: 50px;
      .top-buy-box{
          color: #ffffff;
          padding: 25px 0 130px 25px;
          p{
            font-size: 18px;
            margin-bottom: 0;
          };
          p:first-child{
            font-size: 26px;
            font-weight: bold;
          }
        .buy-btn{
            margin-top: 40px;
            font-size: 16px;
            border-color: #591fb2;
            width: 130px;
            height: 40px;
            background-color: #f8a420;
            color: #ffffff;
          }
        }
      .top-text-box{
          margin-top: 40px;
          background-color: #ffffff;
          border-radius: 5px;
          color: #666666;
          font-size: 16px;
        .textico-box{
            display: none;
          }
        .text-box{
            line-height: 26px;
            padding: 15px;
            text-indent: 30px;
          }
        }
      }
    }

  .features-box{
      background-color: #ffffff;
    .center-box{
        width: 100%;
        margin: 0 auto;
        p{
          text-align: center;
          padding: 25px 0 10px 0;
          margin-bottom: 0;
          span{
            font-size: 28px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 0;
          }
        }
      .item-box{
          margin-bottom: 60px;
        .ico-box, .ico-box2, .ico-box3, .ico-box4, .ico-box5, .ico-box6{
            display: inline-block;
            font-size: 52px;
            color: #f8a420;
            width: 17%;
            height: 70px;
            background-image: url("../../assets/index/features01.png");
            background-size: 58px 58px;
            background-repeat: no-repeat;
            background-position: 6px;
            i{
              position: absolute;
              top: 0;
            }
          }
        .ico-box2{
            background-image: url("../../assets/index/features02.png");
          }
        .ico-box3{
            background-image: url("../../assets/index/features03.png");
          }
        .ico-box4{
            background-image: url("../../assets/index/features04.png");
          }
        .ico-box5{
            background-image: url("../../assets/index/features05.png");
          }
        .ico-box6{
            background-image: url("../../assets/index/features06.png");
          }
        .text-box{
            display: inline-block;
            color: #666666;
            font-size: 14px;
            padding-left: 10px;
            width: 83%;
            h2{
              margin-bottom: 0;
              font-size: 20px;
              font-weight: bold;
              color: #333333;
            }
          }
        }
      }
    }

  .function-box{
      background-color: #591fb2;
    .center-box{
      .centerBox;
        h1{
          color: #ffffff;
          font-size: 28px;
          font-weight: bold;
          padding: 25px 0 10px 0;
          text-align: center;
        }
      .item-box, .item-box2, .item-box3, .item-box4{
          height: 170px;
          padding: 40px 30px 0 30px;
          border: 1px solid #8f5bde;
          border-radius: 5px;
          width: 100%;
          background-image: url("../../assets/index/function-ico1.png");
          background-position: right bottom;
          background-repeat: no-repeat;
          background-size: contain;
          transition: .2s;
        .item-tit{
            font-size: 20px;
            color: #ffffff;
            font-weight: 500;
          }
        .item-detail{
            font-size: 16px;
            color: #d4bef5;
          }
        }
      .item-box:hover{
          background-color: #6830bf;
          -moz-box-shadow:0px 3px 10px #421586;
          -webkit-box-shadow:0px 3px 10px #421586;
          box-shadow:0px 3px 10px #421586;
          background-position: 90px 210px;
        }
      .item-box2{
          background-image: url("../../assets/index/function-ico2.png");
        }
      .item-box3{
          background-image: url("../../assets/index/function-ico3.png");
        }
      .item-box4{
          background-image: url("../../assets/index/function-ico4.png");
        }
      }
    }

  .scenario-box{
      background-color: #f7f7f7;
    .center-box{
      .centerBox;
        h1{
          color: #000000;
          font-size: 28px;
          font-weight: bold;
          padding: 25px 0 10px 0;
          text-align: center;
        }
      .item-box,.item-box2,.item-box3{
          height: 500px;
          width: 380px;
          border-radius: 5px;
          text-align: center;
          //line-height: 500px;
          background-image: url("../../assets/index/scenario-bg1.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          overflow: hidden;
        &:hover{
            -moz-box-shadow:0px 5px 10px #ECECEC;
            -webkit-box-shadow:0px 5px 10px #ECECEC;
            box-shadow:0px 5px 10px #ECECEC;
          }
        &:hover .item-detail{
            left: 0;
          }
          h2{
            margin-top: 230px;
            font-size: 20px;
            color: #ffffff;
            font-weight: 500;
          }
        .item-detail{
            position: absolute;
            left: 0px;
            bottom: -1px;
            width: 100%;
            height: 300px;
            padding: 40px 35px;
            text-align: left;
            background-color: #ffffff;
            font-size: 16px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            color: #666666;
            transition: .3s;
            h3{
              text-align: center;
              font-size: 20px;
              color: #333333;
              font-weight: 500;
            }
          }
        }
      .item-box2{
          background-image: url("../../assets/index/scenario-bg2.jpg");
        }
      .item-box3{
          background-image: url("../../assets/index/scenario-bg3.jpg");
        }
      }
    }

  .footer-box{
      height: 100px;
      line-height: 100px;
      background-color: #eeeeee;
      text-align: center;
    .center-box{
      .centerBox;
        padding-bottom: 0;
        font-size: 14px;
        color: #666666;
      }
    }

  }
}
</style>