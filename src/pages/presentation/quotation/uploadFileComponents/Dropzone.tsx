//import Image from 'next/image'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
//import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { Dispatch, SetStateAction } from 'react';
import { blob } from 'stream/consumers';
import Image from 'react-image-webp';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import classNames from 'classnames';
import Button from '../../../../components/bootstrap/Button';
import Tooltips from '../../../../components/bootstrap/Tooltips';
import pdf_icon2 from '../../../../assets/img/icon/pdf_icon2.png'

const MAX_FILE_COUNT = 10;

const Dropzone = ({ className }: any) => {
	const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [rejected, setRejected] = useState<FileRejection[]>([]);

	const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		if (acceptedFiles?.length) {
			setFiles((previousFiles) => [
				...previousFiles,
				...acceptedFiles.map((file) =>
					// Object.assign(file, { preview: URL.createObjectURL(file) }),
					Object.assign(file, { preview: 
						pdf_icon2
					}),
				),
			]);
		}

		if (rejectedFiles?.length) {
			setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			'image/*': [],
			'application/pdf': ['.pdf'],
		},
		maxSize: 1024 * 1500,
		maxFiles: 10,
		onDrop,
	});

	useEffect(() => {
		// Revoke the data uris to avoid memory leaks
		return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [files]);

	const removeFile = (name: string) => {
		setFiles((files) => files.filter((file) => file.name !== name));
	};

	const removeAll = () => {
		setFiles([]);
		setRejected([]);
	};

	function formatBytes(bytes: number, decimals = 2) {
		if (!+bytes) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Upload PDF {(files?.length)? ' - ' + files?.length + '/' + MAX_FILE_COUNT:''}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4 '>
					<div
						{...getRootProps({
							className: className,
						})}>
						<input {...getInputProps()} />
						<div className='flex flex-col items-center justify-center gap-4'>
							{/* <ArrowUpTrayIcon className='w-5 h-5 fill-current' /> */}
							{isDragActive ? (
								<p>Drop the files here ...</p>
							) : (
								<p>Drag & drop files here, or click to select files</p>
							)}
						</div>
					</div>

					{files.map((file) => (
						<div className='col-xl-3 col-lg-6 col-md-12'>
							<Card shadow='lg'>
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
																//'rounded-2',
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
															{' '}
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
															shadow='none'
															hoverShadow='lg'
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

					<div>
						<Button
							color='danger'
							icon='Delete'
							tag='a'
							hidden={!(files.length > 0)}
							onClick={removeAll}>
							Remove all files
						</Button>
					</div>
				</div>
			</CardBody>
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
	);
};

export default Dropzone;
