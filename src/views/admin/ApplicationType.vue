<template>
  <page-view :title="false">
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="goBuy">新建</a-button>
      </div>
      <!--table-->
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
      >
        <span slot="status" slot-scope="text">
          <template>
            <span class="status-span success" v-if="text === 1" style="background-color: #dddddd">停止</span>
            <span class="status-span" v-else-if="text === 2" style="background-color: aquamarine;">运行中</span>
            <span class="status-span" v-else-if="text === 3" style="background-color: #52c41a">完成</span>
          </template>
        </span>

        <span slot="setting" slot-scope="text">
          <template>
            <a-tooltip
              style="marginTop: 10px"
              placement="right"
              :getPopupContainer="getPopupContainer"
              :autoAdjustOverflow="false"
            >
                <template slot="title">
                  <div>算力值1相当于配置：</div>
                  <div style="color: #888">cup: itnerdsss</div>
                  <div style="color: #888">内核: itnerdsss</div>
                  <div style="color: #888">内存: itnerdsss</div>
                </template>
            <span style="cursor: pointer">{{text}}T</span>
          </a-tooltip>
          </template>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="goHomeworkDetailPage(record)">详情</a>
            <a-divider type="vertical" />
            <a @click="showModal('connection')">连接</a>
             <a-divider type="vertical" />
            <a @click="showModal('deployment')">部署</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">下载</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">扩容</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a>
          </template>
        </span>
      </s-table>
      <!--table end-->
    </a-card>

    <!--部署 modal-->
    <a-modal v-model="deploymentModal.visible" centered destroyOnClose title="部署">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('deployment')">取消</a-button>
        <a-button key="submit" type="primary" :loading="deploymentModal.loading" @click="subDeploymentModal">
          确认
        </a-button>
      </template>
      <a-form :form="form">
        <a-form-item
          v-bind="deploymentModal.formItemLayout"
          label="名称"
        >
          <a-input
            v-decorator="[
          'projuctName',
          { rules: [{ required: true, message: '请输入名称' }] },
        ]"
            placeholder="请输入名称"
          />
        </a-form-item>

        <a-form-item
          v-bind="deploymentModal.formItemLayout"
          label="输入文件"
          :required="true"
          :validate-status = "deploymentModal.isUploadFile"
          :help="deploymentModal.errorText"
        >
          <a-upload
            v-decorator="[
          'upload',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
          { rules: [{ required: true, message: '请输入名称' }] },
        ]"
            name="logo"
            action="/upload.do"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 选择文件</a-button>
          </a-upload>
        </a-form-item>

        <a-form-item
          v-bind="deploymentModal.formItemLayout"
          label="执行命令"
        >
          <a-input
            v-decorator="[
          'command',
          { rules: [{ required: true, message: '请输入执行命令' }] },
        ]"
            placeholder="请输入执行命令"
          />
        </a-form-item>

        <a-form-item
          v-bind="deploymentModal.formItemLayout"
          label="下载目录"
        >
          <a-input
            v-decorator="[
          'directory',
          { rules: [{ required: true, message: '请输入下载目录' }] },
        ]"
            placeholder="请输入下载目录"
          />
        </a-form-item>

      </a-form>
    </a-modal>
    <!--部署 modal end-->

    <!--连接 modal-->
    <a-modal v-model="connectionModal.visible" centered destroyOnClose title="连接信息">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('connection')">取消</a-button>
        <a-button key="submit" type="primary">确认</a-button>
      </template>

      <div class="table-content">
        <a-row>
          <a-col :span="5" class="table-row-tit">名称：</a-col>
          <a-col :span="19" class="table-row-content">内容内容内容</a-col>
        </a-row>
        <a-row>
          <a-col :span="5" class="table-row-tit">命令行：</a-col>
          <a-col :span="19" class="table-row-content">内容内容内容</a-col>
        </a-row>
        <a-row>
          <a-col :span="5" class="table-row-tit">下载路径：</a-col>
          <a-col :span="19" class="table-row-content">内容内容内容</a-col>
        </a-row>
      </div>
    </a-modal>
    <!--连接 modal end-->

  </page-view>
