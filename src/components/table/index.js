import React, { Component } from 'react'

import './table.scss'

class Table extends Component {

    render() {

        const { children, ...rest } = this.props

        return (
            <table {...rest}>
                <tbody>
                    {children}
                </tbody>
            </table>
        )
    }
}


class Row extends Component {

    render() {

        const { values, ...rest } = this.props

        if (!Array.isArray(values)) {
            return false
            console.log('(Table Row) Error: This is not an array!')
        }

        return (
            <tr {...rest}>
                { values.map( (item, index) => <td key={index}>{item}</td> ) }
            </tr>
        )
    }
}


export default Table
export { Row }


