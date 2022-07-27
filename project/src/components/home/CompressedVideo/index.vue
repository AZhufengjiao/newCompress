<template>
  <div class="home_compressedVideo">
    <div class="home_compressedVideo_top">
      <h2>HEYCUT 视频压缩</h2>
      <div>智能场景压缩 · 一步搞定所有视频需求</div>
    </div>

    <div class="home_compressedVideo_bottom">
      <div class="home_compressedVideo_bottom_box">
        <div class="home_compressedVideo_bottom_top">
          <div
            v-for="item in compressList"
            :key="item"
            @click="compressHandle(item.id)"
            :class="[activeKey == item.id ? 'border_col' : '']"
          >
            {{ item.name }}
          </div>
        </div>
        <!-- 压缩场景 -->
        <div class="home_compressedVideo_bottom_bottom">
          <div class="home_compressedVideo_bottom_bottom_one">
            <div
              v-for="item in compressSceneItem"
              :key="item"
              @click="compressSceneClick(item)"
              :class="[activeKeySon === item.tmpId ? 'border_cor' : '']"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="home_compressedVideo_hanzi">
      1·解决抖音上传视频被压缩、不清晰问题
    </p>

    <!-- 上传视频 -->
    <div class="home_uploadingVideo_box">
      <div class="">
        <div
          class="home_uploadingVideo"
          v-on:dragover="HandleDragover"
          v-on:drop="HandleDrag"
        >
          <div class="home_uploadingVideo_bottom">
            <div class="home_uploadingVideo_bottom_img">
              <img src="" alt="" />
            </div>
            <div
              v-on:click="handleUploading"
              class="home_uploadingVideo_bottom_span"
            >
              上传视频
            </div>
            <input
              ref="upload"
              type="file"
              name="upload"
              id="upload"
              style="display: none"
              v-on:change="handleInputV"
              accept="video/*"
              multiple
            />
          </div>
          <p>直接拖拽视频 到此，或者点击上传按钮</p>
          <video
            style="display: none"
            src=""
            ref="videoDom"
            @canplaythrough="myFunction"
          ></video>
          <h1>最大支持400M以内视频压缩，<span>升级会员</span>享受无限大小</h1>
        </div>
        <div v-if="fileList.length > 0" class="home_fileCompression">
          <div class="home_fileCompression_flex">
            <div
              v-for="item in fileList"
              :key="item"
              class="home_fileCompression_box"
            >
              <UploadModule
                :item="item"
                :payload="params1"
                @getFileItemParams="getFileItem"
              >
              </UploadModule>
            </div>

            <!-- <div
              v-for="item in fileList"
              :key="item"
              class="home_fileCompression_box"
            >
              <div class="home_fileCompression_box_box">
                <span class="home_fileCompression_box_name">
                  {{ item }}
                </span>
                <div class="home_fileCompression_box_center">
                  <span class="home_fileCompression_box_memory">256M</span>
                  <div id="a" class="home_fileCompression_box_center_box">
                    <div
                      v-if="flag"
                      :class="[
                        'home_fileCompression_box_center_box_style',
                        // { scStyle: state == 'sc' ? 'scStyle' : 'zhtyle' },
                        {
                          scStyle: state == 'sc',
                        },
                        {
                          zhtyle: state == 'zh',
                        },
                      ]"
                      :style="[
                        { width: succeed == true ? completeWih + '%' : 0 },
                      ]"
                    >
                      <span v-if="state == 'sc'">{{
                        completeWih == 100 ? "上传成功" : "上传中"
                      }}</span>
                      <span v-if="state == 'zh'">{{
                        completeWih == 100 ? "转换成功" : "转换中"
                      }}</span>
                    </div>
                  </div>
                  <span class="home_fileCompression_box_memory">256M</span>
                </div>
                <div class="home_fileCompression_box_zh">
                  <span v-if="state == 'sc'">{{
                    completeWih == 100 ? "上传成功" : "开始转换"
                  }}</span>
                  <span v-if="state == 'zh'" v-on:click="downloadBtn">{{
                    completeWih == 100 ? "下载" : "开始转换"
                  }}</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <a-button
          v-if="fileUrlList.length > 0"
          type="primary"
          class="download"
          v-on:click="downloadHandle"
          >下载全部</a-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import UploadModule from "@/components/home/UploadModule/index.vue";
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import {
  getCompressScenes,
  getCompressToken,
  getSchedule,
  getTranscoding,
  homeTemplateList,
} from "@/api/home";
components: {
  UploadModule;
}

import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { httpcode } from "@/utils/httpCode";
import { http } from "@/utils/http";
import { saveFile } from "./download.js";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
const store = useStore();
const activeKey = ref(1);
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

onMounted(() => {
  // 发起请求, 获取压缩切换所有数据
  getCompressList("format");
  getCompressList("compress");
  getCompressList("upload");
});
onUpdated(() => {
  // console.log(fileList.value);
});

