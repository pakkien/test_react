import axios from 'axios';
import React, { useEffect, useState } from 'react';
import fileDownload from 'js-file-download';
import Tooltips from '../../../../components/bootstrap/Tooltips';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useNavigate } from 'react-router-dom';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';

type AttachmentsViewProps = {
	quotation_id?: string;
	variance?: number;
};

type QuotationRevDataType = {
	created_at: string;
	created_by: string;
	quotation_revision_id: string;
	revision: number;
	variance: number;
	//attachment_list: AttachmentFileType[];
};

type AttachmentFileType = {
	created_at: string;
	created_by: string;
	filename: string;
	id: string;
	size: number;
};

const AttachmentsView = (props: AttachmentsViewProps) => {
	const navigate = useNavigate();
	const [revisionData, setRevisionData] = useState<QuotationRevDataType[]>([]);
	const [displayData, setDisplayData] = useState<({data: QuotationRevDataType, attachment_list: AttachmentFileType[]})[]>([]); 

	const fetchRevisions = async (quotation_id?: string, variance?: number) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
			params: { variance: `${variance}` },
		};
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/revisions/${quotation_id}`, config)
			.then((response) => {
				setRevisionData(response.data.data);
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
	};

	useEffect(() => {
		//setRevisionData([]);
		//setDisplayData([]);
		fetchRevisions(props.quotation_id, props.variance);
		revisionData.map((item) => fetchAttachments(item.quotation_revision_id));
		//console.log(revisionData);
		//setRevisionData(...revisionData);
	}, [revisionData.length]);

	const fetchAttachments = async (quotation_rev_id?: string) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
		axios
			.get(
				import.meta.env.VITE_BASE_URL + `/quotation/${quotation_rev_id}/attachments`,
				config,
			)
			.then((response) => {
				if (response.data.attachments) {
					const item = Object.assign({
						data: revisionData.filter(x => x.quotation_revision_id == quotation_rev_id)[0],
						attachment_list: response.data.attachments
					});
					displayData?.push(item);
					//console.log(item);
				}
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
	};

	const handleDownload = async (attachment_id: string, file_name: string) => {
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/attachment/${attachment_id}`, {
				responseType: 'blob',
				headers: { Authorization: `${localStorage.getItem('bts_token')}` },
			})
			.then((response) => {
				//fileDownload(response.data, file_name);
				const file = new File([response.data], file_name, { type: 'application/pdf' });
				const fileURL = URL.createObjectURL(file);
				let encoded_file_url = base64_encode(fileURL);
				let encoded_file_name = base64_encode(file_name);
				window.open(`../../../pdf-viewer/${encoded_file_url}/${encoded_file_name}`, "_blank");
				
			}).catch((err) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error</span>
					</span>,
					'Error: ' + err,
				);
			});
	};

	return (
		<>
			{displayData.map((item, index) => {
				return (
					<div key={index}>
						<a
							//onClick={() => goToViewQuotationPage(item.quotation_revision_id)}
							href={'/quotation/view/' + item.data.quotation_revision_id}
							target='_blank'>
							Revision {item.data.revision}
						</a>
						<br />

						{item.attachment_list &&
							item.attachment_list.map((x) => (
								<li key={x.id}>
									<span
										// className='fw-bold text-truncate'
										// style={{
										// 	maxWidth: '10rem',
										// }}
										onClick={() => handleDownload(x.id, x.filename)}>
										<Tooltips title={x.filename} flip={['auto']}>
											<a
												style={{
													cursor: 'pointer',
												}}>
												{x.filename}
											</a>
										</Tooltips>
									</span>
									<br />
								</li>
							))}
					</div>
				);
			})}
		</>
	);
};

export default AttachmentsView;
