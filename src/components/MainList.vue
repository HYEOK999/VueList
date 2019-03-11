<template>
    <div class="container" >
        <div v-for="(comento_list,index) in comento_list" :key="index">    
            <div v-if="index === 3">
                <div class="card">
                    <div class="card-body" style="margin-bottom: 20px; padding:10px 10px 0px 15px;">
                        Sponsored
                    </div>
                    <div class="card mb-3 flex-row" style=" padding:10px; border:none">
                            <img v-on:focus="addAdImgIndex" :src="ad_image[0]" width="200px" height="200px" alt="Sponsored image" class="card-img-left">
                        <div class="card-body">
                            <h6 class="card-subtitle text-muted mb-2">
                                <!-- 테스트 주석처리     -->
                                {{comento_ad_list[index].title}} <!--광고제목 title-->
                            </h6> 
                            <p class="card-text txt_post">
                                <!-- 테스트 주석처리 -->
                                {{comento_ad_list[index].contents}} <!--광고내용 contents-->
                            </p>     
                            <!-- 
                                <div hidden v-if="index===3">{{adImgIndex++}}</div>
                                <div hidden v-else-if="adImgIndex>4">{{adImgIndex=0}}</div>
                                <div hidden else></div>  
                            -->
                        </div>
                    </div>
                </div>
            </div>
        
            <div v-else-if="index === 7" >
                <div class="card">
                    <div class="card-body target" style="margin-bottom: 20px; padding:10px 10px 0px 15px;">
                        Sponsored
                    </div>
                    <div class="card mb-3 flex-row" style=" padding:10px; border:none">
                            <img v-on:addAdImgIndex="addAdImgIndex" :src="ad_image[index/4]" width="200px" height="200px" alt="Sponsored image" class="card-img-left">
                        <div class="card-body">
                        
                            <h6 class="card-subtitle text-muted mb-2">
                                <!-- 테스트 주석처리 -->
                                {{comento_ad_list[index].title}} <!--광고제목 title-->
                            </h6> 
                            <p class="card-text txt_post">
                                <!-- 테스트 주석처리 -->
                                {{comento_ad_list[index].contents}} <!--광고내용 contents-->
                            </p>    
                            <!-- 
                            <div hidden v-if="index===7">{{adImgIndex++}}</div>
                            <div hidden v-else-if="adImgIndex>4">{{adImgIndex=0}}</div> 
                            -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <router-link tag="div" class="card-header" :to='"/detail/"+index'>
                    <div class="card text-left" >
                        <div class="card-header">
                            <div id="Categorybar">
                                <span class="card-title">
                                    <!-- 테스트 주석처리 -->
                                    {{comento_category[$store.state.value_modal-1].name}} <!--카데고리명 name, 카테코리번호 category_no랑 매칭 -->
                                </span> 
                                <span class="card-title" align="right">
                                    <!-- 테스트 주석처리 -->
                                    {{comento_list.no}} <!--글번호 no-->
                                </span> 
                            </div>
                        </div>
                        <div class="card-body" style="text-overflow: ellipsis;">
                            <span class="card-link">
                                <!-- 테스트 주석처리 -->
                                {{comento_list.email}} <!--이메일 email-->
                            </span> 
                            <span class="card-link">
                                <!-- 테스트 주석처리 -->
                                {{comento_list.updated_at}} <!--작성일 updated_at-->
                            </span> 
                            <br>
                            <br>
                            <h6 class="card-subtitle text-muted mb-2">
                                <!-- 테스트 주석처리 -->
                                {{comento_list.title}} <!--제목 title-->
                            </h6> 
                                <p class="card-text target">
                                    <!-- 테스트 주석처리 -->
                                    {{comento_list.contents}} <!--내용 contents-->
                                </p>
                        </div>        
                    </div>
                </router-link>
            </div>

        </div> <!--/ v-for -->
                <!--스크롤링 시작.-->
            <div>
                <div v-if="list_items.length === 0" class="loading">
                    Loading...
                </div>
                <div v-for="(list,index) in list_items" :key="index" class="beer-contain">
                    <div class="beer-info">
                        <h2>{{list.title}}</h2>
                        <p class="bright">{{list.no}}</p>
                        <p><span class="bright">Description:</span> {{list.email}}</p>
                        <p><span class="bright">Tips:</span> {{list.updated_at}}</p>
                        <h3 class="bright">Food Pairings</h3>
                    </div>
                </div>
            </div>
    </div> <!--/ container-->
