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
import QuotationDataType from '../../../dataTypes/QuotationDataType';


type SectionProps = {
	isViewMode: boolean;
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
		let item = {
			product_description: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: 0,
			unit: '',
			unit_cost: 0,
			total_cost: 0,
			margin: 0,
			margin_percentage: 0,
			//estimated_cost: false,
			unit_price: 0,
			total_price: 0,
			order: 0,
			sub_items: [],
			lead_time: 0,
			by_others: false,
			inclusive: false,
		};

		append({
			name: 'New Section ' + (fields.length + 1),
			order: 0,
			items: isSectionValid? [] : [item],
			is_section_valid: isSectionValid,
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

	fields.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				<div className='col-md-12'>
					<div className='row g-4'>
						{fields.map((section, sectionIndex) => {
							if (section.is_section_valid) {
								return (
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
														}>
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
																isDisable={
																	errors.sections?.[sectionIndex]
																		?.name?.message != null
																}
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
							} else {
								return (
									<ManageItem
										sectionIndex={sectionIndex}
										isViewMode={props.isViewMode}
										sectionMode={false}
									/>
								);
							}
						})}

						{/* <div></div> */}
					</div>
				</div>
				<div className='col-md-12' hidden={props.isViewMode ? true : false}>
					
					<Button
						color='info'
						icon='Add'
						tag='a'
						onClick={() => {
							addSection(true);
						}}
						hidden={props.isViewMode}
						className='float-end order-2'>
						Add Section
					</Button>
					<div className='order-1 float-end'>&nbsp;&nbsp;</div>
					<Button
						color='info'
						icon='Add'
						tag='a'
						onClick={() => {
							//setSectionMode(false);
							addSection(false);
							//console.log(sectionMode);
						}}
						className='float-end order-0'
						hidden={props.isViewMode}>
						Add Item
					</Button>
				</div>

				<div className='col-md-12' hidden={props.isViewMode ? true : false}>
					<Button
						color='danger'
						tag='a'
						onClick={() => {
							setValue(`sections`, []);
							//setSectionMode(null);
						}}
						hidden={props.isViewMode}
						isLight>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ManageSection;
