const ProjectPostItems = [
    {
        id: 1,
        title: "Customer",
        key: "customer",
        classNames: "projectCustomer column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 2,
        title: "Industry",
        key: "industry",
        classNames: "projectIndustry column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 3,
        title: "Country",
        key: "country",
        classNames: "projectCountry column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 4,
        title: "Position",
        key: "position",
        classNames: "projectPosition column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 5,
        title: "Duration",
        key: ["startDate", "endDate"],
        classNames: "projectDuration column",
        required: true,
        parse(item){
            let start = new Date(item[this.key[0]]).toLocaleDateString();
            let end = new Date(item[this.key[1]]).toLocaleDateString();
            return start + " - " + end;
        }
    },
    {
        id: 6,
        title: "Activities",
        key: "activities",
        classNames: "projectActivities column",
        required: false,
        parse(item){
            return item[this.key].join(", ");
        },
        isStored(item){
            return item[this.key].length > 0 ? true : false;
        }
    },
    {
        id: 7,
        title: "Environment",
        key: "environment",
        classNames: "projectEnvironment column",
        required: false,
        parse(item){
            return item[this.key];
        },
        isStored(item){
            if(item[this.key]){
                return item[this.key].length > 0 ? true : false;
            }
            return false;
        }
    },
    {
        id: 8,
        title: "Location",
        key: "location",
        classNames: "projectLocation column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 9,
        title: "Team Size",
        key: "teamSize",
        classNames: "projectTeamSize column",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
    {
        id: 10,
        title: "Description",
        key: "description",
        classNames: "projectDescription fullColumn",
        required: true,
        parse(item){
            return item[this.key];
        }
    },
]

export default ProjectPostItems;