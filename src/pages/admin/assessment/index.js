import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

import AssessmentTable from './AssessmentTable'
//import AddNewEvaluator from './AddNewEvaluator'
import Button from '../../../components/elements/Button'

import AdminPage from '../'

import firestoreDB from '../../../components/firestore'


import './assessment.scss'


class Assessment extends Component {

    constructor(props) {
        super(props)

        this.assessmentRef  = firestoreDB.collection('assessment')
        this.evaluatorRef   = firestoreDB.collection('evaluator')

        this.state = {
            id: props.match.params.id,
            data: [],
            evaluatorIds: [],
            evaluatorToAdd: [],
            sortedColumnType: 'name',
            isLoading: false,
            orderASC: true,
            defaultValueObj: null,
            open: false,
        }

//        this.orderByNameHandler     = this.orderByNameHandler.bind(this)
//        this.orderByEmailHandler    = this.orderByEmailHandler.bind(this)
//        this.orderByPositionHandler = this.orderByPositionHandler.bind(this)

        this.deleteAction           = this.deleteAction.bind(this)
        this.editAction             = this.editAction.bind(this)
        this.cancelEditAction       = this.cancelEditAction.bind(this)
        this.saveAction             = this.saveAction.bind(this)
        this.changeValueAction      = this.changeValueAction.bind(this)
        this.addEvaluatorAction     = this.addEvaluatorAction.bind(this)
        this.sortColumn             = this.sortColumn.bind(this)
    }

    componentWillMount() {
        this.setState({isLoading: true})

        const id            = this.state.id
        const assessmentDoc = this.assessmentRef.doc(id)
        
        const evaluatorIds  = this.state.evaluatorIds

        assessmentDoc.get().then(doc => {
            let docData = doc.data()
            this.setState({evaluatorIds: docData.evaluatorsId})
            return docData.evaluatorsId
        }).then((evaluatorIds) => {
            this.orderColumn('name', this.state.sortedColumnType);

            

            // evaluators to add
            this.evaluatorRef.get().then(querySnapshot => {
                let allEvaluators = []
                querySnapshot.forEach((doc) => {
                    let docData = doc.data()
                    docData.id = doc.id
                    allEvaluators.push(docData)
                })
                return allEvaluators
            }).then((allEvaluators) => {
                const evaluatorToAdd = allEvaluators.filter(item => !evaluatorIds.includes(item.id) )
                this.setState({evaluatorToAdd: evaluatorToAdd})
            })



        })
    }

    /**
     * Order by name column
     * 
     * @param {Object} event 
     */
//    orderByNameHandler(event) {
//        const textTitle = event.target.innerHTML
//        this.orderColumn('name', textTitle)
//    }

    /**
     * Order by Email column
     * 
     * @param {Object} event 
     */
//    orderByEmailHandler(event) {
//        const textTitle = event.target.innerHTML 
//        this.orderColumn('email', textTitle)
//    }

    /**
     * Order by Position column
     * 
     * @param {Object} event 
     */
//    orderByPositionHandler(event) {
//        const textTitle = event.target.innerHTML
//        this.orderColumn('position', textTitle)
//    }

    /**
     * Sort table by column
     * 
     * @param {string} colType 
     */
    sortColumn(colType) {
        this.orderColumn(colType)
    }

    /**
     * Order by Column
     * 
     * @param {String} columnName   Column name
     * @param {String} textTitle    Title of column
     */
    orderColumn(colType) {
        this.setState({isLoading: true})

        this.evaluatorRef.orderBy(colType, this.state.orderASC ? 'asc' : 'desc').get().then(querySnapshot => {
            let evaluators = []
            querySnapshot.forEach(function(doc) {
                let data = doc.data()
                data.id = doc.id
                evaluators.push(data)
            })
            return evaluators
        }).then((evaluators) => {
            this.setState({
                data: evaluators.filter(evaluator => 
                    this.state.evaluatorIds.includes(evaluator.id)
                ),
                sortedColumnType: colType
            })
            this.setState({isLoading: false})
        })

        // if it is the same column then change order
        if (colType===this.state.sortedColumnType) {
            this.setState({orderASC: !this.state.orderASC})
        } else {
            this.setState({orderASC: true})
        }
    }

    /**
     * On change value
     * 
     * @param {string} id 
     * @param {array} input 
     */
    changeValueAction(id, input) {

        this.setState({
            data: this.state.data.map((elem) => {
                if (elem.id===id) {
                    return {
                        id: id,
                        name: input.name.value,
                        email: input.email.value,
                        position: input.position.value,
                        company: input.company.value
                    }
                } else {
                    return elem
                }
            })
        })
    }

    /**
     * Edit row action
     * 
     * @param {string} id 
     */
    editAction(id) {
        const obj = this.state.data.filter(item => item.id===id)

        this.setState({defaultValueObj: obj[0]})
    }

    /**
     * Cancel edit action
     * 
     * @param {string} id 
     */
    cancelEditAction(id) {
        const obj = this.state.data.map(item => item.id===id ? this.state.defaultValueObj : item)

        this.setState({data: obj})
    }

