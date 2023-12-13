/**
 * @description: 链接参数
 * @param {*} obj
 * @return {*}
 */
function obj2Param(obj) {
    const tempArray = [];
    for (const item in obj) {
        if (item) {
            tempArray.push(`${item}=${obj[item]}`);
        }
    }
    return `${tempArray.join("&")}`;
}

module.exports = {
    obj2Param
};