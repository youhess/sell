 <template>
    <nav class="nav">
        <!-- <div class="nav_item goods">
            点菜
        </div>
        <div class="nav_item ratings">
            评价
        </div>
        <div class="nav_item seller">
            商家
        </div> -->
         <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link class="nav_item goods" to="/goods">
    点菜
    <i class="nav_icon"></i>
    </router-link>
    <router-link class="nav_item ratings" to="/ratings">
    评价({{commentNum}})
    <i class="nav_icon"></i>
    </router-link>
    <router-link class="nav_item seller" to="/seller">
    商家
    <i class="nav_icon"></i>
    </router-link>
    </nav>
 </template>
 
 <script>
 export default {
     props:{
         commentNum:{
             type:Number,
             default:0
         }
     }
 }

 </script>
 
 <style  type="text/css" scoped >
     .nav{
         display: flex;
         width: 100%;
         height: 40px;
         line-height: 40px;
         border-bottom: 1px solid #e4e4e4;
     }
    .nav .nav_item{
         font-size: 13px;
         color:#666666; 
         flex: 1;
         text-align: center;
         text-decoration: none;
         transition:0.2s
     }
     .nav .active{
         color:#ffbb22;
         position: relative;
        
     }
    
     .nav .active .nav_icon{
         content: "";
         position: absolute;
         display: block;
         width: 20px;
         height: 3px;
         background-color:#ffbb22;
         bottom:0 ;
         left: 50%;
         margin-left: -10px;
     }

 </style>