<template>
  <div style="margin: 0px; padding:0px">
    <button @click="show=true" variant="primary" type="button" class="btn btn-sm btn-info">필터</button>
    <b-modal v-model="show" title="필터">
            <b-container fluid>
                <b-row class="mb-1">
                  <div>
                      <b-form-radio-group v-model="value_modal" :options="options_modal" :state="state" name="radioValidation">
                      <b-form-invalid-feedback :state="state">하나를 선택해주세요.</b-form-invalid-feedback>
                      <b-form-valid-feedback :state="state">감사합니다.</b-form-valid-feedback>
                      </b-form-radio-group>
                  </div>
                </b-row>
            </b-container>

            <div slot="modal-footer" class="w-100">
                <b-button v-on:click="selectModalCategory" size="sm" class="float-right" variant="primary" @click="show=false">저장</b-button>
            </div>
    </b-modal>
  </div>
</template>

<script>
export default {
    data() {
        return {
        show: false,
        modalShow: false,
        value_modal: null,
        options_modal: [
            { text: '카테고리1', value: '1' },
            { text: '카테고리2', value: '2' },
            { text: '카테고리3', value: '3' }
        ]
        } 
    },
    computed: {
      state() {
        return Boolean(this.value_modal)
      }
    },
    methods:{
      selectModalCategory(){
        var value_modal = this.value_modal;
        console.log(value_modal);
        this.$store.commit('selectModalCategory',value_modal);
      }
    }
}
</script>

<style>

</style>
