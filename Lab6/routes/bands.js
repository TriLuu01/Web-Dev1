// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {bandData} from '../data/index.js'
import {Router} from 'express';
import validation from '../helpers.js'
const router = Router();
router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try{
      const bandList = await bandData.getAll();
      res.json(bandList);
    } catch (e){
      res.status(500).json({error: e});
    }  })
  .post(async (req, res) => {
    //code here for POST
    let bands = req.body;
    if (!bands || Object.keys(bands).length === 0){
      return res
      .status(400)
      .json({error: 'There are no fields in the request body'});
    }
    try {
      bands.name = validation.checkString(bands.name, 'Name');
      bands.genre = validation.checkStringArray(bands.genre, 'Genre');
      bands.website = validation.checkWebsite(bands.website);
      bands.recordCompany = validation.checkString(bands.recordCompany, 'Record')
      bands.groupMembers = validation.checkStringArray(bands.groupMembers, 'Group Members')
      bands.yearBandWasFormed = validation.checkYear(bands.yearBandWasFormed)
    }catch (e){
      return res.status(400).json({error: e});
    }
    try {
      const {name,genre,website,recordCompany,groupMembers,yearBandWasFormed} = bands;
      const newBand = await bandData.create(name, genre, website, recordCompany,groupMembers,yearBandWasFormed);
      res.status(200).json(newBand);
    }catch (e){
      res.status(500).json({error: e})
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = validation.checkId(req.params.id, 'Id Url Param');
    }catch (e){
      return res.status(400).json({error: e});
    }
    try {
      const band = await bandData.get(req.params.id);
      res.status(200).json(band)
    }catch (e){
      res.status(404).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.id = validation.checkId(req.params.id, 'Id Url Param');
    }catch (e){
      return res.status(400).json({error: e});
    }
    
    try{
      await bandData.remove(req.params.id)
      res.status(200).json({
        bandId: String(req.params.id), 
        "deleted": true
      })
    } catch (e){
      return res.status(500).json({error: e})
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0){
      return res
      .status(400)
      .json({error: 'There are no fields in the request body'})
    }
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      updatedData.name = validation.checkString(updatedData.name, 'Name');
      updatedData.genre = validation.checkStringArray(updatedData.genre, 'Genre');
      updatedData.website = validation.checkWebsite(updatedData.website);
      updatedData.recordCompany = validation.checkString(updatedData.recordCompany, 'Record')
      updatedData.groupMembers = validation.checkStringArray(updatedData.groupMembers, 'Group Members')
      updatedData.yearBandWasFormed = validation.checkYear(updatedData.yearBandWasFormed)
    }catch (e){
      return res.status(400).json({error: e});
    }
    try {
      const target = await bandData.get(req.params.id)
    } catch (e){
      return res.status(404).json({error: 'Band Not Found'})
    }
    try{
      const updatedBand = await bandData.update(
        req.params.id,
        updatedData.name,
        updatedData.genre,
        updatedData.website,
        updatedData.recordCompany,
        updatedData.groupMembers,
        updatedData.yearBandWasFormed
      )
      updatedBand.albums = target.albums;
      updatedBand.overallRating = target.overallRating;
      res.status(200).json(updatedBand)
    } catch (e){
      res.status(404).json({error: e})
    }
    
  });
