import { useAuth } from "@/composables/use-auth";

export const getMenus = () => {
  const { schoolId } = useAuth();

  const isAdmin = !schoolId.value || +schoolId.value === 1;

  const sidebarMenus = [
    {
      name: "school",
      title: "教务管理",
      icon: "school",
      children: [
        isAdmin
          ? {
              title: "学校管理",
              path: "/school/schools",
            }
          : null,
        {
          title: "教师管理",
          path: "/school/teachers",
        },
        {
          title: "行政班管理",
          path: "/school/classes-Administration",
          children: [
            {
              title: "学生管理",
              path: "/school/classes-Administration/:id/students",
            },
          ],
        },
        {
          title: "课程班管理",
          path: "/school/classes-Course",
          children: [
            {
              title: "学生管理",
              path: "/school/classes-Course/:id/class-students",
            },
            {
              title: "排课",
              path: "/school/classes-Course/:id/schedules",
            },
          ],
        },
        {
          title: "学生管理",
          path: "/school/students",
        },
      ],
    },
    {
      name: "resource",
      title: "资源管理",
      icon: "resource",
      children: [
        {
          title: "实验管理",
          path: "/resource/experiments",
          children: [
            {
              title: "步骤设置",
              path: "/resource/experiments/:id/steps",
            },
            {
              title: "作品管理",
              path: "/resource/experiments/:id/works",
            },
          ],
        },
        {
          title: "课程管理",
          path: "/resource/courses",
          children: [
            {
              title: "课时管理",
              path: "/resource/courses/:id/class-hours",
              children: [
                {
                  title: "知识点管理",
                  path: "/resource/courses/:id/class-hours/:id/course-hour-ppt-pages",
                },
              ],
            },
          ],
        },
        {
          title: "考试管理",
          path: "/resource/exams",
          children: [
            {
              title: "题目管理",
              path: "/resource/exams/:id/questions",
            },
            {
              title: "考试结果",
              path: "/resource/exams/:id/results",
            },
            {
              title: "考试结果",
              path: "/resource/exams/:id/results/:id",
            },
            {
              title: "数据报表",
              path: "/resource/exams/:id/result-reports",
            },
          ],
        },
      ],
    },
    {
      name: "config",
      title: "基础设置",
      icon: "config--filled",
      children: [
        isAdmin
          ? {
              title: "模块/标签管理",
              path: "/config/modules",
              children: [
                {
                  title: "标签管理",
                  path: "/config/modules/:id/tags",
                },
              ],
            }
          : null,
        {
          title: "停课日管理",
          path: "/config/festivals",
        },
      ],
    },
  ];

  return sidebarMenus
    .filter((item) => !!item)
    .map(({ children, ...rest }) => ({
      ...rest,
      children: (children || []).filter((item) => !!item),
    }));
};
