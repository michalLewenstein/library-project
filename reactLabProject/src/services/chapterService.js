import axios from "axios";


//createChapter
export const createChapter = async (newChapter) => {
    try {
        const response = await axios.post('http://localhost:8080/api/chapter/createChapter',newChapter);
            console.log("הצליח בסרביס");
            
        console.log("response",response.data);
        return response.data;

    }
    catch (err) {
        throw err;
    }
}