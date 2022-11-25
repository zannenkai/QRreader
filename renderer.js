

window.addEventListener('DOMContentLoaded', async() => {
  document.querySelector("button").addEventListener('click', ()=>{
    window.myApi.reload();
  })
  await setImg();
  setQrValue();
})
const setImg = async() => {
  const imgUrl = await window.myApi.getImg();
  const blob = new Blob([imgUrl], { type: "image/png" });
  const canvas = document.querySelector("canvas");
  const bitmap = await createImageBitmap(blob).catch(handleErr);
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0);
  canvas.style = "border:3px dashed black";  
}

const handleErr = () => {
  const errorMsgEle = document.querySelector(".errorMsg");
  errorMsgEle.innerHTML = "エラー:画像をコピーしてください"
}

const setQrValue = async() => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const qrValue = await window.myApi.getQrValue(img.data,img.width, img.height);
  const qrValueEle = document.querySelector(".qrValue a");
  if(qrValue != 0){
    qrValueEle.href = qrValue;
    qrValueEle.innerHTML = qrValue;
  }else{
    qrValueEle.innerHTML = "エラー:QRコードは1画像につき1枚まで";
  }
}