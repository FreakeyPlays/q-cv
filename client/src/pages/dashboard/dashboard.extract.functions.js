const extractEducation = (cv) => {
    if(cv.education.length === 0) return (<>
        <div>No education added.</div>
    </>); 
    return cv.education.map((item, index) => {
        return (<>
            <div key={index}>{item.institution}</div>
        </>)
    });
}

const extractCareer = (cv) => {
    if(cv.career.length === 0) return (<>
        <div>No career added.</div>
    </>); 
    return cv.career.map((item, index) => {
        return (<>
            <div key={index}>{item.company}</div>
        </>)
    });
}

const extractSkills = (cv) =>{
    if(cv.skills.length === 0) return (<>
        <div>No skill added.</div>
    </>); 
    return cv.skills.map((item, index) => {
        console.log(item.tzj);
        return (<>
            <div key={index}>{item.name}</div>
        </>)
    });
}

const extractProjects = (cv) => {
    if(cv.projects.length === 0) return (<>
        <div>No projects added.</div>
    </>); 
    return cv.projects.map((item, index) => {
        return (<>
            <div key={index}>{item.title}</div>
        </>)
    });
}

export{
    extractCareer,
    extractEducation,
    extractSkills,
    extractProjects
}