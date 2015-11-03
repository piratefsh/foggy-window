import 'styles/style.scss';
import FoggyWindow from 'FoggyWindow'

const foggy = new FoggyWindow('.foggy-window');

document.querySelector('#save-button').onclick = () => {foggy.savePic("masterpiece")};