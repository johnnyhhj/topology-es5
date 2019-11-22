/**
 * Created by johnnyhhj on 19/11/22.
 */
// 定义这个模块 使用的是 require.js


    //画布对象
    var canvas = null;
    //选中多个节点对象
    var selNodes = null;
    //选中节点的详情
    var selected = null;
    //是否锁对象
    var locked = false;
    //右键菜单对应标记是否可用

    var knowledgeFlow = {
        data: {},
        load: false,
        lineStyle: {curve: 0, polyline: 1, line: 2},
        startLineStyle: {
            default: 0,
            triangleSolid: 1,
            triangle: 2,
            diamondSolid: 3,
            diamond: 4,
            circleSolid: 5,
            circle: 6,
            line: 7,
            lineUp: 8,
            lineDown: 9
        },
        lineTypeStyle: {curve: 0, polyline: 1, line: 2},
        tools: [
            {
                group: '基本形状',
                children: [
                    {
                        name: 'rectangle',
                        icon: 'icon-rect',
                        data: {
                            text: 'Topology',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            name: 'rectangle',
                            icon: '\ue64d',
                            iconFamily: 'topology',
                            iconColor: '#2f54eb'
                        }
                    },
                    {
                        name: 'rectangle',
                        icon: 'icon-rectangle',
                        data: {
                            text: '圆角矩形',
                            rect: {
                                width: 200,
                                height: 50
                            },
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 0.1,
                            name: 'rectangle'
                        }
                    },
                    {
                        name: 'circle',
                        icon: 'icon-circle',
                        data: {
                            text: '圆',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'circle',
                            textMaxLine: 1
                        }
                    },
                    {
                        name: 'triangle',
                        icon: 'icon-triangle',
                        data: {
                            text: '三角形',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'triangle'
                        }
                    },
                    {
                        name: 'diamond',
                        icon: 'icon-diamond',
                        data: {
                            text: '菱形',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'diamond'
                        }
                    },
                    {
                        name: 'pentagon',
                        icon: 'icon-pentagon',
                        data: {
                            text: '五边形',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'pentagon'
                        }
                    },
                    {
                        name: 'hexagon',
                        icon: 'icon-hexagon',
                        data: {
                            text: '六边形',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            paddingTop: 10,
                            paddingBottom: 10,
                            name: 'hexagon'
                        }
                    },
                    {
                        name: 'pentagram',
                        icon: 'icon-pentagram',
                        data: {
                            text: '五角星',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'pentagram'
                        }
                    },
                    {
                        name: 'leftArrow',
                        icon: 'icon-arrow-left',
                        data: {
                            text: '左箭头',
                            rect: {
                                width: 200,
                                height: 100
                            },
                            name: 'leftArrow'
                        }
                    },
                    {
                        name: 'rightArrow',
                        icon: 'icon-arrow-right',
                        data: {
                            text: '右箭头',
                            rect: {
                                width: 200,
                                height: 100
                            },
                            name: 'rightArrow'
                        }
                    },
                    {
                        name: 'twowayArrow',
                        icon: 'icon-twoway-arrow',
                        data: {
                            text: '双向箭头',
                            rect: {
                                width: 200,
                                height: 100
                            },
                            name: 'twowayArrow'
                        }
                    },
                    {
                        name: 'line',
                        icon: 'icon-line',
                        data: {
                            text: '直线',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'line'
                        }
                    },
                    {
                        name: 'cloud',
                        icon: 'icon-cloud',
                        data: {
                            text: '云',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'cloud'
                        }
                    },
                    {
                        name: 'message',
                        icon: 'icon-msg',
                        data: {
                            text: '消息框',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            name: 'message'
                        }
                    },
                    {
                        name: 'file',
                        icon: 'icon-file',
                        data: {
                            text: '文档',
                            rect: {
                                width: 80,
                                height: 100
                            },
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            name: 'file'
                        }
                    },
                    {
                        name: 'text',
                        icon: 'icon-text',
                        data: {
                            text: 'le5le-topology / 乐吾乐',
                            rect: {
                                width: 160,
                                height: 30
                            },
                            name: 'text'
                        }
                    },
                    {
                        name: 'image',
                        icon: 'icon-image',
                        data: {
                            text: '',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'image',
                            image: '/assets/img/logo.png'
                        }
                    },
                    {
                        name: 'cube',
                        icon: 'icon-cube',
                        data: {
                            rect: {
                                width: 50,
                                height: 70
                            },
                            is3D: true,
                            z: 10,
                            zRotate: 15,
                            fillStyle: '#ddd',
                            name: 'cube',
                            icon: '\ue63c',
                            iconFamily: 'topology',
                            iconColor: '#777',
                            iconSize: 30
                        }
                    },
                    {
                        name: 'people',
                        icon: 'icon-people',
                        data: {
                            rect: {
                                width: 70,
                                height: 100
                            },
                            name: 'people'
                        }
                    },
                    {
                        name: '视频/网页',
                        icon: 'icon-pc',
                        data: {
                            text: '视频/网页',
                            rect: {
                                width: 200,
                                height: 200
                            },
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            // strokeStyle: 'transparent',
                            name: 'div'
                        }
                    }
                ]
            },
            {
                group: '流程图',
                children: [
                    {
                        name: '开始/结束',
                        icon: 'icon-flow-start',
                        data: {
                            text: '开始',
                            rect: {
                                width: 120,
                                height: 40
                            },
                            borderRadius: 0.5,
                            name: 'rectangle'
                        }
                    },
                    {
                        name: '流程',
                        icon: 'icon-rectangle',
                        data: {
                            text: '流程',
                            rect: {
                                width: 120,
                                height: 40
                            },
                            name: 'rectangle'
                        }
                    },
                    {
                        name: '判定',
                        icon: 'icon-diamond',
                        data: {
                            text: '判定',
                            rect: {
                                width: 120,
                                height: 60
                            },
                            name: 'diamond'
                        }
                    },
                    {
                        name: '数据',
                        icon: 'icon-flow-data',
                        data: {
                            text: '数据',
                            rect: {
                                width: 120,
                                height: 50
                            },
                            name: 'flowData'
                        }
                    },
                    {
                        name: '准备',
                        icon: 'icon-flow-ready',
                        data: {
                            text: '准备',
                            rect: {
                                width: 120,
                                height: 50
                            },
                            name: 'hexagon'
                        }
                    },
                    {
                        name: '子流程',
                        icon: 'icon-flow-subprocess',
                        data: {
                            text: '子流程',
                            rect: {
                                width: 120,
                                height: 50
                            },
                            name: 'flowSubprocess'
                        }
                    },
                    {
                        name: '数据库',
                        icon: 'icon-db',
                        data: {
                            text: '数据库',
                            rect: {
                                width: 80,
                                height: 120
                            },
                            name: 'flowDb'
                        }
                    },
                    {
                        name: '文档',
                        icon: 'icon-flow-document',
                        data: {
                            text: '文档',
                            rect: {
                                width: 120,
                                height: 100
                            },
                            name: 'flowDocument'
                        }
                    },
                    {
                        name: '内部存储',
                        icon: 'icon-internal-storage',
                        data: {
                            text: '内部存储',
                            rect: {
                                width: 120,
                                height: 80
                            },
                            name: 'flowInternalStorage'
                        }
                    },
                    {
                        name: '外部存储',
                        icon: 'icon-extern-storage',
                        data: {
                            text: '外部存储',
                            rect: {
                                width: 120,
                                height: 80
                            },
                            name: 'flowExternStorage'
                        }
                    },
                    {
                        name: '队列',
                        icon: 'icon-flow-queue',
                        data: {
                            text: '队列',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'flowQueue'
                        }
                    },
                    {
                        name: '手动输入',
                        icon: 'icon-flow-manually',
                        data: {
                            text: '手动输入',
                            rect: {
                                width: 120,
                                height: 80
                            },
                            name: 'flowManually'
                        }
                    },
                    {
                        name: '展示',
                        icon: 'icon-flow-display',
                        data: {
                            text: '展示',
                            rect: {
                                width: 120,
                                height: 80
                            },
                            name: 'flowDisplay'
                        }
                    },
                    {
                        name: '并行模式',
                        icon: 'icon-flow-parallel',
                        data: {
                            text: '并行模式',
                            rect: {
                                width: 120,
                                height: 50
                            },
                            name: 'flowParallel'
                        }
                    },
                    {
                        name: '注释',
                        icon: 'icon-flow-comment',
                        data: {
                            text: '注释',
                            rect: {
                                width: 100,
                                height: 100
                            },
                            name: 'flowComment'
                        }
                    }
                ]
            },
            {
                group: '活动图',
                children: [
                    {
                        name: '开始',
                        icon: 'icon-inital',
                        data: {
                            text: '',
                            rect: {
                                width: 30,
                                height: 30
                            },
                            name: 'circle',
                            fillStyle: '#555',
                            strokeStyle: 'transparent'
                        }
                    },
                    {
                        name: '结束',
                        icon: 'icon-final',
                        data: {
                            text: '',
                            rect: {
                                width: 30,
                                height: 30
                            },
                            name: 'activityFinal'
                        }
                    },
                    {
                        name: '活动',
                        icon: 'icon-action',
                        data: {
                            text: '活动',
                            rect: {
                                width: 120,
                                height: 50
                            },
                            borderRadius: 0.25,
                            name: 'rectangle'
                        }
                    },
                    {
                        name: '决策/合并',
                        icon: 'icon-diamond',
                        data: {
                            text: '决策',
                            rect: {
                                width: 120,
                                height: 50
                            },
                            name: 'diamond'
                        }
                    },
                    {
                        name: '垂直泳道',
                        icon: 'icon-swimlane-v',
                        data: {
                            text: '垂直泳道',
                            rect: {
                                width: 200,
                                height: 500
                            },
                            name: 'swimlaneV'
                        }
                    },
                    {
                        name: '水平泳道',
                        icon: 'icon-swimlane-h',
                        data: {
                            text: '水平泳道',
                            rect: {
                                width: 500,
                                height: 200
                            },
                            name: 'swimlaneH'
                        }
                    },
                    {
                        name: '垂直分岔/汇合',
                        icon: 'icon-fork-v',
                        data: {
                            text: '',
                            rect: {
                                width: 10,
                                height: 150
                            },
                            name: 'forkV',
                            fillStyle: '#555',
                            strokeStyle: 'transparent'
                        }
                    },
                    {
                        name: '水平分岔/汇合',
                        icon: 'icon-fork',
                        data: {
                            text: '',
                            rect: {
                                width: 150,
                                height: 10
                            },
                            name: 'forkH',
                            fillStyle: '#555',
                            strokeStyle: 'transparent'
                        }
                    }
                ]
            },
            {
                group: '时序图和类图',
                children: [
                    {
                        name: '生命线',
                        icon: 'icon-lifeline',
                        data: {
                            text: '生命线',
                            rect: {
                                width: 150,
                                height: 400
                            },
                            name: 'lifeline'
                        }
                    },
                    {
                        name: '激活',
                        icon: 'icon-focus',
                        data: {
                            text: '',
                            rect: {
                                width: 12,
                                height: 200
                            },
                            name: 'sequenceFocus'
                        }
                    },
                    {
                        name: '简单类',
                        icon: 'icon-simple-class',
                        data: {
                            text: 'Topolgoy',
                            rect: {
                                width: 270,
                                height: 200
                            },
                            paddingTop: 40,
                            font: {
                                fontFamily: 'Arial',
                                color: '#222',
                                fontWeight: 'bold'
                            },
                            fillStyle: '#ffffba',
                            strokeStyle: '#7e1212',
                            name: 'simpleClass',
                            children: [
                                {
                                    text: '- name: string\n+ setName(name: string): void',
                                    name: 'text',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    rectInParent: {
                                        x: 0,
                                        y: 0,
                                        width: '100%',
                                        height: '100%',
                                        rotate: 0
                                    },
                                    font: {
                                        fontFamily: 'Arial',
                                        color: '#222',
                                        textAlign: 'left',
                                        textBaseline: 'top'
                                    }
                                }
                            ]
                        }
                    },
                    {
                        name: '类',
                        icon: 'icon-class',
                        data: {
                            text: 'Topolgoy',
                            rect: {
                                width: 270,
                                height: 200
                            },
                            paddingTop: 40,
                            font: {
                                fontFamily: 'Arial',
                                color: '#222',
                                fontWeight: 'bold'
                            },
                            fillStyle: '#ffffba',
                            strokeStyle: '#7e1212',
                            name: 'interfaceClass',
                            children: [
                                {
                                    text: '- name: string',
                                    name: 'text',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    rectInParent: {
                                        x: 0,
                                        y: 0,
                                        width: '100%',
                                        height: '50%',
                                        rotate: 0
                                    },
                                    font: {
                                        fontFamily: 'Arial',
                                        color: '#222',
                                        textAlign: 'left',
                                        textBaseline: 'top'
                                    }
                                },
                                {
                                    text: '+ setName(name: string): void',
                                    name: 'text',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    rectInParent: {
                                        x: 0,
                                        y: '50%',
                                        width: '100%',
                                        height: '50%',
                                        rotate: 0
                                    },
                                    font: {
                                        fontFamily: 'Arial',
                                        color: '#222',
                                        textAlign: 'left',
                                        textBaseline: 'top'
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        // 对象的最初入口
        init: function () {
            var self = this;
            //绑定事件
            self.bindEvent();
            self.initCanvas();
            //初始化颜色选择器
            $('.colorpicker').colorpicker();
        },
        //TODO 保存画布数据
        saveKnowledgeMap: function (id) {
            var self = this;
            alert("需要保存的json：\n" + JSON.stringify(canvas.data));
        },
        //TODO 绑定事件
        bindEvent: function () {
            var self = this;
            //TODO 监听键盘快捷键
            $(document).keydown(function (e) {
                //撤销 ctrl+z
                if (e.ctrlKey && e.which === 90) {
                    canvas.undo();
                }
                //恢复 ctrl+shift+z
                if (e.ctrlKey && e.shiftKey === 90 && e.which === 90) {
                    canvas.redo();
                }
                //剪切 ctrl+x
                if (e.ctrlKey && e.which === 88) {
                    canvas.cut();
                }
                //复制 ctrl+c
                if (e.ctrlKey && e.which === 67) {
                    canvas.copy();
                }
                //粘贴 ctrl+v
                if (e.ctrlKey && e.which === 86) {
                    canvas.parse();
                }
            });
            //TODO 隐藏显示
            $("body").click(function (event) {
                $("#canvas_menus").css("display", "none");
            });
            //TODO 隐藏显示
            $(document).click(function (e) {
                //起始箭头隐藏下拉
                if (!self.compareId(e, "start_line_head")) {
                    $("#start_line_dropdown").addClass("hidden");
                }
                //终点箭头隐藏下拉
                if (!self.compareId(e, "end_line_head")) {
                    $("#end_line_dropdown").addClass("hidden");
                }
                //连接类型更改隐藏下拉
                if (!self.compareId(e, "line_style_head")) {
                    $("#line_style_dropdown").addClass("hidden");
                }
                //连接样式更改隐藏下拉
                if (!self.compareId(e, "line_type_head")) {
                    $("#line_type_dropdown").addClass("hidden");
                }
            });
            //TODO 起始箭头显示下拉
            $("#start_line_head").click(function () {
                $("#start_line_dropdown").removeClass("hidden");
            });
            //TODO 终点箭头显示下拉
            $("#end_line_head").click(function () {
                $("#end_line_dropdown").removeClass("hidden");
            });
            //TODO 连接类型更改
            $("#line_style_head").click(function () {
                $("#line_style_dropdown").removeClass("hidden");
            });
            //TODO 连接样式更改
            $("#line_type_head").click(function () {
                $("#line_type_dropdown").removeClass("hidden");
            });
            $(document).on("click", "#down_png", function () {
                self.down_png();
            });
            //TODO 画布右键属性
            $("#flex_canvas").bind("contextmenu", function () {
                //设置右键菜单
                if (selNodes != null) {
                    //置顶
                    $("#menu_top").removeClass("menu-a-disabled");
                    $("#menu_top").addClass("menu-a");
                    //置底
                    $("#menu_bottom").removeClass("menu-a-disabled");
                    $("#menu_bottom").addClass("menu-a");
                    //组合
                    if (selNodes.length > 1 || selNodes[0].name !== "combine") {
                        if (selNodes.length < 2) {
                            $("#menu_combine").addClass("menu-a-disabled");
                            $("#menu_combine").removeClass("menu-a");
                        } else {
                            $("#menu_combine").removeClass("menu-a-disabled");
                            $("#menu_combine").addClass("menu-a");
                        }
                        $("#menu_combine").css("display", "block");
                        $("#menu_unCombine").css("display", "none");
                    }
                    //取消组合
                    if (selNodes.length === 1 && selNodes[0].name == "combine") {
                        $("#menu_unCombine").removeClass("menu-a-disabled");
                        $("#menu_unCombine").addClass("menu-a");
                        $("#menu_combine").css("display", "none");
                        $("#menu_unCombine").css("display", "block");
                    }
                    //锁定
                    if (locked) {
                        $("#menu_lock").html("解锁");
                    } else {
                        $("#menu_lock").html("锁定");
                    }
                    $("#menu_lock").removeClass("menu-a-disabled");
                    $("#menu_lock").addClass("menu-a");
                } else {
                    //置顶
                    $("#menu_top").addClass("menu-a-disabled");
                    $("#menu_top").removeClass("menu-a");
                    //置底
                    $("#menu_bottom").addClass("menu-a-disabled");
                    $("#menu_bottom").removeClass("menu-a");
                    //组合
                    $("#menu_combine").addClass("menu-a-disabled");
                    $("#menu_combine").removeClass("menu-a");
                    //取消组合
                    $("#menu_unCombine").addClass("menu-a-disabled");
                    $("#menu_unCombine").removeClass("menu-a");
                    //锁定
                    $("#menu_lock").addClass("menu-a-disabled");
                    $("#menu_lock").removeClass("menu-a");
                }
                //显示右键菜单
                $("#canvas_menus").css({
                    "left": document.body.scrollLeft + event.clientX, "top":
                        document.body.scrollTop + event.clientY
                }).show();
                return false;
            });
            //TODO 保存画布数据
            $(document).on("click", "#canvas_save", function () {
                self.saveKnowledgeMap();
            });
            // -------查询开始-------------
            $(document).on('click', '#search_knowledge_btn', function () {
                console.log("aaa");
                var table = $('#table_knowledge').DataTable();
                table.page('first').draw(false);
                // 点击查询的时候，数据表格数据重新加载。在重新加载的时候，从#query_form小获得查询条件。
                // $('#table').DataTable().ajax.reload();
            });
        },
        //TODO 初始化画布
        initCanvas: function () {
            var self = this;
            console.log("initCanvas")
            // 3. 向引擎注册图形库图形及其相关元素
            $("#flex_tools").append('<div>\n' +
                '            <div class="title"></div>\n' +
                '            <div class="buttons">');
            var _html = "";
            self.tools.forEach(function (val, index) {
                _html += '<div>\n' +
                    '            <div class="title">' + val.group + '</div>\n' +
                    '            <div class="buttons">';
                val.children.forEach(function (val1, index1) {
                    _html += '<a title="' + val1.name + '" ondragstart="onDragStart(event,' + JSON.stringify(val1).replace(/\"/g, "'") + ')" draggable="true">\n' +
                        '                <i class="iconfont ' + val1.icon + '"></i>\n' +
                        '            </a>';
                });
                _html += '</div>\n' +
                    '        </div>';
            });
            $("#flex_tools").html(_html);
            $("#menu_combine").css('display', "none");
            $("#menu_unCombine").css('display', "block");
            $("#menu_combine").attr('disabled', false);
            $("#menu_unCombine").attr('disabled', true);

            $("#menu_combine").css('display', "block");
            $("#menu_unCombine").css('display', "none");
            $("#menu_combine").attr('disabled', true);
            $("#menu_unCombine").attr('disabled', false);
            //TODO 初始化canvas
            var data = {
                "nodes": [],
                "lines": [],
                "lineName": "curve",
                "fromArrowType": "",
                "toArrowType": "triangleSolid",
                "scale": 1,
                "locked": 0
            };
            var canvasOptions = {on: onMessage};
            canvas = new Le5leTopology.Topology('topo_canvas', canvasOptions);

            //TODO 监听画布
            function onMessage(event, data) {
                console.log(event, data);
                switch (event) {
                    case 'node':
                        selNodes = [data];
                        selected = {
                            "type": event,
                            "data": data
                        };
                        locked = data.locked;
                        self.initNode();
                        break;
                    case 'line':
                        selected = {
                            "type": event,
                            "data": data
                        };
                        locked = data.locked;
                        self.initLine();
                        break;
                    case 'multi':
                        locked = true;
                        if (data.nodes && data.nodes.length) {
                            selNodes = data.nodes;
                            for (var item in data.nodes) {
                                if (!item.locked) {
                                    locked = false;
                                    break;
                                }
                            }
                        }
                        if (locked && data.lines) {
                            for (var item in data.lines) {
                                if (!item.locked) {
                                    locked = false;
                                    break;
                                }
                            }
                        }
                        selected = {
                            "type": event,
                            "data": data
                        };
                        break;
                    case 'space':
                        $("#flex_props_home").removeClass("hidden");
                        $("#flex_props_node").addClass("hidden");
                        setTimeout(function () {
                            selected = null;
                            selNodes = null;
                        });
                        break;
                    case 'moveOut':
                        this.workspace.nativeElement.scrollLeft += 10;
                        this.workspace.nativeElement.scrollTop += 10;
                        break;
                    case 'addNode':
                        selNodes = [data];
                        selected = {
                            "type": event,
                            "data": data
                        };
                        locked = data.locked;
                        self.initNode();
                        break;
                    case 'addLine':
                        selected = {
                            "type": event,
                            "data": data
                        };
                        locked = data.locked;
                        self.initLine();
                        break;
                    case 'delete':
                        $("#flex_props_home").removeClass("hidden");
                        $("#flex_props_node").addClass("hidden");
                        break;
                    // case 'resize':
                    //     if (!this.mouseMoving) {
                    //         this.mouseMoving = true;
                    //         this.workspace.nativeElement.scrollLeft = this.workspace.nativeElement.scrollWidth;
                    //         this.workspace.nativeElement.scrollTop = this.workspace.nativeElement.scrollHeight;
                    //         setTimeout(function() {
                    //             this.mouseMoving = false;
                    //         }, 2000);
                    //     }
                    //     break;
                    // case 'scale':
                    //     Store.set('scale', data);
                    //     break;
                    // case 'locked':
                    //     Store.set('locked', data);
                    //     break;
                }

            }

            canvasOptions.on = onMessage;
            canvas.open(data);
            // canvas.updateProps();
            // canvas.random();
        },
        //TODO 下载图片
        down_png: function () {
            canvas.saveAsImage("PNG图片", "png", null);
        },
        //TODO 初始化node
        initNode: function () {
            var self = this;
            $("#node_line_color").html("边框颜色");
            $("#flex_props_home").addClass("hidden");
            $("#flex_props_node").removeClass("hidden");
            $(".node-show").removeClass('hidden');
            $(".line-show").addClass('hidden');
            //x轴坐标
            $("input[name=node_x]").val(selected.data.rect.x);
            //y轴坐标
            $("input[name=node_y]").val(selected.data.rect.y);
            //高
            $("input[name=node_height]").val(selected.data.rect.height);
            //宽
            $("input[name=node_width]").val(selected.data.rect.width);
            //圆角
            $("input[name=borderRadius]").val(selected.data.borderRadius);
            //旋转
            $("input[name=rotate]").val(selected.data.rotate);
            // $("input[name=rotate]").val(selected.data.dash);
            //边框样式
            var dash = selected.data.dash;
            self.onClickDash(dash, dash);
            //边框颜色
            $("input[name=strokeStyle]").val(selected.data.strokeStyle);
            $("input[name=strokeStyle]").next().children().css("background-color", selected.data.strokeStyle);
            //线宽
            $("input[name=lineWidth]").val(selected.data.lineWidth);
            //背景颜色
            $("input[name=fillStyle]").val(selected.data.fillStyle);
            $("input[name=fillStyle]").next().children().css("background-color", selected.data.fillStyle);
            //背景样式
            // var bkType =  selected.data.bkType;
            // if (bkType == null) {
            //     bkType = 0;
            // }
            // $('#bkType option:contains("' + bkType + '")').attr("selected",true);
            // self.bkTypeChange();

            $("input[name=fontFamily]").val(selected.data.font.fontFamily);
            //字体颜色
            $("input[name=fontColor]").val(selected.data.font.color);
            $("input[name=fontColor]").next().children().css("background-color", selected.data.font.color);
            //大小
            $("input[name=fontSize]").val(selected.data.font.fontSize);
            //倾斜
            $("select[name=fontStyle] option:contains('" + selected.data.font.fontStyle + "')").attr("selected", true);
            //加粗
            $("select[name=fontWeight] option:contains('" + selected.data.font.fontWeight + "')").attr("selected", true);
            //水平对齐
            $("select[name=textAlign] option:contains('" + selected.data.font.textAlign + "')").attr("selected", true);
            //垂直对齐
            $("select[name=textBaseline] option:contains('" + selected.data.font.textBaseline + "')").attr("selected", true);
            //行高
            $("input[name=lineHeight]").val(selected.data.font.lineHeight);
            //自动匹配高度
            $("input[name=textMaxLine]").val(selected.data.font.textMaxLine);
            //内容
            $("textarea[name=text]").val(selected.data.text);
            //备注
            $("textarea[name=data]").val(selected.data.data == '' ? '' : (selected.data.data.remark == null ? '' :selected.data.data.remark));
            //关联知识
            $("#knowledge_name").html(selected.data.data == '' ? '暂无关联' : (selected.data.data.knowledge == null ? '暂无关联' :selected.data.data.knowledge.title));
            if ($("#knowledge_name").html() == "暂无关联") {
                $("#select_knowledge").removeClass("btn-success");
                $("#select_knowledge").addClass("btn-primary");
                $("#select_knowledge").html("选择知识");
                $("#delete_knowledge").addClass("hidden");
            } else {
                $("#select_knowledge").removeClass("btn-primary");
                $("#select_knowledge").addClass("btn-success");
                $("#select_knowledge").html("更改");
                $("#delete_knowledge").removeClass("hidden");
            }
            //左边距
            $("input[name=paddingLeft]").val(selected.data.paddingLeft);
            //右边距
            $("input[name=paddingRight]").val(selected.data.paddingRight);
            //上边距
            $("input[name=paddingTop]").val(selected.data.paddingTop);
            //下边距
            $("input[name=paddingBottom]").val(selected.data.paddingBottom);
            canvas.overflow()
        },
        //TODO 初始化line
        initLine: function () {
            var self = this;
            $("#node_line_color").html("连线颜色");
            $("#flex_props_home").addClass("hidden");
            $("#flex_props_node").removeClass("hidden");
            $(".node-show").addClass('hidden');
            $(".line-show").removeClass('hidden');
            $("input[name=from_x]").val(selected.data.from.x);
            $("input[name=from_y]").val(selected.data.from.y);
            $("input[name=to_x]").val(selected.data.to.x);
            $("input[name=to_y]").val(selected.data.to.y);
            //起点箭头
            var fromArrow = selected.data.fromArrow;
            var fromArrow1 = selected.data.fromArrow;
            if (fromArrow == "") {
                fromArrow1 = "default";
            }
            self.onClickFromArrow(fromArrow, self.startLineStyle[fromArrow1]);
            //终点箭头
            var toArrow = selected.data.toArrow;
            var toArrow1 = selected.data.toArrow;
            if (toArrow == "") {
                toArrow1 = "default";
            }
            self.onClickToArrow(toArrow, self.startLineStyle[toArrow1]);
            //连线类型
            var lineType = selected.data.name;
            self.onClickName(lineType, self.lineTypeStyle[lineType], 1);
            //线条颜色
            $("input[name=strokeStyle]").val(selected.data.strokeStyle);
            $("input[name=strokeStyle]").next().children().css("background-color", selected.data.strokeStyle);
            //连线样式
            var dash = selected.data.dash;
            self.onClickDash(dash, dash);
            //线宽
            $("input[name=lineWidth]").val(selected.data.lineWidth);
            //备注
            // $("textarea[name=data]").val(selected.data.data == '' ? '' : selected.data.data.remark);
            canvas.overflow()
        },

        //字体
        //TODO 改变背景颜色
        strokeStyleChange: function (self) {
            selected.data.strokeStyle = $(self).val();
            canvas.render();
        },
        //TODO 改变渐变开始颜色
        gradientFromColorChange: function (self) {
            selected.data.gradientFromColor = $(self).val();
            canvas.render();
        },
        //TODO 改变渐变开始颜色
        fontStyleChange: function (self) {
            selected.data.font.fontStyle = $(self).val();
            canvas.render();
        },
        //TODO 改变渐变开始颜色
        fontStyleChange: function (self) {
            selected.data.font.fontStyle = $(self).val();
            canvas.render();
        },
        //TODO 重置属性
        onChangeProp: function () {
            if (selected.type == "line") {
                //位置起点x
                selected.data.from.x = parseInt($("input[name=from_x]").val());
                //位置起点y
                selected.data.from.y = parseInt($("input[name=from_y]").val());
                //位置终点x
                selected.data.to.x = parseInt($("input[name=to_x]").val());
                //位置终点y
                selected.data.to.y = parseInt($("input[name=to_y]").val());
            }
            if (selected.type == "node") {
                //x轴坐标
                selected.data.rect.x = parseInt($("input[name=node_x]").val());
                //y轴坐标
                selected.data.rect.y = parseInt($("input[name=node_y]").val());
                //高
                selected.data.rect.height = parseInt($("input[name=node_height]").val());
                //宽
                selected.data.rect.width = parseInt($("input[name=node_width]").val());
                //圆角
                selected.data.borderRadius = parseFloat($("input[name=borderRadius]").val());
                //旋转
                selected.data.rotate = parseInt($("input[name=rotate]").val());
                //背景颜色
                selected.data.fillStyle = $("input[name=fillStyle]").val();
                //左边距
                selected.data.paddingLeft = $("input[name=paddingLeft]").val();
                //右边距
                selected.data.paddingRight = $("input[name=paddingRight]").val();
                //上边距
                selected.data.paddingTop = $("input[name=paddingTop]").val();
                //下边距
                selected.data.paddingBottom = $("input[name=paddingBottom]").val();
            }
            //线条颜色
            selected.data.strokeStyle = $("input[name=strokeStyle]").val();
            //线宽
            selected.data.lineWidth = parseInt($("input[name=lineWidth]").val());
            //背景样式
            // var bkType =  selected.data.bkType;
            // if (bkType == null) {
            //     bkType = 0;
            // }
            // $('#bkType option:contains("' + bkType + '")').attr("selected",true);
            // $("input[name=fontFamily]").val('"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial');
            // self.bkTypeChange();
            //字体更改
            selected.data.font.fontFamily = $("input[name=fontFamily]").val();
            //字体颜色
            selected.data.font.color = $("input[name=fontColor]").val();
            //字体大小
            selected.data.font.fontSize = parseInt($("input[name=fontSize]").val());
            //字体倾斜
            selected.data.font.fontStyle = $("select[name=fontStyle]").val();
            //字体加粗
            selected.data.font.fontWeight = $("select[name=fontWeight]").val();
            //水平对齐
            selected.data.font.textAlign = $("select[name=textAlign]").val();
            //垂直对齐
            selected.data.font.textBaseline = $("select[name=textBaseline]").val();
            //行高
            selected.data.font.lineHeight = parseFloat($("input[name=lineHeight]").val());
            //最大行数
            selected.data.font.textMaxLine = parseInt($("input[name=textMaxLine]").val());
            selected.data.text = $("textarea[name=text]").val();
            //备注
            selected.data.data = {};
            selected.data.data.remark = $("textarea[name=data]").val();
            //更新数据（数据不完整，如果是node，需要传node；如果是连线，不用传参数）
            if (selected.type == "node") {
                canvas.updateProps(selected.data);
            } else {
                canvas.updateProps();
            }
            //重绘画布
            canvas.render();
        },
        fillStyleChange: function (self) {
            selected.data.fillStyle = $(self).val();
            canvas.render();
        },
        //TODO 比较id
        compareId: function (dom, id) {
            var domNode = dom.target;
            for (var i = 0; i < 4; i++) {
                if (id == domNode.id) {
                    return true;
                }
                if (domNode.parentNode == null) {
                    return false;
                }
                domNode = domNode.parentNode;
            }
            return false;
        },
        //TODO 起止箭头更改
        onClickFromArrow: function (arrow, index) {
            // console.log($(e).attr("class"))
            var sum = 0;
            //更改选择框显示的箭头
            $("#start_line_head").children().each(function (e) {
                if (index == sum) {
                    $(this).removeClass("hidden");
                } else {
                    $(this).addClass("hidden");
                }
                sum++;
            })
            //设置对应连线的箭头
            selected.data.fromArrow = arrow;
            //重绘画布
            canvas.render()
        },
        //TODO 箭头终点更改
        onClickToArrow: function (arrow, index) {
            // console.log($(e).attr("class"))
            var sum = 0;
            //更改选择框显示的箭头
            $("#end_line_head").children().each(function (e) {
                if (index == sum) {
                    $(this).removeClass("hidden");
                } else {
                    $(this).addClass("hidden");
                }
                sum++;
            })
            //设置对应连线的箭头
            selected.data.toArrow = arrow;
            //重绘画布
            canvas.render()
        },
        //TODO 连线类型更改
        onClickName: function (arrow, index, type) {
            // console.log($(e).attr("class"))
            var sum = 0;
            //更改选择框显示的箭头
            $("#line_style_head").children().each(function (e) {
                if (index == sum) {
                    $(this).removeClass("hidden");
                } else {
                    $(this).addClass("hidden");
                }
                sum++;
            });
            if (type == null) {
                //设置对应连线的箭头
                selected.data.name = arrow;
                //更新数据（数据不完整，如果是node，需要传node；如果是连线，不用传参数）
                canvas.updateProps();
                //重绘画布
                canvas.render();
            }
        },
        //TODO 连线样式更改
        onClickDash: function (dash, index) {
            // console.log($(e).attr("class"))
            var sum = 0;
            //更改选择框显示的箭头
            $("#line_type_head").children().each(function (e) {
                if (index == sum) {
                    $(this).removeClass("hidden");
                } else {
                    $(this).addClass("hidden");
                }
                sum++;
            })
            //设置对应连线的箭头
            selected.data.dash = dash;
            //重绘画布
            canvas.render()
        },
        //TODO 拖动node开始时设定该图形的参数
        onDragStart: function (event, node) {
            event.dataTransfer.setData('text/plain', JSON.stringify(node.data));
        },
        //TODO 置顶
        onTop: function () {
            if (!selNodes) {
                return;
            }
            for (var item in selNodes) {
                canvas.top(item);
            }
            canvas.render();
        },
        //TODO 置底
        onBottom: function () {
            if (!selNodes) {
                return;
            }
            for (var item in selNodes) {
                canvas.bottom(item);
            }
            canvas.render();
        },
        //TODO 组合
        onCombine: function () {
            if (!selNodes || selNodes.length < 2) {
                return;
            }
            canvas.combine(selNodes);
        },
        //TODO 取消组合
        onUncombine: function () {
            if (!selNodes || selNodes.length > 1) {
                return;
            }
            canvas.uncombine(selNodes[0]);
            canvas.render();
        },
        //TODO 锁定
        onLock: function () {
            locked = !locked;
            if (selected.type === 'multi') {
                if (selected.data.nodes) {
                    for (var item in selected.data.nodes) {
                        item.locked = locked;
                    }
                }
                if (selected.data.lines) {
                    for (var item in selected.data.lines) {
                        item.locked = locked;
                    }
                }
            } else {
                selected.data.locked = locked;
                // readonly = locked;
            }
            canvas.render(true);
        },
        //TODO 删除
        onDelete: function () {
            canvas.delete();
        },
        //TODO 撤销
        undo: function () {
            canvas.undo();
        },
        //TODO 恢复
        redo: function () {
            canvas.redo();
        },
        //TODO 剪切
        cut: function () {
            canvas.cut();
        },
        //TODO 复制
        copy: function () {
            canvas.copy();
        },
        //TODO 粘贴
        parse: function () {
            canvas.parse();
        },
    };
    // 将 channel对象中的openEditor和 deleteChannel添加入 window全局，这样别的地方方便调用
    // --------新增-------修改-------下面的这一行

    window.onDragStart = knowledgeFlow.onDragStart;
    window.onTop = knowledgeFlow.onTop;
    window.onBottom = knowledgeFlow.onBottom;
    window.onCombine = knowledgeFlow.onCombine;
    window.onUncombine = knowledgeFlow.onUncombine;
    window.onLock = knowledgeFlow.onLock;
    window.onDelete = knowledgeFlow.onDelete;
    window.undo = knowledgeFlow.undo;
    window.redo = knowledgeFlow.redo;
    window.cut = knowledgeFlow.cut;
    window.copy = knowledgeFlow.copy;
    window.parse = knowledgeFlow.parse;
    window.onClickFromArrow = knowledgeFlow.onClickFromArrow;
    window.onClickToArrow = knowledgeFlow.onClickToArrow;
    window.onClickName = knowledgeFlow.onClickName;
    window.onClickDash = knowledgeFlow.onClickDash;
    window.strokeStyleChange = knowledgeFlow.strokeStyleChange;
    window.fillStyleChange = knowledgeFlow.fillStyleChange;
    window.gradientFromColorChange = knowledgeFlow.gradientFromColorChange;
    window.onChangeProp = knowledgeFlow.onChangeProp;
    window.setKnowledge = knowledgeFlow.setKnowledge;

    knowledgeFlow.init();

    // window.bkTypeChange = knowledgeFlow.bkTypeChange;
    // window.rechargeable = user.rechargeable;
    // window.rectify = user.rectify;
    // 这里是chnannel对象的执行入口。init 是初始化的意思


