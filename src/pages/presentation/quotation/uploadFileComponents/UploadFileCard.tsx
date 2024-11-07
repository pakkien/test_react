import React from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import classNames from 'classnames';
import Icon from 'react-syntax-highlighter/dist/esm/languages/prism/icon';
import Button from '../../../../components/bootstrap/Button';
import { Badge } from '../../../../components/icon/material-icons';
import { demoPagesMenu } from '../../../../menu';
import testimg from '../../../../assets/img/scene4.png';

type UploadFileCardProps = {
	filename: string;
	ext: string;
	size: number;
};

const UploadFileCard = (props: UploadFileCardProps) => {
	return (
		// <div className='col-xl-3 col-lg-6 col-md-12 cursor-pointer shadow-3d-primary shadow-3d-hover'>
		<div className='col-xl-3 col-lg-6 col-md-12'>
			<Card shadow='lg'>
				<CardBody>
					<div className='row g-3'>
						<div className='col d-flex'>
							<div className='flex-shrink-0'>
								<div className='position-relative'>
									<div className='ratio ratio-1x1' style={{ width: 60 }}>
										<div
											className={classNames(
												`bg-l25-primary`,
												//'rounded-2',
												'd-flex align-items-center justify-content-center',
												'overflow-hidden',
												'shadow',
											)}>
											<img src={testimg} alt={'img_name'} width={50} />
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
													style={{ maxWidth: '6rem' }}>
													{props.filename} 
												</div>
												<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
													Uploaded
												</small>
												<div />
											</div>
										</div>

										<div className='col-12'>
											<div className='text-muted'>{props.ext}</div>
										</div>
										<div className='col-12'>
											{' '}
											<div className='text-muted'>{props.size} bytes</div>
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
                                            onClick={() => {
                                                //remove(itemIndex);
                                            }}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default UploadFileCard;
