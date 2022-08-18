<template>
  <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
  <router-view />
</template>

<script>
export default {
  mounted() {
    document.dispatchEvent(new Event("render-event"));
  },
};
</script>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1024px;

  .home_fileCompression_box_center_box {
    .ant-progress-outer {
      margin: 0;
      padding: 0;
      .ant-progress-inner {
        .ant-progress-bg {
          width: 100% !important;
          height: 30px !important;
        }
      }
    }
    .ant-progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0;
      margin: 0;
      width: none;
    }
  }
}
:global .ant-upload-list .ant-upload-list-text {
  display: none !important;
}
ul {
  padding: 0;
  margin: auto;
  text-decoration: none;
  list-style: none;
}
</style>
