import classNames from 'classnames';
import { isDragActive } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Icon from 'react-syntax-highlighter/dist/esm/languages/prism/icon';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardBody,
	CardFooter,
} from '../../../../components/bootstrap/Card';
import Progress from '../../../../components/bootstrap/Progress';
import Tooltips from '../../../../components/bootstrap/Tooltips';
import pdf_icon2 from '../../../../assets/img/icon/pdf_icon2.png';
import axios, { AxiosHeaders } from 'axios';
import fileDownload from 'js-file-download';

// var files = [
//     {
//         "name": "dummy.pdf",
//         "size": 1234567,
//         "type": "pdf"
//     },
//     {
//         "name": "dummy2.pdf",
//         "size": 1234567,
//         "type": "pdf"
//     },
//     {
//         "name": "dummy3.pdf",
//         "size": 1234567,
//         "type": "pdf"
//     }
// ]

type ViewAttachmentProps = {
	quotation_rev_id?: string;
};

type AttachmentFileType = {
	created_at: string;
	created_by: string;
	filename: string;
	id: string;
	size: number;
}

const MAX_FILE_COUNT = 10;

function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const ViewAttachment = (props: ViewAttachmentProps) => {
	const [files, setFiles] = useState<AttachmentFileType[]>([]);

	
	const fetchAttachments = async (quotation_rev_id?: string) => {		
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
		axios
			.get(`http://127.0.0.1:5000/quotation/${quotation_rev_id}/attachments`, config)
			.then((response) => {
				console.log(response.data);
				setFiles(response.data.attachments);
			});
	};

	useEffect(() => {
		console.log("quotation_rev_id:" + props.quotation_rev_id);
		if (props.quotation_rev_id) {
			fetchAttachments(props.quotation_rev_id);
		}
	}, []);

	const handleDownload = async (attachment_id: string, file_name: string) => {
		// const config = {
		// 	headers: 
			
		// };
		axios
		.get(`http://127.0.0.1:5000/quotation/attachment/${attachment_id}`, {responseType: 'blob', headers: { Authorization: `${localStorage.getItem('bts_token')}` }})
		.then((response) => {
			//console.log(response.data);
			fileDownload(response.data, file_name);
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Upload PDF{' '}
						{files?.length ? ' - ' + files?.length + '/' + MAX_FILE_COUNT : ''}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4 '>
					{files.map((file) => (
						<div className='col-xl-3 col-lg-6 col-md-12' key={file.filename}>
							<Card
								//shadow='lg'
								borderColor='success'
								className='shadow-none border border-2 rounded-2'>
								<CardBody>
									<div className='row g-3'>
										<div className='col d-flex'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 60 }}>
														<div
															className={classNames(
																//`bg-l25-primary`,
																//'rounded-1',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																//'shadow',
															)}>
															<img
																src={pdf_icon2}
																alt={file.filename}
																width={50}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col-12'>
															<div className='d-flex align-items-center'>
																<div
																	className='fw-bold text-truncate'
																	style={{
																		maxWidth: '10rem',
																	}}
																	onClick={() => handleDownload(file.id, file.filename)}>
																	<Tooltips
																		title={file.filename}
																		//placement='top'
																		flip={['auto']}>
																		<a
																			style={{
																				cursor: 'pointer',
																			}}>
																			{file.filename}
																		</a>
																	</Tooltips>
																</div>
																{/* <small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																		Uploaded
																	</small> */}
																<div />
															</div>
														</div>

														<div className='col-12'>
															<div className='text-muted'>
																{file.filename.split('.').pop()?.toUpperCase()}
															</div>
														</div>
														<div className='col-12'>
															<div className='text-muted'>
																{formatBytes(file.size)}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			</CardBody>
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
	);
};

export default ViewAttachment;
