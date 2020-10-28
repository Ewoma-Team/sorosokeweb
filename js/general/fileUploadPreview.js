const fileUpload = document.querySelector('[data-target-file]')
const clearFile = document.querySelector('#clear-file')
const videoTag = document.querySelector('#video-tag')
const imagetag =  document.querySelector('#image-tag')
let file = null;

const previewFile = (e) => {
    
    console.log(e)
    document.querySelector('#click-for-write-up').innerHTML =
     `<div class="spinner-grow" style="color: #d61545; width: 50px; height: 50px;" role="status"></div>`;

    var reader = new FileReader();
    file = e.currentTarget.files[0];

    console.log(file)

    if (file.type.split('/')[0] === "image") {
        reader.onload = (evt) => {
            document.querySelector('#click-for-upload').style.display = 'none';
            videoTag.style.display = 'none';
            imagetag.style.display = 'block';
            clearFile.style.display = 'block';
            imagetag.src = evt.target.result;
        };
    }
    if(file.type.split('/')[0] === "video" ) {
        reader.onload = (evt) => {
            document.querySelector('#click-for-upload').style.display = 'none';
            imagetag.style.display = 'none';
            videoTag.style.display = 'block';
            clearFile.style.display = 'block';
            videoTag.innerHTML = `<source src=${evt.target.result}>`;
        };
    }
    reader.readAsDataURL(file);
}

fileUpload.addEventListener('change', (e) => previewFile(e))


clearFile.addEventListener('click', (e) => {
   resetUpload(true)
})


const resetUpload = (clearBtn) => {
    console.log()
    file = null;
    clearFile.style.display = 'none';

    imagetag.src = '';
    imagetag.style.display = 'none';
    fileUpload.value = null;

    document.querySelector('#click-for-upload').style.display = 'block';
    document.querySelector('#click-for-write-up').innerHTML = `<span style="color: #d61545;">Click here</span> to browse
    device for <br> media you wish to upload`;

    stopMedia()
    fileUpload.addEventListener('ended', stopMedia);
    videoTag.src = '';
    videoTag.style.display = 'none';

    !clearBtn ? document.querySelector('#upload-feed-form').reset() : null;
}

const stopMedia = () => {
      videoTag.pause();
      videoTag.currentTime = 0;
}


