<template>
  <div class="home_compressedVideo_bottom">
    <div class="home_compressedVideo_bottom_box">
      <div class="home_compressedVideo_bottom_top">
        <div
          v-for="item in compressList"
          :key="item"
          @click="activeKey = item.id"
          :class="[activeKey == item.id ? 'border_col' : '']"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 压缩场景 -->
      <div class="home_compressedVideo_bottom_bottom">
        <div class="home_compressedVideo_bottom_bottom_one" id="qw">
          <div class="zhuanhuan">转换</div>
          <div class="selectXz" @click="selectF1 = !selectF1">
            <a-select
              id="select"
              v-model:value="selectVal1"
              :style="{ width: '170px', size: '16px' }"
              :options="options1"
              @change="selectChange1"
              size="large"
            >
              <template #suffixIcon>
                <caret-up-outlined
                  :style="{ fontSize: '16px', color: '#AFC0F3' }"
                  v-if="selectF1"
                />
                <caret-down-outlined
                  :style="{ fontSize: '16px', color: '#AFC0F3' }"
                  v-else-if="!selectF1"
                />
              </template>
            </a-select>
          </div>

          <div class="zhuanhuan zhi">至</div>
          <div class="selectXz" @click="selectF2 = !selectF2">
            <a-select
              v-model:value="selectVal2"
              style="width: 170px"
              :options="options2"
              @change="selectChange2"
              size="large"
            >
              <template #suffixIcon>
                <caret-up-outlined
                  :style="{ fontSize: '16px', color: '#AFC0F3' }"
                  v-if="selectF2"
                />
                <caret-down-outlined
                  :style="{ fontSize: '16px', color: '#AFC0F3' }"
                  v-else-if="!selectF2"
                />
              </template>
            </a-select>
          </div>

          <div class="home_compressedVideo-icon">
            <a-popconfirm
              placement="rightBottom"
              ok-text="确定"
              cancel-text="取消"
            >
              <template #icon>
                <div class="popconfirm-box">
                  <h1>尺寸</h1>
                  <a-checkbox v-model:checked="checked">
                    保持原尺寸
                  </a-checkbox>
                  <br />
                  <a-checkbox
                    :style="{ marginTop: '10px' }"
                    v-model:checked="checked"
                  >
                    <a-input
                      type="number"
                      style="width: 77px; height: 33px; margin-right: 8px"
                      v-model:value="sizeIpt1"
                      placeholder="1080"
                    />

                    <!-- <caret-up-outlined
                      v-on:click="handleC"
                      class="sizeIpt1-icon-top"
                    />
                    <caret-down-outlined
                      v-on:click="handleC"
                      class="sizeIpt1-icon-bottom"
                    />
                    <caret-down-outlined
                      v-on:click="handleC"
                      class="sizeIpt2-icon-bottom"
                    />
                    <caret-up-outlined
                      v-on:click="handleC"
                      class="sizeIpt2-icon-top"
                    /> -->
                    <a-input
                      type="number"
                      style="width: 77px; height: 33px"
                      v-model:value="sizeIpt2"
                      placeholder="1080"
                    ></a-input>
                  </a-checkbox>
                </div>
              </template>
              <!-- <template #title>
                  <h1>尺寸</h1>
                </template> -->
              <setting-outlined :style="{ fontSize: '18px' }" />
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UploadModule from "@/components/home/UploadModule/index.vue";
import { onMounted, onUpdated, ref } from "vue";
import {
  SmileOutlined,
  MehOutlined,
  CaretDownOutlined,
  SettingOutlined,
  CaretUpOutlined,
} from "@ant-design/icons-vue";
import {
  getCompressScenes,
  getCompressToken,
  getSchedule,
  getTranscoding,
} from "@/api/home";

import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { httpcode } from "@/utils/httpCode";
import { http } from "@/utils/http";
import { saveFile } from "@/components/home/CompressedVideo/download.js";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { useRouter } from "vue-router";
components: {
  UploadModule, SmileOutlined, MehOutlined, CaretDownOutlined, CaretUpOutlined;
}
const store = useStore();
const activeKey = ref(3);
const activeKeySon = ref(1);
// 定义选择的压缩类型数组
let fileList = ref([]);
// 转码要的参数
let params1 = ref(null);

// 动画状态
let flag = ref(false);
let state = ref("sc");
let time = ref(null);
let succeedtime = ref(null);
let succeed = ref(false);
const $router = useRouter();

