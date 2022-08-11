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
          <Size style="display: flex">
            <template v-slot:YsSon style="display: flex">
              <div
                v-for="item in SonList.data"
                :key="item.state"
                @click="compressSceneClick(item)"
                :class="[activeKeySon === item.tmpId ? 'border_cor' : '']"
              >
                {{ item.title }}
              </div>
            </template>
          </Size>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Size from "@/components/home/defaultYS/component/Size/index.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { getCompressScenes, homeTemplateList } from "@/api/home";
components: {
  Size;
}
const emit = defineEmits(["paramsObj"]);
const $router = useRouter();
const store = useStore();
//压缩类型 样式类名变化
const activeKey = ref("format");
const activeKeySon = ref(1);
// 转码要的参数
let params1 = ref(null);

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

onMounted(() => {
  // 发起请求，获取默认数据
  getCompressList(activeKey.value);
});

// 定义一个装压缩类型的数组，存储起来
let CompressFaList = ref([]);
// 传给子组件的数组
let SonList = ref([]);
// 子组件全部数据
let SonTmpIdList = ref([]);
// 1.点击压缩类型切换转换压缩场景
const compressHandle = (item) => {
  let state = item.type;
  // 存储到本地，刷新保存
  // store.commit("home/setYsSctiveKey", state);
  // 跳转页面
  $router.push({ path: item.router });
  // 切换类名
  activeKey.value = state;
  // 发起请求，获取该类型数据
  getCompressList(state);
};
// 1.1.发起请求，获取压缩场景
const getCompressList = (state) => {
  // 判断CompressFaList数组中可有传入的状态，没有才可发请求
  if (!CompressFaList.value.some((item) => item.state === state)) {
    return homeTemplateList(state, 1, 10).then((res) => {
      let obj = {};
      let arr = [];
      if (res.data.code == 200) {
        // 自定义对象
        obj = {
          state: state,
          data: res.data.data.list,
        };
        arr.push(obj);
        SonList.value = arr[0];
        // 存储
        CompressFaList.value.push(obj);

        // 判断 compressState是否为true，是的话activeKeySon保持点击的那个
        SonList.value.data.map((item) => {
          if (item.compressState) {
            activeKeySon.value = item.compressState;
          } else {
            // 让activeKeySon类名样式保持在第一个
            activeKeySon.value = SonList.value.data[0].tmpId;
          }
        });
      }

      // 场景是什么，对应的类型发起qqiu
      CompressScenes(activeKeySon.value);
    });
  } // 如果有，直接获取子组件需要的数组
  else {
    SonList.value = CompressFaList.value.filter(
      (item) => item.state === state
    )[0];

    // 判断 compressState是否为true，是的话activeKeySon保持点击的那个
    SonList.value.data.map((item) => {
      if (item.compressState) {
        activeKeySon.value = item.compressState;
      } else {
        // 让activeKeySon类名样式保持在第一个
        activeKeySon.value = SonList.value.data[0].tmpId;
      }
    });

    // 场景是什么，对应的类型发起请求
    CompressScenes(activeKeySon.value);
  }
};

// 2.点击切换压缩场景获取压缩场景
const compressSceneClick = (item) => {
  // 场景是什么，对应的类型发起qqiu
  CompressScenes(item.tmpId);
  // 点击切换类名
  activeKeySon.value = item.tmpId;

  SonList.value.data.map((data) => {
    // 先排他设置每个为空
    data.compressState = null;
    if (data.tmpId === item.tmpId) {
      // 赋值
      data.compressState = item.tmpId;
    }
  });
};

// 2.1。根据压缩场景切换获取转码要用的参数
const CompressScenes = (tmpId) => {
  let arr = {};
  // 如果没有，就发请求
  if (!SonTmpIdList.value.some((item) => item.id === tmpId)) {
    // 场景是什么，对应的类型发起请求
    return getCompressScenes(tmpId).then((res) => {
      if (res.data.code == 200) {
        params1.value = res.data.data;
        emit("paramsObj", params1.value);

        arr = {
          id: tmpId,
          obj: res.data.data,
        };
        SonTmpIdList.value.push(arr);
      }
    });
  } // 如果有就不发请求
  else {
    SonTmpIdList.value.map((item) => {
      if (item.id == tmpId) {
        params1.value = item.obj;
      }
      emit("paramsObj", params1.value);
    });
  }
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
@import "@/assets/css/home/homeNav/CustomCompressed/CustomCompressed1920px.scss";
@import "@/assets/css/home/homeNav/CustomCompressed/CustomCompressed1440px.scss";
@import "@/assets/css/home/homeNav/CustomCompressed/CustomCompressed1280px.scss";
</style>
