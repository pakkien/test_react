import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone'
import { useNavigate } from 'react-router-dom';


dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

type RevisionViewProps = {
    quotation_id?: string
    variance?: number
}

const RevisionsView = (props: RevisionViewProps) => {
    const navigate = useNavigate();
    const[revisionData, setRevisionData] = useState<any>([]);

    const fetchRevisions = async (quotation_id?: string, variance?: number) => {		
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
            params: {variance: `${variance}`}
		};
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/revisions/${quotation_id}`, config)
			.then((response) => {
				//console.log(response.data.data);
                setRevisionData(response.data.data);

			});
	};

	useEffect(() => {
		fetchRevisions(props.quotation_id, props.variance);
	}, []);

    
    const convertLocalTime = (timestring: string) => {
        return (dayjs.utc(timestring).local().format(
            'YYYY-MMM-DD HH:mm:ss',
        ));
    }

    const goToViewQuotationPage = (quotation_rev_id: string) => {
        navigate(`/quotation/view/${quotation_rev_id}`);
    }
  
  
    return (
        <>

        {revisionData.map((item: any) => {
            return(<><a
                //onClick={() => goToViewQuotationPage(item.quotation_revision_id)}
                href={'/quotation/view/' + item.quotation_revision_id}
                target='_blank'
                key={item.quotation_revision_id}
                >Revision {item.revision}</a> - Created at: {convertLocalTime(item.created_at)}<br/></>);
        })}
        </>
    
  )
}

export default RevisionsView