// 压缩类型数组
let compressList = ref([
  {
    id: 1,
    type: "format",
    name: "场景压缩",
  },
  {
    id: 2,
    type: "compress",
    name: "大小压缩",
  },
  {
    id: 3,
    type: "upload",
    name: "无损压缩",
  },
]);
// 压缩类型场景所有数组
let compressSceneList = ref([]);
let compressSceneItem = ref([]);

// 点击压缩类型切换转换压缩场景  1.
const compressHandle = (num) => {
  // 切换类名
  activeKey.value = num;
  // 切换压缩场景数据
  compressSceneItem.value = compressSceneList.value[num - 1];
  compressSceneItem.value.map((item) => {
    if (item.compressState) {
      activeKeySon.value = item.compressState;
    } else {
      activeKeySon.value = compressSceneItem.value[0].tmpId;
    }
  });
};

// 发起请求，获取压缩场景
const getCompressList = (state) => {
  return homeTemplateList(state, 1, 10).then((res) => {
    let arr = [];
    if (res.data.code == 200) {
      // 获取所有压缩场景内容
      compressSceneList.value.push(res.data.data.list);
      compressSceneList.value.map((item) => {
        item.map((i) => {
          getCompressScenes(item[0].tmpId).then((res) => {
            if (res.data.code == 200) {
              // 获取固定的params1
              arr.push(res.data.data);
              params1.value = arr[0];
              //  保存
              i.params = res.data.data;
            }
          });
        });
      });
      if (compressSceneItem.value.length === 0) {
        // 压缩场景默认显示第一个
        compressSceneItem.value = compressSceneList.value[0];
        activeKeySon.value = compressSceneItem.value[0].tmpId;
      }
    }
  });
};

// 点击切换压缩场景获取压缩场景  2.
const compressSceneClick = (item) => {
  // 每次切换赋值给params1
  params1.value = item.params;
  compressSceneItem.value.map((data) => {
    data.compressState = null;
    if (item.tmpId === data.tmpId) {
      data.compressState = item.tmpId;
    }
  });
  activeKeySon.value = item.tmpId;
  // getCompressScene(item.tmpId);
};
let upload = ref(null);
//  添加按钮，触发input，让文件夹弹出  3.
const handleUploading = (e) => {
  upload.value.click();
};

/* 文件夹弹出 选择图片上传 */
let file = ref(null);
let videoDom = ref(null);
// 获取置视频的时长
let videoTime = ref(null);
let handleInputV = (e) => {
  // 获取选中的视频
  const uploadFiles = e.target.files;
  if (uploadFiles.length > 0) {
    // 选中添加进fileList数组
    for (let i = 0; i < uploadFiles.length; i++) {
      fileList.value.push(uploadFiles[i]);
    }
  }
};
//  获取videotime
const myFunction = (e) => {
  videoTime.value = e.target.duration;
};

const HandleDragover = (e) => {
  e.preventDefault();
};
// 拖拽file
const HandleDrag = (e) => {
  e.preventDefault();
  let FileArr = e.dataTransfer.files;
  for (let i = 0; i < FileArr.length; i++) {
    fileList.value.push(FileArr[i]);
  }
};

// 创建一个可以下载的url数组
let fileUrlList = ref([]);
// 当转换成功，获取url和file
const getFileItem = (obj) => {
  fileUrlList.value.push(obj);
};

// 点击下载全部
const downloadHandle = () => {
  let blogTitle = "下载文件的名字";
  let zip = new JSZip();
  let promiseArr = [];
  let cache = {};
  // 要下载图片的url
  let arrImg = [];
  for (let i = 0; i < fileUrlList.value.length; i++) {
    arrImg.push({
      path: fileUrlList.value[i].videoUrl,
      name: fileUrlList.value[i].file.name,
    });
  }

  for (let item of arrImg) {
    const promise = getImgArrayBuffer(item.path).then((data) => {
      // 下载文件，并存成ArrayBuffer对象（blob）
      zip.file(item.name, data, { binary: true }); // 逐个添加文件
      cache[item.name] = data;
    });
    promiseArr.push(promise);
  }
  Promise.all(promiseArr).then(() => {
    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        // 生成二进制
        FileSaver.saveAs(content, blogTitle); // 利用file-saver保存文件 自定义文件名
        this.btnLoading = false;
      })
      .catch((res) => {
        // message.warning("文件压缩失败");
      });
  });
};

/**
 * 多文件打包下载功能
 * @param {string} url 文件地址
 */
const getImgArrayBuffer = (url) => {
  return new Promise((resolve, reject) => {
    // 通过请求获取文件blob格式
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.responseType = "blob";
    xmlHttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.status);
      }
    };
    xmlHttp.send();
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/home/CompressedVideo/index.scss";
// @import "assets/styles/test.scss"; // 自定义别名路径：详见vue.config.js
// @import "../../assets/styles/test.scss"; 相对路径
/*文件上传css*/

