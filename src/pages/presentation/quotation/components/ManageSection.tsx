import React, { useEffect, useState } from 'react';
import { useFormContextQuotation } from './QuotationForm';
import { useFieldArray } from 'react-hook-form';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardActions,
} from '../../../../components/bootstrap/Card';
import ManageSubItem from './ManageSubItem';
import ManageItem from './ManageItem';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

type SectionProps = {
	isViewMode: boolean;
	sectionMode?: boolean;
};

const ManageSection = (props: SectionProps) => {
	const {
		register,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useFormContextQuotation();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: 'sections',
		control,
	});

	const addSection = (isSectionValid: boolean) => {
		append({
			name: 'New Section ' + (fields.length + 1),
			order: 0,
			items: [],
		});
		//setValue('is_section_valid', isSectionValid);
		sectionNameInputVisible.push(true);
	};

	const [sectionNameInputVisible, setSectionNameInputVisible] = useState<boolean[]>([]);

	const setVisibilityOfSectionNameInput = (sectionIndex: number, isVisible: boolean) => {
		const current = sectionNameInputVisible;
		current[sectionIndex] = isVisible;
		setSectionNameInputVisible((x) => [...current]);
	};

	const [sectionMode, setSectionMode] = useState<any>(props.sectionMode? props.sectionMode:null);

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				<div className='col-md-12'>
					<div className='row g-4'>


						{sectionMode? (
							fields.map((section, sectionIndex) => {
								return (
									//TODO: decide
									<div className='col-xl-12'>
										<Accordion
											id='SectionAccordion'
											color='dark'															
											activeItemId={'SectionAccordionItem_' + sectionIndex}>
											<AccordionItem
												id={'SectionAccordionItem_' + sectionIndex}
												title={
													`${sectionIndex + 1}.0  ` +
													formData.sections[sectionIndex].name
												}>
												<div className='row'>
													<div
														className='col-md-12'
														hidden={props.isViewMode ? true : false}>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	color='light'
																	isLight
																	icon='MoreVert'
																	className='float-end'
																/>
															</DropdownToggle>
															<DropdownMenu>
																<DropdownItem>
																	<span
																		onClick={() =>
																			setVisibilityOfSectionNameInput(
																				sectionIndex,
																				true,
																			)
																		}>
																		Rename Section
																	</span>
																</DropdownItem>
																<DropdownItem
																	onClick={() => {
																		remove(sectionIndex);
																	}}>
																	Delete Section
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</div>
													<br />
													<br />
													<div
														className='row'
														hidden={
															!sectionNameInputVisible[sectionIndex]
														}
														>
														<div className='col-md-3'>
															<FormGroup
																id='name'
																label='Section Name'
																isFloating>
																<input
																	id='name'
																	className={
																		'form-control ' +
																		(errors.sections?.[
																			sectionIndex
																		]?.name
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`sections.${sectionIndex}.name`,
																	)}
																	type='text'
																	placeholder='name'
																	disabled={props.isViewMode}
																/>
																<div className='invalid-feedback'>
																	{
																		errors.sections?.[
																			sectionIndex
																		]?.name?.message
																	}
																</div>
															</FormGroup>
														</div>
														<div className='col-md-1 d-flex align-items-center'>
															<Button
																color='success'
																icon='check'
																rounded={1}
																isDisable={(errors.sections?.[sectionIndex]?.name?.message != null)}
																onClick={() =>
																	setVisibilityOfSectionNameInput(
																		sectionIndex,
																		false,
																	)
																}></Button>
														</div>
													</div>
													<div className='col-md-12'>
														<br />
														<br />
													</div>
													<div className='col-md-12'>
														<ManageItem
															sectionIndex={sectionIndex}
															isViewMode={props.isViewMode}
															sectionMode={true}
														/>
													</div>
												</div>
											</AccordionItem>
										</Accordion>
									</div>
								);
							})
							):(
								fields.map((section, sectionIndex) => {
									return (
										<ManageItem
											sectionIndex={sectionIndex}
											isViewMode={props.isViewMode}
											sectionMode={false}
										/>
									);
								})	
							)
							
							}
						<div></div>
					</div>
				</div>
				<div className='col-md-12' hidden={props.isViewMode ? true : false}>
					<Button
						color='info'
						icon='Add'
						tag='a'
						onClick={() => 
							{
								setSectionMode(false);
								addSection(false);
								console.log(sectionMode);
							}
						}
						className='float-end'
						hidden={props.isViewMode || sectionMode != null}>
						Add Item Only
					</Button>
				</div>
				<div className='col-md-12' hidden={props.isViewMode ? true : false}>
					<Button
						color='info'
						icon='Add'
						tag='a'
						onClick={() => {
							if(sectionMode != true){
							setSectionMode(true);
							addSection(true);
							}
						}}
						hidden={props.isViewMode || sectionMode != null}
						className='float-end'>
						Add Section
					</Button>
					<Button
						color='info'
						icon='Add'
						tag='a'
						onClick={() => {
			
								addSection(true);
							
						}}
						hidden={props.isViewMode || sectionMode != true}
						className='float-end'>
						Add Section
					</Button>
				</div>
				<div className='col-md-12' hidden={props.isViewMode ? true : false}>
				<Button
						color='danger'
						//icon='Add'
						tag='a'
						onClick={() => {
							setValue(`sections`, []);
							setSectionMode(null);
						}}
						hidden={props.isViewMode}
						isLight
						>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ManageSection;
