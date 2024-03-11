import React, {useEffect} from 'react';
import ProductForm from "../domainsForm";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getSingleAgents, getSingleDomain} from "../../../../redux/actions";

const AddProduct = () => {
	let {id} = useParams();
	const dispatch= useDispatch();
	useEffect(() => {
		dispatch(getSingleDomain({id}))
	}, []);
	return (
		<ProductForm mode={!!id?"EDIT":"ADD"} param={{id}}/>
	)
}

export default AddProduct
