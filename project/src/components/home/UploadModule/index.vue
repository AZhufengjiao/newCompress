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
      <span class="home_fileCompression_box_memory">{{
        compressSize ? compressSize + "M" : "-"
      }}</span>
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

  <!-- 视频下载弹出框 -->
  <download2 :downloadModal="videoXz" @updateFlag="updateFlag"></download2>
  <!-- 视频下载完成弹出框 -->
  <downloadWc
    :downloadModal="videoDownWc"
    @updateFlag="DownWcHandle"
  ></downloadWc>

  <!-- 支付弹出层 -->
  <payModel :modalFlag="modalFlag" @updataVisible="updataModalFlag"></payModel>

  <!-- 用户身份 下载弹出框  选择试试 和立即升级 -->
  <uploadModal
    :UploadModal="UploadModal"
    @updateFlag="updateStateHandle"
  ></uploadModal>
</template>

<script setup>
import {
  getCompressScenes,
  getCompressToken,
  getSchedule,
  getTranscoding,
  getOperationStatusAvinfo,
} from "@/api/home";
import { getKillDownloadNum } from "@/api/about";
import download2 from "@/components/modal/download/download2.vue"; // 视频下载中弹出框
import downloadWc from "@/components/modal/download/downloadWc.vue"; // 视频下载完成弹出框
import uploadModal from "@/components/modal/uploadModal/index.vue"; // 选择支付试试弹出框
import payModel from "@/components/modal/payModal/index.vue"; // 用户支付弹出框
import { useStore } from "vuex";
import { ref, onMounted, onUpdated, watch, toRefs, computed } from "vue";
import { defineEmits } from "vue";
import { message } from "ant-design-vue";
import { saveFile } from "@/components/home/CompressedVideo/download.js";
import axios from "axios";
import { compressFn } from "@/assets/js/compress.js";
components: {
  download2, downloadWc, uploadModal, payModel;
}
const store = useStore();
const emit = defineEmits(["getFileItemParams"]);
// 获取用户id
let userid = computed(() => store.state.login.userid);
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
// 获取上传文件类型  "video/mp4"
let fileType = ref(props.item.type);
// 获取上传视频名字
let fileName = ref(props.item.name);
// 获取文件 大小
let fileSize = ref((props.item.size / 1024 / 1024).toFixed(2));
// 获取压缩文件大小
let compressSize = ref(null);
// 视频src
let fileURL = ref(props.item);
let uploadProcess = ref(0);

// 弹出框系列
// 1.视频下载弹出框弹出框
let videoXz = ref({
  flag: false,
  num: 0,
});
// 隐藏下载弹窗
const updateFlag = (res) => {
  videoXz.value.flag = res;
};

// 2.下载完成弹出框
let videoDownWc = ref({
  flag: false,
  num: 0,
});
// 隐藏下载完成
const DownWcHandle = (res) => {
  videoDownWc.value.flag = res;
};

// 3. 支付弹出框
// 支付弹出框
let modalFlag = ref(false);
// 点击显示弹出框
const payModalShow = () => {
  emit("updateFlag", false);
  modalFlag.value = true;
};
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};
// 支付成功，关闭自己
// const closeHandle = (state) => {
//   modalFlag.value = state;
//   // modalShow.value = state;
// };

// 1.进入页面，获取input上传视频，判断视频格式
onMounted(() => {
  console.log();
  // 获取文件上传url，赋值给video
  fileURL.value = URL.createObjectURL(file.value); // https://blog.csdn.net/qq_21479345/article/details/108550762
  subVideoDom.value.src = fileURL.value;

  // // API：上传文件后缀
  // // 判断上传的格式是否是视频
  // if (fileType.value.indexOf("video/") > -1) {
  //   // 发起请求获取上传token
  //   // video/ replace .
  //   // video/mp4 .mp4 xxxx.mp4
  //   // video/mov .mov xxxx.mov
  let suffix = fileType.value.replace("video/", ".");
  // console.log(props.payload);
  // compressFn(file.value, props.payload);
  getCompressTK(suffix); // ---------------------------------------------------
  // } else {
  //   message.warning("您上传的视频格式有误，请重新上传");
  // }
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

// 2.上传url
// 视频路径，调用七牛上传接口
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
          url: "https://up-cn-east-2.qiniup.com",
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
            uploadinUrl.value = "http://video.heycut.com/" + res.data.key; // https://img.soogif.com/video/cb55e08285524315b9634875a5b156acMyVideo_3.mp4 这个样子
            // 调取转码api接口
            setTranscoding();
          }
        });
      }
    });
  });
};

