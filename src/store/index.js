import Vue from 'vue'
import Vuex from 'vuex'
import roleListJson from '../assets/人物/role.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sceneryShow:false,//城市资料遮罩层
    pvVideoShow: false,//PV遮罩层
    //人物列表
    roleList: [
      {
        id: "",//id
        uid: "",//城市序号
        title: "",//城市名
        //角色信息
        role: roleListJson,
        //     [
        //   {
        //     title: "琴",
        //     icon: "https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20220127\u002F2022012718344593599.png",
        //     cover1: "https:\u002F\u002Fwebstatic.mihoyo.com\u002Fupload\u002Fcontentweb\u002F2022\u002F06\u002F30\u002Fb51565c6f1298e534e90b6e63332e9c1_6618231443033589469.png",
        //     cover2: "https:\u002F\u002Fwebstatic.mihoyo.com\u002Fupload\u002Fcontentweb\u002F2022\u002F06\u002F24\u002F6d512d56ac7ee8181b6fecb8b53c8941_8592363746895730807.png",
        //     name: "https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20190926\u002F2019092620142281505.png",
        //     attr: "https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20190926\u002F2019092620142687125.png",
        //     intro: "\u003Cp\u003E身为西风骑士团的代理团长，琴一直忠于职守，为人们带来安宁。虽然并非天赋异禀，但通过刻苦训练，如今的她已然能够独当一面。\u003Cbr \u002F\u003E\n当风魔龙的威胁开始临近，这位可靠的代理团长早已做好了准备，誓要守护蒙德。\u003C\u002Fp\u003E\n",
        //     sen: "https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20190926\u002F2019092620144979413.png",
        //     cv: [{
        //       name: "林簌",
        //       audio: ["https:\u002F\u002Fwebstatic.mihayo.com\u002Fupload\u002Fop-public\u002F2019\u002F12\u002F11\u002F209a68a166b14b27e11a8b64c466ea7c_7021182076965695539.mp3", "https:\u002F\u002Fwebstatic.mihayo.com\u002Fupload\u002Fop-public\u002F2019\u002F12\u002F11\u002F806fad7c524efcebd55abc2ce4f8ce6a_5745385847854898057.mp3", "https:\u002F\u002Fwebstatic.mihayo.com\u002Fupload\u002Fop-public\u002F2019\u002F12\u002F11\u002F74c81976dc6f3868ecc264bbd143e571_4077467239236738470.mp3"]
        //     }, {
        //       name: "斋藤千和",
        //       audio: ["https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20190926\u002F2019092620145220378.mp3", "https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20190926\u002F2019092620145562610.mp3", "https:\u002F\u002Fuploadstatic.mihoyo.com\u002Fcontentweb\u002F20190926\u002F2019092620145849323.mp3"]
        //     }],
        //     home: ""   // 所属阵营
        //   },
        //   {
        //     title: "",//姓名
        //     icon: "",  // 证件照
        //     cover1: "", //半身立绘
        //     cover2: "", //全身立绘
        //     name: "",  // 姓名照片
        //     attr: "",   //元素照片
        //     intro: "",    //介绍词
        //     sen: "",    //台词
        //     cv: [{   //CV，0为中国，1为日本
        //       name: "",// 姓名
        //       //语音数组，共3句
        //       audio: [],
        //     }],
        //     home: ""   // 所属阵营
        //   },
        // ],
      }],

      //城市列表
    cityList: [
       {
      home: {
        banner1: "",  //主城狭长图
        char: "",    // 代表人物剪影
        banner2: ""   //主城中长图,移动端
      },
      char: {
        bg: "",     //主城背景早晨
        bg2: "",    // 主城背景下午
        bg3: ""      //背景，竖直矩形带遮罩，移动端
      },
      _id: "",
      contentId: "",    //序号
      title: "",  // 城市名
      key: "", // 英文名
      __v: ''
    }
    ],
    //国家风景列表
    sceneryList: [
      {
      _id: "4233",
      contentId: "4233",
      title: "蒙德",   //大标题
      icon: "https://uploadstatic.mihoyo.com/contentweb/20200317/2020031714242066580.png",   //阵营徽章图
      desc: "位于提瓦特大陆东北部的自由城邦。群山和广袤的平原间，自由之风携着蒲公英的气息吹拂过果酒湖，为坐落于湖心岛上的蒙德城送去风神巴巴托斯的祝福与恩泽。",//文本
      bg: "https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg",   //大图
      bg2: "https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550695139.jpg", // 狭长竖图
      //内容数列
      centent: [
        {
          sceneryName: "果酒湖",       //地点名
          text: "环绕蒙德城的天然淡水湖泊。宽广的湖面和粼粼的波光历经千百年不变，水澈见底，入口清冽甘甜。正是这样的水源成就了蒙德美酒的盛名，也让果酒湖成为了蒙德的重要标志之一。",//风景文本
          imgSrc: "https://uploadstatic.mihoyo.com/contentweb/20200113/2020011311461397057.jpg"   //图示
        },

      ]
    }
    ],
     //漫画列表
     manhuaList:[{
       _id:'',//id
      title:"",//标题
      src:"",//封面地址
      manhuaImg:[],//漫画各页地址函数
     }],

    role_cityIndex: 0,//人物所属阵营序号
    roleIndex: 0,//人物序号
    sceneryIndex:0,//城市风景序号

    manhuaIndex:0,//漫画集数
    manhuaPage:0,//漫画页数
    manhuaShow:false,//漫画阅读器显示状态
    index_page:[0,0],//上次浏览集数与页数
    manhuaIndexMove:0,//手机端漫画集数记录
    musicPlay:false,//背景音乐播放状态
    musicLow:"",
  },
  getters: {
    //当前人物所属城市信息
    nowCity: state => {
        return state.cityList[state.role_cityIndex];
    },

    //当前人物信息
    nowRole: (state) => {
      return state.roleList[state.role_cityIndex].role[state.roleIndex];
    }
  },
  mutations: {
    //改变背景音乐状态
    changeMusicPlay(state,index){
      state.musicPlay=index;
    },
    //写入浏览记录
    changeIndex_page(state,index){
      state.index_page=index;
    },
    //写入手机端浏览记录
    changeManhuaIndexMove(state,index){
      state.manhuaIndexMove=index;
    },
    // 确定漫画阅读器是否显示
    changeManhuaShow(state,index){
      state.manhuaShow=index;
    },
    // 选择特定漫画集数
    changeManhuaIndex(state,index){
      state.manhuaIndex=index;
    },
    //选择特定漫画页数
    changeManhuaPage(state,index){
      state.manhuaPage=index;
    },
    //页数自增或自减特定数
    alterManhuaPage(state,index){
      state.manhuaPage=state.manhuaPage+index;
    } ,
    //写入漫画信息
    changeManhuaList:function(state, value) {
      state.manhuaList = value;
    },

    //载入PV信息
    changePvVideoShow: function (state) {
      state.pvVideoShow = !state.pvVideoShow;
    },
    // 载入角色信息
    changeRoleList: function (state, value) {
      state.roleList = value;
    },
    // 载入城市背景信息
    changeCityList: function (state, value) {
      state.cityList = value;
    },
    // 载入城市风景信息
    chuangeScenery(state, value) {
      state.sceneryList = value;
    },
    //  改变城市序号
    chuangeRole_cityIndex(state, value) {
      state.role_cityIndex = value;
    },
    //改变人物序号
    chuangeRoleIndex(state, value) {
      state.roleIndex = value;
    },
    // 人物序号自增
    addRoleIndex: function (state) {
      state.roleIndex++;
    },
    // 人物序号自减
    redRoleIndex: function (state) {
      state.roleIndex--;
    },
    //改变城市风景序号
    chuangeSceneryIndex:function(state, value) {
      state.sceneryIndex = value;
    },
    //改变风景信息遮罩层
    changeSceneryShow: function (state) {
      state.sceneryShow = !state.sceneryShow;
    },
  },

  actions: {
  },
  modules: {
  }
})
