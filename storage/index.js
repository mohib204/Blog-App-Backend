const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgeoktom1",
  api_key: "412298476351254",
  api_secret: "Vq7wVo4NWHA_IugWC1tiPOHruns",
});

const uploadImage = (file) => {
  console.log("🚀 ~ uploadImage ~ file:", file);
  const buffer = file.buffer;
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            console.log("🚀 ~ returnnewPromise ~ err:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

module.exports = { uploadImage };
