import axios, { AxiosProgressEvent } from 'axios';
import fileDownload from 'js-file-download';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import pdf_icon2 from '../../../../assets/img/icon/pdf_icon2.png';
import classNames from 'classnames';
import Button from '../../../../components/bootstrap/Button';
import Card, { CardHeader, CardLabel, CardTitle, CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import Progress from '../../../../components/bootstrap/Progress';
import Tooltips from '../../../../components/bootstrap/Tooltips';
import Icon from '../../../../components/icon/Icon';
import { UseFormSetValue } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import showNotification from '../../../../components/extras/showNotification';

type DropzoneProps = {
    //quotation_id: string;
    attachment_list: AttachmentFileType[];
    attachment_type: string;
    //setAttachmentIds: (ids: string[], type: string) => void;
	index: number;
	updateIdsFunc: (index: number, ids: string[]) => void;
    className?: string;
}

type AttachmentFileType = {
	created_at: string;
	created_by: string;
	filename: string;
	id: string;
	size: number;
}

const MAX_FILE_COUNT = 10;

const Dropzone = (props: DropzoneProps) => {
	const navigate = useNavigate();
    const [prevFiles, setPrevFiles] = useState<AttachmentFileType[]>([]);

	useEffect(() => {
		//console.log("props:" + JSON.stringify(props));
		setPrevFiles(props.attachment_list);
	}, [(props.attachment_list).length]);

	const handleDownload = async (attachment_type: string, attachment_id: string, file_name: string) => {
		axios
		.get(import.meta.env.VITE_BASE_URL + `/tracking_list/attachment/${attachment_type}/${attachment_id}`, {responseType: 'blob', headers: { Authorization: `${localStorage.getItem('bts_token')}` }})
		.then((response) => {
			//console.log(response.data);
			//fileDownload(response.data, file_name);
			const file = new File([response.data], file_name, { type: 'application/pdf' });
			const fileURL = URL.createObjectURL(file);
			let encoded_file_url = base64_encode(fileURL);
			let encoded_file_name = base64_encode(file_name);
			window.open(`../../../pdf-viewer/${encoded_file_url}/${encoded_file_name}`, "_blank");
		})
		.catch((err) => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Error</span>
				</span>,
				'Error: ' + err,
			);
		});
	}

	const removePrevFile = (id: string) => {
		let files = prevFiles.filter(file => file.id != id);
		setPrevFiles(files);
	} 

    const [files, setFiles] = useState<
    (File & {
        preview: string;
        upload_percent: number;
        upload_id: string;
        upload_error: string;
    })[]
>([]);
const [rejected, setRejected] = useState<FileRejection[]>([]);
const [isFileLimit, setIsFileLimit] = useState(false);

// const handleUpload = async (fileToUpload: File & { preview: string, upload_percent:number, upload_id:string }) => {
const handleUpload = async (fileToUpload: File) => {
    var data = new FormData();
    data.append('file', fileToUpload);

    var config = {
        onUploadProgress: function (progressEvent: AxiosProgressEvent) {
            const current_percent =
                progressEvent.total && progressEvent.loaded
                    ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    : 0;
            //console.log("loaded/total:"  +progressEvent.loaded+"/"+progressEvent.total)
            setFiles((prevState) => {
                const newFiles = [...prevState];
                newFiles.map((file) =>
                    file.name == fileToUpload.name
                        ? (file.upload_percent = current_percent)
                        : null,
                );
                return newFiles;
            });
        },
        headers: { Authorization: `${localStorage.getItem('bts_token')}` },
    };

    axios
        .post(import.meta.env.VITE_BASE_URL + `/tracking_list/attachment/${props.attachment_type}`, data, config)
        .then(function (res) {
            const attachment_id = res.data.attachment_id;

            setFiles((prevState) => {
                const newFiles = [...prevState];
                newFiles.map((file) =>
                    file.name == fileToUpload.name ? (file.upload_id = attachment_id) : null,
                );
                return newFiles;
            });
        })
        .catch(function (err) {
            //console.log(err);
            setFiles((prevState) => {
                const newFiles = [...prevState];
                newFiles.map((file) =>
                    file.name == fileToUpload.name ? (file.upload_error = 'Error') : null,
                );
                return newFiles;
            });
        });
};

const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
            ...previousFiles,
            ...acceptedFiles.map((file) =>
                // Object.assign(file, { preview: URL.createObjectURL(file) }),
                //handleUpload(file),
                Object.assign(file, {
                    preview: pdf_icon2,
                    upload_percent: 0,
                    upload_id: '',
                    upload_error: '',
                }),
            ),
        ]);

        //start upload
        {
            acceptedFiles.map((file) => handleUpload(file));
        }
    }

    if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
        //'image/*': [],
        'application/*': ['.pdf'],
    },
    maxSize: 1024 * 1500,
    maxFiles: MAX_FILE_COUNT - files.length,
    disabled: isFileLimit,
    onDrop,
});

useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
}, [files]);

useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    const selectedFiles = files.filter(
        (file) => file.upload_percent == 100 && file.upload_id && !file.upload_error,
    );
    let new_ids = selectedFiles.map((file) => file.upload_id);
    let prev_ids = prevFiles.map((file) => file.id);
    // let all_ids = [...new_ids, ...prev_ids];
    // console.log(all_ids);
    //props.setAttachmentIds([...new_ids, ...prev_ids], props.attachment_type);	
	switch (props.attachment_type) {
		case 'purchase_order': {
			props.updateIdsFunc(props.index, [...new_ids, ...prev_ids]);
			break;
		}
		case 'sale_order': {
			props.updateIdsFunc(props.index, [...new_ids, ...prev_ids]);
			break;
		}
		case 'invoice': {
			props.updateIdsFunc(props.index, [...new_ids, ...prev_ids]);
			break;
		}
		default: {
			break;
		}
	}

}, [files, prevFiles]);

useEffect(() => {
    // check if accepted files reach limit
    if (files.length + prevFiles.length >= MAX_FILE_COUNT) {
        setIsFileLimit(true);
    } else {
        setIsFileLimit(false);
    }
    //console.log(isFileLimit);
}, [files.length + prevFiles.length]);

const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
};

const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
};

const removeAll = () => {
    setFiles([]);
    setRejected([]);
};

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
  
    
  return (
    <Card shadow="none" borderSize={0} borderColor='light' >
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						Attachments{' '}
						{(files?.length||prevFiles?.length)? ' - ' + (files?.length+prevFiles?.length) + '/' + MAX_FILE_COUNT : ''}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4 '>
					<div
						hidden={isFileLimit}
						{...getRootProps({
							className: props.className,
						})}>
						<input {...getInputProps()} />
						<div
							className='border border-2 border-light border d-flex justify-content-center align-items-center'
							style={{ height: 150 }}>
							<p className='lead'>
								<Icon icon='Upload' size='2x' />
								{isDragActive
									? 'Drop the files here ...'
									: 'Drag & drop files here, or click to select files'}
							</p>
						</div>
					</div>

					{/* Previous files */}
					{prevFiles.map((file) => (
						<div className='col-xl-3 col-lg-6 col-md-12' key={file.id}>
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
																	onClick={() => handleDownload(props.attachment_type, file.id, file.filename)}
																	>
																	<Tooltips
																		title={file.filename}
																		flip={['auto']}>
																		<a
																			style={{
																				cursor: 'pointer',
																			}}>
																			{file.filename}
																		</a>
																	</Tooltips>
																</div>
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

											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div className='float-end'>
														<Button
															color='dark'
															isLight
															icon='Close'
															size='sm'
															rounded={1}
															onClick={() => removePrevFile(file.id)}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}


					{/* //Accepted */}
					{files.map((file) => (
						<div className='col-xl-3 col-lg-6 col-md-12' key={file.name}>
							<Card
								//shadow='lg'
								borderColor={
									file.upload_error
										? 'danger'
										: file.upload_percent != 100
											? 'info'
											: 'success'
								}
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
																src={file.preview}
																alt={file.name}
																width={50}
																onLoad={() => {
																	URL.revokeObjectURL(
																		file.preview,
																	);
																}}
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
																	}}>
																	<Tooltips
																		title={file.name}
																		//placement='top'
																		flip={['auto']}>
																		<a
																			style={{
																				cursor: 'pointer',
																			}}>
																			{file.name}
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
																{file.type}
															</div>
														</div>
														<div className='col-12'>
															<div className='text-muted'>
																{formatBytes(file.size)}
															</div>
														</div>
														<div className='col-12'>
															{file.upload_error ? (
																<div className='text-danger'>
																	{file.upload_error}
																</div>
															) : file.upload_percent != 100 ? (
																<Progress
																	isAnimated
																	value={file.upload_percent}
																	max={100}
																	color='success'
																	height='0.5rem'
																/>
															) : (
																<div className='text-success'>
																	<Icon
																		icon='Check'
																		size='lg'
																		color='success'
																	/>{' '}
																	Uploaded
																</div>
															)}
														</div>
													</div>
												</div>
											</div>

											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div className='float-end'>
														<Button
															color='dark'
															isLight
															icon='Close'
															//shadow='none'
															//hoverShadow='lg'
															size='sm'
															rounded={1}
															onClick={() => removeFile(file.name)}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}

					{/* Rejected Files */}
					{rejected.map(({ file, errors }) => (
						<div className='col-xl-3 col-lg-6 col-md-12'>
							<Card
								//shadow='lg'
								borderColor='danger'
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
															<Icon
																icon='ErrorOutline'
																size='4x'
																color='danger'
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
																	}}>
																	<Tooltips
																		title={file.name}
																		//placement='top'
																		flip={['auto']}>
																		<a
																			style={{
																				cursor: 'pointer',
																			}}>
																			{file.name}
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
																{file.type}
															</div>
														</div>
														<div className='col-12'>
															<div className='text-muted'>
																{formatBytes(file.size)}
															</div>
														</div>
														<div className='col-12'>
															{errors.map((error) => (
																<div className='text-danger'>
																	{error.message}
																</div>
															))}
														</div>
													</div>
												</div>
											</div>

											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div className='float-end'>
														<Button
															color='dark'
															isLight
															icon='Close'
															//shadow='none'
															//hoverShadow='lg'
															size='sm'
															rounded={1}
															onClick={() =>
																removeRejected(file.name)
															}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}

					<div>
						<Button
							color='danger'
							icon='Delete'
							tag='a'
							hidden={!(files.length > 0 || rejected.length > 0)}
							onClick={removeAll}
							isLight>
							Remove all files
						</Button>
					</div>
				</div>
			</CardBody>
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
  )
}

export default Dropzone