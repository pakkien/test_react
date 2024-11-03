import React from 'react'
import { useFormContextQuotation } from '../QuotationForm';
import { useFieldArray } from 'react-hook-form';

const ManageSubItem = ({itemIndex}: {itemIndex:number}) => {
    const {
		register,
		control,
		formState: { errors },
	} = useFormContextQuotation();

	const { append, remove, fields } = useFieldArray({
		name: `items.${itemIndex}.sub_items`,
		control,
	});
    
    return (
    <div>ManageSubItem</div>
  )
}

export default ManageSubItem