    /**
     *  Save new data to database
     * 
     * @param {string}  id
     * @param {array}   rowFieldsArray
     */
    saveAction(id, rowFieldsArray) {

        // object with new data
        let obj = {
            id: id,
            name: rowFieldsArray.name.value,
            email: rowFieldsArray.email.value, 
            position: rowFieldsArray.position.value, 
            company: rowFieldsArray.company.value
        }

        // save data to firebase
        const evaluatorDoc  = firestoreDB.collection('evaluator').doc(id)
        evaluatorDoc.set(obj)
 
        // update state with new object
        this.setState({'data': 
            this.state.data.map((item, index) => 
                item.id === id ? obj : item
            )
        }, () => {
//            console.log('saveAction | new state: ', this.state.data)
        })
    }

    /**
     * Remove evaluator
     * 
     * @param {string} evaluatorId 
     */
    deleteAction(evaluatorId) {
        const assessmentId  = this.state.id;
        const asseementDoc  = firestoreDB.collection('assessment').doc(assessmentId)

        // remove evaluator from current assessment
        asseementDoc.get().then((item) => {
            const assessment = item.data()
            assessment.evaluatorsId = assessment.evaluatorsId.filter(item => item!==evaluatorId)
            return assessment
        }).then((assessment) => {
            asseementDoc.set(assessment)
            this.setState({evaluatorIds: assessment.evaluatorsId})

//            console.log('ici: ', this.state.evaluatorIds);
            return assessment.evaluatorsId
        }).then((evaluatorIds) => {


                        // evaluators to add
                        this.evaluatorRef.get().then(querySnapshot => {
                            let allEvaluators = []
                            querySnapshot.forEach((doc) => {
                                let docData = doc.data()
                                docData.id = doc.id
                                allEvaluators.push(docData)
                            })
                            return allEvaluators
                        }).then((allEvaluators) => {
                            const evaluatorToAdd = allEvaluators.filter(item => !evaluatorIds.includes(item.id) )
                            this.setState({evaluatorToAdd: evaluatorToAdd})
                        })

        })

        // update state
        this.setState({
            data: this.state.data.filter(item => item.id !== evaluatorId)
        }, () => {
//            console.log('deleteAction: ', this.state.data);
        })
    }

    addEvaluatorAction(id) {
//        console.log('id++', id)

        const { 
            evaluatorToAdd,
            evaluatorIds

        } = this.state

        evaluatorIds[evaluatorIds.length] = id
        
        this.setState({
            evaluatorIds: evaluatorIds,
            evaluatorToAdd: evaluatorToAdd.filter(item => item.id!==id)
        })

        this.orderColumn('name')

        const assessmentDoc = this.assessmentRef.doc(this.state.id)

        assessmentDoc.get().then(doc => {
            let docData = doc.data()
            docData.evaluatorsId.push(id)
            return docData
        }).then(docData => {
            assessmentDoc.set(docData)
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        
        const tableColumn = [
            {
                type: 'name', 
                title: 'Reviewer Name',
                sortCol: true,
            },{
                type: 'email',
                title: 'Reviewer Email', 
                sortCol: true,
            },{
                type: 'position',
                title: 'Reviewer Position', 
                sortCol: true,
            },{
                type: 'company',
                title: 'Company Review', 
                sortCol: true,
            },{
                type: 'status',
                title: 'Status', 
                sortCol: false,
            },{
                type: 'action',
                title: 'Action', 
                sortCol: false,
            }
        ]

        const newEvaluatortableColumn = [{
                type: 'name',
                title: 'Name',
                sortCol: false
            },{
                type: 'email',
                title: 'Email',
                sortCol: false,
            }, {
                type: 'action',
                title: 'Action',
                sortCol: false,
            }]

        const { 
            data, 
            isLoading, 
            open, 
            evaluatorToAdd, 
            sortedColumnType,
        } = this.state

//        console.log('render: ', this.state)
//        console.log('render: ', data )    

        return (
            <AdminPage 
                pageType="evaluation" 
                pageTitle="Evaluation / Reviewers">
        
                <Button text="Add new evaluator" onClick={this.onOpenModal} className="open-modal-btn" />
                <Modal open={open} onClose={this.onCloseModal} center>
                    <AssessmentTable 
                        data={evaluatorToAdd}
                        addEvaluatorAction={this.addEvaluatorAction} 
                        tableColumn={newEvaluatortableColumn}
                        className="assessment-table" />
                </Modal>

                <AssessmentTable 
                    data={data}
                    editAction={this.editAction} 
                    deleteAction={this.deleteAction} 
                    saveAction={this.saveAction}
                    changeValueAction={this.changeValueAction}
                    cancelEditAction={this.cancelEditAction}
                    tableColumn={tableColumn} 
                    sortColumn={this.sortColumn}
                    sortedColumnType={sortedColumnType}
                    className={`assessment-table${isLoading ? ' loading' : ''}`} />
           </AdminPage>
        )
    }
}

export default Assessment

/*
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
*/

/*
data={evaluatorData}

                <AddNewEvaluator 
                    addNewEvaluatorAction={this.addNewEvaluatorAction} />


data: [{
    id: 98,
    name: 'Raluca Galos',
    email: 'raluca.galos@qualitance.com', 
    position: 'Chief Growth Officer', 
    company: 'QUALITANCE', 
    status: 'Finished'
}]
*/