// 选择器
const selectVal1 = ref("mov");
const selectVal2 = ref("mp4");
const options1 = ref([
  {
    value: "mov1",
    label: "mov1",
  },
  {
    value: "mov2",
    label: "mov2",
  },
]);
const options2 = ref([
  {
    value: "mp2",
    label: "mp2",
  },
  {
    value: "mp1",
    label: "mp1",
  },
]);

// 选择器箭头切换
let selectF1 = ref(false);
let selectF2 = ref(false);

const selectChange1 = (value) => {
  selectVal1.value = value;
};
const selectChange2 = (value) => {
  selectVal2.value = value;
};

// 压缩类型数组
let compressList = ref([
  {
    id: 3,
    type: "upload",
    name: "无损压缩",
    router: "/video-lossless-compression",
  },
]);

const compressHandle = (id) => {};

// 设置尺寸 input值
const sizeIpt1 = ref(1080);
const sizeIpt2 = ref(1080);
// 复选框
const checked = ref(false);

const handleC = () => {
  checked.value = false;
};

onMounted(() => {});
onUpdated(() => {
  // console.log(fileList.value);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/home/CompressedVideo/index.scss";
// @import "assets/styles/test.scss"; // 自定义别名路径：详见vue.config.js
// @import "../../assets/styles/test.scss"; 相对路径
/*文件上传css*/

input[type="number"] {
  -moz-appearance: textfield;
  background: transparent;
  // -webkit-appearance: none !important;
}

// 新添加的下载按钮
.home .home_uploadingVideo_box .download {
  margin-top: 53px;
  width: 331px;
  height: 46px;
  background: #0544ff;
  border-radius: 6px;
}
// 新添加下拉框iconyangshi
.home #qw .ant-select {
  display: flex;
  align-items: center;
  #select {
    height: 68px !important;
    font-size: 16px;
  }
}

.popconfirm-box {
  padding-bottom: 4px;
  padding-right: 42px;
}

:deep .ant-select-selector {
  height: 50px !important;
}
:deep .ant-select-selection-item {
  line-height: 48px !important;
}

:deep .ant-popover-inner-content {
  padding: 12px 20px;
}

.home
  #qw
  .ant-select-single.ant-select-lg:not(.ant-select-customize-input)
  .ant-select-selector {
  height: 80px !important;
}

//
.home_fileCompression_box_center_box {
  .ant-progress-text {
    display: none !important;
  }
}

.home_compressedVideo_bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 17px;

  .home_compressedVideo_bottom_box {
    width: 1333px !important;
    height: 165px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(7.321131447587355px);
    .home_compressedVideo_bottom_top {
      display: flex !important;
      width: 719px;
      height: 77px;

      border-radius: 11px 11px 0px 0px;
      div {
        background: #ffffff;
        width: 33.33%;
        font-size: 24px;
        height: 77px;
        line-height: 77px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #0544ff;
        letter-spacing: 1px;
        line-height: 77px;
        border-radius: 0 11px 0 0;
      }
    }
    // 修改 新加
    .home_compressedVideo_bottom_bottom {
      padding: 0 0 0 29px;
      height: 88px;
      background: #e1e9ff;
      div {
        font-size: 16px !important;
      }
      .home_compressedVideo_bottom_bottom_one {
        display: flex;
        align-content: center !important;
        line-height: 88px;
        .zhuanhuan {
          width: 102px;
          height: 88px;
          line-height: 88px;
          font-size: 16px;
        }
        .zhi {
          width: 53px;
        }
        div {
          background: #e1e9ff;
          // margin-right: 108px;
          height: 88px;
          line-height: 88px;
          backdrop-filter: blur(7.321131447587355px);
          letter-spacing: 1px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0544ff;
        }
        // 选择器div
        .selectXz {
          :deep .anticon-caret-up {
            pointer-events: none;
          }
        }
      }
    }
  }
}
#app .home_compressedVideo-icon {
  margin-left: 12px;
}
.modal {
  :global(.ant-popover-buttons button:nth-child(2)) {
    background: #0d4aff;
  }
}
.modal {
  :global(.ant-select-arrow .anticon-caret-down) {
    pointer-events: none;
  }
}

.fenjxian {
  width: 1px;
  height: 23px;
  border: 1px solid #e1e9ff;
  margin-top: 32px;
  margin-left: -2px;
}
.border_cor {
  border-bottom: 4px #0544ff solid !important ;
  border-radius: 4px;
}
.border_col {
  background: #e1e9ff !important;
}

@import "@/assets/css/home/homeNav/Custom/CustomCompressed1440px.scss";
@import "@/assets/css/home/homeNav/CustomCompressed/CustomCompressed1280px.scss";
// @import "@/assrts/styles/animation/home/CompressedVideo/index.scss";
</style>