</template> <!-- END -->


<script>
export default {  
    data : function(){
        return{
 //           select_align: 'null' ,
            comento_category: [],
            comento_list: [],
            comento_ad_list:[],
            ad_image:[
            'http://comento.cafe24.com/public/images/test1.jpg',
            'http://comento.cafe24.com/public/images/test2.jpg',
            'http://comento.cafe24.com/public/images/test3.jpg',
            'http://comento.cafe24.com/public/images/test4.jpg',
            'http://comento.cafe24.com/public/images/test5.jpg',
            ],
            adImgIndex: '0', //광고 이미지 Count
            bottom: false,
            list_items: []    
        }
    },
    methods:{
        bottomVisible: function() {
            var scrollY = window.pageYOffset;
            var visible = document.documentElement.clientHeight;
            var pageHeight = document.documentElement.scrollHeight;
            var bottomOfPage = visible + scrollY >= pageHeight;
            return bottomOfPage || pageHeight < visible;
        },
        addAdImgIndex: function() {
            if(adImgIndex>4){
                adImgIndex = 0;
            }
            else{
                adImgIndex++;
            }
        },
        addList: function() {
            this.$http.get('https://comento.cafe24.com/request.php?page=2&ord=asc').then(response => {
                console.log("per은" + response.data.per);
                var api = [];
                for(var i=0;i< response.data.per;i++) { 
                    api.push(response.data.list[i]);
                }
                var apiInfo = {
                    title: api.title,
                    no: api.no,
                    email: api.email,
                    updated_at: api.updated_at,
                    contents: api.contents,
                    category_no: api.category_no
                };
                this.list_items.push(apiInfo);
                if(this.bottomVisible()) {
                    this.addList();  
                }
            })
        }
    },
    watch: {
        bottom: function(bottom) {
            if(bottom) {
              this.addList();
            }
        }
    },
    created: function(){
        var vm = this;
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible();
        });
        this.addList();

        console.log('호출 전 this',vm);
        var baseURL1 = 'https://comento.cafe24.com/request.php?page=1&ord=' + this.$store.state.selected;
        const baseURL2 = 'https://comento.cafe24.com/category.php';
        const baseURL3 = 'https://comento.cafe24.com/ads.php?page=1';

        this.$http.get(baseURL1)  // MAIN_LIST정보 불러오기 category는 1,2,3까지
            //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
            .then((response) => {
                vm.comento_list = response.data.list;
                console.log('호출후 this-comento_list',vm.comento_list);
            })
            //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
            .catch((error) => {
                console.log(error);
            });

        this.$http.get(baseURL2)  // CATEGORY_LIST 불러오기 (apple,banana,coconut)
            //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
            .then((response) => {
                vm.comento_category = response.data.list;
                console.log('호출후 this-name',vm.comento_category);
            })
            //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
            .catch((error) => {
                console.log(error);
            });     

        this.$http.get(baseURL3)  // ADVERTISE_LIST 불러오기 
            //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
            .then((response) => {
                vm.comento_ad_list = response.data.list;
                console.log('호출후 this-AD',vm.comento_ad_list);
            })
            //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
            .catch((error) => {
                console.log(error);
            });  
    },
}
</script>

<style scoped>
#Categorybar{
    display: flex;
    justify-content: space-between;
}
.card-title{
    padding:10px 10px 0px 15px;
}
.card-header{
    padding:0px;
}

.card{
    margin-bottom: 10px;
}

.target { 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}
.txt_post { 
    display: -webkit-box; 
    display: -ms-flexbox; 
    display: box; 
    overflow:hidden; 
    vertical-align:top; 
    text-overflow: ellipsis; 
    word-break:break-all; 
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:5 }
</style>
