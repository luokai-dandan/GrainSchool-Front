import request from '@/utils/request'
export default {

  //条件查询带分页查询课程接口
  getCourseList(page,limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/getCourseFrontList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //查询分类列表（一二级分类）
  getAllSubject() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get',
    })
  },

  //根据课程查询课程的详细信息
  getCourseDetailInfoById(courseId) {
    return request({
      url: `/eduservice/course/getCourseDetailInfoById/${courseId}`,
      method: 'get'
    })
  },

  //搜索课程
  //http://localhost:8001/eduservice/indexfront/searchCourse?courseName=java
  searchCourseByName(courseName) {
    return request({
      url: `/eduservice/indexfront/searchCourse?courseName=${courseName}`,
      method: 'get'
    })
  }
}
