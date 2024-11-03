import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import {z} from 'zod';
import Button from '../../../components/bootstrap/Button';

const schema = z.object({
    name: z.string().min(8),
    name2: z.string().min(3),
    name3: z.string().min(3)
});

type FormFields = z.infer<typeof schema>;

const poc = () => {
	const { register, handleSubmit, setError, formState:{errors, isSubmitting} } = useForm<FormFields>({
        mode: "onChange",
        defaultValues: {
            name: "",
        },
        resolver: zodResolver(schema),
    });


	const onSubmit: SubmitHandler<FormFields> = (data) => {
		console.log(data);
	};

	return (
		<PageWrapper title='POC'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup className='form-floating'>
					<input
						id='name'
						className={'form-control ' + (errors.name? 'is-invalid': '')}
						{...register('name')}
                        type='text'
						placeholder='PLACE'
					/>

                    <>{errors.name? <div className='invalid-feedback'>{errors.name.message}</div>:''}</>


					<label className='form-label'>Name</label>
                    
				</FormGroup>
                
                <hr/>
				{/* <FormGroup className='form-floating'>
					<input
						id='name2'
						className='form-control is-valid'
						{...register('name2')}
						placeholder='PLACE'
					/>
					<div className='valid-feedback'>valid name2</div>
					<label className='form-label'>Name2</label>
				</FormGroup>

				<FormGroup className='form-floating'>
					<input
						id='name3'
						className='form-control is-invalid'
						{...register('name3')}
						placeholder='PLACE'
					/>
					<div className='invalid-feedback'>invalid name3</div>
					<label className='form-label'>Name3</label>
				</FormGroup> */}

				<Button type='submit'>Submit</Button>
			</form>
		</PageWrapper>
	);
};

export default poc;
