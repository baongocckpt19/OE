export const SIDEBAR_MENUS = {
  teacher: [
    { icon: 'fa-tachometer-alt', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fa-users', label: 'Học sinh', route: '/hocsinh' },
    { icon: 'fa-question-circle', label: 'Câu hỏi', route: '/question-management' },
    { icon: 'fa-file-alt', label: 'Đề thi', route: '/de-thi' },

    { icon: 'fa-sign-out-alt', label: 'Đăng xuất', route: '/login' }
  ],
  student: [
    { icon: 'fa-tachometer-alt', label: 'Dashboard', route: '/dashboard-student' },
    { icon: 'fa-book-open', label: 'Đề thi', route: '/de-thi-student' },
    { icon: 'fa-clipboard-check', label: 'Bảng điểm', route: '/student-mark' },
    { icon: 'fa-sign-out-alt', label: 'Đăng xuất', route: '/login' }
  ]
};
