export const adminMenu = [
    { // quản lý người dùng
        name: 'menu.admin.user', 
        menus: [
            {
                name: 'menu.admin.manage-user', link: '/system/manage-user'
            },
            {
                name: 'menu.admin.manage-user-redux', link: '/system/manage-user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            { // quản lý ke hoach kham benh cua bac si

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
 
    {    // quản lý phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    {    // quản lý chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    {    // quản lý cam nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    }
];

export const doctorMenu = [
    {
        name: 'menu.admin.user', 
        menus: [
        { // quản lý ke hoach kham benh cua bac si
            name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
        },
        { // quản lý danh sach benh nhan dat lich cua bac si
            name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
        },
        ]
    }
];

// subMenus: [
//     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
// ]