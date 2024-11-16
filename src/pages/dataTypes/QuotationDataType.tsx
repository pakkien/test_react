namespace QuotationDataType {
	export type Quotation = {
		quotation_id: string; //PK
		quotation_data: QuotationData[];
	};

	export type QuotationData = {
		quotation_revision_id: string; //PK
		quotation_id: string; //FK
		quotation_no: string;
		quotation_date: string;
		revision: number;
		client: string;
		end_user: string;
		site_location: string;
		building: string;
		pic: string;
		email: string;
		project_reference: string;
		items: Item[];
		status: string;

		//Summary fields
		reference_status: string;
		note: string;
		total: number;
		g_total: number;

		//attachment
		//attachment_list: string[];
	};

	export type Item = {
		item_id: string; //PK
		quotation_revision_id: string; //FK
		product_description: string;
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
		sub_items: Sub_item[];
	};

	export type Sub_item = {
		sub_item_id: string; //PK
		item_id: string;  //FK
		product_description: string;
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

}

export default QuotationDataType;
