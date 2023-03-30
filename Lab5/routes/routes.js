//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'




export the router */
import { Router } from 'express';
const router = Router();
let about = {
    "firstName": "Tri",
    "lastName": "Luu",
    "biography": "I am a junior at Stevens Institute of Technology.\nI am also a gamer.",
    "favoriteMovies": ["Inception", "La La Land", "Black Mirror", "Spiderman"],
    "hobbies": ["gaming", "workout", "swimming"],
    "fondestMemory": "When I was 6, I hacked into my parent's wifi. "
}
let story =
{
    "storyTitle": "Black dog",
    "storyGenre": "Horror, Fiction, Tragedy, NSFW, Comedy, Unreal, Animal Abuse, Unclickable",
    "story": "Once upon a time, there was a small family in Greenville. Despite living poor, the daughter still loves their parents. They were not frugal but her grandpa passed on to them a bit of casino debt, so they forced her to marry their rich neighbor's son, for a better life.\n Perhaps she wouldn't have to worry about life anymore other than being a servant. One day, an event that occurred to her changed her life completely. It's a rainy day, hefty rain, from the sky, suddenly a cloud float towards the small house of the old couple, and behind that cloud, a black dog.\nTo be continued."
}
let school =
    [
        {
            "schoolName": "Nguyen Tri Phuong",
            "degreeEarned": "Middle School Degree",
            "numberOfYearsAttended": 4,
            "favoriteClasses": ["Math", "Physics", "Chemistry", "P.E"],
            "favoriteSchoolMemory": "We made a top 2 in the school's soccer tournament."
        },
        {
            "schoolName": "EF Academy",
            "degreeEarned": "H.S. Diploma",
            "numberOfYearsAttended": 3,
            "favoriteClasses": ["Math", "Physics", "Chemistry", "TOK"],
            "favoriteSchoolMemory": "I earned first prize for varsity track and field."
        },
        {
            "schoolName": "Stevens Institute of Technology",
            "degreeEarned": "B.S. in Computer Science",
            "numberOfYearsAttended": 2,
            "favoriteClasses": ["CS115", "CS546", "CS248", "CS382"],
            "favoriteSchoolMemory": "A lot of (good) memories."
        }
    ]
let main = 
{
    "title": "Main page, included links to other ",
    "/aboutme": "http://localhost:3000/aboutme",
    "/mystory": "http://localhost:3000/mystory",
    "/educationhistory": "http://localhost:3000/educationhistory"
}
router
    .route('/aboutme')
    .get(async (req, res) => {
        try {
            const object = about;
            return res.json(object)
        } catch (e) {
            res.status(404).send(e)
        }
        
    })

router
    .route('/mystory')
    .get(async (req, res) => {
        try {
            const object = story;
            return res.json(object)
        } catch (e) {
            res.status(404).send(e)
        }
    })

router
    .route('/educationhistory')
    .get(async (req, res) => {
        try {
            const object = school;
            return res.json(object)
        } catch (e) {
            res.status(404).send(e)
        }
    })
router
    .route('/educationhistory')
    .get(async (req, res) => {
        try {
            console.log(req.params)
            const object = school;
            return res.json(object)
        } catch (e) {
            res.status(404).send(e)
        }
    })
router
    .route('/')
    .get(async (req, res) => {
        try {
        
          return res.json(main);
        } catch (e) {
          res.status(500).send(e);
        }
        
      })
export default router