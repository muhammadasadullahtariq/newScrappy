export default async function combineVideoAndImages(val) {
  var imageAndVideoArray = [];
  val.image.forEach(item => imageAndVideoArray.push({flag: false, path: item}));
  val.video.forEach(item => imageAndVideoArray.push({flag: true, path: item}));
  console.warn(imageAndVideoArray);
  return imageAndVideoArray;
}
