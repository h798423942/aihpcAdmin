<template>
  <div class="echarts-box" :id="id"></div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        name: 'echarts',
        props: ['options','id'],
        data(){
          return {
            chart: ''
          }
        },
        mounted: function () {
          this.initEcharts()
        },
        methods: {
          initEcharts: function () {
            this.chart = echarts.init(document.getElementById(this.id));
            this.chart.setOption(this.options);
          }
        },
        watch: {
          //观察option的变化
          options: {
            handler(newVal, oldVal) {
              if (this.chart) {
                if (newVal) {
                  this.chart.setOption(newVal);
                } else {
                  this.chart.setOption(oldVal);
                }
              } else {
                this.init();
              }
            },
            deep: true //对象内部属性的监听，关键。
          }
        }
    }
</script>
<style lang="less" scoped>
  .echarts-box{
    height: 100%;
    width: 100%;
  }
</style>