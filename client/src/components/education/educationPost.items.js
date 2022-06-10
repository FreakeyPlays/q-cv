const EducationPostItems = [
    {
        id: 1,
        title: "Degree",
        key: "degree",
        classNames: "educationDegree column",
        optional: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 2,
        title: "Field of Study",
        key: "fieldOfStudy",
        classNames: "educationFieldOfStudy column",
        optional: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 3,
        title: "Duration",
        key: ["startDate", "endDate"],
        classNames: "educationDuration column",
        optional: true,
        parse(item){
            let start = new Date(item[this.key[0]]).toLocaleDateString();
            let end = new Date(item[this.key[1]]).toLocaleDateString();
            return start + " - " + end;
        }
    }
]

export default EducationPostItems;