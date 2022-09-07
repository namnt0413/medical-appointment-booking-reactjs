export const adminMenu = [
    { // quản lý người dùng
        name: 'menu.admin.user', 
        menus: [
            {
                name: 'menu.admin.manage-user', link: '/system/manage-user'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/manager-admin'
            },
            {
                name: 'menu.admin.manage-user-redux', link: '/system/manage-user-redux'
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
    {    // quản lý chuyên khoa
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    }
];


// subMenus: [
//     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
// ]