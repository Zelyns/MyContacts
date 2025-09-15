import style from './style.module.css'; 

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <div className={style.main}>
            <nav className={style.navbar}>
                <h1>Mycontact</h1>
                <button className={style.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Main;