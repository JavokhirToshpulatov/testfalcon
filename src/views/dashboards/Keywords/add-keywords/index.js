import React, {useEffect} from 'react';
import ProductForm from "../keywordsForm";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getSingleDomain, getSingleKeyword} from "../../../../redux/actions";

const AddProduct = () => {
	let {id} = useParams();
	const dispatch= useDispatch();
	useEffect(() => {
		dispatch(getSingleKeyword({id}))
	}, []);
	return (
		<ProductForm mode={!!id?"EDIT":"ADD"} param={{id}}/>
	)
}

export default AddProduct
