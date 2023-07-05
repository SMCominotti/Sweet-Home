import Usercard from "./Usercard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/actions/actions";
import { Link, useParams } from "react-router-dom";




const ViewUsers = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users)
    const { id } = useParams()
 

    useEffect(() =>{
        dispatch(getAllUsers())
    }, [dispatch])




    

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table">
            <thead>
            </thead>
            <tbody>
                {user?.map((user) => (
                   <Usercard
                   key={user._id}
                   id={user._id}
                   name={user.name}
                   image={user.image} 
                   email={user.email}                  
                 />
                ))}
            </tbody>
        </table>
    )
}

export default ViewUsers