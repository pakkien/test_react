namespace QuotationDataType {
	export type Quotation = {
		quotation_id: string; //PK
		quotation_data: QuotationData[];
	};

	export type QuotationData = {
		quotation_rev_id: string; //PK
		quotation_id: string; //FK
		quotation_no: string;
		quotation_date: string;
		rev: string;
		client: string;
		end_user: string;
		site_location: string;
		building: string;
		pic: string;
		email: string;
		project_ref: string;
		items: Item[];
		state: string;

		//Summary fields
		reference_status: string;
		note: string;
		total: string;
		g_total: string;
	};

	export type Item = {
		item_id: string; //PK
		quotation_rev_id: string; //FK
		product_desc: string;
		brand: string;
		model: string;
		remarks: string;
		quantity: string;
		unit: string;
		unit_cost: string;
		total_cost: string;
		margin: string;
		unit_price: string;
		total_price: string;
		sub_items: Sub_item[];
	};

	export type Sub_item = {
		sub_item_id: string; //PK
		item_id: string;  //FK
		product_desc: string;
		brand: string;
		model: string;
		remarks: string;
		quantity: string;
		unit: string;
		unit_cost: string;
		total_cost: string;
		margin: string;
		unit_price: string;
		total_price: string;
	};

}

export default QuotationDataType;
