import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import QuotationDataType from '../../../dataTypes/QuotationDataType';

const schemaSubItem = z.object({
	product_description: z.string().min(3),
	brand: z.string().min(3),
	model: z.string().min(3),
	remarks: z.string().min(3),
	quantity: z.coerce.number().int().min(0),
	unit: z.string(),
	unit_cost: z.coerce.number().min(0),
	total_cost: z.coerce.number().min(0),
	margin: z.coerce.number(),
	unit_price: z.coerce.number().min(0),
	total_price: z.coerce.number().min(0),
});

const schemaItem = z.object({
	product_description: z.string().min(3),
	brand: z.string().min(3),
	model: z.string().min(3),
	remarks: z.string().min(3),
	quantity: z.coerce.number().int().min(0),
	unit: z.string(),
	unit_cost: z.coerce.number().min(0),
	total_cost: z.coerce.number().min(0),
	margin: z.coerce.number(),
	unit_price: z.coerce.number().min(0),
	total_price: z.coerce.number().min(0),
	sub_items: z.array(schemaSubItem)

});

export const schemaQuotation = z.object({
	client: z.string().min(3),
	end_user: z.string().min(3),
	site_location: z.string().min(3),
	building: z.string().min(3),
	pic: z.string().min(3),
	email: z.string().email(),
	project_reference: z.string(),
	status: z.string().min(3),

	//Summary
	reference_status: z.string(),
	note: z.string(),
	total: z.coerce.number(),
	g_total: z.coerce.number(),

	//items: z.array(schemaItem)
	items: z.array(schemaItem).min(1, { message: 'must contain at least one item.' }),
	//attachment_list: z.string().array(),


	//options
	lead_time: z.string().min(1),
	payment_terms: z.string().min(1),
	validity: z.string().min(1)
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
		end_user: props.data.end_user,
		site_location: props.data.site_location,
		building: props.data.building,
		pic: props.data.pic,
		email: props.data.email,
		project_reference: props.data.project_reference,
		status: props.data.status,


		items: props.data.items, //check again
		
		
		reference_status: props.data.reference_status,
		note: props.data.note,
		
		// total: props.data.total,
		// g_total: props.data.g_total,
		total: 0,
		g_total: 0,
		
		//options:
		lead_time: props.data.lead_time,
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


