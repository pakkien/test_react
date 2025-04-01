import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import QuotationDataType from '../../../dataTypes/QuotationDataType';

const schemaSubItem = z.object({
	product_description: z.string().min(3).max(200),
	brand: z.string().max(200),
	model: z.string().max(200),
	remarks: z.string().max(200),
	quantity: z.coerce.number().int().min(0).max(2147480000),
	unit: z.string().max(200),
	unit_cost: z.coerce.number().min(0).max(2147480000),
	total_cost: z.coerce.number().min(0).max(2147480000),
	margin: z.coerce.number().max(2147480000),
	margin_percentage: z.coerce.number().max(2147480000),
	lead_time: z.coerce.number().int().min(0).max(2147480000),
	by_others: z.boolean(),
	by_inclusive: z.boolean(),
	unit_price: z.coerce.number().min(0).max(2147480000),
	total_price: z.coerce.number().min(0).max(2147480000),
	order: z.number(),
});
const schemaItem = z.object({
	product_description: z.string().min(3).max(200),
	brand: z.string().max(200),
	model: z.string().max(200),
	remarks: z.string().max(200),
	quantity: z.coerce.number().int().min(0).max(2147480000),
	unit: z.string().max(200),
	unit_cost: z.coerce.number().min(0).max(2147480000),
	total_cost: z.coerce.number().min(0).max(2147480000),
	margin: z.coerce.number().max(2147480000),
	margin_percentage: z.coerce.number().max(2147480000),
	lead_time: z.coerce.number().int().min(0).max(2147480000),
	by_others: z.boolean(),
	by_inclusive: z.boolean(),
	unit_price: z.coerce.number().min(0).max(2147480000),
	total_price: z.coerce.number().min(0).max(2147480000),
	order: z.number(),
	sub_items: z.array(schemaSubItem)

});


const schemaSection = z.object({
	name: z.string().min(3),
	order: z.number(),	
	items: z.array(schemaItem),
	is_section_valid: z.boolean()
});

export const schemaQuotation = z.object({
	client: z.string().min(3).max(200),
	client_code: z.string().min(3).max(200),
	end_user: z.string().min(3).max(200),
	site_location: z.string().min(3).max(200),
	building: z.string().min(3).max(200),
	pic: z.string().min(3).max(200),
	pic_email: z.string().email(),
	pic_contact_number: z.string().min(3).max(200),
	project_reference: z.string().max(200),
	status: z.string().min(3),

	//Summary
	reference_status: z.string().max(200),
	note: z.string().max(1000),
	total_cost: z.coerce.number().min(0).max(2147480000),
	grand_total: z.coerce.number().min(0).max(2147480000),
	sst: z.coerce.number().min(0).max(100),
	discount: z.coerce.number().min(0).max(2147480000),

	sections: z.array(schemaSection),

	//options
	payment_terms: z.coerce.number().min(0).max(2147480000), //nullable, min 0
	validity: z.coerce.number().min(0).max(2147480000), //nullable, min 0

});

export type FormTypeQuotation = z.infer<typeof schemaQuotation>


type QuotationFormProps = {
	data: QuotationDataType.QuotationData,
	children: ReactNode

}

export const useFormQuotation = (props: QuotationFormProps) =>
  useForm<FormTypeQuotation>({
	mode: "onChange",
    resolver: zodResolver(schemaQuotation),
	defaultValues:{
		client: props.data.client,
		client_code: props.data.client_code,
		end_user: props.data.end_user,
		site_location: props.data.site_location,
		building: props.data.building,
		pic: props.data.pic,
		pic_email: props.data.pic_email,
		pic_contact_number: props.data.pic_contact_number,
		project_reference: props.data.project_reference,
		status: props.data.status,


		sections: props.data.sections.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0), //check again
		
		
		reference_status: props.data.reference_status,
		note: props.data.note,
		
		// total: props.data.total,
		// g_total: props.data.g_total,
		total_cost: props.data.total_cost,
		grand_total: props.data.grand_total,
		sst: props.data.sst,
		discount: props.data.discount,
		
		//options:
		payment_terms: props.data.payment_terms,
		validity: props.data.validity

	}

  })


export const FormProviderQuotation = (props: any) => {
	const methods = useFormQuotation(props)
	return <FormProvider {...methods}>{props.children}</FormProvider>
  }
  
export const useFormContextQuotation = () => 
	//setData(props.data.client);
	useFormContext<FormTypeQuotation>()


