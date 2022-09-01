import { createFFmpeg, fetchFile } from "../../utils/ffmpeg.min.js";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/utils/ffmpeg-core.js",
});

export const compressFn = async (file, params) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  let { name } = file;
  console.log(params);

  ffmpeg.setProgress(({ ratio }) => {
    console.log("video compress ratio：", ratio);
  });

  ffmpeg.FS("writeFile", name, await fetchFile(file));

  await ffmpeg.run("-i", name, "-t", "00:00:05", "MyVideo_999.mp4");
  // await ffmpeg.run("-i", name, "-r", 1, "-f", "image2", "image-000.png");

  const data = ffmpeg.FS("readFile", "MyVideo_999.mp4");
  const video = document.getElementById("upload");
  video.src = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" })
  );
  console.log(video.src);
};
