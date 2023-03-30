// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands} from '../config/mongoCollections.js';
import bands from './bands.js';
import { ObjectId } from 'mongodb';
import validation from '../helpers.js'
const checkValid = async (input) => {
  if (!input) throw "All fields need to have valid issue"
}
const checkString = async (string) => {
  if (typeof string !== "string") throw "Input must be a proper type of string"
  string = string.trim();
  if (string.length === 0) throw "Input must not be empty string"
  return string
}
const checkArray = async (array) => {
  if (!Array.isArray(array)) throw "Input is not an array"
  if (array.length < 3) throw "array should have at least one element"
  for (let i in array) {
    if (typeof array[i] !== 'string' || array[i].trim().length === 0) {
      throw 'One or more element is not a string or is an empty string';
    }
    array[i] = array[i].trim();
  }
  return array
}
  const checkDate = async (string) =>{
    let date = string.split('/');
    if (date.length != 3) throw 'has to be in MM/DD/YYYY format'
    date.forEach((value) => parseInt(value,10))
    for (let i =0; i<date.length;i++){
      if (isNaN(date[i])) throw 'one of the date is not a number' 
    }
    if (date[1] <1) throw "Not a valid date"
    if (date[2] <1900 || date[2] > new Date().getFullYear() +1) throw "release Year is not valid"
    if ([1,3,5,7,8,10,12].includes(date[0])){
       if (date[1] > 31) throw "Not a valid date"
    }else if ([4,6,9,11].includes(date[0])){
       if (date[1] >30) throw "Not a Valid date"
    }else if (date[0] == 2){
        if (date[2] % 4 === 0){
          if (date[1] > 29) throw "Not a Valid date"
        }
        if (date[1] >28) throw "Not a valid date"
    }else throw 'Month is not valid'
  }
  const checkNum = async (val) => {
    if (typeof val !== 'number') {
      throw `${variableName} is not a number`;
    }
  
    if (isNaN(val)) {
      throw `${variableName} is NaN`;
    }
  };
const create = async (
  bandId,
  title,
  releaseDate,
  tracks,
  rating
) => {
  //If bandId, title, releaseDate, tracks, rating are not provided at all, the method should throw. 
  await checkValid(bandId);
  await checkValid(title);
  await checkValid(releaseDate);
  await checkValid(tracks);
  await checkValid(rating);
  //If bandId, title, releaseDate are not strings or are empty strings, the method should throw.
  bandId = await checkString(bandId);
  title = await checkString(title);
  releaseDate = await checkString(releaseDate);
  //If the bandId  provided is not a valid ObjectId, the method should throw
  if (!ObjectId.isValid(bandId)) throw 'invalid object ID';
  //If the band  doesn't exist with that bandId, the method should throw
  let currentBand = await bands.get(bandId);
  //If tracks is not an array and if it does not have at least 3 elements in the array that is are valid strings, or are empty strings the method should throw. 
  tracks = await checkArray(tracks);
  //If releaseDate is not a valid date string, the method will throw.
  // If releaseDate is < 1900 or is > the current year + one year, the method should throw.  
  await checkDate(releaseDate);
  // If rating is not a number from 1 to 5, the method will throw.
  await checkNum(rating);
  if (rating < 1 || rating > 5) throw "invalid rating"
  rating = rating.toFixed(1);
  //Main function start
  const duplicateAlbum = currentBand.albums.find(album => album.title.toLowerCase() === title.toLowerCase());
  if (duplicateAlbum) {
    throw 'Album with the same title already exists in the band';
  }

  let newAlbum = {
    _id: new ObjectId(),
    title: title,
    releaseDate: releaseDate,
    tracks: tracks,
    rating: rating
  }

  const bandsCollection = await bands();
  const updatedBand = await bandsCollection.findOneAndUpdate(
    { _id: new ObjectId(bandId) },
    { $push: { albums: newAlbum } },
    { returnOriginal: false }
  );
  
  // Check if the album was successfully added to the `albums` subdocument array
  if (!updatedBand.value.albums.some(album => album._id.equals(newAlbum._id))) {
    throw 'Failed to add album';
  }
  const bandAlbums = updatedBand.value.albums;
  const bandOverallRating = bandAlbums.reduce((sum, album) => {
    return sum + album.rating;
  }, 0) / bandAlbums.length;
  
  // Update the `overallRating` field in the band document
  await bandsCollection.updateOne(
    { _id: new ObjectId(bandId) },
    { $set: { overallRating: bandOverallRating.toFixed(1) } }
  );
  return newAlbum
  
};

const getAll = async (bandId) => {
  bandId = validation.checkId(bandId, 'bandId')
  let target = await bands.get(bandId)
  if (!target) throw 'no band found'
  return target.albums
};

const get = async (albumId) => {
  albumId = validation.checkId(albumId,'albumId')
  const bandsCollection = await bands();
  const band = await bandsCollection.findOne({ 'albums._id': new ObjectId(albumId) });
  if (!band) throw 'No band with that album ID';

  const album = band.albums.find(a => a._id.toString() === albumId);
  if (!album) throw 'No album with that ID in the band';

  return album;
};

const remove = async (albumId) => {
  albumId = validation.checkId(albumId,'albumId')
  const bandsCollection = await bands();
  const target = await bandsCollection.findOneAndUpdate(
    { 'albums._id': new ObjectId(albumId) },
    { $pull: { albums: { _id: new ObjectId(albumId) } } },
    { returnOriginal: false }
  );

  if (target.lastErrorObject.n === 0) {
    throw 'could not remove album';
  }
  
  const band = updatedInfo.value;
  const bandAlbums = band.albums;
  const bandOverallRating = bandAlbums.reduce((sum, album) => {
    return sum + album.rating;
  }, 0) / bandAlbums.length;
  
  // Update the `overallRating` field in the band document
  await bandsCollection.updateOne(
    { _id: new ObjectId(band._id) },
    { $set: { overallRating: bandOverallRating.toFixed(1) } }
  );
  band._id = band._id.toString();
  return band;
};

export default{
  create,
  getAll,
  get,
  remove
}