
function Logout(){


    function handleClick(){
       
        localStorage.clear();
        window.location.href ="/";
    }

    return(

        <div>
            <button className="logout" onClick={()=>{handleClick()} }>Logout</button>
        </div>

    )



}
export default Logout;