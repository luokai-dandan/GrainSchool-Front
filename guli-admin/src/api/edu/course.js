import request from '@/utils/request'

export default {

  // 1 添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  // 2 查询所有的讲师
  getListTeacher() {
    return request({
      url: '/eduservice/teacher/findAll',
      method: 'get'
    })
  },
  // 3 根据课程id查询课程的基本信息
  getCourseInfoById(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 4 修改课程表
  updateCourseInfo(CourseInfo) {
    return request({
      url: '/eduservice/course/updateCourseInfo',
      method: 'post',
      data: CourseInfo
    })
  },

  // 5 课程确认信息显示
  getPublishCourseInfo(courseId) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${courseId}`,
      method: 'get'
    })
  },

  // 6 正式发布课程（修改课程状态）
  officialPublishCourse(courseId) {
    return request({
      url: `/eduservice/course/officialPublishCourse/${courseId}`,
      method: 'post'
    })
  },

  // 7 查询课程列表
  getCourseList(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },

  // 8 删除课程
  deleteCourse(courseId) {
    return request({
      url: `/eduservice/course/${courseId}`,
      method: 'delete'
    })
  },

  // 9 更改状态
  changeStatus(courseId) {
    return request({
      url: `/eduservice/course/changeStauts/${courseId}`,
      method: 'post'
    })
  },

  // 修改浏览数
  changeViewCount(id, viewCount) {
    return request({
      url: `/eduservice/course/changeViewCount/${id}/${viewCount}`,
      method: 'post'
    })
  },

  // 修改购买数
  changeBuyCount(id, buyCount) {
    return request({
      url: `/eduservice/course/changeBuyCount/${id}/${buyCount}`,
      method: 'post'
    })
  }
}
