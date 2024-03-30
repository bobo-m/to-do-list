import './Header.css'

const Header = ({icon, text}) =>{
    return (
        <div className="header">
            <div className="header-title">
                { icon &&
                    <div className="header-icon">
                        <img src={`/icons/${icon}.svg`} alt="" />
                    </div>
                }
                { text && <h3>{text}</h3>}                    
            </div>
        </div>
    )
}

export default Header

