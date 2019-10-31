<template>
    <div class="monitoring-content">
      <a-row class="echart-items">
        <a-col :span="24" class="title">机器一：</a-col>
        <a-col :span="8" v-for="items in echartDatas" :key="items.id">
          <echarts-component :id="items.id"
                             :options="items.ehcartsOptions"
                             class="items-col"></echarts-component>
        </a-col>
        <!--<a-col :span="8"><echarts-component id="echarts2" :options="ehcartsOptions" class="items-col"></echarts-component></a-col>-->
        <!--<a-col :span="8"><echarts-component id="echarts3" :options="ehcartsOptions" class="items-col"></echarts-component></a-col>-->
      </a-row>
      <a-row class="echart-items">
        <a-col :span="24" class="title">机器二：</a-col>
        <!--<a-col :span="8"><echarts-component id="echarts4" :options="ehcartsOptions" class="items-col"></echarts-component></a-col>-->
        <!--<a-col :span="8"><echarts-component id="echarts5" :options="ehcartsOptions" class="items-col"></echarts-component></a-col>-->
        <!--<a-col :span="8"><echarts-component id="echarts6" :options="ehcartsOptions" class="items-col"></echarts-component></a-col>-->
      </a-row>
    </div>
</template>

<script>
  import echartsComponent from '@/components/Echarts/EchartsComponent'
    export default {
        name: 'monitoringInfo',
        data(){
          return {
            echartDatas: [
              {
                id: 'echart1',
                ehcartsOptions: {
                  title: {
                    text: "CPU",
                    textStyle: {
                      color: 'rgba(0, 0, 0, 0.65)',
                      fontSize: '18px'
                    },
                    left: "20px",
                    top: "20px"
                  },
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                  }]
                }
              },
              {
                id: 'echart2',
                ehcartsOptions: {
                  title: {
                    text: "内存",
                    textStyle: {
                      color: 'rgba(0, 0, 0, 0.65)',
                      fontSize: '18px'
                    },
                    left: "20px",
                    top: "20px"
                  },
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                  }]
                }
              },
              {
                id: 'echart3',
                ehcartsOptions: {
                  title: {
                    text: "硬盘",
                    textStyle: {
                      color: 'rgba(0, 0, 0, 0.65)',
                      fontSize: '18px'
                    },
                    left: "20px",
                    top: "20px"
                  },
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                  }]
                }
              }
            ]
          }
        },
        components: {
          echartsComponent
        }
    }
</script>

<style lang="less" scoped>
.monitoring-content{
  height: 100%;
  width: 100%;
  .echart-items{
    border: 1px solid #ddd;
    padding-top: 20px;
    padding-left: 15px;
    margin-bottom: 15px;
    .items-col{
      height: 300px;
    }
  }
  .title{
    font-size: 16px;
    color: #666;
  }
}
</style>
