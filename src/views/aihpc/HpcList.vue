<template>
  <page-view :title="false">
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="goBuy">新建</a-button>
      </div>
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

        <span slot="app" slot-scope="text">
          <template>
            <span>{{text._name}}</span>
            <img :src="text._img" alt="">
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
            <a @click="showModal('connection', record)">SSH信息</a>
             <a-divider type="vertical" v-if="record._powerStat===2"/>
            <a @click="showModal('deployment', record)" v-if="record._powerStat===2">部署作业</a>
            <a-divider type="vertical" v-if="record._operateStat===0"/>
            <a @click="showModal('capacity', record)" v-if="record._operateStat===0">扩容</a>
            <a-divider type="vertical" v-if="record._operateStat===0"/>
            <a @click="confirmDelete(record)" v-if="record._operateStat===0">删除</a>
          </template>
        </span>
      </s-table>
      <!--table end-->
    </a-card>

    <!--部署 modal-->
    <a-modal v-model="deploymentModal.visible" centered destroyOnClose title="部署作业">
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
            valuePropName: 'deploymentModal.fileList',
            getValueFromEvent: normFile,
          },
          { rules: [{ required: true, message: '请输入名称' }] },
        ]"
            name="deploymentUpload"
            :fileList="deploymentModal.fileList"
            :action="deploymentModal.postUrl"
            list-type="text"
            @change="deploymentUploadChange"
          >
            <a-button> <a-icon type="upload" /> 选择文件</a-button>
          </a-upload>
        </a-form-item>

        </a-form-item>

      </a-form>
    </a-modal>
    <!--部署 modal end-->

    <!--ssh info modal-->
    <a-modal v-model="connectionModal.visible" centered destroyOnClose title="SSH信息">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('connection')">取消</a-button>
        <a-button key="submit" type="primary" @click="handleCancel('connection')">确认</a-button>
      </template>

      <div class="table-content">
        <a-row>
          <a-col :span="5" class="table-row-tit">公网IP：</a-col>
          <a-col :span="19" class="table-row-content">{{sshInfo.ipInfo}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="5" class="table-row-tit">SSH账号：</a-col>
          <a-col :span="19" class="table-row-content">{{sshInfo.sshAccount}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="5" class="table-row-tit">SSH密码：</a-col>
          <a-col :span="19" class="table-row-content">{{sshInfo.sshPswd}}</a-col>
        </a-row>
      </div>
    </a-modal>
    <!--ssh info modal end-->

    <!--扩容 modal-->
    <a-modal v-model="capacityModal.visible" centered destroyOnClose title="扩容">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('capacity')">取消</a-button>
        <a-button key="submit" type="primary" :loading="capacityModal.loading"
                  :disabled="!isCapacity"
                  @click="subCapacityModal">
          确认
        </a-button>
      </template>

      <div class="table-content">
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
      </div>
      <div class="modal-tip" v-if="!isCapacity">暂无可扩容核数</div>
    </a-modal>
    <!--扩容 modal end-->

    <router-view></router-view>
  </page-view>
</template>

<script>
  import { timeFix } from '@/utils/util'
  import { mapGetters } from 'vuex'

  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import { Radar, STable } from '@/components'

  // import { getRoleList, getServiceList } from '@/api/manage'
  import { getHpcList, deleteHpc, capacityHpc, getHpcCapacityMaxNum, getHpcStatus } from '@/api/aihpc'

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
        isCapacity: true,
        pageTimer: 0,
        tableLoading: false,
        connectionModal: {
          visible: false,
          loading: false
        },
        capacityModal: {
          visible: false,
          loading: false,
          hpcItem: {},
          capacityNum: 0
        },
        sliderParams: {
          value: 0,
          step: null,
          mark: {},
          tipFormatter: null
        },
        deploymentModal: {
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
        sshInfo: {
          ipInfo: '',
          sshAccount: '',
          sshPswd: ''
        },
        // 表头
        columns: [
          {
            title: '名称',
            dataIndex: '_name'
          },
          {
            title: '超算中心',
            dataIndex: 'area',
            customRender: (text) => text._aliasName
          },
          {
            title: '应用',
            dataIndex: 'app',
            // customRender: (text) => text._name
            scopedSlots: { customRender: 'app' }
          },
          {
            title: 'CPU规格',
            dataIndex: 'machine',
            customRender: (text) => text._name
          },
          {
            title: 'CPU核数',
            dataIndex: '_cpuCore',
            // sorter: true,
            needTotal: true,
            // scopedSlots: { customRender: 'setting' }
            customRender: (text) => text + ' 核'
          },
          {
            title: '内存',
            dataIndex: '_memNum',
            customRender: (text) => text/1024 + ' G'
          },
          {
            title: '运行状态',
            dataIndex: '_powerStat',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '任务数',
            dataIndex: '_jobNum'
          },
          {
            title: '节点数',
            dataIndex: '_nodeNum'
          },
          {
            title: '创建时间',
            dataIndex: '_createTime',
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
          console.log('loadData.parameter', parameter)
          let that = this;
          return getHpcList()
            .then(res => {
              let data = res && res.data ? res.data.rows : [];
              that.tableDatas.data = data;
              that.tableDatas.totalCount = data.length;
              console.log(data)
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
      // deploymentBeforeUpload(file) {
      //   console.log(file)
      //   this.deploymentModal.fileList = [...this.deploymentModal.fileList, file];
      //   return false;
      // },
      showModal(modalName, items) {
        if(modalName){
          switch (modalName) {
            case 'deployment':
              this.deploymentModal.visible = true;
              this.deploymentModal.hpcItem = items;
              this.deploymentModal.postUrl = `/api/hpc/${items._id}/upload`;
              break;
            case 'connection':
              this.connectionModal.visible = true;
              this.sshInfo = {
                ipInfo: items._publicIp,
                sshAccount: items._sshAccout,
                sshPswd: items._sshPasswd
              }
              break;
            case 'capacity':
              this.capacityModal.visible = true;
              this.capacityModal.hpcItem = items;
              this.getCapacityMaxNum(items)
              break;
          }
        }
      },
      updateHpcStaus: function () {
        let that = this;
        getHpcStatus().then((res)=>{
          let data = res && res.data ? res.data.rows : [];
          that.updateObjStatus(that.tableDatas.data, data)
        }).catch((err)=>{
          that.$message.error("获取状态失败")
        })
      },
      updateObjStatus: function (obj1, obj2){
        obj1.forEach(function (obj1Items) {
          obj2.forEach(function (obj2Items) {
            if(obj1Items._id === obj2Items._id){
              obj1Items._powerStat = obj2Items._powerStat;
              obj1Items._jobNum = obj2Items._jobNum;
              obj1Items._nodeNum = obj2Items._nodeNum;
              obj1Items._operateStat = obj2Items._operateStat;
            }
          })
        })
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
            case 'capacity':
              this.capacityModal.visible = false;
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
      confirmDelete(data) {
        let that = this;
        this.$confirm({
          title: `删除机器`,
          content: `是否确认删除${data._name}？`,
          okText: '确认',
          cancelText: '取消',
          centered: true,
          destroyOnClose: true,
          maskClosable: true,
          onOk() {
            that.deleteHpc(data);
          },
        });
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
      },
      deleteHpc: function (data) {
        let that = this;
        let params = {
          _id: data._id
        }
        deleteHpc(params).then((res)=>{
          that.$refs.hpcTable.refresh(true)
          that.$message.success("删除机器成功")
        }).catch((err)=>{
          that.$message.error("删除机器失败")
        })
      },
      getCapacityMaxNum: function (data) {
        let that = this;
        let params = {
          _id: data._id
        }
        getHpcCapacityMaxNum(params).then((res)=>{
          let data = res && res.data ? res.data.rows : [];
          that.isCapacity = data._minNum === data._maxNum ? false : true
          this.getSliderMarks(data)
        }).catch((err)=>{
          that.$message.error("获取最大内核数失败")
        })
      },
      sliderChange: function (value) {
        this.sliderParams.value = value;
        this.capacityModal.capacityNum = this.sliderParams.mark[value];
        console.log(value)
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
        }else {
          sObj[0] = `${data._minNum}核`;
          this.sliderParams.mark = sObj;
        }
        this.sliderChange(0); //切换时设置slider value 为0
      },
      goBuy: function () {
        // this.$router.push({name: 'newPage'})
        const { href } = this.$router.resolve({name: "newPage"});
        window.open(href, '_blank');
      },
      goHomeworkDetailPage: function (data) {
        this.$router.push({ path: `/aihpc/hpclist/hpcdetail/${data._id}`})
      }
    },
    beforeDestroy(){
      clearInterval(this.pageTimer)
    }
  }
</script>

<style lang="less" scoped>
  .status-span{
    padding: 3px 10px;
    border-radius: 15px;
    color: #fff;
    font-size: 12px;
    & .success{
        background-color: #52c41a;
      }
  }
  .modal-tip{
    color: red;
    position: absolute;
    right: 26px;
  }
  .table-content{
    .table-row-tit{
      text-align: right;
    }
    .table-row-content{
      padding-left: 8px;
    }

  }
</style>
