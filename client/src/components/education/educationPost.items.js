const EducationPostItems = [
    {
        id: 0,
        title: "Degree",
        key: "degree",
        classNames: "educationDegree column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 1,
        title: "Field of Study",
        key: "fieldOfStudy",
        classNames: "educationFieldOfStudy column",
        required: false,
        parse(item){
            return item[this.key];
        },
        isStored(item){
            return item[this.key].length > 0 ? true : false;
        }
    },
    {
        id: 2,
        title: "Duration",
        key: ["startDate", "endDate"],
        classNames: "educationDuration column",
        required: true,
        parse(item){
            let start = new Date(item[this.key[0]]).toLocaleDateString();
            let end = new Date(item[this.key[1]]).toLocaleDateString();
            return start + " - " + end;
        }
    }
]

export default EducationPostItems;