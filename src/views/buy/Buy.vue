<template>
  <div class="page-content">
    <a-layout>
      <a-layout-header>
        <buyHeader></buyHeader>
      </a-layout-header>
      <a-layout-content>
          <div class="buy-center-content">
              <div class="tit">创建AI超算服务</div>
              <div class="center-item-content">
                <a-form :layout="formLayout">
                  <!--超算中心-->
                  <a-row type="flex" justify="start" class="items">
                    <a-col :span="5" class="items-tit">
                      <i class="iconfont anticon-diyu"></i>
                      <span>超算中心</span>
                    </a-col>
                    <a-col :span="19">
                      <a-form-item v-bind="formItemLayout" class="item-form">
                        <a-radio-group v-decorator="['dataCenter']" :value="dataCenterDefaultValue"
                                       @change="value => dataCenterChange(value)">
                          <a-radio-button :value="items._id" v-for="items in dataCenterData">{{items._aliasName}}</a-radio-button>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!--超算中心 end-->

                  <!--应用分类-->
                  <a-row type="flex" justify="start" class="items">
                    <a-col :span="5" class="items-tit">
                      <i class="iconfont anticon-kuangjia"></i>
                      <span>应用</span>
                    </a-col>
                    <a-col :span="19">
                      <a-form-item v-bind="formItemLayout" class="item-form" style="padding-top: 0">
                        <div style="width: 90px;padding-top: 18px;display: inline-block">应用分类：</div>
                        <a-radio-group v-decorator="['applyType']" :value="applyTypeDefaultValue" @change="applyTypeChange">
                          <a-radio :value="items._id" v-for="items in applyTypeData">{{items._name}}</a-radio>
                        </a-radio-group>
                      </a-form-item>

                      <div class="framework-img-content"
                           v-for="items in applyData"
                           :key="items._id"
                           @click="applyChange(items._id)"
                      >
                        <div class="framework-item" :class="{'checkd': items.isSelectd}">
                          <!--<div class="frameIcoBox">-->
                            <!--<div class="frameIcoTop">-->
                              <!--荐-->
                            <!--</div>-->
                            <!--<div class="frameIcoAngle"></div>-->
                          <!--</div>-->
                          <img :src="'http://10.0.0.114:83'+items._img" alt="" style="width: 100%">
                          <div class="frame-name">{{items._name}}</div>
                        </div>
                      </div>

                    </a-col>
                  </a-row>
                  <!--应用分类 end-->

                  <!--核数-->
                  <a-row type="flex" justify="start" class="items" style="padding-bottom: 80px">
                    <a-col :span="5" class="items-tit">
                      <i class="iconfont anticon-AIsuanliyinqing"></i>
                      <span>核数</span>
                    </a-col>
                    <a-col :span="19">

                      <a-form-item v-bind="formItemLayout" class="item-form" style="padding-top: 0">
                        <div style="width: 50px;padding-top: 18px;display: inline-block">规格：</div>
                        <a-radio-group v-decorator="['specifications']" :value="specificationsDefaultValue" @change="specificationsChange">
                          <a-radio :value="items._id" v-for="items in specificationsData" :key="items._id">{{items._name}}</a-radio>
                        </a-radio-group>
                      </a-form-item>

                      <a-form-item v-bind="formItemLayout" class="item-form">
                        <a-slider
                          v-decorator="['slider']"
                          :tipFormatter="sliderParams.tipFormatter"
                          placement="bottom"
                          :step="sliderParams.step"
                          :marks="sliderParams.mark"
                          :min="sliderParams.min"
                          :value="sliderParams.value"
                          @change="sliderChange"
                        >
                        </a-slider>

                        <a-row type="flex" justify="start">
                          <a-col :span="24">
                            <div class="slider-tooltip" :style="{left: sliderParams.sliderTipLeft}"
                                 style="position: relative;margin-left: -115px; margin-top: 22px">
                                  <span class="arrow-top" style="margin-left: 110px"></span>
                              <a-card class="slide-card">
                                <p class="card-title">配置信息:</p>
                                <p class="card-config">CPU: {{specifications._name}}</p>
                                <p class="card-config">核数: {{specifications._kernelNum}}核</p>
                                <p class="card-config">内存: {{specifications._memSize}}G</p>
                              </a-card>
                            </div>
                          </a-col>
                        </a-row>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!--核数 end-->

                  <!--付费方式-->
                  <a-row type="flex" justify="start" class="items">
                    <a-col :span="5" class="items-tit">
                      <i class="iconfont anticon-fukuanfangshi"></i>
                      <span>付费方式</span>
                    </a-col>
                    <a-col :span="19">
                      <a-button class="money-btn">按量付费</a-button>
                      <p class="money-text">账户金额不得低于100元，按小时计费，按天出账单</p>
                    </a-col>
                  </a-row>
                  <!--付费方式 end-->

                </a-form>

                <div class="item-bottom-content">
                  <a-row type="flex" justify="start" class="options-items">
                    <a-col :span="6">超算中心： {{dataCenter.name}}</a-col>
                    <a-col :span="6">应用分类： {{applyType.name}}</a-col>
                    <a-col :span="6">应用： {{apply.name}}</a-col>
                    <a-col :span="6">核数： {{kernelNum}}核</a-col>
                    <a-col :span="6" style="margin-top: 5px">规格： {{specifications._name}}</a-col>
                    <a-col :span="6" style="margin-top: 5px">付费方式： 按量付费</a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" class="options-btn-content">
                    <a-col :span="4">配置费用：<span class="amount">{{price}}</span></a-col>
                    <a-col :span="8" style="text-align: right">
                      <span class="no-buy-text" v-if="!isBuy">当前无可购买核数</span>
                      <a-button type="primary" class="buy-btn" @click="subBuyInfo"
                                :loading="buyBtnLoading"
                                :disabled="!isBuy">
                        购买当前配置
                      </a-button>
                    </a-col>
                  </a-row>
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
  import { getBuyDetail, getBuyMaxNode, subBuyInfo } from "@/api/aihpc"
  export default {
    name: 'BuyLaout',
    data(){
      return {
        sliderParams: {
          value: 0,
          step: null,
          mark: {},
          min: 0,
          tipFormatter: null,
          sliderTipLeft: 'calc( 0% - 0px)'
        },
        isBuy: false,
        buyBtnLoading: false,
        formLayout: 'horizontal',
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 2 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 22 },
          },
        },
        dataCenterData: [],
        dataCenterDefaultValue: '',
        applyTypeDefaultValue: '',
        specificationsDefaultValue: '',
        applyTypeData: [],
        applyData: [],
        specificationsData: [],
        sliderData: {},
        dataCenter: {
          name: '',
          id: ''
        },
        applyType: {
          name: '',
          id: ''
        },
        apply: {
          name: '',
          id: ''
        },
        specifications: {},
        kernelNum: 0,
        price: 0
      }
    },
    components: {
      buyHeader
    },
    mounted () {
      this.getBuyDetailInfo()
      // this.getSliderMarks()
    },
    methods: {
      getBuyDetailInfo: function () {
        let that = this;
        getBuyDetail().then(res =>{
          let data = res && res.data ? res.data.rows : [];
          that.dataCenterData = data;
          that.dataCenterChange('', data[0]._id);
        }).catch(error=>{
          that.$message.error("获取购买信息失败")
        })
      },
      dataCenterChange: function (e, id) {
        const that = this;
        let data = [];
        let value = id ? id : e.target.value;
        that.dataCenterData.forEach(function (items) {
          if(value === items._id){
            data = items;
          }
        });
        that.dataCenter = {
          name: data._aliasName,
          id: data._id
        }
        that.dataCenterDefaultValue = value;
        that.applyTypeData = data.appType[0] ? data.appType : [];

        that.applyTypeChange('', that.applyTypeData[0]._id);
      },
      applyTypeChange: function (e, id) {
        let data = [];
        let value = id ? id : e.target.value;
        this.applyTypeData.forEach(function (items) {
          if(value === items._id){
            data = items;
          }
        });
        this.applyType.name = data._name;
        this.applyType.id = data._id;
        this.applyTypeDefaultValue = value;
        this.applyData = data.app ? data.app : [];
        this.applyChange(this.applyData[0]._id)

      },
      applyChange: function (id) {
        let data = []
        this.applyData.forEach((items, idx)=>{
          if(id === items._id){
            data = items;
          }
          items.isSelectd = id == items._id ? true : false;
        })
        this.apply.name = data._name;
        this.apply.id = data._id;
        this.specificationsData = data.machine;
        this.specificationsChange('', this.specificationsData[0]._id)
        this.$forceUpdate() //强制局部数据更新
        // this.specificationsData = this.applyData[0] ? this.applyData[0].machine : [];
      },
      specificationsChange: function (e, id) {
        let that = this;
        let data = [];
        let value = id ? id : e.target.value;
        this.specificationsDefaultValue = value;
        this.specificationsData.forEach((items, idx)=>{
          if(value === items._id){
            data = items;
          }
        })
        let params = {
          _id: value
        };
        this.specifications = data;
        this.price = data._price;
        getBuyMaxNode(params).then(res =>{
          let maxData = res && res.data ? res.data.rows : [];
          data._maxNum = maxData._maxNum;
          that.isBuy = data._maxNum!==0 ? true : false;
          // data._maxNum = 36;
          this.getSliderMarks(data);
        }).catch(error=>{
          that.$message.error("获取最大购买核数失败")
        })
      },
      getSliderMarks: function (data){
        let sObj = {};
        let arrLength = Math.ceil(data._maxNum/data._minNum);
        if(arrLength>1){
          for(let i = 1; i <= arrLength; i++){
            let val = (i)*data._minNum > data._maxNum ? data._maxNum : (i)*data._minNum
            let keyVal = (i-1)*data._minNum > data._maxNum ? data._maxNum : (i-1)*data._minNum
            let key = (Math.round(keyVal / (data._maxNum-data._minNum) * 10000) / 100.00) > 100 ? 100 :  (Math.round(keyVal / (data._maxNum-data._minNum) * 10000) / 100.00)
            sObj[key] = `${val}核`;
          }
          this.sliderParams.mark = sObj;
          // this.sliderChange(parseInt(sObj[0].substring(0,sObj[0].length - 1))); //切换时设置slider value 为0
        }else{
          sObj[0] = `${data._minNum}核`;
          this.sliderParams.mark = sObj;
        }
        this.sliderChange(0); //切换时设置slider value 为0
      },
      sliderChange: function (value) {
        console.log(value)
        this.sliderParams.value = value
        this.$forceUpdate()
        let left = '';
        if(value === 0 || value<25){
          left = '0px'
        }else if(value>=25 && value<=50){
          left = '4px'
        }else if(value>50){
          left = '10px'
        }
        this.sliderParams.sliderTipLeft = `calc( ${value}% - ${left})`;
        this.kernelNum  = this.sliderParams.mark[value].substring(0,this.sliderParams.mark[value].length - 1);
        this.specifications._kernelNum = this.kernelNum;
      },
      subBuyInfo: function (){
        let that = this;
        let params = {
          _areaId: this.dataCenter.id,
          _appTypeId: this.applyType.id,
          _appId: this.apply.id,
          _machineId: this.specifications._id,
          _appMachineId: this.specifications._appMachineId,
          _totalCoreNum: parseInt(this.kernelNum)
        }
        that.buyBtnLoading = true;
        subBuyInfo(params)
          .then((res) => {
            that.buyBtnLoading = false;
            that.$router.push({ name: 'hpclist' });
          }).catch(err => {
            that.buyBtnLoading = false;
            this.$message.error("提交购买信息失败");
        })

      }
    }
  }
