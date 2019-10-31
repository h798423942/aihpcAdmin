<template>
  <div class="general-content">
    <div class="loading-content" v-if="isLoading">
      <div class="loading-bg"></div>
      <a-spin :spinning="isLoading" class="loading"></a-spin>
    </div>
    <a-row :gutter="16">
        <!--基本信息-->
        <a-col :sm="24" :xs="24" :md="5" :lg="5" :xl="5">
          <div style="height: calc(100vh - 320px);min-height: 650px">
            <a-row class="diteilLeft" style="height: 60%">
              <h3 style="fontWeight: bold; margin-bottom: 15px">超算信息</h3>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">名称</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo._name}}
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">超算中心</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo.area ? machineInfo.area._aliasName : ''}}
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">应用</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo.app ? machineInfo.app._name : ''}}
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">CPU规格</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo.machine ? machineInfo.machine._name : ''}}
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">CPU核数</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo._cpuCore}}核
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">内存</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo._memNum/1024}}G
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">运行状态</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  <span class="status-span" v-if="machineInfo._powerStat === 1" style="background-color: #dddddd">已关机</span>
                  <span class="status-span" v-else-if="machineInfo._powerStat === 2" style="background-color: aquamarine;">运行中</span>
                  <span class="status-span" v-else style="background-color: #f6a520">准备中</span>
                </a-col>
              </a-row>
              <a-row class="basica-row">
                <a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">创建时间</a-col>
                <a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">
                  {{machineInfo._createTime}}
                </a-col>
              </a-row>
            </a-row>

            <a-row class="diteilLeft" style="height: calc(40% - 20px);margin-bottom: 0">
              <a-table
                :columns="homeworkTable.columns"
                :rowKey="record => record._id"
                :dataSource="homeworkTable.dataSource"
                :loading="homeworkTable.loading"
                :pagination="homeworkTable.pagination"
                bordered
              >
                <!--<template slot="name" slot-scope="name">-->
                  <!--{{name.first}} {{name.last}}-->
                <!--</template>-->
              </a-table>
              <!--<h3 style="fontWeight: bold; margin-bottom: 15px">作业信息</h3>-->
              <!--<a-row class="basica-row">-->
                <!--<a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">作业名称</a-col>-->
                <!--<a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">-->
                  <!--作业名称-->
                <!--</a-col>-->
              <!--</a-row>-->
              <!--<a-row class="basica-row">-->
                <!--<a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">状态</a-col>-->
                <!--<a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">-->
                  <!--运行中-->
                <!--</a-col>-->
              <!--</a-row>-->
              <!--<a-row class="basica-row">-->
                <!--<a-col :sm="24" :xs="24" :md="8" :lg="8" :xl="8">进度</a-col>-->
                <!--<a-col :sm="24" :xs="24" :md="16" :lg="16" :xl="16" class="righta-col">-->
                  <!--已完成-->
                <!--</a-col>-->
              <!--</a-row>-->
            </a-row>
          </div>
        </a-col>
        <!--基本信息 end-->

        <!--监控信息-->
        <a-col :sm="24" :xs="24" :md="19" :lg="19" :xl="19">
          <div class="detailRight" style="height: calc(100vh - 320px); minHeight: 650px">
            <a-row>
              <a-col :sm="24" :xs="24" :md="24" :lg="24" :xl="24">
                <h3 style="fontWeight: bold; margin-bottom: 15px">监控信息</h3>
              </a-col>
              <a-col :sm="24" :xs="24" :md="24" :lg="24" :xl="24">
                <a-range-picker
                  :disabledDate="disabledDate"
                  :disabledTime="disabledRangeTime"
                  :showTime="{hideDisabledOptions: true,defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]}"
                  format="YYYY-MM-DD HH:mm:ss"/>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :sm="24" :xs="24" :md="12" :lg="12" :xl="12">
                <div class="monitorItem">
                  <a-row>
                    <p class="itemTit">cpu使用率</p>
                    <a-col class="itemContent">
                      <echarts-component id="cpuEcharts" :options="cpuEhcartsOptions" class="items-col"></echarts-component>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
              <a-col :sm="24" :xs="24" :md="12" :lg="12" :xl="12">
                <div class="monitorItem">
                  <a-row>
                    <p class="itemTit">内存使用率</p>
                    <a-col class="itemContent">
                      <echarts-component id="memoryEcharts" :options="memoryEhcartsOptions" class="items-col"></echarts-component>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
              <a-col :sm="24" :xs="24" :md="12" :lg="12" :xl="12">
                <div class="monitorItem">
                  <a-row>
                    <p class="itemTit">磁盘使用率</p>
                    <a-col class="itemContent">
                      <echarts-component id="diskEcharts" :options="cpuEhcartsOptions" class="items-col"></echarts-component>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <!--监控信息 end-->

      </a-row>
  </div>
