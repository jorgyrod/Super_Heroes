const { Photo } = require("../../../db");

const addPhotos = async (photosArr, selectedCharacter) => {
  try {
    const photos = photosArr.map((p) => ({ url: p }));
    const newPhotos = await Photo.bulkCreate(photos);
    await selectedCharacter.addPhotos(newPhotos);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addPhotos;