import request from '@/utils/request'
export default {

  //讲师分页查询接口
  getTeacherList(page,limit) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'get',
    })
  },

  //根据讲师id查询讲师信息和课程信息
  getTeacherInfo(teacherId) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${teacherId}`,
      method: 'get',
    })
  },
}
