export const getTime = () => {
    let messsage = ''
    let hours = new Date().getHours()
    if (hours <= 9) {
        messsage = '早上'
    } else if (hours <= 12) {
        messsage = '上午'
    } else if (hours <= 18) {
        messsage = '下午'
    } else {
        messsage = '晚上'
    }
    return messsage
}