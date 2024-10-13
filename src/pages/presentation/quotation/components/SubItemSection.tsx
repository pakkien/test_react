import React, { useState } from 'react';

import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Icon from '../../../../components/icon/Icon';
import Collapse from '../../../../components/bootstrap/Collapse';
import SingleSubItem from './SingleSubItem';
import CommonStoryBtn from '../../../../common/other/CommonStoryBtn';

type SubItemSectionProps = {
	mode: string;
	data: sub_item[];
};

type sub_item = {
	sub_item_id: string;
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: number;
	unit: string;
	unit_cost: number;
	total_cost: number;
	margin: number;
	unit_price: number;
	total_price: number;
};

const SubItemSection = (SubItemSectionProps: SubItemSectionProps) => {
	const isViewMode = SubItemSectionProps.mode.toLowerCase() === 'view' ? true : false;

	return SubItemSectionProps.data.map((item) => (
		<SingleSubItem key={item.sub_item_id} mode={SubItemSectionProps.mode} data={item} />
	));
};

// const SubItemSection = (SubItemSectionProps: SubItemSectionProps) => {
// 	const [isOpen, setIsOpen] = useState(true);
// 	const setFirstElement = () => setIsOpen(!isOpen);

// 	const isViewMode = SubItemSectionProps.mode.toLowerCase() === 'view' ? true : false;

// 	return (
// 		<Card shadow='sm' borderSize={3}>
// 			<CardHeader borderSize={1} borderColor='primary'>
// 				<CardLabel>
// 					<CardTitle tag='div' className='h3'>
// 						<Icon icon='List' className='' size='3x' forceFamily='material' />
// 						&nbsp;&nbsp; Sub Item
// 					</CardTitle>
// 				</CardLabel>
// 				<CardActions>
// 					<Button
// 						icon={isOpen ? 'KeyboardArrowUp' : 'KeyboardArrowDown'}
// 						tag='a'
// 						shadow='default'
// 						hoverShadow='default'
// 						onClick={() => setFirstElement()}></Button>
// 				</CardActions>
// 			</CardHeader>
// 			<Collapse isOpen={isOpen} isChildClone>
// 				<CardBody>
// 					{SubItemSectionProps.data.map((item) => (
// 						<SingleSubItem mode={SubItemSectionProps.mode} data={item} />
// 					))}
// 				</CardBody>
// 			</Collapse>
// 		</Card>
// 	);
// };

export default SubItemSection;
