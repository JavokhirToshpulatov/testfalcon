import React, {useEffect} from 'react';
import ProductForm from '../ProductForm';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getSingleAgents, getSingleScan} from "../../../../redux/actions";

const AddProduct = () => {
	let {id} = useParams();
	const dispatch= useDispatch();
	useEffect(() => {
		dispatch(getSingleScan({id}))
	}, []);
	return (
		<ProductForm mode={!!id?"EDIT":"ADD"} param={{id}}/>
	)
}

export default AddProduct
