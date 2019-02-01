import React, { Component } from 'react'

//import PageTitle from '../../../components/pageTitle'
import AssessmentTable from './AssessmentTable'

//import Button from '../../../components/elements'

//import './assessment.scss'

import axios from 'axios'

import AdminPage from '../'

/*
const mongoose = require('mongoose')
mongoose.connect('mongodb://claudiu.buruiana:qTest123@ds143971.mlab.com:43971/qtestdb')

var Assess = mongoose.model('Assess', { 
    name: String,
    expire: String,
    evaluatorsId: Array
 })
 */

/*
const mongoose = require('mongoose');
mongoose.connect('mongodb://claudiu.buruiana:qTest123@ds143971.mlab.com:43971/qtestdb', {useNewUrlParser: true});

var Assess = mongoose.model('Assess', { 
    name: String,
    expire: String,
    evaluatorsId: Array
 })
*/



class Assessment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            data: [{
                id: 98,
                name: 'Raluca Galos',
                email: 'raluca.galos@qualitance.com', 
                position: 'Chief Growth Officer', 
                company: 'QUALITANCE', 
                status: 'Finished'
            },{
                id: 765,
                name: 'Corina Zorzor',
                email: 'corina.zorzor@qualitance.com', 
                position: 'Copywriter', 
                company: 'QUALITANCE', 
                status: 'Finished'
            },{
                id: 432,
                name: 'Emilia Bratu',
                email: 'emilia.bratu@qualitance.com', 
                position: null, 
                company: 'QUALITANCE', 
                status: 'Finished'
            }],
            sortedColumn: 'Reviewer Name',
            isLoading: false,
        }

        this.orderByNameHandler     = this.orderByNameHandler.bind(this)
        this.orderByEmailHandler    = this.orderByEmailHandler.bind(this)
        this.orderByPositionHandler = this.orderByPositionHandler.bind(this)

        this.deleteAction = this.deleteAction.bind(this)
        this.editAction = this.editAction.bind(this)
        this.saveAction = this.saveAction.bind(this)
    }

    componentDidMount() {
        
        axios.get('http://localhost:5000/assessment')
        .then(function (response) {
            console.log('response', response);
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    orderByNameHandler(event) {
        const data = [{
            id: 98,
            name: 'Raluca Galos',
            email: 'raluca.galos@qualitance.com', 
            position: 'Chief Growth Officer', 
            company: 'QUALITANCE', 
            status: 'Finished'
        },{
            id: 765,
            name: 'Corina Zorzor',
            email: 'corina.zorzor@qualitance.com', 
            position: 'Copywriter', 
            company: 'QUALITANCE', 
            status: 'Finished'
        },{
            id: 432,
            name: 'Emilia Bratu',
            email: 'emilia.bratu@qualitance.com', 
            position: null, 
            company: 'QUALITANCE', 
            status: 'Finished'
        }]

        console.log('orderByNameHandler', data);

        console.log(event.target.innerHTML)

        const textTitle = event.target.innerHTML 
        //textTitle = event.target.innerHTML
        this.setState({'isLoading': true})
//        setTimeout(() => {
            this.setState({
                data: data,
                sortedColumn: textTitle
            })
            this.setState({'isLoading': false})
//        }, 2000 )
    }

    orderByEmailHandler(event) {
        const data = [{
            id: 765,
            name: 'Corina Zorzor',
            email: 'corina.zorzor@qualitance.com', 
            position: 'Copywriter', 
            company: 'QUALITANCE', 
            status: 'Finished'
        },{
            id: 432,
            name: 'Emilia Bratu',
            email: 'emilia.bratu@qualitance.com', 
            position: null, 
            company: 'QUALITANCE', 
            status: 'Finished'
        },{
            id: 98,
            name: 'Raluca Galos',
            email: 'raluca.galos@qualitance.com', 
            position: 'Chief Growth Officer', 
            company: 'QUALITANCE', 
            status: 'Finished'
        }]

        console.log(event.target.innerHTML);

        const textTitle = event.target.innerHTML;
//        this.setState({'isLoading': true})
//        setTimeout(() => {
            this.setState({
                data: data,
                sortedColumn: textTitle
            })
//            this.setState({'isLoading': false})
//        }, 2000 )
    }

    orderByPositionHandler(event) {
        const data = [{
            id: 432,
            name: 'Emilia Bratu',
            email: 'emilia.bratu@qualitance.com', 
            position: null, 
            company: 'QUALITANCE', 
            status: 'Finished'
        },{
            id: 765,
            name: 'Corina Zorzor',
            email: 'corina.zorzor@qualitance.com', 
            position: 'Copywriter', 
            company: 'QUALITANCE', 
            status: 'Finished'
        },{
            id: 98,
            name: 'Raluca Galos',
            email: 'raluca.galos@qualitance.com', 
            position: 'Chief Growth Officer', 
            company: 'QUALITANCE', 
            status: 'Finished'
        }]

        console.log(event.target.innerHTML);

        const textTitle = event.target.innerHTML;
        this.setState({'isLoading': true})
//        setTimeout(() => {
            this.setState({
                data: data,
                sortedColumn: textTitle
            })
            this.setState({'isLoading': false})
//        }, 2000 )
    }

    editAction(aaa) {
        console.log('edit');
    }

    saveAction(evaluationObj) {

        const id = evaluationObj.id

        this.setState({'data': 
            this.state.data.map((item, index) => 
                item.id === id ? evaluationObj : item
            )
        }, () => {
            console.log(this.state.data)
        })
    }

    deleteAction(id) {
        console.log('deleteAction: ', id)
        this.setState({
            'data': this.state.data.filter(item => item.id !== id)
        }, () => {
            console.log('deleteAction: ', this.state.data);            
        })

//        setTimeout(() => {
//            console.log(this.state.data);
//        }, 2000)
    }


    async getMoviesFromApi() {
        try {
          let response = await fetch('http://localhost:5000/assessment', { mode: 'no-cors' });
          let responseJson = await response.json();

          console.log(responseJson)
          
          return responseJson;
         
        } catch(error) {
          console.error(error);
        }
      }

    render() {

        this.getMoviesFromApi()
        
        const tableColumnTitles = [
            {name: "Reviewer Name", orderFunc: this.orderByNameHandler},
            {name: "Reviewer Email", orderFunc: this.orderByEmailHandler},
            {name: "Reviewer Position", orderFunc: this.orderByPositionHandler},
            {name: "Company Review", orderFunc: null},
            {name: "Status", orderFunc: null},
            {name: "Action", orderFunc: null}
        ]

        const { data, isLoading } = this.state

console.log('render: ', data )

        return (
            <AdminPage 
                pageType="evaluation" 
                pageTitle="Evaluation / Reviewers">
                <AssessmentTable 
                    data={data}
                    editAction={this.editAction} 
                    deleteAction={this.deleteAction} 
                    saveAction={this.saveAction}
                    columnTitles={tableColumnTitles} 
                    sortedColumn={this.state.sortedColumn}
                    className={`assessment-table${isLoading ? ' loading' : ''}`} />
           </AdminPage>
        )
    }
}

export default Assessment
