<template>
    <div id="pageDashboard">
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg8 sm12 xs12>
                <v-widget title="Site Traffic" content-bg="white">
                    <v-btn icon slot="widget-header-action">
                    <v-icon class="text--secondary">refresh</v-icon>
                    </v-btn>
                    <div slot="widget-content">
                   </div>
                </v-widget>  
            </v-flex>
        </v-layout>
    </v-container>
    </div>    
</template>

<script>
/* eslint-disable */
import EChart from '@/components/chart/echart';
import Material from 'vuetify/es5/util/colors';
import VWidget from '@/components/VWidget';
import API from '@/api/chart.js'
export default {
    components:{
        VWidget,
        EChart,
        API
    },
    data:()=>({
        color: Material,
    }),
    computed: {
        siteTrafficData () {
      return API.monthVisitData;
    }
    }
}
</script>

<style>

</style>

