import firestoreDB from '../components/firestore'


const assessmentRef = firestoreDB.collection('assessment')
const evaluatorRef  = firestoreDB.collection('evaluator')

/**
 * @description Get aseessment 
 * @param   id  Assessent id
 */
export const getAssessment = (id) => {
    const assessmentDoc = assessmentRef.doc(id)

    return new Promise((resolve, reject) => {
        assessmentRef.get().then(doc => {
            const docData = doc.data()
            resolve(docData.evaluatorsId)
        })
    })
}


/**
 * @description Get all aseessments
 */
export const getAssessments = () => {
}


/**
 * @description 
 * @param   id  
 */
export const getLorem = (id=null) => {
    return ["bbb"]
}










/*
const fakeDatabase = {
    users: [{
        id: '217479e0-d8cd-40a8-a69b-c46972fee418',
        email: 'claudiu.buruiana@qualitance.com',
        password: 'parola'
    },{
        id: '0c8e664e-a60e-4940-944d-ed2e3d8b6b04',
        email: 'test@qualitance.com',
        password: 'parola'
    },{
        id: '3932b454-0436-4367-a89f-24145a124871',
        email: 'team-delight@qualitane.com',
        password: 'parola'
    }]
}

const delay = () => {
    new Promise( resolve => setTimeout(resolve, ms))
}

export const getUser = (id) => {
    delay(1000).then(() => {
        return fakeDatabase.users.filter(user => user.id == id)
    })
}

export const getUsers = () => {
    delay(1000).then(() => {
        return fakeDatabase.users
    })
}
*/