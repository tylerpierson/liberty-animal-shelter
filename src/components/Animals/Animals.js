import { Link } from 'react-router-dom'

export default function Animals(props) {
    return(<div>
        {props.animals.map((animal) => {
            return(
            <article key={animal._id}>
                <h3>{animal.name}</h3>
                <Link to={`/animal/${animal._id}`}>
                    Click here to learn more about {`${animal.name.charAt(0).toUpperCase() + animal.name.slice(1)}`}
                </Link>
            </article>)
        })}
    </div>)
}