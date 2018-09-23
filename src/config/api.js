import {createAPI, baseApi} from "../plugins/axios";
import {formatTime, isEmptyObject} from "../plugins/utils";

export const api = {
    common: {
        sign_in: data => createAPI('/sign_in', 'post', data),
        sign_out: data => createAPI('/sign_out', 'post', data),
        user_info: data => createAPI('/get_user_info', 'post', data),
        download: function(api, data = {}, download_name = '') {
            let url = baseApi.config.api + api;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);        // 也可以使用POST方式，根据接口
            xhr.responseType = "blob";    // 返回类型blob
            xhr.setRequestHeader('X-TOKEN', localStorage.getItem('x-token'));
            xhr.setRequestHeader('content-type', 'application/json');

            // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
            xhr.onload = function () {
                // 请求完成
                if (this.status === 200) {
                    /*let type = xhr.getResponseHeader('content-type');
                    let mimeType = mime(type);
                    mimeType = mimeType && '.' + mimeType;*/
                    // 返回200
                    let blob = this.response;
                    let reader = new FileReader();
                    reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a表情href
                    reader.onload = function (e) {
                        // 转换完成，创建一个a标签用于下载
                        let a = document.createElement('a');
                        a.download = download_name ? download_name : formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss');
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        // $("body").append(a);    // 修复firefox中无法触发click
                        a.click();
                        a.remove();
                    }
                }
            };
            if (isEmptyObject(data)) {
                data = {
                    data: {}
                }
            }
            // 发送ajax请求
            xhr.send(JSON.stringify(data));
        }
    },
    screen_shot: {
        job_list: data => createAPI('/screen_shot/job_list', 'post', data),
        map: data => createAPI('/screen_shot/map', 'post', data),
        job_save: data => createAPI('/screen_shot/save', 'post', data),
        detail: data => createAPI('/screen_shot/detail', 'post', data),
        del: data => createAPI('/screen_shot/del', 'post', data),
        play: data => createAPI('/screen_shot/play', 'post', data),
    }
};