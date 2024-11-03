import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import QuotationDataType from '../../../dataTypes/QuotationDataType';

const schemaSubItem = z.object({
	product_desc: z.string().min(3),
	brand: z.string().min(3),
	model: z.string().min(3),
	remarks: z.string().min(3),
	quantity: z.string().min(3),
	unit: z.string().min(3),
	unit_cost: z.string().min(3),
	total_cost: z.string().min(3),
	margin: z.string().min(3),
	unit_price: z.string().min(3),
	total_price: z.string().min(3),
});

const schemaItem = z.object({
	product_desc: z.string().min(3),
	brand: z.string().min(3),
	model: z.string().min(3),
	remarks: z.string().min(3),
	quantity: z.string().min(3),
	unit: z.string().min(3),
	unit_cost: z.string().min(3),
	total_cost: z.string().min(3),
	margin: z.string().min(3),
	unit_price: z.string().min(3),
	total_price: z.string().min(3),
	sub_items: z.array(schemaSubItem)

});

export const schemaQuotation = z.object({
	client: z.string().min(3),
	end_user: z.string().min(3),
	site_location: z.string().min(3),
	building: z.string().min(3),
	pic: z.string().min(3),
	email: z.string().min(3),
	project_ref: z.string().min(3),
	reference_status: z.string().min(3),
	note: z.string().min(3),
	total: z.string().min(3),
	g_total: z.string().min(3),
	//items: z.array(schemaItem)
	items: z.array(schemaItem).min(1, { message: 'must contain atleast one item.' })
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
		project_ref: props.data.project_ref,
		items: props.data.items, //check again
		reference_status: props.data.reference_status,
		note: props.data.note,
		total: props.data.total,
		g_total: props.data.g_total,

	}

  })


export const FormProviderQuotation = (props: QuotationFormProps) => {
	const methods = useFormQuotation(props)
	return <FormProvider {...methods}>{props.children}</FormProvider>
  }
  
export const useFormContextQuotation = () => 
	//setData(props.data.client);
	useFormContext<FormTypeQuotation>()


