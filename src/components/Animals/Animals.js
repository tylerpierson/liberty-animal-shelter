import { Link } from 'react-router-dom'

export default function Animals(props) {
    return(<div>
        {props.animals.map((animal) => {
            return(
            <article key={animal._id}>
                <h3>{animal.name}</h3>
                <Link to={`/animal/${animal._id}`}>This the link to the Show Page of {`${animal._id}`}</Link>
            </article>)
        })}
    </div>)
}