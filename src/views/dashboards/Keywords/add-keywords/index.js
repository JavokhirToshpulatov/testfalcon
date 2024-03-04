import React, {useEffect} from 'react';
import ProductForm from "../keywordsForm";
import {useParams} from "react-router-dom";

const AddProduct = () => {
	let {id} = useParams();
	useEffect(() => {
		//id bulsa id bn get qilish
	}, []);
	return (
		<ProductForm mode={!!id?"EDIT":"ADD"} param={{id}}/>
	)
}

export default AddProduct
