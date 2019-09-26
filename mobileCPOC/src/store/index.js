/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import modules from './modules'

//import feathersVuex from 'feathers-vuex'
//import feathersClient from '../plugins/feathers-client'
//const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'Id' })

 Vue.use(Vuex)
 //Vue.use(FeathersVuex)

// Create a new store
const store = new Vuex.Store({
    modules
    //,
    // plugins:[
    //     auth({ userService: 'user',entityIdField:'Id' }),
    //     service('role',{modelName:'Role',idField: 'Id'}),
    //     service('user',{modelName:'User',idField: 'Id'}), 
    //     service('company',{modelName:'Company',idField:'Id'}),
    //     service('flight',{modelName:'Flight',idField:'Id'}),
    //     service('leg',{modelName:'Leg',idField:'Id'}),
    //     service('alcoholtest',{modelName:'Alcoholtest',idField:'Id'}),
    //     service('baggage',{modelName:'Baggage',idField:'Id'}),
    //     service('cargo',{modelName:'Cargo',idField:'Id'}),
    //     service('blob'),
       
        
    //     //SelectCalendar
    //     service('flightselect',{modelName:'Flightselect'}), 
    //     service('bookingselect',{idField:'Id'}),
    //     service('transportselect',{idField:'Id'}),

    //     //new by big
    //     service('terminal',{idField:'Id'}),
    //     service('flightstatus',{idField:'Id'}),
    //     service('alcoholstatus',{idField:'Id'}),
    //     service('aircrafts',{idField:'Id'}),
    //     service('airports',{idField:'Id'}),
    //     service('request',{idField:'Id'}),
    //     service('requestuser',{idField:'Id'}),
    //     service('requeststatus',{idField:'Id'}),
    //     service('owner',{idField:'Id'}), 
    //     service('passenger',{modelName:'Passenger',idField:'Id'}),
    //     service('pilot',{idField:'Id'}), 
    //     service('booking',{idField:'Id'}), 
    //     service('bookingleg',{idField:'Id'}),
    //     service('bookingpassenger',{idField:'Id'}),
    //     service('bookingstatus',{idField:'Id'}),
    //     service('transportlocaltion',{idField:'Id'}), 
    //     service('transportdriver',{idField:'Id'}),
    //     service('bookingpassengertype',{idField:'Id'}),
    //     service('bookingtype',{idField:'Id'}),
    //     service('transport',{idField:'Id'}), 
    //     service('transportjob',{idField:'Id'}), 
    //     service('expiredmedical',{idField:'Id'}), 

    //      //Command Service
    //     service('passengercommand',{idField:'Id'}),
    //     service('briefcheckincommand',{idField:'Id'}),
    //     service('briefcheckintvcommand',{idField:'Id'}),
    //     service('emailcommand',{idField:'Id'}),
    //     service('flightcommand',{idField:'Id'}), 
    //     service('transportcommand',{idField:'Id'}), 
    //     service('nogocommand',{idField:'Id'}), 
    //     service('userofcompany',{idField:'Id'}), 
    //     service('delayreportcommand',{idField:'Id'}), 
    //     service('passengerhistorycommand',{idField:'Id'}), 
    //     service('monthlyhistorycommand',{idField:'Id'}), 
    //     service('historyservice',{idField:'Id'}), 
    // ] 
})

export default store
