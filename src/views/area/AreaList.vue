<template>
  <page-view :title="false">
    <a-card :bordered="false">
      <!--table-->
      <s-table
        ref="hpcTable"
        size="default"
        rowKey="_id"
        :columns="columns"
        :data="loadData"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
      >
        <span slot="status" slot-scope="text">
          <template>
            <span class="status-span success" v-if="text === 1" style="background-color: #dddddd">已关机</span>
            <span class="status-span" v-else-if="text === 2" style="background-color: aquamarine;">运行中</span>
            <span class="status-span" v-else style="background-color: #f6a520">准备中</span>
          </template>
        </span>

        <span slot="nameAndId" slot-scope="text, record">
          <template>
            <div>{{record._aliasName}}/{{record._id}}</div>
          </template>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="showEditModal(record)">编辑</a>
          </template>
        </span>
      </s-table>
      <!--table end-->
    </a-card>

    <!--部署 modal-->
    <a-modal v-model="editModal.visible" centered destroyOnClose title="编辑超算中心">
      <template slot="footer">
        <a-button key="back" @click="closeModal()">取消</a-button>
        <a-button key="submit" type="primary" :loading="editModal.loading" @click="subEditModal">
          确认
        </a-button>
      </template>
      <a-form class="modal-form">
        <a-form-item
          v-bind="editModal.formItemLayout"
          label="名称"
        >
          <a-input v-model="editModal.formObj.name" placeholder="请输入名称"/>
        </a-form-item>
        <a-form-item
          v-bind="editModal.formItemLayout"
          label="IP"
        >
          <span>{{editModal.formObj.ip}}</span>
        </a-form-item>

      </a-form>
    </a-modal>
    <!--部署 modal end-->
  </page-view>
</template>

<script>
  import { timeFix } from '@/utils/util'

  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import { Radar, STable } from '@/components'
  import { getAreaList, getAreaDetail} from '@/api/aihpc'

  export default {
    name: 'Arealist',
    components: {
      PageView,
      HeadInfo,
      Radar,
      STable,
    },
    data () {
      return {
        // form: this.$form.createForm(this),
        editModal: {
          loading: false,
          visible: false,
          items: {},
          formObj: {
            name: ''
          },
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
            title: '名称/ID',
            dataIndex: '_name',
            scopedSlots: { customRender: 'nameAndId' }
          },
          // {
          //   title: '超算中心',
          //   dataIndex: 'area',
          //   customRender: (text) => text._aliasName
          // },
          {
            title: 'IP',
            dataIndex: '_ip',
            customRender: (text) => text
            // scopedSlots: { customRender: 'app' }
          },
          {
            title: '状态',
            dataIndex: '_stat',
            customRender: (text) => text,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: 'UUID',
            dataIndex: '_uuid',
            // sorter: true,
            needTotal: true,
            // scopedSlots: { customRender: 'setting' }
            customRender: (text) => text
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
          return getAreaList()
            .then(res => {
              let data = res && res.data ? res.data.rows : [];
              that.tableDatas.data = data;
              that.tableDatas.totalCount = data.length;
              return that.tableDatas
            }).catch(err => {
              that.$message.error("获取作业数据错误")
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
    created () {

    },
    mounted () {

    },
    methods: {
      subEditModal: function (e){
        e.preventDefault();
        console.log(this.editModal.formObj.name)

      },
      showEditModal(items) {
        this.editModal.visible = true;
        this.editModal.items = items;
        this.editModal.formObj.name = items._aliasName
        this.editModal.formObj.ip = items._ip
      },
      closeModal() {
          this.editModal.visible = false;
      },
      onSelectChange: function(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      subCapacityModal: function () {
        let that = this;
        let params = {
          _id: this.capacityModal.hpcItem._id,
          _addCore: parseInt(this.capacityModal.capacityNum)
        };
        that.capacityModal.loading = true;
        capacityHpc(params).then((res)=>{
          that.$refs.hpcTable.refresh(true)
          that.handleCancel('capacity');
          that.capacityModal.loading = false
          that.$message.success("扩容成功")
        }).catch((err)=>{
          that.capacityModal.loading = false
          that.handleCancel('capacity');
          that.$message.error("扩容失败")
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .modal-form{
    /deep/ .ant-form-item{
      margin-bottom: 0;
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
</style>
