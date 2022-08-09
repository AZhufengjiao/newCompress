<template>
  <div class="home_fileCompression_box_box">
    <span class="home_fileCompression_box_name">{{ fileName }} </span>
    <div class="home_fileCompression_box_center">
      <span
        class="home_fileCompression_box_memory"
        style="opacity: 1 !important"
        >{{ fileSize + "MB" }}</span
      >
      <video
        style="display: none"
        src="fileURL"
        ref="subVideoDom"
        @canplaythrough="myFunction"
      ></video>
      <div id="a" class="home_fileCompression_box_center_box">
        <div
          :class="[
            'home_fileCompression_box_center_box_style',
            {
              scStyle: state == 'sc',
            },
            {
              zhtyle: state == 'zh',
            },
          ]"
          :style="[{ width: succeed == true ? completeWih + '%' : 0 }]"
        >
          <span v-if="state == 'sc' && completeWih > 10">{{
            completeWih == 100 ? "上传成功" : "上传中"
          }}</span>
          <span v-if="state == 'zh' && completeWih > 10">{{
            completeWih == 100 ? "转换成功" : "转换中"
          }}</span>
        </div>
      </div>
      <span
        class="home_fileCompression_box_memory"
        :style="{ opacity: compressSize ? 1 : 0 }"
        >{{ compressSize + "M" }}</span
      >
    </div>
    <div class="home_fileCompression_box_zh">
      <span v-if="state == 'sc'">{{
        completeWih == 100 ? "上传成功" : "开始转换"
      }}</span>
      <span v-if="state == 'zh'" @click="downloadBtn">{{
        completeWih == 100 ? "下载" : "转换中"
      }}</span>
    </div>
  </div>
</template>

<script setup>
import {
  getCompressScenes,
  getCompressToken,
  getSchedule,
  getTranscoding,
  homeTemplateList,
  getOperationStatusAvinfo,
} from "@/api/home";
import { getKillDownloadNum } from "@/api/about";
import { useStore } from "vuex";
import { ref, onMounted, onUpdated, watch, toRefs } from "vue";
import { defineEmits } from "vue";
import { message } from "ant-design-vue";
import { saveFile } from "@/components/home/CompressedVideo/download.js";
import axios from "axios";
const store = useStore();
const emit = defineEmits(["getFileItemParams"]);
// 获取用户id
let userid = ref(store.state.login.userid);
// 获取压缩文件大小需要的参数
let compressVideoSize = ref(null);
let flag = ref(false);
let state = ref("sc");
let time = ref(null);
let succeedtime = ref(null);
let succeed = ref(false);
// 获取视频的时间
let videoTime = ref(null);
// 获取视频dom
let subVideoDom = ref(null);

const props = defineProps({
  item: File,
  payload: Object,
  // fileList: Array,
});
// 获取上传文件
let file = ref(props.item);
// console.log(file.value);
// 获取上传文件类型  "video/mp4"
let fileType = ref(props.item.type);
// 获取上传视频名字
let fileName = ref(props.item.name);
// 获取文件 大小
let fileSize = ref(parseInt(props.item.size / 1024 / 1024));
// 获取压缩文件大小
let compressSize = ref(null);
// 视频src
let fileURL = ref(props.item);
let uploadProcess = ref(0);

watch(
  () => props.item,
  (newValue, oldValue) => {
    // console.log(newValue);
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  // 获取文件上传url，赋值给video
  fileURL.value = URL.createObjectURL(file.value); // https://blog.csdn.net/qq_21479345/article/details/108550762
  subVideoDom.value.src = fileURL.value;

  // API：上传文件后缀
  // 判断上传的格式是否是视频
  if (fileType.value.indexOf("video/") > -1) {
    // 发起请求获取上传token
    // video/ replace .
    // video/mp4 .mp4 xxxx.mp4
    // video/mov .mov xxxx.mov
    let suffix = fileType.value.replace("video/", ".");
    getCompressTK(suffix);
  } else {
    message.warning("您上传的视频格式有误，请重新上传");
  }
});

onUpdated(() => {});

// 获取视频时间
const myFunction = (e) => {
  videoTime.value = e.target.duration;
};

flag.value = false;
succeed.value = false;

// 上传动画开启
time.value = setTimeout(() => {
  flag.value = true;
}, 0);
// 转换动画开启
succeedtime.value = setTimeout(() => {
  succeed.value = true;
}, 1000);
clearTimeout(time);
// 获取文件url

// 4.上传url
// 视频路径
let uploadinUrl = ref(null);
let completeWih = ref(null);
const getCompressTK = (suffix) => {
  state.value = "sc";
  return new Promise(function () {
    getCompressToken(suffix).then((res) => {
      let key = res.data.data.key;
      if (res.data.code == 200) {
        // 获取tokem  上传文件 获取url
        let uploadForm = new FormData();
        uploadForm.append("key", key);
        uploadForm.append("token", res.data.data.token);
        uploadForm.append("file", file.value);
        axios({
          method: "post",
          url: "https://upload.qiniup.com",
          data: uploadForm,
          onUploadProgress: (propressEvent) => {
            if (propressEvent.lengthComputable) {
              completeWih.value =
                ((propressEvent.loaded / propressEvent.total) * 100) | 0;
            }
            if (completeWih.value >= 100) {
              completeWih.value = 5;
              state.value = "zh";
            }
          },
        }).then((res) => {
          if (res.status == 200) {
            uploadinUrl.value = "https://img.soogif.com/" + res.data.key; // https://img.soogif.com/video/cb55e08285524315b9634875a5b156acMyVideo_3.mp4 这个样子
            // 调取转码api接口
            setTranscoding();
          }
        });
      }
    });
  });
};

