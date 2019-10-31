<template>
    <div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="showAddHomeWork">新建作业</a-button>
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
            <span class="status-span" v-else-if="text === 2" style="background-color: #adff2e">运行中</span>
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
            <a @click="goHomeworkDetailPage(record)">上传</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a>
          </template>
        </span>
      </s-table>
      <!--table end-->

      <!--新增作业 modal-->
      <a-modal v-model="addHomeWorkModal.visible" centered destroyOnClose title="新增作业">
        <template slot="footer">
          <a-button key="back" @click="handleCancel('deployment')">取消</a-button>
          <a-button key="submit" type="primary" :loading="addHomeWorkModal.loading" @click="subaddHomeWorkModal">
            确认
          </a-button>
        </template>
        <a-form :form="form">
          <a-form-item
            v-bind="addHomeWorkModal.formItemLayout"
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
            v-bind="addHomeWorkModal.formItemLayout"
            label="输入文件"
            :required="true"
            :validate-status = "addHomeWorkModal.isUploadFile"
            :help="addHomeWorkModal.errorText"
          >
            <a-upload
              v-decorator="[
          'upload',
          {
            valuePropName: 'addHomeWorkModal.fileList',
            getValueFromEvent: normFile,
          },
          { rules: [{ required: true, message: '请输入名称' }] },
        ]"
              name="deploymentUpload"
              :fileList="addHomeWorkModal.fileList"
              :action="addHomeWorkModal.postUrl"
              list-type="text"
              @change="deploymentUploadChange"
            >
              <a-button> <a-icon type="upload" /> 选择文件</a-button>
            </a-upload>
          </a-form-item>

          </a-form-item>

        </a-form>
      </a-modal>
      <!--新增作业 modal end-->
    </div>
</template>

<script>
  import { Radar, STable } from '@/components'
  // import { getRoleList, getServiceList } from '@/api/manage'
  import { getHpcHomeWorkList } from '@/api/aihpc'
    export default {
        name: "homeworkComponentInfo",
        data(){
          return {
            form: this.$form.createForm(this),
            addHomeWorkModal: {
              loading: false,
              visible: false,
              hpcItem: {},
              postUrl: '',
              fileList: [],
              isUploadFile: 'success',
              errorText:'',
              formItemLayout: {
                labelCol: {
                  xs: { span: 24 },
                  sm: { span: 5 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 19 },
                },
              }
            },
            // 表头
            columns: [
              {
                title: '作业编号',
                dataIndex: 'no'
              },
              {
                title: '作业名称',
                dataIndex: 'description'
              },
              {
                title: '应用',
                dataIndex: 'callNo',
                // sorter: true,
                needTotal: true,
                scopedSlots: { customRender: 'setting' }
                // customRender: (text) => text + ' 次'
              },
              {
                title: '运行状态',
                dataIndex: 'status',
                scopedSlots: { customRender: 'status' }
              },
              {
                title: '核数',
                dataIndex: 'updatedAtss',
                // sorter: true
              },
              {
                title: '提交时间',
                dataIndex: 'updatedAt',
                // sorter: true
              },
              {
                title: '运行时长',
                dataIndex: 'updatedAts',
                // sorter: true
              },
              {
                title: '操作',
                dataIndex: 'action',
                width: '220px',
                scopedSlots: { customRender: 'action' }
              }
            ],
            tableDatas: {
              data: [],
              pageNo: 1,
              pageSize: 10,
              totalCount: 0,
              totalPage: 0
            },
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
              let that = this;
              let params = {
                _id: that.$route.params.id
              }
              return getHpcHomeWorkList(params)
                .then(res => {
                  let data = res && res.data ? res.data.rows : [];
                  that.tableDatas.data = data.jobs;
                  that.tableDatas.totalCount = data.jobs.length;
                  return that.tableDatas
                }).catch(err => {
                  that.$message.error("获取作业列表失败")
                  return that.tableDatas
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
        components: {
          STable
        },
        methods:{
          showAddHomeWork: function (items) {
            this.addHomeWorkModal.visible = true;
            this.addHomeWorkModal.hpcItem = items;
            this.addHomeWorkModal.postUrl = `/api/hpc/${items._id}/upload`;
          },
          normFile(e) {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          },
          deploymentUploadChange: function (info) {
            console.log(info)
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              this.$message.success(`上传成功`);
            } else if (info.file.status === 'error') {
              this.$message.error(`上传失败`);
            }
          },
          subaddHomeWorkModal: function (){
            console.log("sub")
          },
          getPopupContainer(trigger) {
            return trigger.parentElement;
          },
          onSelectChange: function(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
          },
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
</style>