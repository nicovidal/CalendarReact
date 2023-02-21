import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore=()=>{

    const dispatch=useDispatch();

    const {isDateModalOpen}=useSelector(state=>state.ui);

    const openDateModal=()=>{
        dispatch(onOpenDateModal());

    };

    const closeDateModal=()=>{
        dispatch(onCloseDateModal())
    };

    //can use like this too.
    const toggleDateModal=()=>{
        (isDateModalOpen)
        ?openDateModal()
        :closeDateModal
    };

    return{
        //properties
        isDateModalOpen,
        //metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }


}