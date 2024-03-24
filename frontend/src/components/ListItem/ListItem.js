import './ListItem.css';

function ListItem({icon, title, count}){
    return (
        <div className='category-container'>
            {icon && <div className="category-icon">
                <img className='category-icon-image' src={`/icons/${icon}.svg`} alt=''/>
            </div>}
            <h3 className="category-title">
                {title}
            </h3>
            <div className="category-count">
                {count !== 0 && count}
            </div>
        </div>
    );
}

export default ListItem;