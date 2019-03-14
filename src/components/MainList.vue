<template>
    <div class="container" >
        <div v-if="comento_list.length === 0">
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered" />
            </div> <!--로딩-->
        </div>
        <div v-for="(comento_list,index) in comento_list" :key="index">
            <!-- 광고글 --> 
            <div v-for="(comento_ad_list, indexAds) in comento_ad_list" :key="indexAds">
                <!--test입니다. {{indexAds}} -->
                <div class="card" v-if="index != 0 && index%3 == 0 && indexAds == index">
                    <div class="card-body" style="margin-bottom: 20px; padding:10px 10px 0px 15px;">
                        Sponsored
                    </div>
                    <div class="card mb-3 flex-row" style=" padding:10px; border:none" > <!--v-for="index_img in 5" :key="index_img"-->
                            <img v-on:focus="addAdImgIndex" :src="ad_image[0]" width="200px" height="200px" alt="Sponsored image" class="card-img-left">
                        <div class="card-body">
                            <h6 class="card-subtitle text-muted mb-2">
                                {{comento_ad_list.title}} <!--광고제목 title-->
                            </h6> 
                            <p class="card-text txt_post">
                                {{comento_ad_list.contents}} <!--광고내용 contents-->
                            </p>     
                        </div>
                    </div>
                </div>
            </div>
            <!-- 게시글 -->
            <div>
                <router-link tag="span" class="card-header ax" :to='"/detail/"+index'>
                    <div class="card text-left" >
                        <div class="card-header">
                            <div id="Categorybar">
                                <span class="card-title">
                                    {{comento_category[$store.state.value_modal-1].name}} <!--카데고리명 name, 카테코리번호 category_no랑 매칭 -->
                                </span> 
                                <span class="card-title" align="right">
                                    {{comento_list.no}} <!--글번호 no-->
                                </span> 
                            </div>
                        </div>
                        <div class="card-body" style="text-overflow: ellipsis;">
                            <span class="card-link">
                                {{comento_list.email}} <!--이메일 email-->
                            </span> 
                            <span class="card-link">
                                {{comento_list.updated_at}} <!--작성일 updated_at-->
                            </span> 
                            <br>
                            <br>
                            <h6 class="card-subtitle text-muted mb-2">
                                {{comento_list.title}} <!--제목 title-->
                            </h6> 
                            <p class="card-text target">
                                {{comento_list.contents}} <!--내용 contents-->
                            </p>
                        </div>        
                    </div>
                </router-link> 
            </div>
        </div> <!--/ v-for -->  
    </div> <!--/ container--> 
</template> <!-- END -->


<script>
  var pageNumber = 1;
  var adPageNumber = 1;

export default {  
    data : function(){
        return{
            comento_category: [],
            comento_list: [],
            comento_ad_list:[],
            adImgIndex: '0', //광고 이미지 Count
            bottom: false,
            list_items: [],
            ad_image:[
                'http://comento.cafe24.com/public/images/test1.jpg',
                'http://comento.cafe24.com/public/images/test2.jpg',
                'http://comento.cafe24.com/public/images/test3.jpg',
                'http://comento.cafe24.com/public/images/test4.jpg',
                'http://comento.cafe24.com/public/images/test5.jpg',
            ],    
        }
    },
    methods:{
        bottomVisible: function() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        addAdImgIndex: function() {
            if(adImgIndex>4){
                adImgIndex = 0;
            }
            else{
                adImgIndex++;
            }
        },
        addList: function(pageNumber) {
            console.log("PAGE : "+pageNumber);
            if(this.bottomVisible()){
                this.$http.get('https://comento.cafe24.com/request.php?page='+pageNumber+'&ord='+this.$store.state.selected)
                .then((response) => {
                    for(var i=0;i< response.data.per;i++) { 
                        var tempFetchList = response.data.list[i];
                        var tempList = {
                            category_no: tempFetchList.category_no,
                            contents: tempFetchList.contents,
                            email: tempFetchList.email,
                            no: tempFetchList.no,
                            title: tempFetchList.title,
                            updated_at: tempFetchList.updated_at,
                            user_no: tempFetchList.user_no,
                         };
                        this.comento_list.push(tempList);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        addAdList(adPageNumber){
            console.log("ADPAGE : "+adPageNumber);
            this.$http.get('http://comento.cafe24.com/ads.php?page=' + adPageNumber)
            .then((response) => {
                for(var i=0; i<response.data.per; i++) {
                var tempFetchAds = response.data.list[i]
                var tempAdList = {
                    no: tempFetchAds.no,
                    title: tempFetchAds.title,
                    contents: tempFetchAds.contents,
                    img: tempFetchAds.img,
                    created_at: tempFetchAds.created_at,
                    updated_at: tempFetchAds.updated_at
                };
                this.comento_ad_list.push(tempAdList);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        fetch_list(){
            // var orderSet = this.$store.state.selected;
            const baseURL1 = 'https://comento.cafe24.com/request.php?page=1&ord=asc'
            this.$http.get(baseURL1)  // MAIN_LIST정보 불러오기 category는 1,2,3까지
                //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
                .then((response) => {
                    this.comento_list = response.data.list;
                    console.log('호출후 this-comento_list',this.comento_list);
                })
                //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
                .catch((error) => {
                    console.log(error);
                });
        },
        fetch_category(){
            const baseURL2 = 'https://comento.cafe24.com/category.php';
            this.$http.get(baseURL2)  // CATEGORY_LIST 불러오기 (apple,banana,coconut)
                //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
                .then((response) => {
                    this.comento_category = response.data.list;
                    console.log('호출후 this-name',this.comento_category);
                })
                //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
                .catch((error) => {
                    console.log(error);
                });     
        },
        fetch_ad_list(){
            const baseURL3 = 'https://comento.cafe24.com/ads.php?page=1';
            this.$http.get(baseURL3)  // ADVERTISE_LIST 불러오기 
                //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
                .then((response) => {
                    this.comento_ad_list = response.data.list;
                    console.log('호출후 this-AD',this.comento_ad_list);
                })
                //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
                .catch((error) => {
                    console.log(error);
                });  
        }
    },
    computed:{
        changeAlign: function(){ 
            return this.$store.getters.changeAlign 
        }
    },
    watch: {
        bottom: function(bottom){
            console.log("bottom 값"  + bottom);
            if(bottom) {
                pageNumber++;
                adPageNumber++;
                this.addList(pageNumber);
                this.addAdList(adPageNumber);
            }
        },
        changeAlign: function(){
            console.log("정렬이 변경됨.");
            const baseURL1 = 'https://comento.cafe24.com/request.php?page=1&ord='+ this.$store.state.selected;
            this.$http.get(baseURL1)  // MAIN_LIST정보 불러오기 category는 1,2,3까지
                //then -> 데이터 요청이 성공했을 떄 실행할 로직.(성공케이스)
                .then((response) => {
                    this.comento_list = response.data.list;
                    console.log('호출후 this-comento_list',this.comento_list);
                })
                //catch -> 데이터 요청이 실패했을 떄 실행할 로직(에러케이스)
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created: function(){
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible();
        });
        console.log('호출 전 this',this);
        this.fetch_list();
        this.fetch_category();
        this.fetch_ad_list();
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
