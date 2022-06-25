const Mock = require('mockjs');

module.exports = () => {
    let data = Mock.mock({
        "classes": [{
            id: 1,
            name: "WT20"
        }, {
            id: 2,
            name: "WT22"
        }, {
            id: 3,
            name: "WT23"
        }, {
            id: 4,
            name: "WT24"
        }, {
            id: 5,
            name: "WT25"
        }, {
            id: 6,
            name: "WT26"
        }, ],
        "students|100": [{
            "id|+1": 1,
            name: "@cname",
            "sex|1": ["男", "女"],
            "birthday": "@date",
            address: "@county(true)",
            "classesId|1-3": 1,
        }],
        'users': [{
            id: 1,
            name: '张三',
            loginName: 'admin',
            password: '123456'
        }, {
            id: 2,
            name: '李四',
            loginName: 'lisi',
            password: '123456'
        }, {
            'id|+1': 3,
            name: '@cname',
            loginName: '@title',
            password: '123456'
        }, ]
    });
    return data;
};