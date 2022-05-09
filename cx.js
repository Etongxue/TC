// ==UserScript==
// @name         超星助手后台
// @background
// @icon         http://pan-yz.chaoxing.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @license      Copycat Has No Dick
// @connect      mooc1-1.chaoxing.com
// @connect      mooc1.chaoxing.com
// @connect      mooc1-2.chaoxing.com
// @connect      api.7j112.com
// @connect      tencent-api.7j112.com
// ==/UserScript==

return new Promise((resolve, reject) => {
var host = 0 , //为支持部分校园网，服务器提供多条线路，目前有 0：阿里云(默认) 1：腾讯云
    sendLog = (log)=>{
        GM_setValue('xxtbackgroundinfo',log);
        console.log(log);
    }
GM_setValue('BackgroundVideo','1');
GM_setValue('BackgroundList',[]);
var hostList = [
    'http://api.7j112.com/',
    'http://tencent-api.7j112.com/'
    ],
    missionList = [],
    value = GM_getValue('BackgroundVideo','1');
GM_setValue('BackgroundVideoEnable',String(Math.round(new Date() / 1000)));
function dealMission(videoInfo) {
    try{
        for(let i=0,l=missionList.length;i<l;i++){
            if(missionList[i]['jobid']==videoInfo['jobid']&&missionList[i]['userid']==videoInfo['userid']){
                sendLog('提交了两个相同任务');
                return;
            }
            if(missionList[i]['userid']!=videoInfo['userid']){
                sendLog('禁止多用户同刷');
                return;
            }
        }
    }catch(e){
        console.log(e);
        return;
    }
    videoInfo['done']=false;
    videoInfo['playTime'] = '-10';
    videoInfo['rt'] = '0.9';
    videoInfo['send'] = false;
    videoInfo['isdrag'] = '0';
    videoInfo['videojs_id'] = String(parseInt(Math.random() * 9999999));
    sendLog('添加新任务');
    missionList.push(videoInfo);
    GM_setValue('BackgroundList',missionList);
}
setInterval(function(){
    if(value!=GM_getValue('BackgroundVideo','1')){
        value = GM_getValue('BackgroundVideo','1');
        dealMission(value);
    }
},1000);
