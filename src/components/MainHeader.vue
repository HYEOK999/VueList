<template>
    <header>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
            <MainModal></MainModal>
                <div align="right">
                    <b-form-group style="margin-bottom:0px">
                        <b-form-radio-group
                            id="btnradios"
                            buttons
                            v-on:input="selectAlign"
                            v-model="selected"
                            :options="options"
                            name="radiosBtn"
                        />
                    </b-form-group>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import MainModal from './MainModal.vue'

export default {
    data() {
      return {
        value_modal: 'null',
        selected: 'asc',
        options: [
          { text: '오름차순', value: 'asc' },
          { text: '내림차순', value: 'desc' },
        ],
      }
    },
    components: {
        'MainModal' : MainModal,
    },
     methods: {
        selectAlign(){
            var selected = this.selected;
            console.log(selected);
            this.$store.commit('selectAlign',selected);
        },
    }
}
</script>

<style scoped>
</style>
