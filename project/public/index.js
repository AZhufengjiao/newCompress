var videoProcessType = 'Compress';
var videoExecuteTimestamp;

// ffmpeg load
const {createFFmpeg, fetchFile} = FFmpeg;
const ffmpeg = createFFmpeg({
    corePath: "/js/lib/ffmpeg-core.js",
    log: true,
});

$(function(){
    // (async () => {
    //     await ffmpeg.load();
    // })();

    $('.tool-tab-container .tool-tab-selection').click(function(){
        let index = $(this).index();
        if (index === 0) {
            videoProcessType = 'Compress';
        } else if (index === 1) {
            videoProcessType = 'Format';
        }
        $('#localUploadVideo').trigger('click');
    });

    // Input Listener
    document.getElementById('localUploadVideo').addEventListener('change', handleVideoUploadEvent);
});

/**
 * @msg FFMPEG Methods
 * @method  handleVideoUploadEvent
 * @method  videoConvert
 * @method  videoCompress
 */
const handleVideoUploadEvent = async ({target: {files}}) => {
    videoExecuteTimestamp = new Date().getTime();
    console.log('-------------------- ffmpeg start timestamp', videoExecuteTimestamp);
    if (videoProcessType === 'Compress') {
        videoCompress(files[0]);
    } else if (videoProcessType === 'Format') {
        videoConvert(files[0]);
    }
};

async function videoCompress(file) {
    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }
    ffmpeg.setProgress(({ ratio }) => {
        console.log('video compress ratio：', ratio);
    });
    console.log('-------------------- ffmpeg start size', file.size);
    const videoName = file.name;
    ffmpeg.FS('writeFile', videoName, await fetchFile(file));
    await ffmpeg.run('-i', videoName, '-vf', 'scale=1280:720', '-r', '12.5', '-b:v', '1024k', 'heycut_output_compress.mp4');
    const outputData = ffmpeg.FS('readFile', 'heycut_output_compress.mp4');
    console.log('-------------------- ffmpeg end size', outputData.buffer.byteLength    );
    console.log('-------------------- ffmpeg end timestamp', new Date().getTime() - videoExecuteTimestamp);
    const video = document.getElementById('result-player');
    video.src = URL.createObjectURL(new Blob([outputData.buffer], { type: 'video/mp4' }));
}

async function videoConvert(file) {
    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }
    ffmpeg.setProgress(({ ratio }) => {
        console.log('video convert ratio：', ratio);
    });
    const videoTypeSuffix = file.type.replace('video/', '');
    ffmpeg.FS('writeFile', 'heycut_input.' + videoTypeSuffix, await fetchFile(file));
    await ffmpeg.run('-i', 'heycut_input.' + videoTypeSuffix,  'heycut_output.mp4');
    const outputData = ffmpeg.FS('readFile', 'heycut_output.mp4');
    console.log('-------------------- ffmpeg end timestamp', new Date().getTime() - videoExecuteTimestamp);
    const video = document.getElementById('result-player');
    video.src = URL.createObjectURL(new Blob([outputData.buffer], { type: 'video/mp4' }));
}