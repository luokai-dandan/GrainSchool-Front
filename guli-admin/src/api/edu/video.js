import request from '@/utils/request'

export default {
    //1 添加小节
    addVideo(eduVideo) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: eduVideo
        })
    },

    //2 删除小节
    deleteVideo(videoId) {
        return request({
            url: `/eduservice/video/${videoId}`,
            method: 'delete'
        })
    },

    //3 修改小节
    updateVideo(eduVideo) {
        return request({
            url: '/eduservice/video/updateVideo',
            method: 'post',
            data: eduVideo
        })
    },

    //4 根据id查询小节
    getVideo(videoId) {
        return request({
            url: `/eduservice/video/getVideoInfo/${videoId}`,
            method: 'get'
        })
    },

    //5 获取视频签名
    getSign() {
        return request({
            url: '/eduvod/video/getSign',
            method: 'get'
        })
    }

}

function getSignature() {
    return axios.get('/eduvod/video/getSign').then(function (response) {
      return response.data.signature;
    })
  };