// 新添加的下载按钮
.home .home_uploadingVideo_box .download {
  margin-top: 53px;
  width: 331px;
  height: 46px;
  background: #0544ff;
  border-radius: 6px;
}

//
.home_fileCompression_box_center_box {
  .ant-progress-text {
    display: none !important;
  }
}

.home_fileCompression {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 33px;

  .home_fileCompression_flex {
    width: 1268px;
    .home_fileCompression_box {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;

      .home_fileCompression_box_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 27px;
      }
      .home_fileCompression_box_zh {
        width: 93px;
        height: 29px;
        font-size: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 29px;
        letter-spacing: 1px;
      }
      .home_fileCompression_box_xz {
        width: 93px;
        height: 29px;
        font-size: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 29px;
        letter-spacing: 1px;
      }
      .home_fileCompression_box_name {
        display: inline-block;
        width: 128px;
        height: 29px;
        font-size: 21px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 29px;
        letter-spacing: 1px;
        overflow: hidden;
      }
      .home_fileCompression_box_center {
        display: flex;
        align-items: center;
        .home_fileCompression_box_memory {
          width: 65px;
          height: 29px;
          font-size: 21px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 29px;
          letter-spacing: 1px;
        }
        .home_fileCompression_box_center_box {
          flex: 1;
          margin: 0 27px;
          width: 496px;
          height: 40px;
          background: #d6dff6;
          border-radius: 25px;
          .home_fileCompression_box_center_box_style {
            width: 0%;
            height: 100%;
            border-radius: 25px;
            background: linear-gradient(to right, #1bc2ed, #2d19ce);
            font-size: 19px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 40px;
            letter-spacing: 1px;
            text-align: center;
            overflow: hidden;
          }
          .scStyle {
            background: linear-gradient(to right, #1bc2ed, #2d19ce);
          }
          .zhtyle {
            background: linear-gradient(90deg, #04c4f5 0%, #51ff82 100%);
          }
        }
      }
    }
  }
}
.home_compressedVideo {
  width: 100%;
  padding-top: 156px;
  .home_compressedVideo_hanzi {
    text-align: left;
    margin: 17px 0 21px 293px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0544ff;
    line-height: 16px;
  }
  .home_uploadingVideo_box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .home_uploadingVideo {
    width: 1333px;
    height: 335px;
    border-radius: 19px;
    opacity: 0.6;
    border: 4px dashed #0544ff;
    // margin-left: 292px;
    text-align: center;
    .home_uploadingVideo_bottom {
      width: 252px;
      height: 80px;
      background: #0544ff;
      box-shadow: inset 0px 5px 29px 0px rgba(255, 255, 255, 0.5);
      border-radius: 9px;
      margin: auto;
      margin-top: 84px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      .home_uploadingVideo_bottom_span {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
      .home_uploadingVideo_bottom_img {
        width: 32px;
        height: 32px;
        margin-right: 9px;
        img {
          width: 100%;
          height: 100%;
          /* vertical-align: baseline; */
        }
      }
    }
    p {
      font-size: 21px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0544ff;
      line-height: 29px;
      letter-spacing: 1px;
      margin-bottom: 55px;
    }
    h1 {
      font-size: 21px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 29px;
      letter-spacing: 1px;
    }
    span {
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0544ff;
      line-height: 29px;
      letter-spacing: 1px;
      text-decoration: underline;
    }
  }
}
.home_compressedVideo_top {
  padding-bottom: 60px;
  h2 {
    font-size: 53px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 53px;
    letter-spacing: 1px;
  }
  div {
    font-size: 32px;
    font-family: PingFangSC-Thin, PingFang SC;
    font-weight: 100;
    color: #000000;
    line-height: 53px;
  }
}

.home_compressedVideo_bottom {
  width: 100%;
  display: flex;
  justify-content: center;

  .home_compressedVideo_bottom_box {
    width: 1333px;
    height: 165px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(7.321131447587355px);
    .home_compressedVideo_bottom_top {
      display: flex;
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
    .home_compressedVideo_bottom_bottom {
      padding: 0 0 0 89px;
      height: 88px;
      background: #e1e9ff;
      .home_compressedVideo_bottom_bottom_one {
        display: flex;
        div {
          background: #e1e9ff;
          margin-right: 108px;
          height: 88px;
          line-height: 88px;
          backdrop-filter: blur(7.321131447587355px);
          letter-spacing: 1px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0544ff;
        }
      }
    }
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

@import "@/assets/css/home/homeNav/CompressedVideo/CompressedVideo_media1440px.scss";
@import "@/assets/css/home/homeNav/CompressedVideo/CompressedVideo_media1280px.scss";
// @import "@/assrts/styles/animation/home/CompressedVideo/index.scss";
</style>
