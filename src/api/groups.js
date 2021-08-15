// import Axios from "axios";

export async function searchGroups(value) {
    // const res = await Axios.get(`${baseURL}/api/groups?partialName=${value}`);
    // const groups = res.data;
    console.log(value)
    const groups = [
        {
            displayName: "aaa",
            attendees: 3,
            owner: { displayName: "222" },
            id: "12313213",
            type: "distribution"
        },
        {
            displayName: "eeeeee",
            attendees: 3,
            owner: { displayName: "wsd" },
            id: "we234143",
            type: "security"
        },
        {
            displayName: "aaa",
            attendees: 3,
            owner: { displayName: "222" },
            id: "sfdgsf",
            type: "distribution"
        },
        {
            displayName: "gfdsgfsd",
            attendees: 3,
            owner: { displayName: "wsd" },
            id: "qewrewrew",
            type: "security"
        },
        {
            displayName: "24234t",
            attendees: 3,
            owner: { displayName: "222" },
            id: "qereqwr",
            type: "security"
        },
        {
            displayName: "ewrefff",
            attendees: 3,
            owner: { displayName: "wsd" },
            id: "qwerreqw",
            type: "security"
        },
    ];
    return groups;
}

export async function getGroupById(id) {
    // const res = await Axios.get(`${baseURL}/api/group/${id}`);
    // const group = res.data;
    console.log(id)
    const group = {
        id,
        displayName: "aaa",
        classification: "aaaaa",
        attendees: 3,
        owner: {
            displayName: "3dfdvsd"
        },
        type: "security"
    }
    return group;
}
