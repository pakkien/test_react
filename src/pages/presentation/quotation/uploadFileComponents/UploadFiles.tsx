import React, { useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import UploadFileCard from './UploadFileCard';

const UploadFiles = () => {
	//upload file
	const [files, setFiles] = useState<FileList | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			//setStatus('initial');
			setFiles(e.target.files);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Upload PDF
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4'>
					<div className='col-md-4'></div>
					<div className='col-md-4'>
						<div className='col-md-12'>
							<FormGroup
								//className='col-12'
								id='uploadfile'
								//label='Upload PDF'
							>
								<Input
									type='file'
									accept='.pdf'
									multiple
									//onChange={formik.handleChange}
									// value={formik.values.uploadfile}
									// disabled={isViewMode ? true : false}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										handleFileChange(e);
										//formik.handleChange(e);
									}}
								/>
							</FormGroup>
						</div>
						
					</div>
					<div className='col-md-4'></div>
					<div className='col-md-12'></div>
					<div className='col-md-12  '>
						<div className='row d-flex justify-content-center'>
							{files &&
								[...files].map((file, index) => (
									// <section key={file.name}>
									// 	File number {index + 1} details:
									// 	<ul>
									// 		<li>Name: {file.name}</li>
									// 		<li>Type: {file.type}</li>
									// 		<li>Size: {file.size} bytes</li>
									// 	</ul>
									// </section>
									<UploadFileCard filename={file.name} size={file.size} ext={file.type}/>
								))}
								</div>
						</div>
				</div>
			</CardBody>
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
	);
};

export default UploadFiles;
