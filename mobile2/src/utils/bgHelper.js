export const ShowBgImage =(url) => {
    var urlString = 'url("'+url+'")';
    document.getElementById('app').style.backgroundImage = urlString;
    document.getElementById('app').style.backgroundSize = "cover";
    document.getElementById('app').style.overflow = "hidden";
}

export const NotShowBgImage =() => {
    document.getElementById('app').style.backgroundImage = "none";
}