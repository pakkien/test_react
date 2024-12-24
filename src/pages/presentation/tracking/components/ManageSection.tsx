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
	//sectionMode: boolean;
	sections: QuotationDataType.Section[];
};

const ManageSection = (props: SectionProps) => {
  //console.log(props.sections);

   props.sections.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

	return (
		<div className='pb-0'>
			{props.sections.map((section, sectionIndex) => {
				{
					if(section.is_section_valid){
						return (
							<>
								<div className='col-md-12'>
									<Accordion
										id='SectionAccordion'
										color='dark'
										activeItemId={'SectionAccordionItem_' + sectionIndex}>
										<AccordionItem
											id={'SectionAccordionItem_' + sectionIndex}
											title={`${sectionIndex + 1}.0  ` + section.name}>
											<ManageItem
												items={section.items}
												sectionMode={true}
												sectionIndex={sectionIndex}
											/>
										</AccordionItem>
									</Accordion>
								</div>
								<div className='col-md-12'>&nbsp;</div>
							</>
						);
					}
					else{
						return (
							<>
							<ManageItem
								items={section.items}
								sectionMode={false}
								sectionIndex={sectionIndex}
							/>
							<div className='col-md-12'>&nbsp;</div>
							</>

					);
					}
				}
				
			})}
		</div>
	);
};

export default ManageSection;
