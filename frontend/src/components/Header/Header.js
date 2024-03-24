import './Header.css'

const Header = ({icon, text}) =>{
    return (
        <div className="header">
            <div className="header-title">
                <div className="header-icon">
                    <img src={`/icons/${icon}.svg`} alt="" />
                </div>
                <h3>{text}</h3>                    
            </div>
        </div>
    )
}

export default Header

