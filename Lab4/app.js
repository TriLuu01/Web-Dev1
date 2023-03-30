/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/
import {dbConnection, closeConnection} from './config/mongoConnection.js'
import bandData from './data/bands.js'

async function main(){
    
    const db = await dbConnection();
    await db.dropDatabase();
    let pinkFloyd = undefined;
    let beatles = undefined;
    let imagineDragons = undefined;
    try{
        //1. Create a band of your choice.
        pinkFloyd = await bandData.create(
            "Pink Floyd", 
            ["Progressive Rock", "Psychedelic rock", "Classic Rock"], 
            "http://www.pinkfloyd.com", 
            "EMI", 
            ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 
            1965);
        //2. Log the newly created band. (Just that band, not all bands)
        console.log(pinkFloyd) 
}catch (e){
    console.log(e)
}
    try{
        //3. Create another band of your choice.
        beatles= await bandData.create(
            "Beatles",
            ["Rock","Pop","Beat","Psychedelia"],
            "http://www.thebeatles.com",
            "Apple Record",
            ["John Lennon", "Paul McCartney", "Ringo Starr", "George Harrison "],
            1970
        )
    } catch (e){
        console.log(e);
    }
    // 4. Query all bands, and log them all
    try{
        console.log(await bandData.getAll())
    }catch (e){
        console.log(e);
    }
    //5. Create the 3rd band of your choice.
    try{
        imagineDragons = await bandData.create(
            "Hello",
            ["Pop"],
            "http://www.imaginedragonsmusic.com",
            "IR",
            ["Dan Reynolds","Andrew Beck"],
            2010
        )
        // 6. Log the newly created 3rd band. (Just that band, not all bands)
        console.log(imagineDragons)
    }catch (e){
        console.log(e)
    }
    try{
        //7. Rename the first band
        await bandData.rename(pinkFloyd._id.toString(), "PF")
    }catch (e){
        console.log(e)
    }
        //8. Log the first band with the updated name. 
    try{
        console.log(await bandData.get(pinkFloyd._id.toString()))
    }catch (e){
        console.log(e)
    }
    //9. Remove the second band you created.
    try{
        console.log(await bandData.remove(beatles._id.toString()))
    } catch (e){
        console.log(e)
    }
    //10. Query all bands, and log them all
    try{
        console.log(await bandData.getAll())
    }catch (e){
        console.log(e)
    }
//     11. Try to create a band with bad input parameters to make sure it throws errors.
    try{
        await bandData.create(
            " pink   ", 
            ["Progressive Rock", "Psychedelic rock", "     "], 
            "http://www.pinsss.com ", 
            "   sdsd", 
            ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "ssss" ], 
            'sdsd');
    }catch (e){
        console.log(e)
    }
// 12. Try to remove a band that does not exist to make sure it throws errors.
try{
    await bandData.remove(beatles._id)
}catch (e){
    console.log(e)
}
// 13. Try to rename a band that does not exist to make sure it throws errors.
try{
    await bandData.rename(beatles._id.toString(), "omaha")
}catch (e){
    console.log(e)
}
// 14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
try{
    await bandData.rename(pinkFloyd._id.toString(), 'PF')
}catch (e){
    console.log(e)
}
// 15. Try getting a band by ID that does not exist to make sure it throws errors.
try{
    await bandData.get(beatles._id.toString())
}catch (e){
    console.log(e)
}
    await closeConnection();
}
main()