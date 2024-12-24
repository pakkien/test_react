import { register } from 'module';
import React from 'react';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Button from '../../../../components/bootstrap/Button';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../../../components/bootstrap/Dropdown';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import ManageItem from './ManageItem';
import QuotationDataType from '../../../dataTypes/QuotationDataType';

type SectionProps = {
	sectionMode: boolean;
	sections: QuotationDataType.Section[];
};

const ManageSection = (props: SectionProps) => {
  //console.log(props.sections);

	return (
		<div className='pb-0'>
			{props.sectionMode
				? props.sections.map((section, sectionIndex) => {
						return (
							<>
								<div className='col-xl-12'>
									<Accordion
										id='SectionAccordion'
										color='dark'
										activeItemId={'SectionAccordionItem_' + sectionIndex}>
										<AccordionItem
											id={'SectionAccordionItem_' + sectionIndex}
											title={`${sectionIndex + 1}.0  ` + section.name}>
											<ManageItem
												items={section.items}
												sectionMode={props.sectionMode}
												sectionIndex={sectionIndex}
											/>
										</AccordionItem>
									</Accordion>
								</div>
							</>
						);
					})
				: props.sections.map((section, sectionIndex) => {
						return (
								<ManageItem
									items={section.items}
									sectionMode={props.sectionMode}
									sectionIndex={sectionIndex}
								/>

						);
					})}
		</div>
	);
};

export default ManageSection;
