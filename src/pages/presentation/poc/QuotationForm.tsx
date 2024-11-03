import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

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

export const useFormQuotation = () =>
  useForm<FormTypeQuotation>({
	mode: "onChange",
    resolver: zodResolver(schemaQuotation),
  })


export const FormProviderQuotation = ({
	children,
  }: {
	children: ReactNode
  }) => {
	const methods = useFormQuotation()
	return <FormProvider {...methods}>{children}</FormProvider>
  }
  
export const useFormContextQuotation = () =>
	useFormContext<FormTypeQuotation>()
  



// const EditQuotation = () => {
// 	return <div>EditQuotation</div>;
// };

// export default EditQuotation;
