import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

import AssessmentTable from './AssessmentTable'
import AddNewEvaluator from './AddNewEvaluator'
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
            sortedColumn: 'Reviewer Name',
            isLoading: false,
            orderASC: true,
            defaultValueObj: null,
            open: false,
        }

        this.orderByNameHandler     = this.orderByNameHandler.bind(this)
        this.orderByEmailHandler    = this.orderByEmailHandler.bind(this)
        this.orderByPositionHandler = this.orderByPositionHandler.bind(this)

        this.deleteAction           = this.deleteAction.bind(this)
        this.editAction             = this.editAction.bind(this)
        this.cancelEditAction       = this.cancelEditAction.bind(this)
        this.saveAction             = this.saveAction.bind(this)
        this.changeValueAction      = this.changeValueAction.bind(this)
        this.addNewEvaluatorAction  = this.addNewEvaluatorAction.bind(this)
    }

    componentWillMount() {
        this.setState({isLoading: true})

        const id            = this.state.id
        const assessmentDoc = this.assessmentRef.doc(id)

        assessmentDoc.get().then(doc => {
            let docData = doc.data()
            this.setState({evaluatorIds: docData.evaluatorsId})
        }).then(() => {
            this.orderColumn('name', this.state.sortedColumn);


//            this.evaluatorRef.get().then(doc => {
//                let docData = doc.data()
//                this.setState({evaluatorIds: docData})
//           })


        })
    }

    /**
     * Order by name column
     * 
     * @param {Object} event 
     */
    orderByNameHandler(event) {
        const textTitle = event.target.innerHTML

        this.orderColumn('name', textTitle)
    }

    /**
     * Order by Email column
     * 
     * @param {Object} event 
     */
    orderByEmailHandler(event) {
        const textTitle = event.target.innerHTML 

        this.orderColumn('email', textTitle)
    }

    /**
     * Order by Position column
     * 
     * @param {Object} event 
     */
    orderByPositionHandler(event) {
        const textTitle = event.target.innerHTML

        this.orderColumn('position', textTitle)
    }

    /**
     * Order by Column
     * 
     * @param {String} columnName   Column name
     * @param {String} textTitle    Title of column
     */
    orderColumn(columnName, textTitle) {
        this.setState({isLoading: true})

        this.evaluatorRef.orderBy(columnName, this.state.orderASC ? 'asc' : 'desc').get().then(querySnapshot => {
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
                sortedColumn: textTitle
            })
            this.setState({isLoading: false})
        })

        // if it is the same column then change order
        if (textTitle===this.state.sortedColumn) {
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
            console.log('saveAction | new state: ', this.state.data)
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

            console.log('ici: ', this.state.evaluatorIds);
        });

        // update state
        this.setState({
            data: this.state.data.filter(item => item.id !== evaluatorId)
        }, () => {
            console.log('deleteAction: ', this.state.data);
        })
    }

    addNewEvaluatorAction() {
        return true;
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        
        const tableColumnTitles = [
            {name: "Reviewer Name", orderFunc: this.orderByNameHandler},
            {name: "Reviewer Email", orderFunc: this.orderByEmailHandler},
            {name: "Reviewer Position", orderFunc: this.orderByPositionHandler},
            {name: "Company Review", orderFunc: null},
            {name: "Status", orderFunc: null},
            {name: "Action", orderFunc: null}
        ]

        const inputFieldsOrder = [
            'name',
            'email',
            'position',
            'company',
            'status'
        ]

        const { data, isLoading, open } = this.state

        console.log('render: ', this.state)
//        console.log('render: ', data )    

        return (
            <AdminPage 
                pageType="evaluation" 
                pageTitle="Evaluation / Reviewers">
        
                <Button text="Add new evaluator" onClick={this.onOpenModal} className="open-modal-btn" />
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>Simple centered modal</h2>
                </Modal>

                <AssessmentTable 
                    data={data}
                    editAction={this.editAction} 
                    deleteAction={this.deleteAction} 
                    saveAction={this.saveAction}
                    changeValueAction={this.changeValueAction}
                    cancelEditAction={this.cancelEditAction}
                    columnTitles={tableColumnTitles} 
                    sortedColumn={this.state.sortedColumn}
                    inputFieldsOrder={inputFieldsOrder}
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