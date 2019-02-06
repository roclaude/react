import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../../components/elements/Button'

import Table from '../../../components/table/Table'

class AddNewEvaluator extends Component {

    constructor(props) {
        super(props)

        this.addEvaluatorAction = this.addEvaluatorAction.bind(this)
    }

    addEvaluatorAction() {
        console.log('Add');
    }

    render() {

        const tableColumnTitles = [
            {name: "Reviewer Name"},
        ]

        const inputFieldsOrder = [
            'name',
        ]

        const data = [{
            id: "aaa",
            name: "lorem",
            email: "email"
        },{
            id: "bbb",
            name: "ipsum",
            email: 'email2'
        }]

        data.map(obj => {
            obj.button=<Button text="Add" className="add-btn" id={obj.id} onClick={this.addEvaluatorAction} /> 
            delete obj.id
        })

        return (
            <div className="add-new-wrap">
                <Button text="Add new" className="add-new-button" />
                <Table 
                    data={data}/>
            </div>
        )
    }
}

export default AddNewEvaluator