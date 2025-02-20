import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const PdfViewer = () => {
	//const location = useLocation();
	const navigate = useNavigate();
	const { file_url, file_name } = useParams();

	const docs = [{ uri: base64_decode(file_url? file_url:""), name: base64_decode(file_name? file_name:"") }];

	return (
		<PageWrapper title='PDF Preview'>
			{/* <SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>PDF View</strong>
				</SubHeaderLeft>
			</SubHeader> */}
			<Page>
				<DocViewer
					documents={docs.map((file: any) => ({
						uri: file.uri,
						fileName: file.name,
					}))}
					pluginRenderers={DocViewerRenderers}
				/>
			</Page>
		</PageWrapper>
	);
};

export default PdfViewer;
