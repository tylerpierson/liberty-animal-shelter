import { useState, useEffect } from 'react'
import Animal from '../../components/Animal/Animal'
import UpdateForm from '../../components/UpdateForm/UpdateForm'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function ShowPage(props){
    // display the individual animal posts --- Animal Component
    // be able to update the animal post --- Update Component
    // be able to delete the animal post --- button (not to be confused with a button component)
    const [showUpdate, setShowUpdate] = useState(false)
    const [allowChanges, setAllowChanges] = useState(false)
    const [animal, setAnimal] = useState({
        name:'',
        species: '',
        image: '',
        reservedForAdoption: false,
        user: ''
    })

    // destructure the id from the params
    const {id} = useParams() // FE version of req.params

    // navigate to other pages
    const navigateTo = useNavigate()

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
               const data = await props.getIndividualAnimal(id)
               setAnimal(data) 
            } catch (error) {
                console.error(error)
            }
        }
        fetchAnimal()
    }, [])

    // Checking the token && user in localStorage
    useEffect(() => {
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    useEffect(() => {
        if(props.user){
            if(animal && props.user._id === animal.user){
            setAllowChanges(true)
        }}
    }, [props.user, animal])

    const handleDelete = async () => {
        try {
            await props.deleteAnimal(id, props.token)
            navigateTo('/')
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
            <Link to={'/'}>Go to Homepage</Link>
            <h1>{animal?.name || 'Loading....'}</h1>
            <p>{animal?.species || ''}</p>
            <img src={animal?.image || ''} alt={animal?.name || ''} />
            <p>{animal.reservedForAdoption === true ?  'Adopted' : 'Up for Adoption'}</p>
            { allowChanges && !showUpdate ?
            <button onClick={() => setShowUpdate(!showUpdate)}>Reveal Update Form</button>:
            <></>
            }
            {allowChanges && showUpdate ? <UpdateForm id={id} updateAnimal={props.updateAnimal} setShowUpdate={setShowUpdate} setAnimal={setAnimal} animal={animal} token={props.token} setToken={props.token}/> : <></>}
            {allowChanges? <button onClick={handleDelete}>Delete Animal</button>: <></>}
        </div>
    )
}