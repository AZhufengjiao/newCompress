/**
 *  封装套餐数据
 * @param {array} res 套餐数组
 * discountPrice      现价
 * addMonth           是否买赠，天数
 * groupId            用户身份id，用来对比是否买过套餐
 * pId                套餐id，用于付款二维码
 * pPrice             原价
 * downloadTimes      每天下载次数
 * roleType           会员身份   free:免费  silver:银  goid：黄金   platinum：白金  diamond：钻石
 * huiYuanType        会员类型   钻石，白金，黄金，银
 * timeLimit          套餐时间日期
 * newTimeLimit       修改过套餐时间日期
 * trialType          套餐类型   体验会员和正式会员
 * scene              区分有没有跳转链接
 * tag                身份TAG
 * priceNum           减了券后价格
 *
 * @param {array} yhq 优惠券数组
 * couponEndTime      抢购时间
 * couponId           couponId如果和groupId相等得话，就代表券可以用
 * couponName         用券时间
 * discountPrice      优惠价
 * roleType           身份  什么身份使用
 * @returns
 */
const taoCanFn = (res, yhq) => {
  let arr = [];
  res.map((item, index) => {
    let obj = {};
    obj.discountPrice = item.discountPrice; // discountPrice 现价
    // addMonth      是否买赠，天数
    if (item.addMonth > 0) {
      if (item.addMonth > 30) {
        obj.addMonth = parseInt(item.addMonth / 30 + "月");
      } else {
        obj.addMonth = item.addMonth + "日";
      }
    } else {
      obj.addMonth = 0;
    }
    obj.groupId = item.groupId; // groupId       用户身份id，用来对比是否买过套餐
    obj.pId = item.pId; // pId           套餐id，用于付款二维码

    obj.pPrice = item.pPrice; //  pPrice 原价
    obj.downloadTimes = // 每天下载次数
      item.roleSearch.downloadTimes === 999
        ? "无限"
        : item.roleSearch.downloadTimes;
    //  identityType 会员身份
    if (item.roleSearch.roleType === "diamond") {
      obj.huiYuanType = "钻石";
    } else if (item.roleSearch.roleType === "platinum") {
      obj.huiYuanType = "白金";
    } else if (item.roleSearch.roleType === "gold") {
      obj.huiYuanType = "黄金";
    } else if (item.roleSearch.roleType === "silver") {
      obj.huiYuanType = "白银";
    }
    obj.trialType = item.roleSearch.roleType; // roleType 会员身份

    //  timeLimit 日期类型
    obj.timeLimit = item.roleSearch.timeLimit;
    // 新日期
    let date = item.roleSearch.timeLimit;
    let dateType = date.charAt(date.length - 1);

    if (date === "lifelong") {
      obj.newTimeLimit = "无限";
    } // 月
    else if (dateType === "m") {
      obj.newTimeLimit = date.substring(0, date.length - 1) + "个月";
    } // 日
    else if (dateType === "d") {
      obj.newTimeLimit = date.substring(0, date.length - 1) + "天";
    }

    obj.trialType = item.roleSearch.trialType; // trialType 套餐类型   体验会员和正式会员
    obj.scene = item.scene; // scene 区分有没有跳转链接
    obj.tag = item.tag; // tag 身份TAG
    obj.yhq = [];

    // 优惠券数据处理
    if (yhq) {
      yhq.map((j) => {
        // 相等代表可以使用,并且不是立即抢购的套餐
        if (j.couponId === item.groupId && item.scene === "") {
          console.log(11);
          // 如果优惠券大于现价
          if (j.discountPrice > item.discountPrice) {
            // 让现价等于0.01
            obj.discountPrice = 0.01;
          } else {
            // 优惠券小于现价的话，之间剪掉优惠券
            obj.discountPrice = item.discountPrice - j.discountPrice;
          }
          obj.yhq.push(j);
        }
      });
    }

    arr.push(obj);
  });
  return arr;
};
export default taoCanFn;