</script>
</script>
<style lang="less" scoped>
.page-content{
  height: 100%;
  .ant-layout{
    // height: 100%;
    .ant-layout-header{
      height: 85px;
      background-color: #ffffff;
    }
  }

  .buy-center-content{
    width: 1000px;
    margin: 0 auto;
    padding-bottom: 135px;
    .center-item-content{
      background-color: #ffffff;
      border-radius: 2px;
      padding-bottom: 50px;
      .items{
        padding: 30px 0 15px 0;
        border-bottom: 1px solid rgba(0,0,0,.07);
        .money-btn{
          background: -webkit-gradient(linear,left top,right bottom,from(#4d75e9),to(#6f47d5));
          color: #fff;
          border-color: #fff;
        }
        .money-text{
          font-size: 14px;
          color: #bfbfbf;
          margin-top: 12px;
        }
      }
      .item-form{
        padding-top: 8px;
        // width: 80%;
      }
    .items:last-child{
        border: none;
      }

    .framework-img-content{
        .framework-item{
          position: relative;
          height: 180px;
          padding-top: 35px;
          text-align: center;
          border-radius: 4px;
          float: left;
          margin-right: 10px;
          margin-bottom: 10px;
          border: 1px solid #e8e8e8;
          cursor: pointer;
          width: 200px;
          &.checkd{
            border: 1px solid rgba(0,0,0,.07);
            background-clip: padding-box,border-box;
            background-origin: padding-box,border-box;
            background-image: linear-gradient(135deg,#fff,#fff),linear-gradient(135deg,#4d75e9,#6f47d5);
          }
          .frame-name{
            font-size: 14px;
            margin-bottom: 0;
            padding-top: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: rgba(0,0,0,.85);
            font-weight: 500;
          }
        .frameIcoBox{
            position: absolute;
            right: 10px;
            top: 0px;
          .frameIcoTop{
              color: #ffffff;
              font-size: 12px;
              padding: 2px 4px;
              background-color: #6456da;
            }
          .frameIcoAngle{
              width: 0;
              height: 0;
              border-width: 8px 10px 0;
              border-style: solid;
              border-color: #6456da transparent transparent;
            }
          }
        }
      }

    .slider-tooltip{
        height: 120px;
        width: 250px;
        line-height: 0;
      }
    .slider-tooltip /deep/ .ant-card-body{
        padding: 10px
      }
    .arrow-top{
        float: left;
        margin-top: -8px;
        font-size: 0;
        line-height: 0;
        border-width: 10px;
        border-color: #404040;
        border-top-width: 0;
        border-style: dashed;
        border-bottom-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    .slide-card{
        background-color: #404040;
        border: 1px solid #404040;
        height: auto;
        width: 250px;
        border-radius: 4px;
        margin-top: -5px;
        padding-bottom: 10px;
      .card-body-p{
          padding:10px
        }
      .card-title{
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 0;
          padding-top: 10px;
          padding-left: 20px;
          font-weight: 400;
        }
      .card-config{
          color: #888888;
          font-size: 14px;
          margin-bottom: 0;
          padding-left: 20px;
          font-weight: 400;
        }
      }


    .ant-radio-button-wrapper{
        margin-right: 10px;
        border-radius: 4px;
        border-left: 1px solid #d9d9d9;
        &.ant-radio-button-wrapper-checked{
          background: #6e48d5;
          color: #fff;
          border-color: #fff;
          border-radius: 4px;
          border: none;
        }
      }
    }

    .tit{
        font-size: 22px;
        font-weight: 400;
        color: #666;
        margin: 30px 0 20px 0;
        padding-left: 10px;
      }

    .items-tit{
      text-align: center;
      i{
        font-size: 40px;
        color: #d6d6d6;
        display: block;
        line-height: normal;
      }
      span{
        display: block;
        text-align: center;
        font-weight: 600;
        color: #888;
      }
    }
    .item-bottom-content{
      height: 130px;
      background: #fafafa;
      width: 1000px;
      margin: 0;
      position: fixed;
      bottom: 0;
      padding-left: 32px;
      padding-right: 32px;
      padding-bottom: 0;
      z-index: 11;
      .no-buy-text{
        color: red;
        margin-right: 10px;
      }
      .options-items{
        padding:15px 0 10px 0;
        border-bottom: 1px solid rgba(0,0,0,.07);
        font-size: 12px;
      }
      .options-btn-content{
        padding: 10px 0 10px 0;
        .amount{
          font-size: 28px;
          color: #f8a520;
          font-weight: 600;
          margin-right: 5px;
        }
        .buy-btn{
          margin-top: 10px
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
.ant-layout-header{
    padding: 0 10px!important;
  }
}
</style>