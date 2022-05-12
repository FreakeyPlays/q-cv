const apiGetCallTo = 'http://localhost:5000/api/skills'

let skillArray = [];

/**
 * fetches the Skill-Sets from the Backend, saves them into an array and returns said Array
 * @returns an Array with objects that contain an _id-value and a name-value
 */
export function getAllSkillsFromDB(){
    
   fetch(apiGetCallTo)
  .then(response => response.json())
  .then(data => pushDataIntoSkillArray(data));

    return skillArray;
}

/**
 * @returns Array 
 */
function getArray(){
    return skillArray;
}

function pushDataIntoSkillArray(data){
    for(let d in data){
        skillArray.push({
            name: d.name,
            _id: d._id
        });
    }
}

export default getAllSkillsFromDB;