export const getMenus = () => [
  {
    name: "introduction",
    title: "研究院概况",
    icon: "introduction",
    children: [
      {
        title: "中心简介",
        path: "/introduction/contents-introduction-summary",
      },
      {
        title: "组织机构",
        path: "/introduction/contents-introduction-organization",
      },
      {
        title: "学术委员会",
        path: "/introduction/contents-introduction-committee",
      },
    ],
  },
  {
    name: "research",
    title: "科研成果",
    icon: "research",
    children: [
      {
        title: "获奖情况",
        path: "/research/contents-research-rewarded",
      },
      {
        title: "专利",
        path: "/research/contents-research-patents",
      },
      {
        title: "论文",
        path: "/research/contents-research-theses",
      },
    ],
  },
  {
    name: "team",
    title: "研究队伍",
    icon: "team",
    children: [
      {
        title: "工学队伍",
        path: "/team/team-members-team-ergonomic",
      },
      {
        title: "医学队伍",
        path: "/team/team-members-team-medicine",
      },
      {
        title: "博硕学生",
        path: "/team/contents-team-student",
      },
    ],
  },
  {
    name: "talent",
    title: "人才培养",
    icon: "talent",
    children: [
      {
        title: "教学获奖",
        path: "/talent/contents-talent-prize",
      },
      {
        title: "学生竞赛获奖",
        path: "/talent/contents-talent-student-prize",
      },
      {
        title: "优博优硕",
        path: "/talent/contents-talent-people",
      },
    ],
  },
  {
    name: "job",
    title: "人才招聘",
    icon: "job",
    children: [
      {
        title: "招聘信息",
        path: "/job/articles-job-info",
      },
      {
        title: "人才政策",
        path: "/job/articles-job-policy",
      },
    ],
  },
  {
    name: "information",
    title: "最新动态",
    icon: "information",
    children: [
      {
        title: "我院新闻",
        path: "/information/articles-information-news",
      },
      {
        title: "活动通知",
        path: "/information/articles-information-notice",
      },
    ],
  },
  {
    name: "other",
    title: "联系/加入我们",
    icon: "other",
    children: [
      {
        title: "联系我们",
        path: "/contact/contents-contact",
      },
      {
        title: "招聘岗位",
        path: "/contact/jobs",
      },
    ],
  },
];
