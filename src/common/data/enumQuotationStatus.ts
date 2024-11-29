import COLORS from './enumColors';
import { TColor } from '../../type/color-type';

export interface IEventStatus {
	[key: string]: { name: string; color: TColor };
}
const QUOTATION_STATUS: IEventStatus = {
    NONE: { name: 'Update State', color: COLORS.LIGHT.name },
    SUCCESS: { name: 'Success', color: COLORS.PRIMARY.name },
    DRAFT: { name: 'Draft', color: COLORS.PRIMARY.name },
    SUBMITTED: { name: 'Submitted', color: COLORS.INFO.name },
	AWARDED: { name: 'Awarded', color: COLORS.SUCCESS.name },
	COMPLETED: { name: 'Completed', color: COLORS.DANGER.name },
	REJECTED: { name: 'Rejected', color: COLORS.DARK.name },
};

const getEnumColorByStatus = (status: string) => {

};


export default QUOTATION_STATUS;

