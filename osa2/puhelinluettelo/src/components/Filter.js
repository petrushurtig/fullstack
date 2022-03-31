const Filter = (props) => {
    return(
    <div>
        filter shown with <input value={props.searched} onChange={props.handleSearch}/>
    </div>
    )
} 
export default Filter;