</template>
<script>
  import moment from 'moment';
  import echartsComponent from '@/components/Echarts/EchartsComponent'
  import { getHpcDetail } from '@/api/aihpc'
  export default {
      name: 'generalSituation',
      components: {
        echartsComponent
      },
      data(){
        return {
          isLoading: false,
          cpuEhcartsOptions: {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [],
              type: 'line'
            }]
          },
          memoryEhcartsOptions: {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [],
              type: 'line'
            }]
          },
          homeworkTable: {
            loading: false,
            pagination: false,
            columns: [
              {
                title: '作业名称',
                dataIndex: '_name',
              },
              {
                title: '运行状态',
                dataIndex: '_status',
              },
              {
                title: '进度',
                dataIndex: '_statuss',
              },
            ],
            dataSource:  [],
          },
          machineInfo: {}
        }
      },
      created () {
        this.getHpcDetail()
      },
      methods: {
        moment,
        range(start, end) {
          const result = [];
          for (let i = start; i < end; i++) {
            result.push(i);
          }
          return result;
        },
        getHpcDetail: function () {
          let that = this;
          let params={
            _id: this.$route.params.id
          }
          that.isLoading = true;
          getHpcDetail(params).then((res)=>{
              let data = res && res.data ? res.data.rows : [];
              that.machineInfo = data;
              that.homeworkTable.dataSource = data.jobs;
              that.cpuEhcartsOptions.xAxis.data = data.monitor &&  data.monitor._cpu ? data.monitor._cpu._key : [];
              that.cpuEhcartsOptions.series[0].data = data.monitor &&  data.monitor._cpu ? data.monitor._cpu._value : [];

              that.memoryEhcartsOptions.xAxis.data = data.monitor &&  data.monitor._memory ? data.monitor._memory._key : [];
              that.memoryEhcartsOptions.series[0].data = data.monitor &&  data.monitor._memory ? data.monitor._memory._value : [];
              that.isLoading = false;
          }).catch((err)=>{
            that.$message.error("获取详情失败")
            that.isLoading = false;
          })
        },
        disabledDate(current) {
          // Can not select days before today and today
          return current && current < moment().endOf('day');
        },
        disabledDateTime() {
          return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        },
        disabledRangeTime(_, type) {
          if (type === 'start') {
            return {
              disabledHours: () => this.range(0, 60).splice(4, 20),
              disabledMinutes: () => this.range(30, 60),
              disabledSeconds: () => [55, 56],
            };
          }
          return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
          };
        },
      }
  }
</script>

<style lang="less" scoped>
  .general-content{
    position: relative;
    .loading-content{
        position: absolute;
        width: 100%;
        height: calc(100% - 20px);
        display: flex;
        justify-content: center;
        align-items: center;
        .loading-bg{
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          background-color: #ddd;
          opacity: 0.3;
          filter:alpha(opacity=30)
        }
      .loading{
        z-index: 8;
      }
    }
  }
  .status-span{
    padding: 3px 10px;
    border-radius: 15px;
    color: #fff;
    font-size: 12px;
  & .success{
      background-color: #52c41a;
    }
  }
  .content {
    height: 100%;
    background-color: #ffffff;
    padding: 20px;

  .diteilLeft, .detailRight {
    border: 1px solid #dddddd;
    padding: 10px;
    margin-bottom: 20px;

  .basica-row {
    border-bottom: 1px solid #dddddd;
    padding: 8px 5px;

  .righta-col {
    color: #000000;
  }

  :global {

  .anticon-form {
    float: right;
    color: #5130ab;
    margin: 11px 10px 0 0;
  }

  }
  }
  .monitorItem {
    margin-top: 20px;

  .itemTit {
    margin-bottom: 10px;
  }

  .itemContent {
    height: 220px;
    line-height: 220px;
    background-color: #fafafa;
    text-align: center;
  }

  }
  }
  .detailRight {
    padding: 15px !important;
  }

  .versionContent {

  .title {
    background: -webkit-gradient(linear, left top, right bottom, from(#4d75e9), to(#6f47d5));
    color: #fff;
    border-color: #fff;
  }

  }
  .logDetailContent {
    margin-top: 25px;
    border: 1px solid #dddddd;
    background-color: #fbfbfe;
    padding: 15px 25px 25px 25px;
    min-height: 65vh;
    max-height: 65vh;
    overflow-y: auto;

  :global {

  .ant-list {

  .ant-list-item {
    border-bottom: none;
    padding: 2px 0;
  }
  }
  }
  }
  }
</style>