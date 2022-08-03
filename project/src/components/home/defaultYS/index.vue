<template>
  <div class="home_compressedVideo_bottom">
    <div class="home_compressedVideo_bottom_box">
      <div class="home_compressedVideo_bottom_top">
        <div
          v-for="item in compressList"
          :key="item"
          @click="compressHandle(item)"
          :class="[activeKey == item.type ? 'border_col' : '']"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 压缩场景 -->
      <div class="home_compressedVideo_bottom_bottom">
        <div class="home_compressedVideo_bottom_bottom_one">
          <!-- 子组件 -->
          <Size> <template v-slot:YsSon> 12 </template> </Size>
          <!-- <div
            v-for="item in compressSceneItem"
            :key="item"
            @click="compressSceneClick(item)"
            :class="[activeKeySon === item.tmpId ? 'border_cor' : '']"
          >
            {{ item.title }}
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Size from "@/components/home/defaultYS/component/Size/index.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import {
  getCompressScenes,
  getCompressToken,
  getSchedule,
  getTranscoding,
  homeTemplateList,
} from "@/api/home";
components: {
  Size;
}
const $router = useRouter();
const store = useStore();
// 样式类名变化
const activeKey = ref(store.state.home.YsSctiveKey);

// 压缩类型数组
let compressList = ref([
  {
    id: 1,
    type: "format",
    name: "场景压缩",
    router: "/video-converter/",
  },
  {
    id: 2,
    type: "compress",
    name: "大小压缩",
    router: "/video-compressor",
  },
  {
    id: 3,
    type: "upload",
    name: "无损压缩",
    router: "/video-lossless-compression",
  },
]);

// 1.点击压缩类型切换转换压缩场景
const compressHandle = (item) => {
  console.log();
  let state = item.type;
  // 存储到本地，刷新保存
  store.commit("home/setYsSctiveKey", state);
  // 跳转页面
  $router.push({ path: item.router });
  // 切换类名
  activeKey.value = state;
  // // 切换压缩场景数据
  // compressSceneItem.value = compressSceneList.value[num - 1];
  // compressSceneItem.value.map((item) => {
  //   if (item.compressState) {
  //     activeKeySon.value = item.compressState;
  //   } else {
  //     activeKeySon.value = compressSceneItem.value[0].tmpId;
  //   }
  // });
};

// 2.发起请求，获取压缩场景
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
</script>

<style lang="less" scoped>
.home_compressedVideo_bottom {
  width: 100%;
  display: flex;
  justify-content: center;

  .home_compressedVideo_bottom_box {
    width: 1000px;
    height: 124px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(7.321131447587355px);
    .home_compressedVideo_bottom_top {
      display: flex;
      width: 479px;
      height: 58px;

      border-radius: 7px 7px 0px 0px;
      div {
        cursor: pointer;
        background: #ffffff;
        width: 33.33%;
        height: 58px;
        line-height: 52px;
        letter-spacing: 1px;
        border-radius: 0 10px 0 0;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #0544ff;
        line-height: 66px;
      }
    }
    .home_compressedVideo_bottom_bottom {
      padding: 0 0 0 67px;
      height: 62px;
      background: #e1e9ff;
      .home_compressedVideo_bottom_bottom_one {
        display: flex;
        div {
          cursor: pointer;
          background: #e1e9ff;
          margin-right: 81px;
          height: 62px;
          line-height: 62px;
          backdrop-filter: blur(7.321131447587355px);
          letter-spacing: 1px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0544ff;
        }
      }
    }
  }
}
.fenjxian {
  margin-top: 24px;
  margin-left: -2px;
  width: 1px;
  height: 17px;
  border: 1px solid #e1e9ff;
}
.border_cor {
  border-bottom: 3px #0544ff solid !important ;
  border-radius: 3px;
}
.border_col {
  background: #e1e9ff !important;
}
</style>
