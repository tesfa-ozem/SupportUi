<template>
  <v-container grid-list-xl fluid>
      <v-layout row wrap>
          <v-flex lg12 sm12 xs12>
                <div>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>My CRUD</v-toolbar-title>
                        <v-divider
                          class="mx-2"
                          inset
                          vertical
                        ></v-divider>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            
                        ></v-text-field>
                        <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                            <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                                <v-card>
                                    <v-card-title>
                                      <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container grid-list-md>
                                        <v-layout wrap>
                                          <v-flex xs12 sm6 md4>
                                            <v-text-field v-model="editedItem.accountNo" label="Id Number"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12 sm6 md4>
                                            <v-text-field v-model="editedItem.documentNo" label="Transaction Code"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12 sm6 md4>
                                            <v-text-field v-model="editedItem.paymentName" label="Payment Name"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12 sm6 md4>
                                            <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12 sm6 md4>
                                                <v-menu
                                                  ref="menu1"
                                                  :close-on-content-click="false"
                                                  v-model="menu1"
                                                  :nudge-right="40"
                                                  lazy
                                                  transition="scale-transition"
                                                  offset-y
                                                  full-width
                                                  max-width="290px"
                                                  min-width="290px"
                                                >
                                                  <v-text-field
                                                    slot="activator"
                                                    v-model="computedDateFormatted"
                                                    label="Date"
                                                    hint="MM/DD/YYYY format"
                                                    persistent-hint
                                                    prepend-icon="event"
                                                   readonly
                                                  ></v-text-field>
                                                  <v-date-picker v-model="editedItem.paymentDate" no-title @input="menu1 = false"></v-date-picker>
                                                </v-menu>
                                          </v-flex>
                                          <v-flex xs12 sm6 md4>
                                            <v-text-field v-model="editedItem.phoneNo" label="Phone"></v-text-field>
                                          </v-flex>
                                        </v-layout>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                                      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                    </v-toolbar>
                    <template></template>
                    <v-data-table
                      :headers="headers"
                      :items="Payments"
                      class="elevation-1"
                      hide-actions
                      :pagination.sync="pagination"
                    >
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.accountNo}}</td>
                          <td class="text-xs-center">{{ props.item.documentNo }}</td>
                          <td class="text-xs-center">{{ props.item.amount }}</td>
                          <td class="text-xs-center">{{ props.item.paymentName }}</td>
                          <td class="text-xs-center">{{ props.item.phoneNo}}</td>
                          <td class="text-xs-center">{{ props.item.description}}</td>
                          <td class="text-xs-center">{{ props.item.transactionDate}}</td>
                          <td class="justify-center layout px-0">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItem(props.item)"
                            >
                              edit
                            </v-icon>
                            
                          </td>
                        </template>
                        <template slot="no-data">
                          <v-btn color="primary" @click="initialize">Reset</v-btn>
                        </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                        <v-pagination
                            v-model="pagination.page"
                            :length="pages"
                        ></v-pagination>
                    </div>
                </div>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: vm => ({
    dialog: false,
    headers: [
      {
        text: "Id Number",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Transaction Code", value: "calories" },
      { text: "Amount", value: "fat" },
      { text: "Name", value: "carbs" },
      { text: "Phone", value: "carbs" },
      { text: "Description", value: "protein" },
      { text: "Transaction Date", value: "name", sortable: false },
      { text: "Edit", value: "name", sortable: false }
    ],
    Payments: [],
    editedIndex: -1,
    editedItem: {
      id:0,
      accountNo: "",
      documentNo:"",
      amount: "",
      paymentName: "",
      phoneNo:"",
      description: "",
      paymentDate :new Date().toISOString().substr(0, 10),
      
    },
    defaultItem: {
      id:0,
      accountNo: "",
      documentNo:"",
      amount: "",
      paymentName: "",
      phoneNo:"",
      description: "",
      paymentDate :new Date().toISOString().substr(0, 10),
      
    },
    search: '',
    pagination: {page:0},
    date: new Date().toISOString().substr(0, 10),
    
    menu1: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    computedDateFormatted () {
        return this.formatDate(this.editedItem.paymentDate)
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    search(e)
    {
      
       this.GetAllPayments(e) 
    },
    
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
       this.GetAllPayments();
    },
    GetAllPayments(s=""){
        const app = this
        if (this.search=="") {
        
       
      }
        
        const args = 
        {
            
            url: '/GetPaymentsAsync',
            method: 'post', 
            baseURL: 'http://40.114.117.175/Support/api/Value',
            
            data:{
                sortOrder: "string",
                currentFilter: "string",
                searchString: s,
                page: app.pagination.page
                }
        };
        axios(args)
        .then(function(response){
          app.Payments = response.data.listOfPayments
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },
    
    editItem(item) {
      this.editedIndex = this.Payments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      
    },

    
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
        console.log(this.editedItem.transactionDate)
      if (this.editedIndex > -1) {
        Object.assign(this.Payments[this.editedIndex], this.editedItem);
        const args = 
        {
            url: '/EditPayments',
            method: 'post', 
            baseURL: 'http://40.114.117.175/Support/api/Value',
            data: this.editedItem,
        };
      axios(args)
        .then(function(response){
          this.GetAllPayments();
        })
        .catch(function(error){
            
        })
      } else {
        this.Payments.push(this.editedItem);
        const args = 
        {
            url: '/AddPayment',
            method: 'post', 
            baseURL: 'https://localhost:5001/api/Value',
            data: this.editedItem,
        };
      axios(args)
        .then(function(response){
          this.GetAllPayments();
        })
        .catch(function(error){
            
        })
      }
      this.close();
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
  }
};
</script>