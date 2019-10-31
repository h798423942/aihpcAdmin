<template>
  <page-view :title="false">
    <a-card :bordered="false">
      <div class="content">
        <a-tabs :defaultActiveKey="tabDefaultActiveKey" @change="changeTabs">
          <a-tab-pane tab="概况" key="1" :forceRender="isForceRender">
            <GeneralSituation v-if="tabActiveKey === '1'"></GeneralSituation>
          </a-tab-pane>
          <a-tab-pane tab="监控详情" key="2" :forceRender="isForceRender">
            <MonitoringInfo v-if="tabActiveKey === '2'"></MonitoringInfo>
          </a-tab-pane>
          <a-tab-pane tab="作业信息" key="3" :forceRender="isForceRender">
            <HomeworkInfo v-if="tabActiveKey === '3'"></HomeworkInfo>
          </a-tab-pane>
          <a-tab-pane tab="SSH" key="4" :forceRender="isForceRender">
            <SshPage v-if="tabActiveKey === '4'"></SshPage>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </page-view>
</template>

<script>
  import { PageView } from '@/layouts'
  import GeneralSituation from '@/components/HpcDetails/GeneralSituation'
  import MonitoringInfo from '@/components/HpcDetails/MonitoringInfo'
  import HomeworkInfo from '@/components/HpcDetails/HomeworkInfo'
  import SshPage from '@/components/HpcDetails/SshPage'

  export default {
    name: 'HpcDetail',
    components: {
      PageView,
      GeneralSituation,
      SshPage,
      HomeworkInfo,
      MonitoringInfo
    },
    data () {
      return {
        tabDefaultActiveKey: '1',
        tabActiveKey: '1',
        isForceRender: false
      }
    },
    computed: {

    },
    created () {
      this.tabDefaultActiveKey = '1'
    },
    methods: {
      goBuy: function () {
        this.$router.push({name: 'newPage'})
      },
      changeTabs: function (key) {
        this.tabActiveKey = key
      }
    }
  }
</script>

<style lang="less" scoped>
  .title-content{
    border-bottom: 1px solid #dddddd;
    padding-bottom: 8px;
  }
  .content {
    height: 100%;
    background-color: #ffffff;
    padding: 20px;
  }


</style>
