import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';



export const schemaAttachment = z.object({
    created_at: z.string(),
    created_by: z.string(),
    filename: z.string(),
    id: z.string(),
    size: z.number()
});

export const schemaPurchaseOrder = z.object({
    //id: z.string(),
    po_no: z.string().min(3),
    po_date: z.string(),
    po_amount: z.coerce.number(),
    po_attachments: z.array(schemaAttachment),
    temp_attachment_ids: z.array(z.string()),
    order: z.number(),

});

export const schemaSaleOrder = z.object({
    so_no: z.string(),
    so_date: z.string(),
    so_attachments: z.array(schemaAttachment),
    temp_attachment_ids: z.array(z.string()),
    order: z.number(),

});

export const schemaInvoice= z.object({
    invoice_no: z.string(),
    invoice_date: z.string(),
    invoice_amount: z.coerce.number(),
    payment_terms: z.coerce.number(),
    invoice_attachments: z.array(schemaAttachment),
    temp_attachment_ids: z.array(z.string()),
    order: z.number(),

});


export const schemaTrackingDetails = z.object({
    remarks: z.string(),
    purchase_order: z.array(schemaPurchaseOrder),
    sale_order: z.array(schemaSaleOrder),
    invoice: z.array(schemaInvoice),


});

export type FormTypeTrackingDetails = z.infer<typeof schemaTrackingDetails>


type TrackingDetailsFormProps = {
    //data: QuotationDataType.QuotationData,
    data: any,
    children: ReactNode

}


export const useFormTrackingDetails = (props: TrackingDetailsFormProps) =>

  useForm<FormTypeTrackingDetails>({
    mode: "onChange",
    resolver: zodResolver(schemaTrackingDetails),
    defaultValues:{
        remarks: props.data.remarks,
        purchase_order: props.data.purchase_order,
        sale_order: props.data.sale_order,
        invoice: props.data.invoice,
    }

  })


export const FormProviderTrackingDetails = (props: any) => {
    const methods = useFormTrackingDetails(props)
    return <FormProvider {...methods}>{props.children}</FormProvider>
  }
  
export const useFormContextTrackingDetails = () => 
    //setData(props.data.client);
    useFormContext<FormTypeTrackingDetails>()


