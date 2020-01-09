import { message } from "antd";

/**
 * 判断是否过期
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param hours 过期时间
 * @return boolean true | false
 */
export function isExpiredOrNot(startTime: number | string, endTime = +new Date(), hours: number | string): boolean {
    const start = +startTime;
    const expiredSeconds = +hours * 60 * 60 * 60;
    const diffSeconds = +endTime - start;
    return (diffSeconds > expiredSeconds) ? true : false;
}

/**
 * 金钱格式化
 * @param money 钱数
 * @param type 
 */
export function moneyFormat(money: number, type = 'xxx,xxx,xxx.00') {
    const typeArr = (money + '').split('.');

    const len: number = typeArr[0].length;
    let start = len % 3 === 0 ? 3 : len % 3;
    const times = parseInt((len / 3).toString());

    let res = typeArr[0].substr(0, start);
    for (let i = 0; i < times && len > 3; i++) {
//        res += ',' + typeArr[0].substr(start + i * 3, 3);
        res += `${len % 3===0 && i === times - 1 ? ' ' : ','}${typeArr[0].substr(start + i * 3, 3)}`;
    }
    return typeArr[1] ? `${res}.${typeArr[1]}` : res;
}
