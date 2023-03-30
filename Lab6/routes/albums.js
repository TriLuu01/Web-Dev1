// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {bandData, albumData } from '../data/index.js'
import {Router} from 'express';
import validation from '../helpers.js'
const router = Router();
router
  .route('/:bandId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.id = validation.checkId(req.params.id, 'Id Url Param');
    }catch (e){
      return res.status(400).json({error: e})
    }
    try {
      let target = await albumData.getAll(req.params.id);
      if (target == []) {
        res.status(404).json("No albums found")
      }
      res.status(200).json(target)
    }catch (e){
      return res.status(404).json({error: e})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let album = req.body;
    try{
      req.params.id = validation.checkId(req.params.id, ' Id Url Param');
      album.title = validation.checkString(album.title,'title')
      album.releaseDate = validation.checkString(album.releaseDate,'release date')
      validation.checkDate(album.releaseDate)
      album.tracks =validation.checkTracks(album.tracks, 'tracks')
      if (album.rating <1 || album.rating >5) throw 'not valid rating'
    } catch (e){
      return res.status(400).json({error:e})
    }
    try{
      await albumData.create(req.params.id,album.title,album.releaseDate,album.tracks,album.rating);
      return await bandData.get(req.params.id)
    }catch(e){
      return res.status(500).json({error:e})
    }

  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.id = validation.checkId(req.params.id, 'Id Url Param');
    }catch (e){
      return res.status(400).json({error: e})
    }
    try {
      let target = await albumData.get(req.params.id);
      res.status(200).json(target)
    }catch (e){
      return res.status(404).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      req.params.id = validation.checkId(req.params.id, 'Id Url Param');
    }catch (e){
      return res.status(400).json({error: e})
    }
    try{
      let deleted = await albumData.remove(req.params.id);
      res.status(200).json(deleted)
    }catch (e){
      return res.status(500).json({error: e})
    }
  });
