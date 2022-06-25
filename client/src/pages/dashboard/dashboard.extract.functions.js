const extractEducation = (cv) => {
    if(cv.education.length === 0) return (<>
        No education added.
    </>); 
    return cv.education.map((item, index) => {
        return (<>
            <p key={index}>{item.institution}</p>
        </>)
    });
}

const extractCareer = (cv) => {
    if(cv.career.length === 0) return (<>
        No career added.
    </>); 
    let nameArray = [];
    for (let i of cv.career){
        nameArray.push(i.company);
    }
    return parse(nameArray);
}

const extractSkills = (cv) =>{
    if(cv.skills.length === 0) return (<>
        No skill added.
    </>);
    let nameArray = [];
    for (let i of cv.skills){
        nameArray.push(i.name);
    }
    return parse(nameArray);
}

const extractProjects = (cv) => {
    if(cv.projects.length === 0) return (<>
        No projects added.
    </>); 
    return cv.projects.map((item, index) => {
        const last = index >= (cv.projects.length-1);
        return (<>
            <p key={index}>{item.title}{last ? "" : ","}</p>
        </>)
    });
}

function parse(array, trenner = ", "){
    return array.join(trenner);
}

export{
    extractCareer,
    extractEducation,
    extractSkills,
    extractProjects
}