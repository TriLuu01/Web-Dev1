// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
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
  if (array.length < 1) throw "array should have at least one element"
  for (let i in array) {
    if (typeof array[i] !== 'string' || array[i].trim().length === 0) {
      throw 'One or more element is not a string or is an empty string';
    }
    array[i] = array[i].trim();
  }
  return array
}
const checkYear = async (num) => {
  if (typeof num !== 'number') throw `${num} is not a number`;
  if (isNaN(num)) throw `variable is NaN`;
  if (num < 1900 || num > 2023) throw 'not a valid year'
}
const checkWebsite = async (string) => {
  if (((string.indexOf("http://www.")) !== 0) || !string.includes('http://www.')) throw "website doesn't contain http://www. at front"
  if ((string.length !== string.lastIndexOf(".com") + 4) || !string.includes(".com")) throw "website doesn't contain .com at the end"
  if (string.substring(11, string.length - 4).length < 5) throw "at least 5 characters in-between the http://www. and .com "

}
const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  //check for valid values
  //existence
  await checkValid(name);
  await checkValid(genre);
  await checkValid(website);
  await checkValid(recordCompany);
  await checkValid(groupMembers);
  await checkValid(yearBandWasFormed);
  //validate string
  name = await checkString(name);
  website = await checkString(website);
  recordCompany = await checkString(recordCompany);
  //validate website
  await checkWebsite(website)
  //validate array
  genre = await checkArray(genre)
  groupMembers = await checkArray(groupMembers)
  //validate year
  await checkYear(yearBandWasFormed)
  //create main
  let newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
    albums: [],
    overallRating: 0
  }
  const bandCollection = await bands();
  const insertInfo = await bandCollection.insertOne(newBand);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Band could not be added';
  const newId = insertInfo.insertedId.toString();
  const band = await get(newId);
  return band;
};

const getAll = async () => {
  const bandCollection = await bands();
  let bandList = await bandCollection.find({}).toArray();
  bandList = bandList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return bandList;
};

const get = async (id) => {
  await checkValid(id);
  id = await checkString(id);
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const bandCollection = await bands();
  const target = await bandCollection.findOne({ _id: new ObjectId(id) });
  if (target === null) throw 'No band with that id';
  target._id = target._id.toString();
  return target;
};

const remove = async (id) => {
  await checkValid(id);
  id = await checkString(id);
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const bandCollection = await bands();
  const deletionInfo = await bandCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (deletionInfo.lastErrorObject.n === 0) {
    throw `Could not delete band with id of ${id}`;
  }
  return `${deletionInfo.value.name} has been successfully deleted!`;
};

const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  //If id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw.
  await checkValid(id);
  await checkValid(name);
  await checkValid(genre);
  await checkValid(website);
  await checkValid(recordCompany);
  await checkValid(groupMembers);
  await checkValid(yearBandWasFormed);
  //If id, name, website, recordCompany are not strings or are empty strings, the method should throw.
  id = await checkString(id);
  name = await checkString(name);
  website = await checkString(website);
  recordCompany = await checkString(recordCompany);
  //If id is not  a valid ObjectId, the method should throw.
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  //If website does not contain http://www. and end in a .com, and have at least 5 characters in-between the http://www. and .com this method will throw.
  await checkWebsite(website)
  //validate array
  genre = await checkArray(genre)
  groupMembers = await checkArray(groupMembers)
  //validate year
  await checkYear(yearBandWasFormed)
  const bandCollection = await bands();
  let target = await get(id);
  let updatedBandData = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
    albums: target.albums,
    overallRating: target.overallRating
  }
  const updateInfo = await bandCollection.findOneAndReplace(
    {_id: ObjectId(id)},
    {$set: updatedBandData},
    {returnDocument: 'after'}
  )
  if (updateInfo.lastErrorObject.n === 0) 
    throw [404, `Could not update the band with id ${id}`];
  return await this.get(id)
};
export default {
  create,
  getAll,
  get,
  remove,
  update
}