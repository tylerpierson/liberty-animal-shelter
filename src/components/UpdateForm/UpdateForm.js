import styles from './UpdateForm.module.scss'

export default function UpdateForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await props.updateBlog(props.blog, props.id, props.token)
            props.setBlog(data)
            // Make the form disappear after submission
            props.setShowUpdate(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        props.setBlog({...props.blog, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Update a new Blog</h2>
            <input className={`${styles.input} ${styles.title}`} placeholder="Title" type="text" name="title" value={props.blog.title} onChange={handleChange} />
            <input className={`${styles.input} ${styles.body}`} placeholder="Body" type="text" name="body" value={props.blog.body} onChange={handleChange} />
            <input className={styles.button} type="submit" value="Update Blog" />
        </form>
    )
}