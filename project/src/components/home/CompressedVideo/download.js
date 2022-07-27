export function saveFile(data, name) {
  try {
    const blobUrl = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.style.display = "none";
    a.download = name;
    a.href = blobUrl;
    document.body.append(a);
    a.click();
  } catch (error) {
    console.log("保存文件出错: ", error);
  }
}
