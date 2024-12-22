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
		variance: number;
		client_code: string;
		client: string;
		end_user: string;
		site_location: string;
		building: string;
		pic: string;
		pic_email: string;
		pic_contact_number: string;
		project_reference: string;
		sections: Section[];
		status: string;

		//Summary fields
		reference_status: string;
		note: string;
		total: number;
		g_total: number;

		//options fields
		lead_time: string;
		payment_terms: string;
		validity: string;
	};


	export type Section = {
		id: string;
		name: string;
		items: Item[];
		is_section_valid: boolean;
		order: number;
	}

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
		margin_percentage: number;
		estimated_cost: boolean;
		unit_price: number;
		total_price: number;
		sub_items: Sub_item[];
		order: number;
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
		margin_percentage: number;
		estimated_cost: boolean;
		unit_price: number;
		total_price: number;
		order: number;
	};

}

export default QuotationDataType;
