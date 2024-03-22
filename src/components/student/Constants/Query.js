export const queries=[
    {id:1,
    que:"when the exam is submitted automatically will answers gets saved?",
    ans:"Yes, the answers will be saved automatically after the given time gets completed"},
    {
        id:2,
        que:"Can student update the key?",
        ans:"No, the student cant update the key, only admin has the access"
    },
    {
        id:3,
        que:"Can student take the exams twice",
        ans:"No, student can only take the test once."
    },
    {
        id:4,
        que:"how can i connect with the admin",
        ans:"Go to profile and find the admin mail and can drop the main"
    }
];
export const queriesMap = arrayToMap(queries);

function arrayToMap(data) {
    let map = new Map();
    data.forEach(item => {
        map.set(item.id, item);
    });
    return map;
}