//  3.转码api
let pid = ref(null);
// 轮训定时器
let lxTime = ref(null);
const setTranscoding = async () => {
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
  return await getTranscoding(
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
      // 时间总长十分之一
      let tenNum = videoTime.value / 10;
      //  获取视频时长的三分之一
      let threeNum = tenNum * 3;
      //  变化时间;
      let TimeChange = 0;
      // 页面每次跑10
      completeWih.value = 10;

      lxTime.value = setInterval(() => {
        TimeChange += tenNum;
        if (TimeChange >= threeNum) {
          // 永远显示进度99
          completeWih.value = 99;
        } else {
          completeWih.value += 10;
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
let fileUrlList = computed(() => store.state.home.conversionList);
// 加一个定时器，获取文件压缩大小需要轮询
let compressSizeTime = ref(null);

// 获取异步处理进度  进入轮训
// 获取用户下载url
let videoUrl = ref(null);

const setSchedule = async (pid) => {
  return await getSchedule(pid).then((res) => {
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
      let arr = computed(() => store.state.home.conversionList);
      arr.value.push(obj.value);
      store.commit("home/setConversionList", arr.value);
      emit("getFileItemParams", arr.value);

      // 获取压缩文件大小
      compressSizeTime.value = window.setInterval(() => {
        // 发起请求，获取压缩文件大小
        operationStatusAvinfo(compressVideoSize.value);
      }, 1000);
    }
  });
};

// 获取压缩文件大小
const operationStatusAvinfo = async (infoPid) => {
  return await getOperationStatusAvinfo(infoPid).then((res) => {
    // 轮训成功，获取到压缩之后的大小
    if (res.data.code == 200) {
      compressSize.value = (res.data.data.newSize / 1024 / 1024).toFixed(2);
      // 关闭定时器
      clearInterval(compressSizeTime.value);
      compressSizeTime.value = true;
    }
  });
};

// 查看用户的身份
let roleType = computed(() => store.state.user.userData.roleType);
// 获取该用户下载次数
let downloadNumber = computed(() => store.state.home.downloadNumber);
// 传给付款组件参数，显示与隐藏
let UploadModal = ref({
  flag: false,
  state: "",
});
// 子组件像父组件传递参数，修改UploadModal的状态
const updateStateHandle = (state) => {
  UploadModal.value.flag = state;
};
// 4.用户点击下载
const downloadBtn = () => {
  // 判断该转化好的视频是否是试试的视频，试试的视频不让下载
  if (obj.value.file.shishi == false) {
    return (modalFlag.value = true); // 支付弹出框
  }
  if (obj.value.zh !== true) {
    // 如果是普通用户的话弹出支付
    if (
      roleType.value == "free" &&
      (fileSize.value >= 10 || downloadNumber.value < 1)
    ) {
      return (modalFlag.value = true); // 支付弹出框
    }
    // 判断下载次数是否小于用户准备下载视频的个数
    if (downloadNumber.value < 1) {
      // 判断身份是否有次数限制
      if (roleType.value !== "platinum" || roleType.value !== "diamond") {
        // 复制参数，修改弹出框信息
        return (UploadModal.value = {
          flag: true,
          state: roleType.value,
        });
      }
    }
  }

  videoDownWc.value.num = 1;
  // 让下载中弹窗显示
  videoXz.value.flag = true;
  videoXz.value.num = 1;
  if (state.value == "zh" && completeWih.value == 100) {
    downloadFn();
  }

  // 判断本地是否有这个
  fileUrlList.value.forEach((element) => {
    if (element.videoUrl === obj.value.videoUrl && element.xz == false) {
      element.xz = true;
      store.commit("home/setConversionList", fileUrlList.value);
      // 扣除本地下载次数
      killDownLoadNumber(1, userid.value);
      // 扣除每天次数
      store.commit("home/jianDayloadNumber", 1);
    }
  });
};

// 点击下载扣除次数
const killDownLoadNumber = async (picNumber, userId) => {
  return await getKillDownloadNum(picNumber, userId).then((res) => {
    if (res.data.code == 200) {
      // 修改本地下载次数
      store.commit("home/setDownloadNumber", res.data.data.newDownloadNumber);
    }
  });
};

// 下载定时器
const downloadTimer = ref(null);
// 保存文件视频到本地
const downloadFn = async () => {
  // 下载默认时间
  let delayTime = 1800;
  // 下载起始时间
  let currentTime = new Date().getTime();

  return await axios({
    method: "post",
    url: videoUrl.value,
    responseType: "blob",
  })
    .then((res) => {
      // 下载后时间
      let tempTime = new Date().getTime();
      // 下载时间
      delayTime = tempTime - currentTime < 1800 ? 1800 : tempTime - currentTime;
      // 开启定时器
      downloadTimer.value = window.setInterval(() => {
        // 下载中弹出框隐藏
        videoXz.value.flag = false;
        // 下载完成弹出框显示
        videoDownWc.value.flag = true;
        // 去除定时器
        clearInterval(downloadTimer.value);
        // 让定时器为空
        downloadTimer.value = true;
      }, delayTime);
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
        cursor: pointer;
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
          // opacity: 0;
          width: 92px;
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
