import { useState } from 'react'
import styles from './CreateForm.module.scss'
import { useNavigate } from 'react-router-dom'

export default function CreateForm(props) {
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        image: '',
        reservedForAdoption: false
    })

    const navigateTo = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await props.createAnimal(formData, props.token)
            // cool thing to do once there is a show page done
            navigateTo(`/animal/${data._id}`)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        // Spread the formData in so that as you edit, the other edited fields remain in place
        // In 'e.target.name' the 'name' refers to whichever target name you are currently clicked on, i.e. "email", "password"
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Create a new <span className={styles.span}>Animal</span></h2>
            <label>Name<input className={`${styles.input} ${styles.title}`} placeholder="Name" type="text" name="name" value={formData.name} onChange={handleChange} /></label>
            <label>Species<input className={`${styles.input} ${styles.title}`} placeholder="Species" type="text" name="species" value={formData.species} onChange={handleChange} /></label>
            <label>Image URL<input className={`${styles.input} ${styles.title}`} placeholder="Image URL" type="text" name="image" value={formData.image ? formData.image : 'https://'} onChange={handleChange} /></label>
            <select name="reservedForAdoption" value={formData.reservedForAdoption} onChange={handleChange}>
                <option value={false}>Up for Adoption</option>
                <option value={true}>Adopted</option>
            </select>
            <input className={styles.button} type="submit" value="Create Animal" />
        </form>
    )
}