<template>
  <div class="container">
   <div class="card text-left" ><!-- {{index}} -->
        <div class="card-header">
            <div id="Categorybar">
                            <!--카데고리명 name, 카테코리번호 category_no랑 매칭 -->
                <span class="card-title">
                    테스트 주석처리
                    <!-- {{comento_category[value_modal-1].name}} -->
                </span> 
                <span class="card-title" align="right">
                    테스트 주석처리
                    <!-- {{comento_list.no}} -->
                </span> <!--글번호 no-->
            </div>
        </div>
        <div class="card-body" style="text-overflow: ellipsis;"><!----><!---->
            <span class="card-link">
                테스트 주석처리
                <!-- {{comento_list.email}} -->
            </span> <!--이메일 email-->
            <span class="card-link">
                테스트 주석처리
                <!-- {{comento_list.updated_at}} -->
            </span> <!--작성일 updated_at-->
            <br>
            <br>
            <h6 class="card-subtitle text-muted mb-2">
                테스트 주석처리
                <!-- {{comento_list.title}} -->
            </h6> <!--제목 title-->
                <p class="card-text target">
                    <!--내용 contents-->
                    테스트 주석처리
                    <!-- {{comento_list.contents}}  -->
                </p>
        </div>        
    </div>
    <b-modal
      v-model="show"
      title="회원가입"
      style="text-align:center;"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
      hide-header
    >
      <b-container fluid>
        <b-card-text style="font-size:200%" >
          회원가입
        </b-card-text>
        <div style="border: 1px solid black; padding: 20px;">
              <b-card-text>
                지금 가입하면 꿈 꾸던 기업에 재직 중인 현직자와 <span style="color:red; font-weight: bold;">익명</span>으로 대화 할 수 있습니다.
              </b-card-text>
        </div>
        <br>
        <div>
            <b-button style="margin-bottom: 10px; background-color:#3b5988;" block variant="primary">페이스북으로 회원가입</b-button>
        </div>
        <div style="color:red;">
            <b-button style="margin-bottom: 10px; background-color:#ea4335;" block>구글로 회원가입</b-button>
        </div>
        <div>
            <b-button style="margin-bottom: 10px; background-color:#00bd39;" block variant="primary">네이버로 회원가입</b-button>
        </div>
      </b-container>

      <div slot="modal-footer" class="w-100" style="text-align:center;"> 
          <b-button size="sm" variant="light" @click="doDisplay()">나중에 하기</b-button>
      </div>
    </b-modal>

    <div id="footer">
          <p>지금 가입하면 꿈 꾸던 기업에 재직 중인 현직자와 <span style="color:red; font-weight: bold;">익명</span>으로 대화 할 수 있습니다.</p>
          <b-row>
              <b-col>  <b-button variant="success">SNS계정으로 빠른 회원가입</b-button> </b-col>
              <b-col cols="1"> 또는 </b-col>
              <b-col>  <b-button variant="light">로그안</b-button> </b-col>
          </b-row>
    </div>

  </div>
</template>

<script>
export default {
 name: 'detail',
  data() {
      return {
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'light',
        headerTextVariant: 'dark',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'light',
        footerTextVariant: 'dark'
      }
    },
  created() {
      this.show = true;
  },
  methods: {
      doDisplay(){
        var con = document.getElementById("footer");
        if(con.style.display=='none'){
            con.style.display = 'block';
            this.show = false;
        }else{
            con.style.display = 'none';
        }
      }
  }
}
</script>

<style scoped>
#footer {
    border: 1px solid black ;
    display: none;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 15%;
    padding: 15px 0;
    text-align: center;
    color: rgb(0, 0, 0);
    background: rgb(255, 255, 255);
}
</style>
