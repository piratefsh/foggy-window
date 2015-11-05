import 'styles/style.scss';
import 'font-awesome-webpack';
import FoggyWindow from 'FoggyWindow';
import dock from 'images/dock.jpg';

const UPLOAD_SERVER_URL = 'http://45.55.61.164:5000/upload/url';
const foggy = new FoggyWindow('.foggy-window');
const btnSave = document.querySelector('#save-button');
const btnShowInput = document.getElementById('show-input-button');
const btnUpload = document.getElementById('upload-button');
const inputUpload = document.getElementById('upload-input');

// default image
let scenery = new Image();
scenery.crossOrigin = 'Anonymous';
scenery.src = dock;
foggy.setScenery(scenery);

btnSave.onclick = (e) => {
    foggy.savePic('masterpiece');
};

btnShowInput.onclick = (e) => {
    toggleUploadState(true);
};

btnUpload.onclick = (e) => {
    const req = new XMLHttpRequest();
    const url = inputUpload.value;

    if (url.length < 1) {
        return;
    }

    // get image on CORS-friendly server
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.responseText) {
            var response = JSON.parse(req.responseText);
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = response.new_url;
            foggy.setScenery(img);

            toggleUploadState(false);
        }
    };

    const params = 'url=' + url;
    req.open('POST', UPLOAD_SERVER_URL);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(params);
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
