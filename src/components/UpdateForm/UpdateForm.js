import styles from './UpdateForm.module.scss'

export default function UpdateForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await props.updateAnimal(props.animal, props.id, props.token)
            props.setAnimal(data)
            // Make the form disappear after submission
            props.setShowUpdate(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        props.setAnimal({...props.animal, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Update a new Animal</h2>
            <input className={`${styles.input} ${styles.title}`} placeholder="Name" type="text" name="name" value={props.animal.name} onChange={handleChange} />
            <input className={`${styles.input} ${styles.title}`} placeholder="Species" type="text" name="species" value={props.animal.species} onChange={handleChange} />
            <input className={`${styles.input} ${styles.title}`} placeholder="Image URL" type="text" name="image" value={props.animal.image} onChange={handleChange} />
            <select name="reservedForAdoption" value={props.animal.reservedForAdoption} onChange={handleChange}>
                <option value={false}>Up for Adoption</option>
                <option value={true}>Adopted</option>
            </select>
            <input className={styles.button} type="submit" value="Update Animal" />
        </form>
    )
}