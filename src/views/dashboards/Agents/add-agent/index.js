import React, {useEffect} from 'react';
import ProductForm from "../agentForm";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getSingleAgents} from "../../../../redux/actions";

const AddProduct = () => {
	let {id} = useParams();
	const dispatch= useDispatch();
	useEffect(() => {
    dispatch(getSingleAgents({id}))
	}, []);
	return (
		<ProductForm mode={!!id?"EDIT":"ADD"} param={{id}}/>
	)
}

export default AddProduct
