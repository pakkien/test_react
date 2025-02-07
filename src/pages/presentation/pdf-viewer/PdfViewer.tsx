import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';

const PdfViewer = () => {
	// const docs = [
	//     { uri: "https://url-to-my-pdf.pdf" }, // Remote file
	//     //{ uri: require("./example-files/pdf.pdf") }, // Local File
	//     ];

	const location = useLocation();
  const navigate = useNavigate();

	return (
		// <DocViewer
		//   documents={docs}
		//   initialActiveDocument={docs[1]}
		//   pluginRenderers={DocViewerRenderers}
		// />

		<PageWrapper title='PDF Preview'>
      <SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>PDF View</strong>
          </SubHeaderLeft></SubHeader>
			<Page>
				<DocViewer
					documents={location.state.files.map((file: any) => ({
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