//  转码api
let pid = ref(null);
// 轮训定时器
let lxTime = ref(null);
const setTranscoding = () => {
  let {
    watermark,
    format,
    avfast,
    avsmart,
    vcodec,
    target,
    bitRate,
    frameRate,
    highFrameRate,
    videoNo,
    audioNo,
    subtitleNo,
    resolution,
  } = props.payload;
  let url = uploadinUrl.value;
  return getTranscoding(
    url,
    watermark,
    format,
    avfast,
    avsmart,
    vcodec,
    target,
    bitRate,
    frameRate,
    highFrameRate,
    videoNo,
    audioNo,
    subtitleNo,
    resolution
  ).then((res) => {
    if (res.data.code == 200) {
      // 获取异步处理进度需要的pid
      pid.value = res.data.data.pId;
      // 设置定时器
      lxTime.value = null;
      //  获取视频时长
      //  获取视频时长的三分之一
      let threeNum = videoTime.value / 3;
      //  获取轮训时间;
      let currentTime = 0;
      completeWih.value = 10;
      lxTime.value = setInterval(() => {
        if (completeWih.value >= threeNum * 10) {
          // 永远显示进度99
          completeWih.value = 99;
        } else {
          completeWih.value += 15;
        }
        // 并调用处理异步处理进度函数
        setSchedule(pid.value);
      }, 1000);
    }
  });
};

// 生成一个对象，好push到本地
let obj = ref(null);
// 创建一个可以下载的url数组
let fileUrlList = ref(store.state.home.conversionList);
// 加一个定时器，获取文件压缩大小需要轮询
let compressSizeTime = ref(null);

// 获取异步处理进度  进入轮训
// 获取用户下载url
let videoUrl = ref(null);
const setSchedule = (pid) => {
  return getSchedule(pid).then((res) => {
    if (res.data.code == 200) {
      // 获取压缩文件大小需要的参数
      compressVideoSize.value = res.data.data.infoPid;
      completeWih.value = 100;
      clearInterval(lxTime.value);

      // 用户下载url
      videoUrl.value = res.data.data.url;

      // 转化成功，返回给父组件，准备一键下载
      obj.value = {
        videoUrl: videoUrl.value,
        file: file.value,
        zh: true, // 转化
        xz: false, // 下载
      };

      // 获取转换成功存储数组
      let arr = store.state.home.conversionList;
      arr.push(obj.value);
      store.commit("home/setConversionList", arr);
      emit("getFileItemParams", arr);

      // 获取压缩文件大小
      compressSizeTime.value = window.setInterval(() => {
        // 发起请求，获取压缩文件大小
        operationStatusAvinfo(compressVideoSize.value);
      }, 1000);
    }
  });
};

// 获取压缩文件大小
const operationStatusAvinfo = (infoPid) => {
  return getOperationStatusAvinfo(infoPid).then((res) => {
    // 轮训成功，获取到压缩之后的大小
    if (res.data.code == 200) {
      compressSize.value = parseInt(res.data.data.newSize / 1024 / 1024);
      // 关闭定时器
      clearInterval(compressSizeTime.value);
      compressSizeTime.value = true;
    }
  });
};

// 查看用户的身份
let roleType = store.state.user.userData.roleType;
// 获取该用户下载次数
let downloadNumber = ref(store.state.home.downloadNumber);
// 传给付款组件参数，显示与隐藏
let UploadModal = ref({
  flag: false,
  state: "",
});
// 子组件像父组件传递参数，修改UploadModal的状态
const updateStateHandle = (state) => {
  UploadModal.value.flag = state;
};
// 用户点击下载
const downloadBtn = () => {
  // 判断下载次数是否小于用户准备下载视频的个数
  if (downloadNumber.value < 1) {
    message.warning("下载次数不够");
    // 复制参数，修改弹出框信息
    return (UploadModal.value = {
      flag: true,
      state: roleType,
    });
  }
  if (state.value == "zh" && completeWih.value == 100) {
    downloadFn();
  }
  console.log(obj.value);
  // 判断本地是否有这个
  fileUrlList.value.forEach((element) => {
    if (element.videoUrl === obj.value.videoUrl && element.xz == false) {
      element.xz = true;
      store.commit("home/setConversionList", fileUrlList.value);
      // 扣除本地下载次数
      killDownLoadNumber(1, userid.value);
    }
  });
};

// 点击下载扣除次数
const killDownLoadNumber = (picNumber, userId) => {
  return getKillDownloadNum(picNumber, userId).then((res) => {
    if (res.data.code == 200) {
      // 修改本地下载次数
      store.commit("home/setDownloadNumber", res.data.data.newDownloadNumber);
    }
  });
};

// 保存文件视频到本地
const downloadFn = () => {
  return axios({
    method: "post",
    url: videoUrl.value,
    responseType: "blob",
  })
    .then((res) => {
      saveFile(res.data, fileName.value); // 名字
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/home/CompressedVideo/index.scss";
// @import "assets/styles/test.scss"; // 自定义别名路径：详见vue.config.js
// @import "../../assets/styles/test.scss"; 相对路径
/*文件上传css*/
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
          opacity: 0;
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
      background: #ffffff;

      border-radius: 11px 11px 0px 0px;
      div {
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
  background: #e1e9ff;
}

@import "@/assets/css/home/homeNav/CompressedVideo/CompressedVideo_media1440px.scss";
@import "@/assets/css/home/homeNav/CompressedVideo/CompressedVideo_media1280px.scss";
// @import "@/assrts/styles/animation/home/CompressedVideo/index.scss";
</style>