</template>

<script>
  import { timeFix } from '@/utils/util'
  import { mapGetters } from 'vuex'

  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import { Radar, STable } from '@/components'

  import { getRoleList, getServiceList } from '@/api/manage'

  const DataSet = require('@antv/data-set')

  export default {
    // name: 'Hpclist',
    components: {
      PageView,
      HeadInfo,
      Radar,
      STable,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        tableLoading: false,
        connectionModal: {
          visible: false,
        },
        deploymentModal: {
          loading: false,
          visible: false,
          formItemLayout: {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 19 },
            },
          },
          isUploadFile: 'success',
          errorText:''
        },
        // 表头
        columns: [
          {
            title: 'ID',
            dataIndex: 'no'
          },
          {
            title: '超算中心',
            dataIndex: 'description'
          },
          {
            title: '算力',
            dataIndex: 'callNo',
            // sorter: true,
            needTotal: true,
            scopedSlots: { customRender: 'setting' }
            // customRender: (text) => text + ' 次'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '运行时长',
            dataIndex: 'updatedAts',
            // sorter: true
          },
          {
            title: '创建时间',
            dataIndex: 'updatedAt',
            // sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '220px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        dataSource:  [
          {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
          },
          {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
          },
        ],
        datas: {
          data: [],
          pageNo: 1,
          pageSize: 10,
          totalCount: 0,
          totalPage: 0
        },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          console.log('loadData.parameter', parameter)
          let that = this;
          return getServiceList(Object.assign(parameter, this.queryParam))
            .then(res => {
              console.log(res)
              return res.data.result
            }).catch(err => {
              that.$notification['error']({
                message: '错误',
                description: '获取作业数据错误',
                duration: 3
              })
              console.log(err)
              return err.data.result
            })
        },
        selectedRowKeys: [],
        selectedRows: [],

        // custom table alert & rowSelection
        options: {
          alert: false,
          rowSelection: {
            selectedRowKeys: [],
            onChange: this.onSelectChange
          }
        }
      }
    },
    computed: {

    },
    created () {

    },
    mounted () {

    },
    methods: {
      ...mapGetters(['nickname', 'welcome']),
      getPopupContainer(trigger) {
        return trigger.parentElement;
      },
      subDeploymentModal: function (e){
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.deploymentModal.loading = true;
            setTimeout(() => {
              this.deploymentModal.visible = false;
              this.deploymentModal.loading = false;
              this.deploymentModal.isUploadFile='success'
              console.info('success');
              console.info(values);
            }, 1000);
          }else{
            this.deploymentModal.isUploadFile='error'
            this.deploymentModal.errorText='请上传文件'
            console.log("error")
          }
        });
      },
      showModal(modalName) {
        if(modalName){
          switch (modalName) {
            case 'deployment':
              this.deploymentModal.visible = true;
              break;
            case 'connection':
              this.connectionModal.visible = true;
              break;
          }
        }
      },
      handleCancel(modalName) {
        if(modalName){
          switch (modalName) {
            case 'deployment':
              this.deploymentModal.visible = false;
              break;
            case 'connection':
              this.connectionModal.visible = false;
              break;
          }
        }
      },
      normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      },
      onSelectChange: function(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      goBuy: function () {
        // this.$router.push({name: 'newPage'})
        const { href } = this.$router.resolve({name: "newPage"});
        window.open(href, '_blank');
      },
      goHomeworkDetailPage: function (data) {
        this.$router.push({ name: 'hpcdetail'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .status-span{
    padding: 2px 5px;
    border-radius: 15px;
    color: #fff;
    font-size: 12px;
  & .success{
      background-color: #52c41a;
    }
  }
  .table-content{
  /*.table-row-tit{*/
  /*text-align: right;*/
  /*}*/
  .table-row-content{
    padding-left: 8px;
  }
  }
</style>
