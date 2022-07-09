# GrainSchool

#### 介绍
谷粒学苑
网页端管理谷粒学苑课程
哔哩哔哩 https://www.bilibili.com/video/BV1dQ4y1A75e

#### 软件架构
• 在线教育系统，分为前台网站系统和后台管理平台，B2C模式，使用了微服务技术架构，前后端分离开发。
• 前台系统包括课程、讲师部分，后台系统包括讲师、课程、Banner、订单、权限管理和统计分析等功能。
• 后端的技术架构SpringBoot+SpringCloud+MyBatis-Plus+HttpClient+MySQL+Maven+EasyExcel+Nginx+Canal
• 前端架构Node.js+Vue+Element-UI+NUXT+ECharts。
• 中间件包括Redis、腾讯云对象存储、腾讯云视频点播。
• 使用了ECharts做图表展示，使用EasyExcel完成课程分类批量添加、单点登录使用了JWT。
• 使用Swagger接口测试，接入了微信扫码登陆、微信支付和腾讯云短信服务。

### 项目开发环境
1. SpringBoot 2.2.1.RELEASE
2. SpringCloud Hoxton.RELEASE
3. MySQL 5.7
4. Jdk 8
5. Maven 3.6.3
6. Centos Linux 7
7. Canal 1.1.4
8. Nginx 1.22.0
9. Node.js 10.16.3
10. Nacos-server 1.1.4
11. 腾讯云短信服务+对象存储服务+视频点播服务
12. Docker 1.13.1
13. Redis 6.2.6

### 项目截图
#### 后台登陆
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%90%8E%E5%8F%B0%E7%99%BB%E9%99%86.png)
#### 用户管理
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.png)
#### 角色管理
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86.png)
#### 角色授权
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%A7%92%E8%89%B2%E6%8E%88%E6%9D%83.png)
#### 用户分配角色
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E7%94%A8%E6%88%B7%E5%88%86%E9%85%8D%E8%A7%92%E8%89%B2.png)
#### 菜单管理
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86.png)
#### 讲师管理
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AE%B2%E5%B8%88%E7%AE%A1%E7%90%86.png)
#### 修改讲师
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E4%BF%AE%E6%94%B9%E8%AE%B2%E5%B8%88.png)
#### 添加讲师
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E6%B7%BB%E5%8A%A0%E8%AE%B2%E5%B8%88.png)
#### 上传讲师头像
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E4%B8%8A%E4%BC%A0%E8%AE%B2%E5%B8%88%E5%A4%B4%E5%83%8F.png)
#### 课程分类
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB.png)
#### 导入课程分类
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%AF%BC%E5%85%A5%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB.png)
#### 课程列表
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E5%88%97%E8%A1%A8.png)
#### 编辑课程
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E7%BC%96%E8%BE%91%E8%AF%BE%E7%A8%8B.png)
#### 富文本组件
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6.png)
#### 编辑课程大纲
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E7%BC%96%E8%BE%91%E8%AF%BE%E7%A8%8B%E5%A4%A7%E7%BA%B2.png)
#### 编辑小节
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E7%BC%96%E8%BE%91%E5%B0%8F%E8%8A%82.png)
#### 发布课程
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%8F%91%E5%B8%83%E8%AF%BE%E7%A8%8B.png)
#### 图表统计
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%9B%BE%E8%A1%A8%E7%BB%9F%E8%AE%A1.png)
#### banner展示
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/banner%E5%B1%95%E7%A4%BA.png)
#### 修改banner
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E4%BF%AE%E6%94%B9banner.png)
#### 添加banner
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E6%B7%BB%E5%8A%A0banner.png)
#### 前台首页
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%89%8D%E5%8F%B0%E9%A6%96%E9%A1%B5.png)
#### 前台登录
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%89%8D%E5%8F%B0%E7%99%BB%E5%BD%95.png)
#### 验证码登录
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E9%AA%8C%E8%AF%81%E7%A0%81%E7%99%BB%E5%BD%95.png)
#### 微信扫码登录
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E5%BE%AE%E4%BF%A1%E6%89%AB%E7%A0%81%E7%99%BB%E5%BD%95.png)
#### 注册
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E6%B3%A8%E5%86%8C.png)
#### 登录主页
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E7%99%BB%E5%BD%95%E4%B8%BB%E9%A1%B5.png)
#### 课程主页
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E4%B8%BB%E9%A1%B5.png)
#### 课程信息
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E4%BF%A1%E6%81%AF.png)
#### 课程详情
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85.png)
#### 课程大纲
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E5%A4%A7%E7%BA%B2.png)
#### 课程评论
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AF%BE%E7%A8%8B%E8%AF%84%E8%AE%BA.png)
#### 购买课程
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%B4%AD%E4%B9%B0%E8%AF%BE%E7%A8%8B.png)
#### 微信支付界面
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E6%94%AF%E4%BB%98%E7%95%8C%E9%9D%A2.png)
#### 支付成功
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E6%94%AF%E4%BB%98%E6%88%90%E5%8A%9F.png)
#### 讲师首页
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AE%B2%E5%B8%88%E9%A6%96%E9%A1%B5.png)
#### 讲师介绍
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AE%B2%E5%B8%88%E4%BB%8B%E7%BB%8D.png)
#### 讲师所讲课程
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E8%AE%B2%E5%B8%88%E6%89%80%E8%AE%B2%E8%AF%BE%E7%A8%8B.png)
#### 个人信息
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF.png)
#### 搜索课程
![avatar](https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E8%B0%B7%E7%B2%92%E5%AD%A6%E8%8B%91%E9%A1%B9%E7%9B%AE%E6%88%AA%E5%9B%BE/%E6%90%9C%E7%B4%A2%E8%AF%BE%E7%A8%8B.png)
  
