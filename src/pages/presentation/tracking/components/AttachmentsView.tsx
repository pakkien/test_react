import axios from 'axios';
import React, { useEffect, useState } from 'react';
import fileDownload from 'js-file-download';
import Tooltips from '../../../../components/bootstrap/Tooltips';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
					// let updated = revisionData;
					// updated.forEach((item: any) => {
					// 	if (item.quotation_revision_id == quotation_rev_id) {
					// 		item.attachment_list = response.data.attachments;
					// 	}
					// });
					// setRevisionData(updated);
					const item = Object.assign({
						data: revisionData.filter(x => x.quotation_revision_id == quotation_rev_id)[0],
						attachment_list: response.data.attachments
					});
					displayData?.push(item);
					//console.log(item);
				}
			});
	};

	const handleDownload = async (attachment_id: string, file_name: string) => {
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/attachment/${attachment_id}`, {
				responseType: 'blob',
				headers: { Authorization: `${localStorage.getItem('bts_token')}` },
			})
			.then((response) => {
				fileDownload(response.data, file_name);
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
