import 'styles/style.scss';
import 'font-awesome-webpack';
import FoggyWindow from 'components/FoggyWindow';
import images from 'components/SceneryImages';

const UPLOAD_SERVER_URL = 'http://45.55.61.164:5000/upload/file';
const foggy = new FoggyWindow('.foggy-window');
const btnSave = document.querySelector('#save-button');
const btnShowInput = document.getElementById('show-input-button');
const btnUpload = document.getElementById('upload-button');
const inputUpload = document.getElementById('upload-input');

// default image
let scenery = new Image();
const randomImage = Math.floor(Math.random() * images.length)
scenery.crossOrigin = 'Anonymous';
scenery.src = images[randomImage];
foggy.setScenery(scenery);

btnSave.onclick = (e) => {
    foggy.savePic('masterpiece');
};

btnShowInput.onclick = (e) => {
    toggleUploadState(true);
};

btnUpload.onclick = (e) => {
    const req = new XMLHttpRequest();
    const file = inputUpload.files[0];

    if (!file) {
        return;
    }

    // get image on CORS-friendly server
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.responseText) {
            var response = JSON.parse(req.responseText);
            
            if(response.success){
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = response.new_url;
                foggy.setScenery(img);

                toggleUploadState(false);
            }
            else{
                window.alert('Invalid image. Please upload image with .jpg, .gif or .png extensions only')
            }
        }
    };

    const formData = new FormData();
    formData.append("file", file);
    req.open('POST', UPLOAD_SERVER_URL);
    req.send(formData);
};

function toggleUploadState(showUpload) {
    if (showUpload) {
        inputUpload.classList.remove('hidden');
        btnShowInput.classList.add('hidden');
        btnUpload.classList.remove('hidden');
    } else {
        inputUpload.classList.add('hidden');
        btnShowInput.classList.remove('hidden');
        btnUpload.classList.add('hidden');
    }
}
